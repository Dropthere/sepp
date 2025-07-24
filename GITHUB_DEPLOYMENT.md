# GitHub Deployment Instructions

## 🚀 Deploy to GitHub Repository

Your Pro Physique Tracker is now ready! Follow these exact steps:

### Step 1: Initialize Git (if not already done)
```bash
git init
git remote add origin https://github.com/Dropthere/pro-physique-tracker.git
```

### Step 2: Add All Files
```bash
git add .
git commit -m "Initial commit - Pro Physique Tracker ready for Vercel"
```

### Step 3: Push to GitHub
```bash
git push -u origin main
```

### Step 4: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import from GitHub: `Dropthere/pro-physique-tracker`
4. Framework: **Vite** (auto-detected)
5. Build Command: `npm run build`
6. Output Directory: `dist`

### Step 5: Add Environment Variables in Vercel
```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_rKiT5560jogVCwmskpiOqqiy00uguZsnai
VITE_STRIPE_BUY_BUTTON_ID=buy_btn_1RoCZvCwOAqA4iYJ50SrWs6S
```

### Step 6: Deploy Supabase Edge Functions
```bash
supabase functions deploy check-subscription
supabase functions deploy stripe-webhook
```

## ✅ Your App Features
- Elite competitor comparison (60+ professionals)
- AI body fat analysis from photos
- Personalized training programs
- Custom nutrition meal planning
- Stripe subscription management ($3/week)
- Direct coach access via Discord

## 🔧 Post-Deployment Setup
1. Update Stripe webhook URL to point to your Supabase edge function
2. Test subscription flow end-to-end
3. Verify all environment variables are working

Your app is production-ready! 🎉