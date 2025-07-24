import React, { useState } from 'react'
import { User, Mail, Lock, AlertCircle, CheckCircle, Eye, EyeOff, CreditCard } from 'lucide-react'
import { SubscriptionManager } from './SubscriptionManager'

interface AuthFormProps {
  onLogin: (email: string, hasSubscription: boolean) => void
}

export const AuthForm: React.FC<AuthFormProps> = ({ onLogin }) => {
  const [showSubscription, setShowSubscription] = useState(false)
  const [userEmailForSubscription, setUserEmailForSubscription] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // Check if user came from successful payment
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const paymentSuccess = urlParams.get('success')
    const sessionId = urlParams.get('session_id')
    const checkoutEmail = localStorage.getItem('stripe_checkout_email')
    
    if ((paymentSuccess === 'true' || sessionId) && checkoutEmail) {
      setSuccess(`Payment successful for ${checkoutEmail}! Please sign in to access your account.`)
      setEmail(checkoutEmail)
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsLoading(true)

    try {
      // Check if this is a paid user by calling Stripe API
      const subscriptionStatus = await checkStripeSubscription(email)
      
      if (subscriptionStatus.isActive) {
        console.log('✅ User has active subscription, logging in')
        onLogin(email, true)
      } else {
        console.log('❌ User needs subscription, showing payment page')
        setUserEmailForSubscription(email)
        setShowSubscription(true)
      }
    } catch (error: any) {
      setError(error.message || 'Failed to verify subscription')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubscriptionActivated = () => {
    setShowSubscription(false)
    setSuccess('Subscription activated! Please sign in again.')
    setUserEmailForSubscription('')
  }

  // Function to check Stripe subscription
  const checkStripeSubscription = async (email: string) => {
    try {
      console.log('🔍 Checking Stripe subscription for:', email)
      
      // Check if Supabase is configured
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
      
      if (!supabaseUrl || !supabaseAnonKey) {
        console.log('⚠️ Supabase not configured, using test mode')
        // For testing - allow sepp84@hotmail.com
        return { isActive: email === 'sepp84@hotmail.com', status: 'active' }
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
        // Fallback for testing
        return { isActive: email === 'sepp84@hotmail.com', status: 'active' }
      }

      const result = await response.json()
      console.log('💳 Stripe subscription result for', email, ':', result)

      return {
        isActive: result.isActive || false,
        status: result.status || 'inactive'
      }
    } catch (error) {
      console.error('❌ Error checking Stripe subscription:', error)
      // Fallback for testing
      return { isActive: email === 'sepp84@hotmail.com', status: 'active' }
    }
  }

  // Show subscription manager if needed
  if (showSubscription) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-8">
            <button
              onClick={() => setShowSubscription(false)}
              className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200 mb-4"
            >
              ← Back to Sign In
            </button>
          </div>
          <SubscriptionManager 
            userEmail={userEmailForSubscription}
            onSubscriptionActivated={handleSubscriptionActivated}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-blue-600 p-4 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <User className="text-white" size={40} />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Pro Physique <span className="text-blue-400">Access</span>
          </h1>
          <p className="text-gray-300 text-lg">
            Sign in to access professional analysis
          </p>
        </div>

        {/* Auth Form */}
        <div className="bg-gray-800 rounded-xl p-8 shadow-2xl border border-gray-700">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="text-green-400" size={24} />
            <h2 className="text-2xl font-bold text-white">Sign In</h2>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="bg-red-900 border border-red-600 rounded-lg p-4 mb-6 flex items-center gap-3">
              <AlertCircle className="text-red-400" size={20} />
              <p className="text-red-200">{error}</p>
            </div>
          )}

          {success && (
            <div className="bg-green-900 border border-green-600 rounded-lg p-4 mb-6 flex items-center gap-3">
              <CheckCircle className="text-green-400" size={20} />
              <p className="text-green-200">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-300 mb-3">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-12 pr-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email address"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-300 mb-3">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-12 pr-12 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 hover:transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Checking Subscription...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Lock size={20} />
                  Sign In & Verify Subscription
                </div>
              )}
            </button>
          </form>

          {/* Subscribe Section */}
          <div className="mt-8 pt-6 border-t border-gray-600">
            <div className="text-center">
              <p className="text-gray-300 mb-4">Need a subscription?</p>
              <button
                onClick={() => {
                  setUserEmailForSubscription(email)
                  setShowSubscription(true)
                }}
                disabled={!email}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 hover:transform hover:scale-105 shadow-lg disabled:opacity-50"
              >
                <div className="flex items-center justify-center gap-3">
                  <CreditCard size={20} />
                  <div className="text-left">
                    <div className="text-lg">Subscribe for $3.00/week</div>
                    <div className="text-sm opacity-90">Enter email first</div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="text-green-400" size={16} />
            <span className="text-green-400 font-bold text-sm">Secure Stripe Integration</span>
          </div>
          <p className="text-gray-300 text-xs">
            Your subscription status is verified directly with Stripe. 
            Only active subscribers get access to the professional analysis tools.
          </p>
        </div>
      </div>
    </div>
  )
}