"use client"

import { useEffect, useState, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Bell,
  GraduationCap,
  Briefcase,
  Landmark,
  AlertCircle,
  CheckCircle,
} from "lucide-react"
import { useAuth } from "@/context/auth-context"
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  subscribeToNotifications,
} from "@/services/notifications.service"
import type { Notification } from "@/types/database"

const iconMap: Record<string, typeof Bell> = {
  scholarship: GraduationCap,
  job: Briefcase,
  scheme: Landmark,
  alert: AlertCircle,
  success: CheckCircle,
  default: Bell,
}

export default function NotificationsPage() {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loaded, setLoaded] = useState(false)

  const fetchNotifications = useCallback(async () => {
    if (!user) return
    getNotifications(user.id)
      .then(setNotifications)
      .catch(() => setNotifications([]))
      .finally(() => setLoaded(true))
  }, [user])

  useEffect(() => {
    fetchNotifications()
  }, [fetchNotifications])

  useEffect(() => {
    if (!user) return
    const channel = subscribeToNotifications(user.id, (payload) => {
      const typed = payload as { eventType?: string; new?: Notification; old?: Notification }
      if (typed.eventType === "INSERT" && typed.new) {
        setNotifications((prev) => [typed.new as Notification, ...prev])
      } else if (typed.eventType === "UPDATE" && typed.new) {
        setNotifications((prev) =>
          prev.map((n) => (n.id === typed.new!.id ? (typed.new as Notification) : n))
        )
      }
    })
    return () => { channel.unsubscribe() }
  }, [user])

  const handleMarkAsRead = async (id: string) => {
    markAsRead(id).catch(() => {})
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const handleMarkAllAsRead = async () => {
    if (!user) return
    markAllAsRead(user.id).catch(() => {})
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
          <p className="mt-1 text-muted-foreground">
            Stay updated with the latest alerts and updates. Alerts sync automatically.
            {unreadCount > 0 && (
              <span className="ml-2 inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                {unreadCount} unread
              </span>
            )}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
            Mark all as read
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-3">
        {notifications.map((n) => {
          const Icon = iconMap[n.type] || iconMap.default
          return (
            <Card
              key={n.id}
              className={`border border-border bg-card transition-colors ${!n.read ? "border-l-4 border-l-primary" : ""} cursor-pointer hover:bg-accent/30`}
              onClick={() => !n.read && handleMarkAsRead(n.id)}
            >
              <CardContent className="flex items-start gap-4 p-4">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${!n.read ? "bg-primary/10" : "bg-muted"}`}>
                  <Icon className={`h-4 w-4 ${!n.read ? "text-primary" : "text-muted-foreground"}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm font-medium ${!n.read ? "text-foreground" : "text-muted-foreground"}`}>
                      {n.title}
                    </p>
                    {!n.read && (
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary animate-pulse" />
                    )}
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">{n.message}</p>
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    {new Date(n.created_at).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </CardContent>
            </Card>
          )
        })}
        {loaded && notifications.length === 0 && (
          <div className="rounded-lg border border-border bg-card p-8 text-center">
            <Bell className="mx-auto h-8 w-8 text-muted-foreground" />
            <p className="mt-2 font-medium text-foreground">All caught up!</p>
            <p className="mt-1 text-sm text-muted-foreground">No notifications yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
