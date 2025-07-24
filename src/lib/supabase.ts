// Supabase client configuration
import { createClient } from '@supabase/supabase-js'

let supabase: any = null

// Initialize Supabase client if environment variables are available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Only initialize if we have valid environment variables
if (supabaseUrl && supabaseAnonKey && typeof supabaseUrl === 'string' && supabaseUrl.startsWith('https://')) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey)
    console.log('✅ Supabase connected successfully')
  } catch (error) {
    console.log('⚠️ Supabase connection failed, using fallback mode:', error)
    supabase = null
  }
} else {
  console.log('⚠️ Supabase not configured, using fallback mode')
  supabase = null
}

export { supabase }

export type Database = {
  public: {
    Tables: {
      user_subscriptions: {
        Row: {
          id: string
          email: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          subscription_status: 'active' | 'inactive' | 'canceled' | 'past_due'
          subscription_start: string | null
          subscription_end: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_status?: 'active' | 'inactive' | 'canceled' | 'past_due'
          subscription_start?: string | null
          subscription_end?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_status?: 'active' | 'inactive' | 'canceled' | 'past_due'
          subscription_start?: string | null
          subscription_end?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}