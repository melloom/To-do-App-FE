# Supabase Setup for Tasklio

This application uses Supabase for authentication, database, and storage.

## Project Configuration

The Supabase connection is configured with the following settings:

```javascript
// Supabase configuration
const supabaseUrl = 'https://qirkjqsaxnxonfqitupo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpcmtqcXNheG54b25mcWl0dXBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxNjg3MzYsImV4cCI6MjA2Mjc0NDczNn0.F3-qjNBHTvCvE0p8yeOLOdy5s6wwevtpNCEYbXIPixg';

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);
```

For production, use environment variables instead:

```
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## File Structure

The Supabase integration uses the following files:

- `supabase.js` - Initializes the Supabase client
- `auth.js` - Authentication functions
- `database.js` - Database operations
- `schema.sql` - Database schema definition
- `storage.js` - File storage operations

### 3. Database Setup

Run the following SQL in the Supabase SQL editor to create the necessary tables:

```sql
-- Create users table
CREATE TABLE users (
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
    registration_complete BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tasks table
CREATE TABLE tasks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT false,
    priority TEXT DEFAULT 'medium',
    due_date TIMESTAMP WITH TIME ZONE,
    tags TEXT[],
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
```

### 4. Storage Setup

1. Create the following buckets in Supabase Storage:
   - `avatars` - for user profile pictures

2. Configure bucket permissions:

For the `avatars` bucket:
   - Set public access to `none`
   - Create the following policy to allow users to upload their own avatars:
     - Name: "Users can upload their own avatars"
     - Operations: `INSERT`
     - Expression: `auth.uid() = storage.foldername`

   - Create the following policy to allow reading avatars:
     - Name: "Anyone can view avatars"
     - Operations: `SELECT`
     - Expression: `true`

### 5. Authentication Setup

1. In the Supabase dashboard, go to Authentication → Settings
2. Configure Email Auth:
   - Enable "Enable Email Signup"
   - Configure redirect URLs for password recovery

3. Optional: Configure OAuth Providers
   - Go to Authentication → Providers
   - Configure Google:
     - Enable Google auth
     - Add your Google Client ID and Secret
     - Add redirect URLs (e.g., `https://yourapp.com/auth/callback`)

## Authentication

Supabase provides authentication through:

- Email/password registration and login
- Magic link authentication
- Social login (configurable)

Example usage:

```javascript
// Register a new user
const { data, error } = await registerWithEmail(email, password, userData);

// Sign in
const { data, error } = await signInWithEmail(email, password);

// Sign out
await signOut();
```

## Database Operations

Database operations are abstracted in the `database.js` file:

```javascript
// Get user data
const userData = await getUserData(userId);

// Create user profile
await createUserProfile(userId, profileData);

// Update user data
await updateUserData(userId, newData);

// Check if email exists
const result = await checkEmailExists(email);

// Check if username exists
const result = await checkUsernameExists(username);
```

## Migration from Firebase

This project was migrated from Firebase to Supabase. Key changes:

1. Authentication system updated to use Supabase Auth
2. Database operations now use Supabase's PostgreSQL database
3. User IDs reference the Supabase auth.users table
4. Row Level Security (RLS) policies implemented for data protection

## Database Schema

The database schema includes:

1. **users** - Stores user profiles with authentication data
2. **tasks** - Stores user tasks with relationships to the users table

See the `schema.sql` file for the complete database definition.

## Row Level Security

Row Level Security ensures that users can only access their own data:

```sql
-- Users can only access their own data
CREATE POLICY "Users can view their own data"
    ON users
    FOR SELECT
    USING (auth.uid() = id);

-- Users can only access their own tasks
CREATE POLICY "Users can view their own tasks"
    ON tasks
    FOR SELECT
    USING (auth.uid() = user_id);
```

## Integration Status

This application is fully integrated with Supabase for:
- User authentication (signup, login, password reset)
- User profile management
- Task management (CRUD operations)
- File storage (profile pictures)

## Troubleshooting

- Make sure your environment variables are correctly set
- Check Supabase logs for any errors
- Ensure your database schema matches the expected structure
- Verify RLS policies are properly configured
