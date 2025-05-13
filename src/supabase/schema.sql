-- Setup for Tasklio Supabase Schema

-- Create users table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    first_name TEXT,
    last_name TEXT,
    full_name TEXT,
    username TEXT UNIQUE,
    bio TEXT,
    profile_visibility TEXT DEFAULT 'public',
    color TEXT DEFAULT '#5b5ef4',
    icon TEXT DEFAULT '👤',
    referral_source TEXT,
    usage_purpose TEXT,
    referral_code TEXT,
    registration_step INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tasks table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS public.tasks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'pending',
    priority TEXT DEFAULT 'medium',
    due_date TIMESTAMP WITH TIME ZONE,
    tags TEXT[],
    category TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies for users table
CREATE POLICY "Users can view their own data"
    ON users
    FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can insert their own data"
    ON users
    FOR INSERT
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own data"
    ON users
    FOR UPDATE
    USING (auth.uid() = id);

-- Create RLS policies for tasks table
CREATE POLICY "Users can view their own tasks"
    ON tasks
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own tasks"
    ON tasks
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tasks"
    ON tasks
    FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tasks"
    ON tasks
    FOR DELETE
    USING (auth.uid() = user_id);

-- Enable RLS on both tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Create storage buckets for avatars
-- Note: Run this in Supabase dashboard or via API
-- CREATE BUCKET IF NOT EXISTS avatars;
