export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          email: string | null
          phone: string | null
          state: string | null
          category: string | null
          date_of_birth: string | null
          avatar_url: string | null
          email_notifications: boolean
          scholarship_alerts: boolean
          job_alerts: boolean
          scheme_alerts: boolean
          role: 'user' | 'admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          email?: string | null
          phone?: string | null
          state?: string | null
          category?: string | null
          date_of_birth?: string | null
          avatar_url?: string | null
          email_notifications?: boolean
          scholarship_alerts?: boolean
          job_alerts?: boolean
          scheme_alerts?: boolean
          role?: 'user' | 'admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          email?: string | null
          phone?: string | null
          state?: string | null
          category?: string | null
          date_of_birth?: string | null
          avatar_url?: string | null
          email_notifications?: boolean
          scholarship_alerts?: boolean
          job_alerts?: boolean
          scheme_alerts?: boolean
          role?: 'user' | 'admin'
          updated_at?: string
        }
      }
      rights: {
        Row: {
          id: string
          category: string
          title: string
          summary: string
          details: string
          created_at: string
        }
        Insert: {
          id?: string
          category: string
          title: string
          summary: string
          details: string
          created_at?: string
        }
        Update: {
          category?: string
          title?: string
          summary?: string
          details?: string
        }
      }
      schemes: {
        Row: {
          id: string
          name: string
          benefits: string
          eligibility: string
          category: string
          beneficiary: string
          state: string
          how_to_apply: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          benefits: string
          eligibility: string
          category: string
          beneficiary: string
          state: string
          how_to_apply: string
          created_at?: string
        }
        Update: {
          name?: string
          benefits?: string
          eligibility?: string
          category?: string
          beneficiary?: string
          state?: string
          how_to_apply?: string
        }
      }
      scholarships: {
        Row: {
          id: string
          title: string
          provider: string
          benefits: string
          eligibility: string
          category: string
          state: string
          deadline: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          provider: string
          benefits: string
          eligibility: string
          category: string
          state: string
          deadline: string
          created_at?: string
        }
        Update: {
          title?: string
          provider?: string
          benefits?: string
          eligibility?: string
          category?: string
          state?: string
          deadline?: string
        }
      }
      jobs: {
        Row: {
          id: string
          type: string
          title: string
          company: string
          location: string
          salary: string
          job_type: string
          source: string
          snippet: string
          created_at: string
        }
        Insert: {
          id?: string
          type: string
          title: string
          company: string
          location: string
          salary: string
          job_type: string
          source: string
          snippet: string
          created_at?: string
        }
        Update: {
          type?: string
          title?: string
          company?: string
          location?: string
          salary?: string
          job_type?: string
          source?: string
          snippet?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          type: string
          title: string
          message: string
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: string
          title: string
          message: string
          read?: boolean
          created_at?: string
        }
        Update: {
          type?: string
          title?: string
          message?: string
          read?: boolean
        }
      }
      saved_opportunities: {
        Row: {
          id: string
          user_id: string
          opportunity_type: string
          opportunity_id: string
          title: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          opportunity_type: string
          opportunity_id: string
          title: string
          created_at?: string
        }
        Update: {
          opportunity_type?: string
          opportunity_id?: string
          title?: string
        }
      }
      transparency_kpis: {
        Row: {
          id: string
          label: string
          value: string
          change: string
          icon_name: string
          sort_order: number
        }
        Insert: {
          id?: string
          label: string
          value: string
          change: string
          icon_name: string
          sort_order?: number
        }
        Update: {
          label?: string
          value?: string
          change?: string
          icon_name?: string
          sort_order?: number
        }
      }
      scheme_progress: {
        Row: {
          id: string
          scheme_name: string
          target: number
          achieved: number
        }
        Insert: {
          id?: string
          scheme_name: string
          target: number
          achieved: number
        }
        Update: {
          scheme_name?: string
          target?: number
          achieved?: number
        }
      }
      department_scores: {
        Row: {
          id: string
          department: string
          score: number
          trend: string
          budget_share: number
        }
        Insert: {
          id?: string
          department: string
          score: number
          trend: string
          budget_share: number
        }
        Update: {
          department?: string
          score?: number
          trend?: string
          budget_share?: number
        }
      }
    }
  }
}

// Convenience types
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Right = Database['public']['Tables']['rights']['Row']
export type Scheme = Database['public']['Tables']['schemes']['Row']
export type Scholarship = Database['public']['Tables']['scholarships']['Row']
export type Job = Database['public']['Tables']['jobs']['Row']
export type Notification = Database['public']['Tables']['notifications']['Row']
export type SavedOpportunity = Database['public']['Tables']['saved_opportunities']['Row']
export type TransparencyKPI = Database['public']['Tables']['transparency_kpis']['Row']
export type SchemeProgress = Database['public']['Tables']['scheme_progress']['Row']
export type DepartmentScore = Database['public']['Tables']['department_scores']['Row']
