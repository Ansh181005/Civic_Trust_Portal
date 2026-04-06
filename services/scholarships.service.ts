import { createClient } from '@/lib/supabase/client'

export async function getScholarships(search?: string, category?: string) {
  const supabase = createClient()
  let query = supabase
    .from('scholarships')
    .select('*')
    .order('created_at', { ascending: true })

  if (category && category !== 'All') {
    query = query.eq('category', category)
  }

  if (search) {
    query = query.or(`title.ilike.%${search}%,provider.ilike.%${search}%`)
  }

  const { data, error } = await query

  if (error) throw error
  return data ?? []
}

export async function getScholarshipById(id: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('scholarships')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}
