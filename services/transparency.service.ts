import { createClient } from '@/lib/supabase/client'

export async function getKPIs() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('transparency_kpis')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) throw error
  return data ?? []
}

export async function getSchemeProgress() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('scheme_progress')
    .select('*')

  if (error) throw error
  return data ?? []
}

export async function getDepartmentScores() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('department_scores')
    .select('*')
    .order('score', { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function getBudgetDistribution() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('department_scores')
    .select('department, budget_share')
    .order('budget_share', { ascending: false })

  if (error) throw error
  return (data ?? []).map((d) => ({
    name: d.department,
    value: Number(d.budget_share),
  }))
}
