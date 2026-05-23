-- Add type column to betting_history (demo vs real)
ALTER TABLE betting_history ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'real' CHECK (type IN ('demo', 'real'));

-- Add membership plan to profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS membership_plan TEXT DEFAULT 'free' CHECK (membership_plan IN ('free', 'pro', 'elite'));
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS max_bankroll REAL DEFAULT 1000;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS total_deposits REAL DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS total_withdrawals REAL DEFAULT 0;
