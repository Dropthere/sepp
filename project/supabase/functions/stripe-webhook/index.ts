import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, stripe-signature',
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

    // Get Stripe signature for webhook verification
    const signature = req.headers.get('stripe-signature')
    if (!signature) {
      return new Response('No signature provided', { 
        status: 400, 
        headers: corsHeaders 
      })
    }

    // Get the raw body for signature verification
    const body = await req.text()
    
    // Verify webhook signature (optional but recommended)
    const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')
    if (webhookSecret && webhookSecret.startsWith('whsec_')) {
      // Verify the webhook signature for security
      const crypto = await import('node:crypto');
      const expectedSignature = crypto
        .createHmac('sha256', webhookSecret)
        .update(body, 'utf8')
        .digest('hex');
      
      const actualSignature = signature.split('=')[1];
      if (expectedSignature !== actualSignature) {
        console.error('Invalid webhook signature');
        return new Response('Invalid signature', { 
          status: 400, 
          headers: corsHeaders 
        });
      }
    }

    // Initialize Supabase client with service role key
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Parse the Stripe event
    let event
    try {
      event = JSON.parse(body)
    } catch (err) {
      return new Response('Invalid JSON', { 
        status: 400, 
        headers: corsHeaders 
      })
    }

    console.log('Received Stripe event:', event.type)

    // Handle different Stripe events
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(supabase, event.data.object)
        break
      
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(supabase, event.data.object)
        break
      
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(supabase, event.data.object)
        break
      
      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(supabase, event.data.object)
        break
      
      case 'invoice.payment_failed':
        await handlePaymentFailed(supabase, event.data.object)
        break
      
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return new Response('Webhook processed successfully', {
      status: 200,
      headers: corsHeaders
    })

  } catch (error) {
    console.error('Webhook error:', error)
    return new Response('Webhook processing failed', {
      status: 500,
      headers: corsHeaders
    })
  }
})

async function handleCheckoutCompleted(supabase: any, session: any) {
  const customerEmail = session.customer_details?.email || session.metadata?.user_email
  const customerId = session.customer
  const subscriptionId = session.subscription

  if (!customerEmail) {
    console.error('No customer email in checkout session')
    return
  }

  console.log('Processing checkout completion for:', customerEmail)

  // Create or update user subscription record
  const { error } = await supabase
    .from('user_subscriptions')
    .upsert({
      email: customerEmail,
      stripe_customer_id: customerId,
      stripe_subscription_id: subscriptionId,
      subscription_status: 'active',
      subscription_start: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'email'
    })

  if (error) {
    console.error('Error updating subscription:', error)
  } else {
    console.log('Subscription activated for:', customerEmail)
  }
}

async function handleSubscriptionUpdated(supabase: any, subscription: any) {
  const customerId = subscription.customer
  
  // Get customer email from Stripe customer ID
  const { data: existingUser } = await supabase
    .from('user_subscriptions')
    .select('email')
    .eq('stripe_customer_id', customerId)
    .single()

  if (!existingUser) {
    console.error('No user found for customer ID:', customerId)
    return
  }

  const status = subscription.status === 'active' ? 'active' : 
                subscription.status === 'canceled' ? 'canceled' :
                subscription.status === 'past_due' ? 'past_due' : 'inactive'

  const { error } = await supabase
    .from('user_subscriptions')
    .update({
      stripe_subscription_id: subscription.id,
      subscription_status: status,
      subscription_start: new Date(subscription.current_period_start * 1000).toISOString(),
      subscription_end: new Date(subscription.current_period_end * 1000).toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq('stripe_customer_id', customerId)

  if (error) {
    console.error('Error updating subscription:', error)
  } else {
    console.log('Subscription updated for customer:', customerId, 'Status:', status)
  }
}

async function handleSubscriptionDeleted(supabase: any, subscription: any) {
  const customerId = subscription.customer

  const { error } = await supabase
    .from('user_subscriptions')
    .update({
      subscription_status: 'canceled',
      subscription_end: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq('stripe_customer_id', customerId)

  if (error) {
    console.error('Error canceling subscription:', error)
  } else {
    console.log('Subscription canceled for customer:', customerId)
  }
}

async function handlePaymentSucceeded(supabase: any, invoice: any) {
  const customerId = invoice.customer

  const { error } = await supabase
    .from('user_subscriptions')
    .update({
      subscription_status: 'active',
      updated_at: new Date().toISOString()
    })
    .eq('stripe_customer_id', customerId)

  if (error) {
    console.error('Error updating payment success:', error)
  } else {
    console.log('Payment succeeded for customer:', customerId)
  }
}

async function handlePaymentFailed(supabase: any, invoice: any) {
  const customerId = invoice.customer

  const { error } = await supabase
    .from('user_subscriptions')
    .update({
      subscription_status: 'past_due',
      updated_at: new Date().toISOString()
    })
    .eq('stripe_customer_id', customerId)

  if (error) {
    console.error('Error updating payment failure:', error)
  } else {
    console.log('Payment failed for customer:', customerId)
  }
}