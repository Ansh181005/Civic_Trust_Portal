import { createClient } from '@/lib/supabase/client'

export async function getRights(category?: string) {
  const supabase = createClient()
  let query = supabase
    .from('rights')
    .select('*')
    .order('created_at', { ascending: true })

  if (category && category !== 'all') {
    query = query.eq('category', category)
  }

  const { data, error } = await query

  if (error) throw error
  return data ?? []
}

export async function getRightById(id: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('rights')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}
