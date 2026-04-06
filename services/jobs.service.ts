import { createClient } from '@/lib/supabase/client'

export async function getJobs(search?: string, type?: string) {
  const supabase = createClient()
  let query = supabase
    .from('jobs')
    .select('*')
    .order('created_at', { ascending: false })

  if (type && type !== 'all') {
    query = query.eq('type', type)
  }

  if (search) {
    query = query.or(`title.ilike.%${search}%,company.ilike.%${search}%`)
  }

  const { data, error } = await query

  if (error) throw error
  return data ?? []
}

export async function getJobById(id: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export async function getRecentOpportunities(limit: number = 4) {
  const supabase = createClient()
  const [jobsRes, scholRes, schemesRes] = await Promise.all([
    supabase.from('jobs').select('id, title, company, created_at, type, job_type').order('created_at', { ascending: false }).limit(2),
    supabase.from('scholarships').select('id, title, provider, deadline, created_at').order('created_at', { ascending: false }).limit(1),
    supabase.from('schemes').select('id, name, category, created_at').order('created_at', { ascending: false }).limit(1),
  ])

  const opportunities = [
    ...(scholRes.data || []).map((s) => ({
      type: 'Scholarship' as const,
      title: s.title,
      provider: s.provider,
      deadline: s.deadline,
    })),
    ...(jobsRes.data || []).map((j) => ({
      type: (j.type === 'internship' ? 'Internship' : 'Job') as string,
      title: j.title,
      provider: j.company,
      deadline: j.job_type,
    })),
    ...(schemesRes.data || []).map((s) => ({
      type: 'Scheme' as const,
      title: s.name,
      provider: s.category,
      deadline: 'Open',
    })),
  ]

  return opportunities.slice(0, limit)
}
