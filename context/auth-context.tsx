"use client"

import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"
import type { Profile } from "@/types/database"

interface AuthContextType {
  user: User | null
  profile: Profile | null
  loading: boolean
  signInWithPassword: (email: string, password: string) => Promise<{ error: string | null }>
  signInWithOtp: (email: string) => Promise<{ error: string | null }>
  verifyOtp: (email: string, token: string) => Promise<{ error: string | null }>
  signUp: (email: string, password: string, metadata: { full_name: string; state: string }) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  // Single stable client instance for the browser session
  const supabase = useMemo(() => createClient(), [])

  const fetchProfile = useCallback(async (userId: string) => {
    try {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single()
      setProfile(data)
    } catch {
      // Profile fetch can fail if table doesn't exist yet — don't block
    }
  }, [supabase])

  const refreshProfile = useCallback(async () => {
    if (user) {
      await fetchProfile(user.id)
    }
  }, [user, fetchProfile])

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        const currentUser = session?.user ?? null
        setUser(currentUser)
        if (currentUser) {
          await fetchProfile(currentUser.id)
          // Ensure automatic pipeline/welcome checks also run on page refresh with existing session.
          fetch("/api/notifications/login-success", { method: "POST" }).catch(() => {})
          fetch("/api/notifications/process", { method: "POST" }).catch(() => {})
        }
      } catch {
        // Auth can fail if Supabase not configured yet
      }
      setLoading(false)
    }
    getSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const currentUser = session?.user ?? null
        setUser(currentUser)
        if (currentUser) {
          await fetchProfile(currentUser.id)
          if (_event === "SIGNED_IN") {
            // Fire-and-forget login success notification (in-app + email/mobile mail push)
            fetch("/api/notifications/login-success", { method: "POST" }).catch(() => {})
            // Kick off alert processing on sign-in for near realtime updates.
            fetch("/api/notifications/process", { method: "POST" }).catch(() => {})
          }
        } else {
          setProfile(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase, fetchProfile])

  const signInWithPassword = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error: error?.message ?? null }
  }, [supabase])

  const signInWithOtp = useCallback(async (email: string) => {
    try {
      // Use our custom API route that bypasses Supabase's email rate limits
      // and sends the OTP via custom SMTP in .env.local
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      const data = await res.json()
      
      if (!res.ok) {
        return { error: data.error || "Failed to send login code." }
      }
      return { error: null }
    } catch (err: any) {
      return { error: "Network error. Please try again." }
    }
  }, [])

  const verifyOtp = useCallback(async (email: string, token: string) => {
    // Verification still happens through Supabase natively, since our API 
    // generated a real Supabase-backed OTP code!
    const { error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email',
    })
    return { error: error?.message ?? null }
  }, [supabase])

  const signUp = useCallback(async (
    email: string,
    password: string,
    metadata: { full_name: string; state: string }
  ) => {
    try {
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, ...metadata }),
      })
      const data = await res.json()
      if (!res.ok) {
        return { error: data?.error || "Failed to create account." }
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
      return { error: signInError?.message ?? null }
    } catch {
      return { error: "Network error. Please try again." }
    }
  }, [supabase])

  const signOut = useCallback(async () => {
    try {
      // Try global sign-out first so other sessions/tokens are invalidated.
      await supabase.auth.signOut({ scope: "global" })
    } catch {
      // Fallback to local sign-out and continue logout UX.
      try {
        await supabase.auth.signOut({ scope: "local" })
      } catch {
        // Ignore and continue forced client logout below.
      }
    } finally {
      setUser(null)
      setProfile(null)
      // Force hard redirect to clear stale state and hit protected-route guard.
      window.location.replace("/login")
    }
  }, [supabase])

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signInWithPassword,
        signInWithOtp,
        verifyOtp,
        signUp,
        signOut,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
