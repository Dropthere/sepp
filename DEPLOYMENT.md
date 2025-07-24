# Deployment Guide

## 🚀 Vercel Deployment (Recommended)

### Step 1: Prepare Repository
1. Push your code to GitHub: `https://github.com/Dropthere/pro-physique-tracker`
2. Ensure all environment variables are in `.env.example`

### Step 2: Vercel Setup
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import from GitHub: `Dropthere/pro-physique-tracker`
4. Framework: **Vite** (auto-detected)
5. Build Command: `npm run build`
6. Output Directory: `dist`

### Step 3: Environment Variables
Add these in Vercel dashboard under "Environment Variables":

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_key
VITE_STRIPE_BUY_BUTTON_ID=buy_btn_your_button_id
```

### Step 4: Deploy
- Click "Deploy"
- Vercel builds and deploys automatically
- Your app will be live at `https://your-app.vercel.app`

## 📱 Mobile App Options

### Option 1: PWA (Progressive Web App)
**Easiest path to mobile app experience**

Add to your project:
```bash
npm install @vite-pwa/vite-plugin
```

Benefits:
- ✅ Installable from browser
- ✅ Works offline
- ✅ Push notifications
- ✅ Native app feel
- ❌ Not in app stores

### Option 2: Capacitor (Native App Stores)
**Best for app store deployment**

Setup:
```bash
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android @capacitor/ios
npx cap init
npx cap add android
npx cap add ios
```

Benefits:
- ✅ Real native apps
- ✅ App store distribution
- ✅ All device features
- ✅ Keep existing code
- ⚠️ Requires Xcode/Android Studio

### Option 3: React Native
**Full native rewrite**

Benefits:
- ✅ Best performance
- ✅ Full native features
- ✅ App store ready
- ❌ Requires code conversion

## 🔧 Supabase Edge Functions

Deploy your edge functions:

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Deploy functions
supabase functions deploy check-subscription
supabase functions deploy stripe-webhook
```

## 🎯 Recommended Deployment Flow

1. **Phase 1**: Deploy to Vercel (5 minutes)
2. **Phase 2**: Add PWA features (1 day)
3. **Phase 3**: Capacitor for app stores (1 week)

This gives you:
- Immediate web deployment
- Mobile-friendly experience
- Path to native apps later

## 🔐 Security Checklist

- [ ] Environment variables set in Vercel
- [ ] Stripe webhook endpoint configured
- [ ] Supabase RLS policies active
- [ ] CORS headers configured
- [ ] No sensitive data in repository

## 📊 Performance Optimization

For production deployment:
- Images optimized and served from CDN
- Code splitting implemented
- Bundle size optimized
- Caching strategies in place

## 🆘 Troubleshooting

**Build Fails:**
- Check environment variables are set
- Verify all dependencies in package.json
- Check TypeScript errors

**Stripe Not Working:**
- Verify webhook endpoint in Stripe dashboard
- Check edge function deployment
- Confirm environment variables

**Database Issues:**
- Run migrations in Supabase
- Check RLS policies
- Verify connection strings