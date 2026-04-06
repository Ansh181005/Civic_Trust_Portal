import { NextResponse } from "next/server"

export const runtime = "nodejs"

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization")
  const cronSecret = process.env.CRON_SECRET

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "")

  if (!siteUrl) {
    return NextResponse.json(
      { error: "Missing NEXT_PUBLIC_SITE_URL (or VERCEL_URL) for cron pipeline call." },
      { status: 500 }
    )
  }

  const response = await fetch(`${siteUrl}/api/notifications/process`, {
    method: "POST",
    headers: {
      "x-pipeline-secret": process.env.NOTIFICATION_PIPELINE_SECRET || "",
    },
    cache: "no-store",
  })

  const data = await response.json()
  return NextResponse.json({
    success: response.ok,
    cron_called_at: new Date().toISOString(),
    pipeline_result: data,
  })
}
