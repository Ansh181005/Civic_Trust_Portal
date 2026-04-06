import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"

export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const email = String(body?.email || "").trim()
    const password = String(body?.password || "")
    const full_name = String(body?.full_name || "").trim()
    const state = String(body?.state || "").trim()

    if (!email || !password || password.length < 6 || !full_name || !state) {
      return NextResponse.json(
        { error: "Missing required fields (email, password, full name, state)." },
        { status: 400 }
      )
    }

    const admin = createAdminClient()
    const { data, error } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name, state },
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, user_id: data.user?.id })
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Sign up failed." },
      { status: 500 }
    )
  }
}
