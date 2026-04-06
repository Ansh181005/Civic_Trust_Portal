import { createClient } from '@/lib/supabase/client'
import type { Profile } from '@/types/database'

export async function getProfile(userId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) throw error
  return data
}

export async function updateProfile(
  userId: string,
  updates: Partial<Pick<Profile, 'full_name' | 'email' | 'phone' | 'state' | 'category' | 'date_of_birth' | 'avatar_url' | 'email_notifications' | 'scholarship_alerts' | 'job_alerts' | 'scheme_alerts'>>
) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function uploadAvatar(userId: string, file: File) {
  const supabase = createClient()
  const fileExt = file.name.split('.').pop()
  const filePath = `${userId}/avatar.${fileExt}`

  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(filePath, file, { upsert: true })

  if (uploadError) throw uploadError

  const { data } = supabase.storage
    .from('avatars')
    .getPublicUrl(filePath)

  // Update profile with avatar URL
  await updateProfile(userId, { avatar_url: data.publicUrl })

  return data.publicUrl
}
