# Vercel Deployment Guide - Mechatronics Club Website

This guide will walk you through deploying your Next.js mechatronics club website to Vercel.

## Prerequisites

✅ **Completed**: Next.js project with Discord integration and Supabase authentication
✅ **Required**: GitHub account with your project repository
⚠️ **Required**: Supabase project set up (follow SUPABASE_SETUP.md first)

## Step 1: Prepare Your Repository

1. **Push your code to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Ready for Vercel deployment"
   git push origin main
   ```

2. **Verify your `.gitignore`** includes sensitive files:
   ```
   .env.local
   .env
   .vercel
   ```

## Step 2: Create Vercel Account & Deploy

1. **Sign up for Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up using your GitHub account (recommended)

2. **Import your project**:
   - Click "New Project"
   - Select "Import Git Repository"
   - Choose your mechatronics club repository
   - Click "Import"

3. **Configure deployment settings**:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

## Step 3: Environment Variables Setup

In your Vercel project dashboard, go to **Settings** → **Environment Variables** and add:

### Discord Integration Variables
```
NEXT_PUBLIC_DISCORD_SERVER_ID=1256061460149174272
DISCORD_BOT_TOKEN=your_discord_bot_token_here
NEXT_PUBLIC_DISCORD_WIDGET_ID=1256061460149174272
```

### Supabase Variables
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Optional Variables
```
DISCORD_API_BASE_URL=https://discord.com/api/v10
```

**Important**: 
- Set all variables for **Production**, **Preview**, and **Development** environments
- Variables starting with `NEXT_PUBLIC_` are exposed to the browser
- Keep `DISCORD_BOT_TOKEN` and database keys secret (no `NEXT_PUBLIC_` prefix)

## Step 4: Deploy

1. **Initial Deployment**:
   - After configuring environment variables, click "Deploy"
   - Vercel will build and deploy automatically
   - Wait for deployment to complete (~2-3 minutes)

2. **Get your deployment URL**:
   - You'll receive a URL like: `https://your-project-name.vercel.app`
   - Test all functionality on the live site

## Step 5: Custom Domain (Optional)

1. **Add custom domain**:
   - Go to **Settings** → **Domains**
   - Add your domain (e.g., `mechatronics-club.com`)
   - Follow DNS configuration instructions

2. **SSL Certificate**:
   - Vercel provides automatic SSL certificates
   - Your site will be accessible via HTTPS

## Step 6: Verify Deployment

### Test these features on your live site:

- ✅ **Homepage**: Terminal animation and Discord stats
- ✅ **Discord Integration**: Real member counts and events
- ✅ **Authentication**: Login/register functionality
- ✅ **Admin Dashboard**: User management (if admin role)
- ✅ **All Pages**: Projects, team, resources, workshops
- ✅ **Responsive Design**: Mobile and desktop views

## Step 7: Automatic Deployments

Vercel automatically deploys when you push to your main branch:

```bash
# Make changes locally
git add .
git commit -m "Update feature"
git push origin main
# Vercel deploys automatically!
```

## Common Issues & Solutions

### Build Errors
```bash
# Run locally to test build
npm run build
npm run start
```

### Environment Variables Not Working
- Ensure variables are set for all environments
- Redeploy after adding environment variables
- Check variable names match exactly (case-sensitive)

### Discord Integration Issues
- Verify Discord server ID is correct
- Ensure bot token has proper permissions
- Check Discord server has widget enabled

### Supabase Connection Issues
- Verify Supabase URL and anon key
- Check Supabase project is active
- Ensure database schema is applied

## Performance Optimization

Your site is already optimized with:
- ✅ Next.js static generation
- ✅ Automatic image optimization
- ✅ Modern JavaScript/CSS bundling
- ✅ CDN distribution via Vercel Edge Network

## Monitoring & Analytics

1. **Vercel Analytics** (optional):
   - Enable in project settings
   - Track page views and performance

2. **Function Logs**:
   - View real-time logs in Vercel dashboard
   - Monitor API endpoints and errors

## Support Resources

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Deployment**: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
- **Discord Issues**: Check bot permissions and server settings
- **Supabase Issues**: Verify database connection and schema

---

## Quick Deploy Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel account created
- [ ] Project imported from GitHub
- [ ] Environment variables configured
- [ ] Initial deployment successful
- [ ] All features tested on live site
- [ ] Custom domain configured (optional)
- [ ] Automatic deployments working

**Deployment Time**: ~5-10 minutes
**Live URL**: Available immediately after deployment
**SSL**: Automatic with custom domains 