import React, { useState } from 'react';
import { CreditCard, CheckCircle, AlertCircle, Crown, Shield, Star, ExternalLink } from 'lucide-react';

interface SubscriptionManagerProps {
  userEmail: string;
  onSubscriptionActivated: () => void;
}

export const SubscriptionManager: React.FC<SubscriptionManagerProps> = ({ 
  userEmail, 
  onSubscriptionActivated 
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Check if user just returned from payment
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentSuccess = urlParams.get('success');
    const sessionId = urlParams.get('session_id');
    
    if (paymentSuccess === 'true' || sessionId) {
      setSuccess('Payment completed! Activating your subscription...');
      localStorage.setItem('stripe_payment_completed', 'true');
      
      // Auto-activate after payment
      setTimeout(() => {
        onSubscriptionActivated();
      }, 2000);
      
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [onSubscriptionActivated]);

  const handleSubscribe = async () => {
    setIsProcessing(true);
    setError('');
    setSuccess('');

    try {
      // Mark payment as initiated
      localStorage.setItem('stripe_payment_initiated', 'true');
      localStorage.setItem('stripe_checkout_email', userEmail);
      
      // Use the working payment link directly
      window.open('https://buy.stripe.com/28E00i7kU9hCcrV3ZBeIw01', '_blank');
      
      setSuccess('Payment page opened! Complete your payment and return here to continue.');
      
    } catch (error: any) {
      setError(error.message || 'An unexpected error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaymentLink = () => {
    // Store email for webhook processing
    localStorage.setItem('stripe_checkout_email', userEmail);
    window.open('https://buy.stripe.com/28E00i7kU9hCcrV3ZBeIw01', '_blank');
    
    // Show instruction message
    setTimeout(() => {
      setSuccess('Payment page opened! Complete your payment and return here to continue.');
    }, 500);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <Crown className="text-white" size={40} />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">
          Unlock <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Pro Access</span>
        </h1>
        <p className="text-gray-300 text-xl">
          Get unlimited access to professional physique analysis and training programs
        </p>
      </div>

      {/* Subscription Card */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-700">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Star className="text-yellow-400" size={32} />
            <h2 className="text-3xl font-bold text-white">Pro Membership</h2>
          </div>
          <div className="text-6xl font-bold text-white mb-2">$3</div>
          <div className="text-gray-300 text-xl">per week</div>
          <div className="text-gray-400 text-sm">Billed weekly • Cancel anytime</div>
        </div>

        {/* Features */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-400 flex-shrink-0" size={24} />
            <span className="text-white text-lg">Compare with 60+ elite bodybuilders</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-400 flex-shrink-0" size={24} />
            <span className="text-white text-lg">AI body fat analysis from photos</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-400 flex-shrink-0" size={24} />
            <span className="text-white text-lg">Personalized training programs</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-400 flex-shrink-0" size={24} />
            <span className="text-white text-lg">Custom nutrition meal plans</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-400 flex-shrink-0" size={24} />
            <span className="text-white text-lg">Direct coach access & support</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-400 flex-shrink-0" size={24} />
            <span className="text-white text-lg">Progress tracking & analytics</span>
          </div>
        </div>

        {/* Error/Info Display */}
        {(error || success) && (
          <div className={`border rounded-lg p-4 mb-6 flex items-center gap-3 ${
            success || error.includes('Payment link opened') 
              ? 'bg-blue-900 border-blue-600' 
              : 'bg-red-900 border-red-600'
          }`}>
            {success || error.includes('Payment link opened') ? (
              <CheckCircle className="text-blue-400" size={20} />
            ) : (
              <AlertCircle className="text-red-400" size={20} />
            )}
            <p className={success || error.includes('Payment link opened') ? 'text-blue-200' : 'text-red-200'}>
              {success || error}
            </p>
          </div>
        )}

        {/* Payment Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleSubscribe}
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 hover:transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </div>
            ) : (
              <div className="flex items-center justify-center gap-3">
                <CreditCard size={24} />
                <div className="text-left">
                  <div className="text-xl">Subscribe - $3/week</div>
                  <div className="text-sm opacity-90">Opens Stripe payment page</div>
                </div>
              </div>
            )}
          </button>

          <div className="text-center">
            <div className="text-gray-400 text-sm mb-2">Or use direct payment link:</div>
            <button
              onClick={handlePaymentLink}
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200"
            >
              <ExternalLink size={16} />
              Open Stripe Payment Link
            </button>
          </div>

          {/* Buy Button Alternative */}
          <div className="mt-6 p-4 bg-gray-700 rounded-lg border border-gray-600">
            <h3 className="text-white font-bold mb-3">Alternative: Stripe Buy Button</h3>
            <p className="text-gray-300 text-sm mb-4">
              You can also embed this buy button on your website:
            </p>
            <div className="bg-gray-800 rounded p-3 text-xs text-gray-300 font-mono">
              Buy Button ID: buy_btn_1RoCZvCwOAqA4iYJ50SrWs6S
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 bg-gray-700 rounded-xl p-4 border border-gray-600">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="text-green-400" size={20} />
            <span className="text-green-400 font-bold">Secure Payment</span>
          </div>
          <p className="text-gray-300 text-sm">
            Payments processed securely by Stripe. Your card information is never stored on our servers.
            Cancel anytime from your Stripe customer portal.
          </p>
        </div>

        {/* Testing Notice */}
        <div className="mt-4 bg-blue-900 border border-blue-600 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="text-blue-400" size={20} />
            <span className="text-blue-400 font-bold">Stripe Integration</span>
          </div>
          <p className="text-blue-200 text-sm">
            Your subscription status is verified directly with Stripe. 
            Active subscriptions are automatically detected when you sign in.
          </p>
        </div>
      </div>
    </div>
  );
};