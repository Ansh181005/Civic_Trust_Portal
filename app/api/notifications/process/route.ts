import { NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { sendNotificationEmail } from "@/lib/mailer"
import { createClient as createServerClient } from "@/lib/supabase/server"

export const runtime = "nodejs"

type ProfileRow = {
  id: string
  email: string | null
  full_name: string | null
  phone: string | null
  state: string | null
  category: string | null
  date_of_birth: string | null
  email_notifications: boolean
  scholarship_alerts: boolean
  job_alerts: boolean
  scheme_alerts?: boolean
}

function normalize(value: string | null | undefined) {
  return (value || "").trim().toLowerCase()
}

function isProfileIncomplete(profile: ProfileRow) {
  return !profile.full_name || !profile.phone || !profile.state || !profile.category || !profile.date_of_birth
}

function parseDateFlexible(value: string | null | undefined): Date | null {
  if (!value) return null
  const text = value.trim()
  if (!text || text.toLowerCase() === "open") return null
  const d = new Date(text)
  return Number.isNaN(d.getTime()) ? null : d
}

function daysBetween(now: Date, target: Date) {
  const ms = target.getTime() - now.getTime()
  return Math.ceil(ms / (24 * 60 * 60 * 1000))
}

async function insertNotificationIfMissing(
  supabase: ReturnType<typeof createAdminClient>,
  payload: {
    user_id: string
    type: string
    event_type: string
    title: string
    message: string
    source_table: string
    source_id: string
    dedupe_key: string
    delivery_channels: string[]
    metadata?: Record<string, unknown>
  }
) {
  const { data: existing } = await supabase
    .from("notifications")
    .select("id, user_id, title, message, delivery_channels")
    .eq("user_id", payload.user_id)
    .eq("dedupe_key", payload.dedupe_key)
    .maybeSingle()

  if (existing) {
    return existing as { id: string; user_id: string; title: string; message: string; delivery_channels: string[] }
  }

  const { error: insertError } = await supabase.from("notifications").insert({
    ...payload,
    metadata: payload.metadata ?? {},
    read: false,
  })

  if (insertError) {
    // In race conditions another process may insert first; fetch again and continue.
    const { data: raceExisting } = await supabase
      .from("notifications")
      .select("id, user_id, title, message, delivery_channels")
      .eq("user_id", payload.user_id)
      .eq("dedupe_key", payload.dedupe_key)
      .maybeSingle()
    if (raceExisting) {
      return raceExisting as { id: string; user_id: string; title: string; message: string; delivery_channels: string[] }
    }
    throw insertError
  }

  const { data } = await supabase
    .from("notifications")
    .select("id, user_id, title, message, delivery_channels")
    .eq("user_id", payload.user_id)
    .eq("dedupe_key", payload.dedupe_key)
    .single()

  return data as
    | { id: string; user_id: string; title: string; message: string; delivery_channels: string[] }
    | null
}

export async function POST(request: Request) {
  try {
    const headerSecret = request.headers.get("x-pipeline-secret")
    const configuredSecret = process.env.NOTIFICATION_PIPELINE_SECRET
    if (configuredSecret && headerSecret !== configuredSecret) {
      const supabaseAuth = await createServerClient()
      const { data: { user } } = await supabaseAuth.auth.getUser()
      if (!user) {
        return NextResponse.json({ error: "Unauthorized pipeline call." }, { status: 401 })
      }
    }

    const supabase = createAdminClient()
    const now = new Date()
    const closingSoonDays = Number(process.env.NOTIFICATION_CLOSING_SOON_DAYS || 3)
    const recentWindowDays = Number(process.env.NOTIFICATION_RECENT_DAYS || 7)
    const todayKey = now.toISOString().slice(0, 10)

    const [{ data: profiles }, { data: queueRows }] = await Promise.all([
      supabase
        .from("profiles")
        .select("id,email,full_name,phone,state,category,date_of_birth,email_notifications,scholarship_alerts,job_alerts,scheme_alerts"),
      supabase
        .from("notification_event_queue")
        .select("*")
        .is("processed_at", null)
        .order("created_at", { ascending: true })
        .limit(200),
    ])

    const allProfiles = (profiles || []) as ProfileRow[]
    const queue = (queueRows || []) as Array<{ id: string; source_table: string; source_id: string }>
    const createdNotifications: Array<{ id: string; user_id: string; title: string; message: string; delivery_channels: string[] }> = []

    for (const eventRow of queue) {
      let source: any = null

      if (eventRow.source_table === "jobs") {
        const { data } = await supabase.from("jobs").select("*").eq("id", eventRow.source_id).single()
        source = data
      } else if (eventRow.source_table === "scholarships") {
        const { data } = await supabase.from("scholarships").select("*").eq("id", eventRow.source_id).single()
        source = data
      } else if (eventRow.source_table === "schemes") {
        const { data } = await supabase.from("schemes").select("*").eq("id", eventRow.source_id).single()
        source = data
      }

      if (!source) {
        await supabase.from("notification_event_queue").update({ processed_at: new Date().toISOString() }).eq("id", eventRow.id)
        continue
      }

      const sourceState = normalize(source.state)
      for (const p of allProfiles) {
        if (eventRow.source_table === "jobs" && !p.job_alerts) continue
        if (eventRow.source_table === "scholarships" && !p.scholarship_alerts) continue
        if (eventRow.source_table === "schemes" && p.scheme_alerts === false) continue
        if (sourceState && sourceState !== "all india" && normalize(p.state) && sourceState !== normalize(p.state)) continue

        const title = eventRow.source_table === "jobs"
          ? `${source.type === "internship" ? "Internship" : "Job"} open: ${source.title}`
          : eventRow.source_table === "scholarships"
            ? `Scholarship open: ${source.title}`
            : `Scheme update: ${source.name}`

        const message = eventRow.source_table === "jobs"
          ? `${source.company} has a new ${source.type} opportunity.`
          : eventRow.source_table === "scholarships"
            ? `${source.provider} has an active scholarship opportunity.`
            : `${source.name} may match your profile and preferences.`

        const row = await insertNotificationIfMissing(supabase, {
          user_id: p.id,
          type: eventRow.source_table === "jobs" ? "job" : eventRow.source_table === "scholarships" ? "scholarship" : "scheme",
          event_type: "opportunity_new",
          title,
          message,
          source_table: eventRow.source_table,
          source_id: source.id,
          dedupe_key: `new:${eventRow.source_table}:${source.id}`,
          delivery_channels: p.email_notifications ? ["in_app", "email"] : ["in_app"],
        })
        if (row) createdNotifications.push(row)
      }

      await supabase.from("notification_event_queue").update({ processed_at: new Date().toISOString() }).eq("id", eventRow.id)
    }

    const [{ data: scholarships }, { data: jobs }, { data: schemes }] = await Promise.all([
      supabase.from("scholarships").select("*"),
      supabase.from("jobs").select("*"),
      supabase.from("schemes").select("*"),
    ])

    for (const p of allProfiles) {
      if (p.scholarship_alerts) {
        for (const s of scholarships || []) {
          const sDate = (s.closes_at ? new Date(s.closes_at) : parseDateFlexible(s.deadline))
          if (!sDate) continue
          const d = daysBetween(now, sDate)
          if (d < 0 || d > closingSoonDays) continue
          const row = await insertNotificationIfMissing(supabase, {
            user_id: p.id,
            type: "scholarship",
            event_type: "closing_soon",
            title: `Closing soon: ${s.title}`,
            message: `Only ${d} day(s) left to apply for ${s.title}.`,
            source_table: "scholarships",
            source_id: s.id,
            dedupe_key: `closing:scholarships:${s.id}:${d}`,
            delivery_channels: p.email_notifications ? ["in_app", "email"] : ["in_app"],
          })
          if (row) createdNotifications.push(row)
        }
      }

      if (p.job_alerts) {
        for (const j of jobs || []) {
          if (!j.closes_at) continue
          const jDate = new Date(j.closes_at)
          const d = daysBetween(now, jDate)
          if (d < 0 || d > closingSoonDays) continue
          const row = await insertNotificationIfMissing(supabase, {
            user_id: p.id,
            type: "job",
            event_type: "closing_soon",
            title: `Closing soon: ${j.title}`,
            message: `Only ${d} day(s) left to apply for ${j.title} at ${j.company}.`,
            source_table: "jobs",
            source_id: j.id,
            dedupe_key: `closing:jobs:${j.id}:${d}`,
            delivery_channels: p.email_notifications ? ["in_app", "email"] : ["in_app"],
          })
          if (row) createdNotifications.push(row)
        }
      }

      if (p.scheme_alerts !== false) {
        for (const s of schemes || []) {
          if (!s.closes_at) continue
          const sDate = new Date(s.closes_at)
          const d = daysBetween(now, sDate)
          if (d < 0 || d > closingSoonDays) continue
          const row = await insertNotificationIfMissing(supabase, {
            user_id: p.id,
            type: "scheme",
            event_type: "closing_soon",
            title: `Closing soon: ${s.name}`,
            message: `Only ${d} day(s) left for ${s.name}.`,
            source_table: "schemes",
            source_id: s.id,
            dedupe_key: `closing:schemes:${s.id}:${d}`,
            delivery_channels: p.email_notifications ? ["in_app", "email"] : ["in_app"],
          })
          if (row) createdNotifications.push(row)
        }
      }
    }

    const recentCutoff = new Date(now.getTime() - recentWindowDays * 24 * 60 * 60 * 1000)
    for (const p of allProfiles) {
      if (!isProfileIncomplete(p)) continue

      const hasRecentMatch =
        (jobs || []).some((j) => new Date(j.created_at) >= recentCutoff) ||
        (scholarships || []).some((s) => new Date(s.created_at) >= recentCutoff) ||
        (schemes || []).some((s) => new Date(s.created_at) >= recentCutoff)
      if (!hasRecentMatch) continue

      const row = await insertNotificationIfMissing(supabase, {
        user_id: p.id,
        type: "alert",
        event_type: "profile_incomplete",
        title: "Complete your profile to unlock better matches",
        message: "Your profile is incomplete. Add phone, state, category, and DOB to receive accurate eligibility alerts.",
        source_table: "profiles",
        source_id: p.id,
        dedupe_key: `profile_incomplete:${p.id}:${todayKey}`,
        delivery_channels: p.email_notifications ? ["in_app", "email"] : ["in_app"],
      })
      if (row) createdNotifications.push(row)
    }

    let emailsSent = 0
    let emailFailures = 0
    for (const n of createdNotifications) {
      if (!n.delivery_channels.includes("email")) continue
      const profile = allProfiles.find((p) => p.id === n.user_id)
      if (!profile?.email) continue

      const { data: existingDispatch } = await supabase
        .from("notification_dispatches")
        .select("id")
        .eq("notification_id", n.id)
        .eq("channel", "email")
        .maybeSingle()
      if (existingDispatch) continue

      try {
        await sendNotificationEmail({
          to: profile.email,
          subject: n.title,
          title: n.title,
          message: n.message,
        })
        emailsSent += 1
        await supabase.from("notification_dispatches").insert({
          notification_id: n.id,
          channel: "email",
          status: "sent",
        })
      } catch (error: any) {
        emailFailures += 1
        console.error("notification email send failed:", error?.message || error)
        await supabase.from("notification_dispatches").insert({
          notification_id: n.id,
          channel: "email",
          status: "failed",
          error_message: error?.message || "Unknown email error",
        })
      }
    }

    return NextResponse.json({
      success: true,
      created_notifications: createdNotifications.length,
      processed_queue_events: queue.length,
      emails_sent: emailsSent,
      email_failures: emailFailures,
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Notification pipeline failed." },
      { status: 500 }
    )
  }
}
