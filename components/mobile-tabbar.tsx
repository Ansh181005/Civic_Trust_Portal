"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Briefcase,
  GraduationCap,
  Landmark,
  Bell,
  User,
} from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
  unreadCount?: number
}

const tabs = [
  { href: "/dashboard", label: "Home", icon: LayoutDashboard },
  { href: "/jobs", label: "Jobs", icon: Briefcase },
  { href: "/scholarships", label: "Scholar.", icon: GraduationCap },
  { href: "/schemes", label: "Schemes", icon: Landmark },
  { href: "/notifications", label: "Alerts", icon: Bell },
  { href: "/profile", label: "Profile", icon: User },
] as const

export function MobileTabBar({ unreadCount = 0 }: Props) {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 md:hidden",
        "border-t border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/75"
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Bottom navigation"
    >
      <div className="mx-auto grid max-w-md grid-cols-6 px-2 py-2">
        {tabs.map((t) => {
          const active = pathname === t.href
          const Icon = t.icon
          const isNotifications = t.href === "/notifications"
          return (
            <Link
              key={t.href}
              href={t.href}
              className={cn(
                "relative flex flex-col items-center justify-center gap-1 rounded-xl px-1 py-2 text-[11px] transition-colors",
                active ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
              aria-current={active ? "page" : undefined}
            >
              <span className="relative">
                <Icon className={cn("h-5 w-5", active ? "text-primary" : "")} />
                {isNotifications && unreadCount > 0 && (
                  <span className="absolute -right-2 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </span>
              <span className="leading-none">{t.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

