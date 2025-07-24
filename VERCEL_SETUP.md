# Vercel Deployment Setup

## 🚀 Quick Vercel Deployment

Your Pro Physique Tracker is now ready for Vercel! Follow these steps:

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### 2. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import from GitHub: `Dropthere/pro-physique-tracker`
4. Framework: **Vite** (auto-detected)
5. Build Command: `npm run build`
6. Output Directory: `dist`

### 3. Environment Variables
Add these in Vercel dashboard under "Environment Variables":

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_rKiT5560jogVCwmskpiOqqiy00uguZsnai
VITE_STRIPE_BUY_BUTTON_ID=buy_btn_1RoCZvCwOAqA4iYJ50SrWs6S
```

### 4. Supabase Edge Functions
Your edge functions need to be deployed to Supabase:

```bash
# Install Supabase CLI
npm install -g supabase

# Login and link project
supabase login
supabase link --project-ref your-project-ref

# Deploy edge functions
supabase functions deploy check-subscription
supabase functions deploy stripe-webhook
```

### 5. Stripe Webhook Setup
1. Go to Stripe Dashboard → Webhooks
2. Add endpoint: `https://your-project.supabase.co/functions/v1/stripe-webhook`
3. Select events: `checkout.session.completed`, `customer.subscription.*`
4. Copy webhook secret to Supabase environment variables

## ✅ Your App Features
- Elite competitor comparison (60+ pros)
- AI body fat analysis
- Personalized training programs
- Custom nutrition planning
- Stripe subscription management
- Direct coach access

## 🔧 Troubleshooting

**Build Issues:**
- All TypeScript errors are now fixed
- Vite config optimized for production

**Stripe Issues:**
- Verify webhook endpoint is correct
- Check environment variables are set
- Ensure edge functions are deployed

**Database Issues:**
- Run Supabase migrations
- Check RLS policies are active
- Verify connection strings

Your app is production-ready! 🎉