import { supabase } from '../lib/supabase'

export interface AuthStatus {
  isLoggedIn: boolean
  email?: string
  hasActiveSubscription?: boolean
  subscriptionStatus?: string
  user?: any
}

export interface SubscriptionStatus {
  isActive: boolean
  status: string
  subscriptionStart?: string
  subscriptionEnd?: string
}

// Fallback authentication using localStorage when Supabase is not available
const FALLBACK_USERS_KEY = 'bodybuilding_app_users'
const FALLBACK_SESSION_KEY = 'bodybuilding_app_session'

function getFallbackUsers(): { [email: string]: { password: string } } {
  const users = localStorage.getItem(FALLBACK_USERS_KEY)
  return users ? JSON.parse(users) : {}
}

function saveFallbackUsers(users: { [email: string]: { password: string } }) {
  localStorage.setItem(FALLBACK_USERS_KEY, JSON.stringify(users))
}

function getFallbackSession(): { email: string } | null {
  const session = localStorage.getItem(FALLBACK_SESSION_KEY)
  return session ? JSON.parse(session) : null
}

function saveFallbackSession(email: string) {
  localStorage.setItem(FALLBACK_SESSION_KEY, JSON.stringify({ email }))
}

function clearFallbackSession() {
  localStorage.removeItem(FALLBACK_SESSION_KEY)
}

export async function signUp(email: string, password: string) {
  try {
    console.log('🔐 Attempting sign up for:', email)
    
    if (supabase) {
      // Use Supabase authentication
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin
        }
      })

      if (error) throw error

      console.log('✅ Supabase sign up successful for:', email)
      return { success: true, data }
    } else {
      // Fallback authentication
      console.log('🔄 Using fallback sign up for:', email)
      const users = getFallbackUsers()
      
      if (users[email]) {
        throw new Error('User already exists')
      }

      users[email] = { password }
      saveFallbackUsers(users)

      return { 
        success: true, 
        data: { user: { email } },
        message: 'Account created! You can now sign in.' 
      }
    }
  } catch (error: any) {
    console.error('❌ Sign up error:', error)
    return { success: false, error: error.message }
  }
}

export async function signIn(email: string, password: string) {
  try {
    console.log('🔐 Attempting sign in for:', email)
    
    if (supabase) {
      // Use Supabase authentication
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error

      console.log('✅ Supabase sign in successful for:', email)
      
      // Check subscription status
      const subscriptionStatus = await checkStripeSubscriptionStatus(email)
      console.log('📊 Subscription status for', email, ':', subscriptionStatus)
      
      return { 
        success: true, 
        data,
        subscriptionStatus 
      }
    } else {
      // Fallback authentication
      console.log('🔄 Using fallback authentication for:', email)
      const users = getFallbackUsers()
      const user = users[email]

      if (!user || user.password !== password) {
        throw new Error('Invalid email or password')
      }

      console.log('✅ Fallback sign in successful for:', email)
      
      // Check subscription status via Stripe
      const subscriptionStatus = await checkStripeSubscriptionStatus(email)
      console.log('📊 Subscription status for', email, ':', subscriptionStatus)
      
      saveFallbackSession(email)

      return {
        success: true,
        data: { user: { email } },
        subscriptionStatus
      }
    }
  } catch (error: any) {
    console.error('❌ Sign in error:', error)
    return { success: false, error: error.message }
  }
}

export async function signOut() {
  try {
    if (supabase) {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } else {
      clearFallbackSession()
    }

    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function getCurrentUser() {
  try {
    if (supabase) {
      const { data: { user } } = await supabase.auth.getUser()
      return user
    } else {
      const session = getFallbackSession()
      return session ? { email: session.email } : null
    }
  } catch (error) {
    return null
  }
}

// Check subscription status directly from Stripe API via edge function
export async function checkStripeSubscriptionStatus(email: string): Promise<SubscriptionStatus> {
  try {
    console.log('🔍 Checking Stripe subscription for:', email)
    
    // Check if Supabase is configured
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
    
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('❌ Supabase environment variables missing!')
      return { isActive: false, status: 'inactive' }
    }
    
    const edgeFunctionUrl = `${supabaseUrl}/functions/v1/check-subscription`
    console.log('🔗 Calling edge function:', edgeFunctionUrl)
    
    const response = await fetch(edgeFunctionUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email })
    })

    console.log('📡 Edge function response status:', response.status)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Edge function failed:', errorText)
      return { isActive: false, status: 'inactive' }
    }

    const result = await response.json()
    console.log('💳 Stripe subscription result for', email, ':', result)

    return {
      isActive: result.isActive || false,
      status: result.status || 'inactive',
      subscriptionStart: result.subscriptionStart,
      subscriptionEnd: result.subscriptionEnd
    }
  } catch (error) {
    console.error('❌ Error checking Stripe subscription:', error)
    return { isActive: false, status: 'inactive' }
  }
}

export async function getAuthStatus(): Promise<AuthStatus> {
  try {
    console.log('🔍 Getting auth status...')
    
    const user = await getCurrentUser()
    
    if (!user || !user.email) {
      console.log('❌ No user found')
      return { isLoggedIn: false }
    }

    console.log('👤 User found:', user.email)
    
    // Always check Stripe for subscription status
    const subscriptionStatus = await checkStripeSubscriptionStatus(user.email)
    
    console.log('📊 Final auth status:', {
      isLoggedIn: true,
      email: user.email,
      hasActiveSubscription: subscriptionStatus.isActive,
      subscriptionStatus: subscriptionStatus.status
    })
    
    return {
      isLoggedIn: true,
      email: user.email,
      hasActiveSubscription: subscriptionStatus.isActive,
      subscriptionStatus: subscriptionStatus.status,
      user
    }
  } catch (error) {
    console.error('❌ Error getting auth status:', error)
    return { isLoggedIn: false }
  }
}

// Function to check if user just returned from payment
export function checkForRecentPayment(): { hasPaid: boolean; email?: string } {
  const urlParams = new URLSearchParams(window.location.search)
  const success = urlParams.get('success')
  const sessionId = urlParams.get('session_id')
  const checkoutEmail = localStorage.getItem('stripe_checkout_email')
  
  if ((success === 'true' || sessionId) && checkoutEmail) {
    console.log('💳 Recent payment detected for:', checkoutEmail)
    
    // Clean up URL parameters
    window.history.replaceState({}, document.title, window.location.pathname)
    
    return {
      hasPaid: true,
      email: checkoutEmail
    }
  }
  
  return { hasPaid: false }
}

// Mark user as having completed payment (for immediate access)
export function markUserAsPaid(email: string) {
  console.log('💳 Marking user as paid:', email)
  localStorage.setItem('stripe_payment_completed', 'true')
  localStorage.setItem('stripe_checkout_email', email)
}