# Supabase Setup Guide

## 🚀 Quick Setup Instructions

### 1. Install Supabase Package
```bash
npm install @supabase/supabase-js
```

### 2. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: mechatronics-club
   - **Database Password**: Choose a strong password
   - **Region**: Choose closest to your users
5. Click "Create new project"

### 3. Get Your Project Credentials
After project creation, go to Settings → API:
- **Project URL**: `https://your-project-id.supabase.co`
- **Anon Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (public key)
- **Service Role Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (secret key)

### 4. Update Environment Variables
Add these to your `.env.local` file:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Existing Discord Configuration
DISCORD_BOT_TOKEN=your_discord_bot_token_here
NEXT_PUBLIC_DISCORD_SERVER_ID=1256061460149174272
NEXT_PUBLIC_DISCORD_WIDGET_ID=1256061460149174272
NEXT_PUBLIC_DISCORD_INVITE_URL=https://discord.gg/34BCmz8q2y
```

### 5. Set Up Database Schema
1. In your Supabase dashboard, go to SQL Editor
2. Copy the contents of `database/schema.sql`
3. Paste and run the SQL script
4. This will create all necessary tables and security policies

### 6. Configure Authentication
1. In Supabase dashboard, go to Authentication → Settings
2. **Site URL**: `http://localhost:3000` (development) or your production URL
3. **Redirect URLs**: Add your domain URLs
4. Enable email authentication (default)
5. Optional: Configure OAuth providers (Google, GitHub, etc.)

### 7. Set Up Storage (Optional)
1. Go to Storage in Supabase dashboard
2. Create buckets for:
   - `avatars` (user profile pictures)
   - `projects` (project images)
   - `resources` (uploaded files)
3. Configure storage policies as needed

## 🔧 Vercel Deployment Setup

### Environment Variables for Vercel
In your Vercel dashboard or via CLI:
```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
```

### Update Site URL for Production
In Supabase dashboard → Authentication → Settings:
- **Site URL**: `https://your-vercel-app.vercel.app`
- **Redirect URLs**: Add your production domain

## 📚 Features Enabled

### ✅ Authentication System
- User registration and login
- Role-based access control (admin, member, visitor)
- Profile management
- Password reset functionality

### ✅ Database Tables
- **users**: User profiles and roles
- **projects**: Club projects with status tracking
- **events**: Club events and workshops
- **resources**: Datasheets, tutorials, and tools
- **event_participants**: Event registration system

### ✅ Security Features
- Row Level Security (RLS) policies
- Automatic user profile creation
- Role-based permissions
- Secure API access

## 🧪 Testing the Setup

### 1. Test Authentication
```bash
npm run dev
```
- Visit your app
- Try registering a new user
- Check if user appears in Supabase dashboard

### 2. Test Database Connection
- Check Supabase dashboard → Authentication → Users
- Verify user profile created in `users` table
- Test login/logout functionality

### 3. Admin Access
To make yourself an admin:
1. Go to Supabase dashboard → Table Editor → users
2. Find your user record
3. Change `role` from `member` to `admin`
4. Save changes

## 🚨 Troubleshooting

### Common Issues:
1. **"Invalid API key"**: Check your environment variables
2. **"Row Level Security"**: Ensure RLS policies are set up correctly
3. **"User not found"**: Check if user profile trigger is working
4. **CORS errors**: Verify site URL in Supabase settings

### Debug Mode:
Add to your `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_DEBUG=true
```

## 📞 Support
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js + Supabase Guide](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs)
- [Vercel + Supabase Integration](https://vercel.com/guides/nextjs-supabase)

---

**Ready to proceed?** Once you've completed these steps, the authentication system and database will be fully functional! 