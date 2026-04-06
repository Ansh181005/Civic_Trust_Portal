import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are CivicBot, the official AI assistant for the Civic Trust Portal — a citizen-first digital platform aligned with UN Sustainable Development Goal 16 (Peace, Justice & Strong Institutions).

Your role is to help Indian citizens with:
1. **Legal Rights** — Consumer protection, cyber laws, labour laws, student rights, RTI (Right to Information), and fundamental rights under the Indian Constitution.
2. **Government Schemes** — Central and state government welfare schemes, eligibility criteria, application processes, and deadlines.
3. **Scholarships** — Scholarships from government bodies, private institutions, and NGOs. Help users find scholarships based on their category, income, education level, and state.
4. **Jobs & Internships** — Guide users to relevant job and internship opportunities listed on the portal.
5. **Transparency Dashboard** — Explain budget utilization data, scheme progress, and department performance metrics available on the portal.

Guidelines:
- Be **helpful, accurate, and empathetic**. Speak in clear, simple language that any citizen can understand.
- When answering legal questions, **cite the relevant law or act** (e.g., Consumer Protection Act 2019, IT Act 2000) but **always add a disclaimer** that this is general information, not legal advice, and recommend consulting a legal professional for specific cases.
- Use **structured responses** with bullet points, numbered steps, or headings when explaining processes.
- If a question is outside your expertise or the portal's scope, politely say so and suggest where the user can find help.
- Keep responses **concise but thorough** — aim for 100-300 words unless more detail is necessary.
- You can recommend portal sections: "Know Your Rights" (/rights), "Scholarships" (/scholarships), "Jobs" (/jobs), "Government Schemes" (/schemes), "Transparency Dashboard" (/transparency).
- Respond in the **same language** the user writes in (English or Hindi).
- Never generate harmful, biased, or politically partisan content.`;

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 20; // max requests
const RATE_WINDOW = 60 * 1000; // per minute

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return false;
  }

  if (entry.count >= RATE_LIMIT) {
    return true;
  }

  entry.count++;
  return false;
}

// Helper to wait for a given duration
function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip =
      request.headers.get("x-forwarded-for") ??
      request.headers.get("x-real-ip") ??
      "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment before trying again." },
        { status: 429 }
      );
    }

    // Validate API key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY is not set in environment variables");
      return NextResponse.json(
        { error: "Chat service is not configured." },
        { status: 500 }
      );
    }

    // Parse and validate body
    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid request. Please provide messages." },
        { status: 400 }
      );
    }

    // Sanitize messages
    const sanitizedMessages = messages
      .filter(
        (m: { role: string; content: string }) =>
          m.role && m.content && typeof m.content === "string"
      )
      .map((m: { role: string; content: string }) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content.slice(0, 2000) }],
      }));

    if (sanitizedMessages.length === 0) {
      return NextResponse.json(
        { error: "No valid messages provided." },
        { status: 400 }
      );
    }

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_PROMPT,
    });

    // Build chat history (all messages except the last one)
    const history = sanitizedMessages.slice(0, -1);
    const lastMessage = sanitizedMessages[sanitizedMessages.length - 1];

    // Retry logic with exponential backoff for rate limiting
    const MAX_RETRIES = 3;
    let lastError: Error | null = null;

    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      try {
        const chat = model.startChat({ history });
        const result = await chat.sendMessageStream(lastMessage.parts[0].text);

        const stream = new ReadableStream({
          async start(controller) {
            try {
              for await (const chunk of result.stream) {
                const text = chunk.text();
                if (text) {
                  controller.enqueue(new TextEncoder().encode(text));
                }
              }
              controller.close();
            } catch (streamErr) {
              console.error("Stream error:", streamErr);
              controller.enqueue(
                new TextEncoder().encode(
                  "\n\nI'm sorry, I encountered an error while generating a response. Please try again."
                )
              );
              controller.close();
            }
          },
        });

        return new Response(stream, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "no-cache",
          },
        });
      } catch (err) {
        lastError = err as Error;
        const errorMessage = (err as Error).message || "";

        // Check if it's a rate limit / resource exhaustion error
        if (
          errorMessage.includes("429") ||
          errorMessage.includes("RESOURCE_EXHAUSTED") ||
          errorMessage.includes("quota")
        ) {
          const waitTime = Math.pow(2, attempt + 1) * 1000; // 2s, 4s, 8s
          console.log(
            `Rate limited by Gemini API. Retrying in ${waitTime / 1000}s (attempt ${attempt + 1}/${MAX_RETRIES})`
          );
          await sleep(waitTime);
          continue;
        }

        // For non-rate-limit errors, don't retry
        break;
      }
    }

    // All retries exhausted or non-retryable error
    console.error("Chat API error after retries:", lastError);

    const errorMsg = lastError?.message || "";
    if (errorMsg.includes("429") || errorMsg.includes("RESOURCE_EXHAUSTED") || errorMsg.includes("quota")) {
      const waitMatch = errorMsg.match(/retryDelay":"(\d+)s"/);
      const waitSeconds = waitMatch ? waitMatch[1] : "60";
      
      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(
            new TextEncoder().encode(
              `⚠️ **API Rate Limit Reached**\n\nThe free-tier Google Gemini API has reached its request limit. Please try your message again in about **${waitSeconds} seconds**.`
            )
          );
          controller.close();
        },
      });

      return new Response(stream, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-cache",
        },
      });
    }

    // Generic error fallback streamed to UI gracefully
    const fallbackStream = new ReadableStream({
      start(controller) {
        controller.enqueue(
          new TextEncoder().encode(
             "I'm sorry, I encountered an internal error. Please try again later."
          )
        );
        controller.close();
      },
    });

    return new Response(fallbackStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
