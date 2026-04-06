import { createClient } from '@/lib/supabase/client'

export async function getNotifications(userId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function getUnreadCount(userId: string) {
  const supabase = createClient()
  const { count, error } = await supabase
    .from('notifications')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('read', false)

  if (error) return 0
  return count ?? 0
}

export async function markAsRead(notificationId: string) {
  const supabase = createClient()
  const { error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('id', notificationId)

  if (error) throw error
}

export async function markAllAsRead(userId: string) {
  const supabase = createClient()
  const { error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('user_id', userId)
    .eq('read', false)

  if (error) throw error
}

export function subscribeToNotifications(
  userId: string,
  callback: (payload: unknown) => void
) {
  const supabase = createClient()
  // Use a unique channel name per subscription to avoid
  // "cannot add postgres_changes callbacks ... after subscribe()" runtime errors.
  const channelName = `notifications:${userId}:${Date.now()}:${Math.random().toString(36).slice(2, 8)}`

  supabase
    .getChannels()
    .filter((channel) => channel.topic.startsWith(`realtime:notifications:${userId}`))
    .forEach((channel) => {
      void supabase.removeChannel(channel)
    })

  return supabase
    .channel(channelName)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`,
      },
      callback
    )
    .subscribe()
}
