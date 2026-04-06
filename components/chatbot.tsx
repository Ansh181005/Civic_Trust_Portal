"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { MessageSquare, X, Send, Loader2, Sparkles, ArrowDown } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

const QUICK_PROMPTS = [
  { label: "Know My Rights", message: "What are my fundamental rights as an Indian citizen?" },
  { label: "Find Scholarships", message: "Help me find scholarships I might be eligible for." },
  { label: "Browse Jobs", message: "What kind of job and internship opportunities are available on this portal?" },
  { label: "Govt Schemes", message: "Tell me about important government schemes I should know about." },
]

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content:
    "👋 Hello! I'm **CivicBot**, your AI assistant on the Civic Trust Portal.\n\nI can help you with:\n- 📜 **Legal Rights** — Consumer, cyber, labour & student laws\n- 🎓 **Scholarships** — Find ones you're eligible for\n- 💼 **Jobs & Internships** — Browse opportunities\n- 🏛️ **Government Schemes** — Eligibility & application guides\n- 📊 **Transparency** — Budget & performance data\n\nHow can I help you today?",
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showScrollBtn, setShowScrollBtn] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
      // Focus input after animation completes
      setTimeout(() => inputRef.current?.focus(), 350)
    }
  }, [isOpen, scrollToBottom])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  // Track scroll position to show "scroll to bottom" button
  const handleScroll = () => {
    const container = messagesContainerRef.current
    if (!container) return
    const isNearBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight < 80
    setShowScrollBtn(!isNearBottom)
  }

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput("")
    setIsLoading(true)

    // Create the assistant message placeholder
    const assistantId = (Date.now() + 1).toString()
    setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "" }])

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages
            .filter((m) => m.id !== "welcome")
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.error || "Failed to get response")
      }

      // Stream the response
      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (reader) {
        let accumulated = ""
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          accumulated += decoder.decode(value, { stream: true })
          const currentText = accumulated
          setMessages((prev) =>
            prev.map((m) => (m.id === assistantId ? { ...m, content: currentText } : m))
          )
        }
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong"
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? {
                ...m,
                content: `I'm sorry, I encountered an issue: ${errorMessage}. Please try again.`,
              }
            : m
        )
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  const formatMessage = (content: string) => {
    // Convert markdown-like formatting to HTML
    return content
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\n/g, "<br />")
      .replace(/- /g, "• ")
  }

  const hasUserMessages = messages.some((m) => m.role === "user")

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-[9999] flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          isOpen
            ? "rotate-0 bg-red-500 text-white hover:bg-red-600 focus:ring-red-400"
            : "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary"
        }`}
        aria-label={isOpen ? "Close chat" : "Open CivicBot chat"}
        id="civicbot-toggle"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <>
            <MessageSquare className="h-6 w-6" />
            {/* Pulse ring animation */}
            <span className="absolute inset-0 animate-ping rounded-full bg-primary/30" />
          </>
        )}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed z-[9998] transition-all duration-300 ease-out ${
          isOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        } bottom-24 right-6 w-[380px] max-sm:bottom-0 max-sm:left-0 max-sm:right-0 max-sm:top-0 max-sm:w-full`}
        role="dialog"
        aria-label="CivicBot Chat"
      >
        <div className="flex h-[560px] max-sm:h-full flex-col overflow-hidden rounded-2xl max-sm:rounded-none border border-border bg-card shadow-2xl">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-border bg-primary px-4 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-white">CivicBot</h3>
              <p className="text-xs text-white/70">AI Assistant • Civic Trust Portal</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/20 hover:text-white max-sm:block sm:hidden"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages Area */}
          <div
            ref={messagesContainerRef}
            onScroll={handleScroll}
            className="relative flex-1 overflow-y-auto p-4"
            role="log"
            aria-live="polite"
            aria-label="Chat messages"
          >
            <div className="flex flex-col gap-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      message.role === "user"
                        ? "rounded-br-md bg-primary text-white"
                        : "rounded-bl-md bg-secondary text-foreground"
                    }`}
                  >
                    {message.role === "assistant" && message.content === "" && isLoading ? (
                      <div className="flex items-center gap-1.5 py-1">
                        <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:0ms]" />
                        <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:150ms]" />
                        <span className="inline-block h-2 w-2 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:300ms]" />
                      </div>
                    ) : (
                      <div dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }} />
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Scroll to bottom button */}
            {showScrollBtn && (
              <button
                onClick={scrollToBottom}
                className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-primary/90 p-1.5 text-white shadow-md transition-all hover:bg-primary"
                aria-label="Scroll to latest message"
              >
                <ArrowDown className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Quick Prompts */}
          {!hasUserMessages && (
            <div className="flex flex-wrap gap-2 border-t border-border/50 px-4 py-3">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt.label}
                  onClick={() => sendMessage(prompt.message)}
                  disabled={isLoading}
                  className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:border-primary/50 hover:bg-primary/5 hover:text-primary disabled:opacity-50"
                >
                  {prompt.label}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className="border-t border-border bg-card p-3">
            <div className="flex items-end gap-2 rounded-xl border border-border bg-background px-3 py-2 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask CivicBot anything..."
                disabled={isLoading}
                rows={1}
                className="max-h-24 flex-1 resize-none bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground disabled:opacity-50"
                aria-label="Type your message"
                id="civicbot-input"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={isLoading || !input.trim()}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-white transition-all hover:bg-primary/90 disabled:opacity-40 disabled:hover:bg-primary"
                aria-label="Send message"
                id="civicbot-send"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </button>
            </div>
            <p className="mt-1.5 text-center text-[10px] text-muted-foreground/60">
              CivicBot provides general information, not legal advice.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
