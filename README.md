# Pro Physique Tracker

A professional bodybuilding physique comparison tool that allows users to compare their measurements with elite competitors across all divisions. Features AI body fat analysis, personalized training programs, nutrition planning, and direct coach access.

## 🏆 Features

- **Elite Competitor Database**: Compare with 60+ professional bodybuilders across all divisions
- **AI Body Fat Analysis**: Upload photos for automated body fat percentage estimation
- **Personalized Training Programs**: Get customized workout plans based on your weak points
- **Nutrition Planning**: Generate meal plans tailored to your goals and preferences
- **Direct Coach Access**: Real coach feedback and community support
- **Progress Tracking**: Visual charts and analytics for your physique development
- **Stripe Integration**: Secure subscription management
- **Responsive Design**: Works perfectly on desktop and mobile

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- Supabase account
- Stripe account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Dropthere/pro-physique-tracker.git
   cd pro-physique-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your environment variables:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_key
   VITE_STRIPE_BUY_BUTTON_ID=buy_btn_your_button_id
   ```

4. **Database Setup**
   - Run the Supabase migrations in `/supabase/migrations/`
   - Set up your Stripe webhook endpoint
   - Add `STRIPE_SECRET_KEY` to Supabase environment variables

5. **Start Development Server**
   ```bash
   npm run dev
   ```

## 🔧 Deployment

### Vercel Deployment

1. **Connect to GitHub**
   - Import your repository in Vercel dashboard
   - Connect to `https://github.com/Dropthere/pro-physique-tracker`

2. **Environment Variables**
   Add these in Vercel dashboard:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   VITE_STRIPE_BUY_BUTTON_ID=your_buy_button_id
   ```

3. **Deploy**
   - Vercel will automatically build and deploy
   - Your app will be live at `your-app.vercel.app`

### Supabase Edge Functions

Deploy edge functions to Supabase:
```bash
# Deploy subscription checker
supabase functions deploy check-subscription

# Deploy webhook handler  
supabase functions deploy stripe-webhook
```

## 🏗️ Architecture

### Frontend (React + TypeScript)
- **Components**: Modular React components for each feature
- **State Management**: React hooks for local state
- **Styling**: Tailwind CSS with custom design system
- **Charts**: Chart.js for progress visualization

### Backend (Supabase)
- **Database**: PostgreSQL with Row Level Security
- **Authentication**: Supabase Auth (email/password)
- **Edge Functions**: Serverless functions for Stripe integration
- **Storage**: File uploads for user photos

### Payment Processing (Stripe)
- **Subscriptions**: Weekly recurring payments ($3/week)
- **Webhooks**: Real-time subscription status updates
- **Security**: Server-side verification of payment status

## 📊 Database Schema

### user_subscriptions
- `id` (uuid, primary key)
- `email` (text, unique)
- `stripe_customer_id` (text)
- `stripe_subscription_id` (text)
- `subscription_status` (enum: active, inactive, canceled, past_due)
- `subscription_start` (timestamptz)
- `subscription_end` (timestamptz)
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

## 🔐 Security

- **Row Level Security**: Database access controlled by user authentication
- **Environment Variables**: Sensitive keys stored securely
- **Stripe Webhooks**: Verified signatures for payment events
- **CORS Configuration**: Proper cross-origin request handling

## 🛠️ Development

### Project Structure
```
src/
├── components/          # React components
├── data/               # Static data (competitors, food library)
├── lib/                # Third-party integrations (Stripe, Supabase)
├── types/              # TypeScript type definitions
├── utils/              # Helper functions and calculations
└── main.tsx           # Application entry point

supabase/
├── functions/          # Edge functions
└── migrations/         # Database schema changes
```

### Key Components
- `AuthForm`: User authentication and subscription management
- `UserForm`: Measurement input with AI body fat analysis
- `ComparisonResults`: Elite competitor matching and analysis
- `TrainingPrograms`: Personalized workout recommendations
- `NutritionPlanner`: Custom meal plan generation
- `CoachAccess`: Direct coach communication

## 📱 Mobile Compatibility

The app is fully responsive and works great on mobile devices. For native app deployment:

1. **PWA**: Add service worker for installable web app
2. **React Native**: Port to native mobile app
3. **Capacitor**: Wrap in native container for app stores

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For technical support or questions about the physique analysis tools, use the coach access feature within the app for direct assistance.

---

**Built with React, TypeScript, Supabase, and Stripe**