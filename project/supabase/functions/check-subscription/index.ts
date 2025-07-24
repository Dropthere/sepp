import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req) => {
  try {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
      return new Response('ok', { headers: corsHeaders })
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
      return new Response('Method not allowed', { 
        status: 405, 
        headers: corsHeaders 
      })
    }

    const { email } = await req.json()

    if (!email) {
      return new Response('Email is required', { 
        status: 400, 
        headers: corsHeaders 
      })
    }

    // Get Stripe secret key
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY')
    if (!stripeSecretKey) {
      return new Response('Stripe not configured', { 
        status: 500, 
        headers: corsHeaders 
      })
    }

    console.log('Checking Stripe subscription for:', email)

    // Search for customer by email
    const customersResponse = await fetch(`https://api.stripe.com/v1/customers?email=${encodeURIComponent(email)}&limit=10`, {
      headers: {
        'Authorization': `Bearer ${stripeSecretKey}`,
      }
    })

    if (!customersResponse.ok) {
      const errorText = await customersResponse.text()
      console.error('Failed to fetch customers from Stripe:', errorText)
      return new Response(JSON.stringify({ isActive: false, status: 'inactive' }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      })
    }

    const customersData = await customersResponse.json()
    
    if (customersData.data.length === 0) {
      console.log('No customer found for email:', email)
      return new Response(JSON.stringify({ isActive: false, status: 'inactive' }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      })
    }

    const customer = customersData.data[0]
    console.log('Found customer:', customer.id)

    // Get customer's subscriptions
    const subscriptionsResponse = await fetch(`https://api.stripe.com/v1/subscriptions?customer=${customer.id}&limit=10`, {
      headers: {
        'Authorization': `Bearer ${stripeSecretKey}`,
      }
    })

    if (!subscriptionsResponse.ok) {
      const errorText = await subscriptionsResponse.text()
      console.error('Failed to fetch subscriptions from Stripe:', errorText)
      return new Response(JSON.stringify({ isActive: false, status: 'inactive' }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      })
    }

    const subscriptionsData = await subscriptionsResponse.json()
    console.log('Found subscriptions:', subscriptionsData.data.length, 'for customer:', customer.id)
    
    // Log subscription details for debugging
    subscriptionsData.data.forEach((sub: any, index: number) => {
      console.log(`Subscription ${index + 1}:`, {
        id: sub.id,
        status: sub.status,
        current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
        is_future: sub.current_period_end * 1000 > Date.now()
      })
    })

    // Check if user has any active subscriptions
    const hasActiveSubscription = subscriptionsData.data.some((sub: any) => 
      (sub.status === 'active' || sub.status === 'trialing') && 
      sub.current_period_end * 1000 > Date.now()
    )

    const result = {
      isActive: hasActiveSubscription,
      status: hasActiveSubscription ? 'active' : 'inactive',
      subscriptionStart: hasActiveSubscription ? new Date(subscriptionsData.data[0].current_period_start * 1000).toISOString() : undefined,
      subscriptionEnd: hasActiveSubscription ? new Date(subscriptionsData.data[0].current_period_end * 1000).toISOString() : undefined
    }

    console.log('Final subscription result:', result)

    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    })

  } catch (error) {
    console.error('Subscription check error:', error)
    return new Response(JSON.stringify({ isActive: false, status: 'inactive' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    })
  }
})