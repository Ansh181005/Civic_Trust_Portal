"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Scale,
  GraduationCap,
  Briefcase,
  Landmark,
  BarChart3,
  Bell,
  ArrowRight,
  Clock,
} from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { getRecentOpportunities } from "@/services/jobs.service"
import { getNotifications } from "@/services/notifications.service"
import type { Notification } from "@/types/database"

const quickActions = [
  { icon: Scale, label: "Know Your Rights", href: "/rights", color: "bg-primary/10 text-primary" },
  { icon: GraduationCap, label: "Scholarships", href: "/scholarships", color: "bg-chart-4/10 text-chart-4" },
  { icon: Briefcase, label: "Jobs & Internships", href: "/jobs", color: "bg-chart-2/10 text-chart-2" },
  { icon: Landmark, label: "Govt Schemes", href: "/schemes", color: "bg-chart-5/10 text-chart-5" },
  { icon: BarChart3, label: "Transparency", href: "/transparency", color: "bg-chart-3/10 text-chart-3" },
]

interface Opportunity {
  type: string
  title: string
  provider: string
  deadline: string
}

export default function DashboardPage() {
  const { user, profile } = useAuth()
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])

  useEffect(() => {
    getRecentOpportunities(4).then(setOpportunities).catch(() => {})
    if (user) {
      getNotifications(user.id).then((n) => setNotifications(n.slice(0, 3))).catch(() => {})
    }
  }, [user])

  const displayName = profile?.full_name || "Citizen"

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Welcome back, {displayName}</h1>
        <p className="mt-1 text-muted-foreground">
          {"Here's what's new on your Civic Trust Portal."}
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {quickActions.map((action) => (
          <Link key={action.label} href={action.href}>
            <Card className="group border border-border bg-card transition-shadow hover:shadow-md">
              <CardContent className="flex flex-col items-center gap-3 p-4 text-center">
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${action.color}`}>
                  <action.icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium text-foreground">{action.label}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Opportunities */}
        <div className="lg:col-span-2">
          <Card className="border border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base font-semibold text-foreground">Recently Added Opportunities</CardTitle>
              <Link href="/jobs">
                <Button variant="ghost" size="sm" className="gap-1 text-xs text-muted-foreground">
                  View All <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                {opportunities.length > 0 ? opportunities.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start justify-between gap-4 rounded-lg border border-border p-3"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-[10px]">{item.type}</Badge>
                      </div>
                      <p className="mt-1.5 text-sm font-medium text-foreground">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.provider}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {item.deadline}
                    </div>
                  </div>
                )) : (
                  <p className="text-sm text-muted-foreground">Loading opportunities...</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications Preview */}
        <Card className="border border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold text-foreground">Notifications</CardTitle>
            <Link href="/notifications">
              <Button variant="ghost" size="sm" className="gap-1 text-xs text-muted-foreground">
                View All <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {notifications.length > 0 ? notifications.map((n) => (
                <div key={n.id} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Bell className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground">{n.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(n.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )) : (
                <p className="text-sm text-muted-foreground">No notifications yet.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
