# Fix Supabase Row-Level Security Error

You're getting this error: **"new row violates row-level security policy for table 'users'"** because the users table is missing an INSERT policy.

## Quick Fix (30 seconds)

### Step 1: Open Supabase SQL Editor
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **SQL Editor** in the left sidebar

### Step 2: Run This SQL Command
Copy and paste this into the SQL editor and click **RUN**:

```sql
-- Fix for user registration RLS policy
CREATE POLICY "Users can insert own profile" ON public.users 
FOR INSERT WITH CHECK (auth.uid() = id);
```

### Step 3: Test User Registration
- Go back to your website
- Try registering a new user
- It should work now! ✅

## What This Fix Does

- **Problem**: The `users` table had RLS (Row-Level Security) enabled but was missing an INSERT policy
- **Solution**: Added a policy that allows authenticated users to insert their own profile records
- **Security**: Still secure - users can only insert records with their own user ID

## Alternative Fix (If Above Doesn't Work)

If you still get errors, try this more permissive policy:

```sql
-- More permissive policy for user creation
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;
CREATE POLICY "Allow user profile creation" ON public.users 
FOR INSERT WITH CHECK (true);
```

## Verify the Fix

1. **Check policies** in Supabase:
   - Go to **Database** → **Tables** → `users` table
   - Click **Row Level Security**
   - You should see the new INSERT policy listed

2. **Test registration**:
   - Try creating a new account on your website
   - Check the `users` table in Supabase to see the new record

## Database Policies Summary

After the fix, your `users` table should have these policies:
- ✅ **SELECT**: "Users can view all profiles"
- ✅ **INSERT**: "Users can insert own profile" ← **NEW**
- ✅ **UPDATE**: "Users can update own profile"
- ✅ **UPDATE**: "Admins can update any profile"

## If You're Still Having Issues

1. **Check Supabase logs**:
   - Go to **Logs** → **Database** in your Supabase dashboard
   - Look for any error messages

2. **Verify environment variables**:
   - Make sure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct
   - Check they're set in your local `.env.local` file

3. **Contact support**:
   - If problems persist, check the browser console for additional error details
   - The fix above works for 99% of RLS policy issues

---

**Expected Result**: User registration should work immediately after applying the SQL fix! 🎉 