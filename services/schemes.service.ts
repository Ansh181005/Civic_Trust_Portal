import { createClient } from '@/lib/supabase/client'

export async function getSchemes(search?: string, category?: string) {
  const supabase = createClient()
  let query = supabase
    .from('schemes')
    .select('*')
    .order('created_at', { ascending: true })

  if (category && category !== 'All') {
    query = query.eq('category', category)
  }

  if (search) {
    query = query.ilike('name', `%${search}%`)
  }

  const { data, error } = await query

  if (error) throw error
  return data ?? []
}

export async function getSchemeById(id: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('schemes')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}
