-- Chess Bets Academy - Betting History
-- Run this in your Supabase SQL Editor after 00001_initial.sql

CREATE TABLE betting_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  event_name TEXT NOT NULL,
  market TEXT NOT NULL DEFAULT '1X2',
  selection TEXT NOT NULL,
  odds DECIMAL NOT NULL,
  stake DECIMAL NOT NULL,
  result TEXT CHECK (result IN ('win', 'loss', 'pending')) DEFAULT 'pending',
  profit DECIMAL NOT NULL DEFAULT 0,
  sport TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE betting_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own bets"
  ON betting_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own bets"
  ON betting_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bets"
  ON betting_history FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own bets"
  ON betting_history FOR DELETE
  USING (auth.uid() = user_id);

-- Index for faster queries
CREATE INDEX idx_betting_history_user_id ON betting_history(user_id);
CREATE INDEX idx_betting_history_created_at ON betting_history(created_at DESC);
