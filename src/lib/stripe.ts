// Stripe client configuration
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with your actual publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_live_rKiT5560jogVCwmskpiOqqiy00uguZsnai');

export { stripePromise };

// Stripe configuration
export const STRIPE_CONFIG = {
  // Your actual buy button ID for $3/week subscription
  BUY_BUTTON_ID: 'buy_btn_1RoCZvCwOAqA4iYJ50SrWs6S',
  PUBLISHABLE_KEY: 'pk_live_rKiT5560jogVCwmskpiOqqiy00uguZsnai',
  
  // Your existing payment link as fallback
  PAYMENT_LINK: 'https://buy.stripe.com/28E00i7kU9hCcrV3ZBeIw01',
  
  // Success/cancel URLs
  SUCCESS_URL: `${window.location.origin}?success=true&session_id={CHECKOUT_SESSION_ID}`,
  CANCEL_URL: `${window.location.origin}?canceled=true`
};

// Use Stripe Buy Button for checkout
export async function redirectToCheckout(email: string): Promise<{ success: boolean; error?: string; fallback?: boolean }> {
  try {
    // Mark payment as initiated
    localStorage.setItem('stripe_payment_initiated', 'true');
    localStorage.setItem('stripe_checkout_email', email);

    // Use the payment link directly since buy button requires embedding
    window.open(STRIPE_CONFIG.PAYMENT_LINK, '_blank');

    return { success: true, fallback: true };
  } catch (error: any) {
    console.error('Stripe redirect error:', error);
    return { success: false, error: error.message };
  }
}

// Check if user came from successful payment
export function checkPaymentSuccess(): { success: boolean; sessionId?: string | null } {
  const urlParams = new URLSearchParams(window.location.search);
  const success = urlParams.get('success');
  const sessionId = urlParams.get('session_id');
  
  if (success === 'true' || sessionId) {
    // Clean up URL
    window.history.replaceState({}, document.title, window.location.pathname);
    return { success: true, sessionId };
  }
  
  // Check if payment was initiated recently
  const paymentInitiated = localStorage.getItem('stripe_payment_initiated');
  if (paymentInitiated === 'true') {
    localStorage.removeItem('stripe_payment_initiated');
    return { success: true };
  }
  
  return { success: false };
}