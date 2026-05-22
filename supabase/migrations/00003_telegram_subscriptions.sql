-- Add telegram_code to profiles for linking
ALTER TABLE profiles ADD COLUMN telegram_code TEXT;
ALTER TABLE profiles ADD COLUMN telegram_code_expires TIMESTAMPTZ;

-- Telegram bot subscriptions
CREATE TABLE telegram_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  chat_id BIGINT NOT NULL,
  username TEXT,
  notifications_enabled BOOLEAN DEFAULT true,
  value_bet_alerts BOOLEAN DEFAULT true,
  daily_summary BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

ALTER TABLE telegram_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own subscription"
  ON telegram_subscriptions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can upsert own subscription"
  ON telegram_subscriptions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own subscription"
  ON telegram_subscriptions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own subscription"
  ON telegram_subscriptions FOR DELETE
  USING (auth.uid() = user_id);

CREATE INDEX idx_telegram_subscriptions_user ON telegram_subscriptions(user_id);
