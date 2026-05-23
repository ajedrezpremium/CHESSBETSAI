CREATE TABLE IF NOT EXISTS push_subscriptions (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE PRIMARY KEY,
  subscription JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
