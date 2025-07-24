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

    const { email, priceId, successUrl, cancelUrl } = await req.json()

    if (!email || !priceId) {
      return new Response('Missing required fields', { 
        status: 400, 
        headers: corsHeaders 
      })
    }

    // Create Stripe checkout session
    const stripeSecretKey = Deno.env.get('STRIPE_SECRET_KEY')
    if (!stripeSecretKey) {
      return new Response('Stripe not configured', { 
        status: 500, 
        headers: corsHeaders 
      })
    }

    const checkoutSession = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeSecretKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'payment_method_types[0]': 'card',
        'line_items[0][price]': priceId,
        'line_items[0][quantity]': '1',
        'mode': 'subscription',
        'customer_email': email,
        'success_url': successUrl,
        'cancel_url': cancelUrl,
        'metadata[user_email]': email,
        'subscription_data[metadata][user_email]': email
      })
    })

    if (!checkoutSession.ok) {
      const error = await checkoutSession.text()
      console.error('Stripe API error:', error)
      return new Response('Failed to create checkout session', { 
        status: 500, 
        headers: corsHeaders 
      })
    }

    const session = await checkoutSession.json()

    return new Response(
      JSON.stringify({ sessionId: session.id }),
      {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    )

  } catch (error) {
    console.error('Checkout session error:', error)
    return new Response('Internal server error', {
      status: 500,
      headers: corsHeaders
    })
  }
})