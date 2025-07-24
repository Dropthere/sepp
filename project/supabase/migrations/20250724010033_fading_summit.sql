/*
  # Create user subscriptions table

  1. New Tables
    - `user_subscriptions`
      - `id` (uuid, primary key)
      - `email` (text, unique, not null)
      - `stripe_customer_id` (text, nullable)
      - `stripe_subscription_id` (text, nullable)
      - `subscription_status` (enum: active, inactive, canceled, past_due)
      - `subscription_start` (timestamptz, nullable)
      - `subscription_end` (timestamptz, nullable)
      - `created_at` (timestamptz, default now)
      - `updated_at` (timestamptz, default now)

  2. Security
    - Enable RLS on `user_subscriptions` table
    - Add policy for users to read their own subscription data
    - Add policy for service role to manage all subscription data

  3. Indexes
    - Index on email for fast lookups
    - Index on stripe_customer_id for webhook processing
    - Index on subscription_status for filtering active users
*/

-- Create subscription status enum
CREATE TYPE subscription_status AS ENUM ('active', 'inactive', 'canceled', 'past_due');

-- Create user_subscriptions table
CREATE TABLE IF NOT EXISTS user_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  stripe_customer_id text,
  stripe_subscription_id text,
  subscription_status subscription_status DEFAULT 'inactive',
  subscription_start timestamptz,
  subscription_end timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;

-- Policy for users to read their own subscription data
CREATE POLICY "Users can read own subscription data"
  ON user_subscriptions
  FOR SELECT
  TO authenticated
  USING (email = auth.email());

-- Policy for service role to manage all subscription data (for webhooks)
CREATE POLICY "Service role can manage all subscriptions"
  ON user_subscriptions
  FOR ALL
  TO service_role
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_email ON user_subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_stripe_customer ON user_subscriptions(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_user_subscriptions_status ON user_subscriptions(subscription_status);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_user_subscriptions_updated_at
  BEFORE UPDATE ON user_subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();