"use client"

import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Search, Bell, User, LogOut } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import { useEffect, useState } from "react"
import { getUnreadCount, subscribeToNotifications } from "@/services/notifications.service"
import { MobileTabBar } from "@/components/mobile-tabbar"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, profile, signOut } = useAuth()
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    if (!user) return
    getUnreadCount(user.id).then(setUnreadCount).catch(() => {})
    fetch("/api/notifications/process", { method: "POST" }).catch(() => {})

    const channel = subscribeToNotifications(user.id, () => {
      getUnreadCount(user.id).then(setUnreadCount).catch(() => {})
    })

    const timer = window.setInterval(() => {
      fetch("/api/notifications/process", { method: "POST" }).catch(() => {})
    }, 60_000)

    return () => {
      window.clearInterval(timer)
      channel.unsubscribe()
    }
  }, [user])

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b border-border bg-card px-3 sm:px-4">
          <div className="hidden md:block">
            <SidebarTrigger />
          </div>
          <div className="flex flex-1 items-center gap-4">
            <div className="relative max-w-sm flex-1 md:flex">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-9 md:block"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => signOut()}
              className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              aria-label="Sign out"
              title="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
            <Link
              href="/notifications"
              className="relative hidden h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground md:flex"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </Link>
            <Link
              href="/profile"
              className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-primary text-primary-foreground"
              aria-label="Profile"
            >
              {profile?.avatar_url ? (
                <img src={profile.avatar_url} alt="Avatar" className="h-full w-full object-cover" />
              ) : (
                <User className="h-4 w-4" />
              )}
            </Link>
          </div>
        </header>
        <div className="flex min-h-[calc(100svh-3.5rem)] flex-1 justify-center bg-background">
          <div className="w-full max-w-md flex-1 px-4 py-4 pb-[calc(5.5rem+env(safe-area-inset-bottom))] md:max-w-none md:px-6 md:py-6 md:pb-6">
            {children}
          </div>
        </div>
        <MobileTabBar unreadCount={unreadCount} />
      </SidebarInset>
    </SidebarProvider>
  )
}
