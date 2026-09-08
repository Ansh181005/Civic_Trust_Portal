"use client"

import { createContext, useContext } from "react"
import { useUser, useClerk } from "@clerk/nextjs"

interface AuthContextType {
  user: any | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useUser()
  const { signOut: clerkSignOut } = useClerk()

  const handleSignOut = async () => {
    await clerkSignOut({ redirectUrl: "/" })
  }

  return (
    <AuthContext.Provider value={{ user, loading: !isLoaded, signOut: handleSignOut }}>
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
