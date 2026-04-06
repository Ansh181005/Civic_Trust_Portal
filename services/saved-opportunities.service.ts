import { createClient } from '@/lib/supabase/client'

export async function getSavedOpportunities(userId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('saved_opportunities')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function saveOpportunity(
  userId: string,
  opportunityType: string,
  opportunityId: string,
  title: string
) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('saved_opportunities')
    .insert({
      user_id: userId,
      opportunity_type: opportunityType,
      opportunity_id: opportunityId,
      title,
    })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function removeSavedOpportunity(id: string) {
  const supabase = createClient()
  const { error } = await supabase
    .from('saved_opportunities')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export async function isOpportunitySaved(
  userId: string,
  opportunityType: string,
  opportunityId: string
) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('saved_opportunities')
    .select('id')
    .eq('user_id', userId)
    .eq('opportunity_type', opportunityType)
    .eq('opportunity_id', opportunityId)
    .maybeSingle()

  if (error) throw error
  return data !== null
}
