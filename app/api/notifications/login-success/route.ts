import { NextResponse } from "next/server"
import { createClient as createServerClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { sendNotificationEmail } from "@/lib/mailer"

export const runtime = "nodejs"

export async function POST() {
  try {
    const supabase = await createServerClient()
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const admin = createAdminClient()
    const today = new Date().toISOString().slice(0, 10)
    const dedupeKey = `login_success:${user.id}:${today}`

    const title = "Login successful"
    const message =
      "Welcome back to Civic Trust. You will receive realtime alerts for new opportunities and deadlines."

    const { data: existingNotif } = await admin
      .from("notifications")
      .select("id")
      .eq("user_id", user.id)
      .eq("dedupe_key", dedupeKey)
      .maybeSingle()

    if (!existingNotif) {
      const { error: insertError } = await admin.from("notifications").insert({
        user_id: user.id,
        type: "success",
        event_type: "login_success",
        title,
        message,
        source_table: "profiles",
        source_id: user.id,
        dedupe_key: dedupeKey,
        delivery_channels: ["in_app", "email"],
        metadata: {},
        read: false,
      })
      if (insertError) throw insertError
    }

    const [{ data: profile }, { data: notification }] = await Promise.all([
      admin
        .from("profiles")
        .select("email, email_notifications")
        .eq("id", user.id)
        .single(),
      admin
        .from("notifications")
        .select("id")
        .eq("user_id", user.id)
        .eq("dedupe_key", dedupeKey)
        .single(),
    ])

    if (profile?.email && profile.email_notifications && notification?.id) {
      const { data: existingDispatch } = await admin
        .from("notification_dispatches")
        .select("id")
        .eq("notification_id", notification.id)
        .eq("channel", "email")
        .maybeSingle()

      if (!existingDispatch) {
        try {
          await sendNotificationEmail({
            to: profile.email,
            subject: title,
            title,
            message,
          })
          await admin.from("notification_dispatches").insert({
            notification_id: notification.id,
            channel: "email",
            status: "sent",
          })
        } catch (error: any) {
          console.error("login-success email send failed:", error?.message || error)
          await admin.from("notification_dispatches").insert({
            notification_id: notification.id,
            channel: "email",
            status: "failed",
            error_message: error?.message || "Unknown email error",
          })
        }
      }
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to send login notification" }, { status: 500 })
  }
}
