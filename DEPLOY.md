# Deploying to Vercel

This guide will walk you through deploying your Bridges MLK app to Vercel.

## Prerequisites

- A Vercel account (free tier works great!) at [vercel.com](https://vercel.com)
- Your Anthropic API key from [console.anthropic.com](https://console.anthropic.com/)
- Git installed on your computer (optional but recommended)

## Option 1: Deploy with Vercel CLI (Recommended)

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy

From your project directory:

```bash
cd /Users/meepmop/Documents/Claude-Code/mlk-app
vercel
```

Follow the prompts:
- Set up and deploy? **Yes**
- Which scope? Select your account
- Link to existing project? **No**
- Project name? **bridges-mlk-app** (or your choice)
- Directory? **./**
- Override settings? **No**

### Step 4: Add Environment Variable

After deployment, add your API key:

```bash
vercel env add ANTHROPIC_API_KEY
```

When prompted:
- Enter your API key (starts with `sk-ant-`)
- Choose **Production, Preview, and Development**

### Step 5: Redeploy

```bash
vercel --prod
```

Done! Your app is now live! 🎉

---

## Option 2: Deploy via Vercel Dashboard (Easiest)

### Step 1: Push to GitHub

1. Go to [github.com](https://github.com) and create a new repository
2. Initialize git in your project:

```bash
cd /Users/meepmop/Documents/Claude-Code/mlk-app
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 2: Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import Git Repository**
3. Select your repository
4. Click **Import**

### Step 3: Configure Environment Variables

Before deploying:
1. Click **Environment Variables**
2. Add variable:
   - **Name**: `ANTHROPIC_API_KEY`
   - **Value**: Your API key (sk-ant-...)
   - Select all environments (Production, Preview, Development)
3. Click **Add**

### Step 4: Deploy

Click **Deploy** and wait for the build to complete (usually 1-2 minutes).

Done! Your app is live! 🎉

---

## Testing Your Deployment

1. Visit your Vercel URL (e.g., `https://bridges-mlk-app.vercel.app`)
2. Try entering two perspectives
3. Click "Explore Bridges"
4. You should see the results!

## Verifying Environment Variables

To check if your API key is set:

```bash
vercel env ls
```

To update your API key:

```bash
vercel env rm ANTHROPIC_API_KEY
vercel env add ANTHROPIC_API_KEY
```

## Custom Domain (Optional)

1. Go to your project dashboard on Vercel
2. Click **Settings** → **Domains**
3. Add your custom domain
4. Follow the DNS configuration instructions

## Monitoring Usage

- Check your Anthropic usage at [console.anthropic.com](https://console.anthropic.com/)
- Check Vercel analytics in your project dashboard
- Rate limits are 10 uses per 24 hours per user

## Troubleshooting

### "Server not configured" error
- Your API key environment variable isn't set
- Run: `vercel env add ANTHROPIC_API_KEY`
- Then redeploy: `vercel --prod`

### Serverless function timeout
- Default timeout is 10 seconds (Hobby plan) or 60 seconds (Pro plan)
- The app uses 30 seconds for API calls, which works on Pro plan
- For Hobby plan, reduce `maxDuration` in `vercel.json` to 10

### Rate limiting not working
- In-memory rate limiting resets on serverless function cold starts
- For production, consider using Vercel KV or Upstash Redis

## Upgrading to Database-Backed Rate Limiting

For persistent rate limiting across cold starts:

1. **Option A: Vercel KV** (requires Pro plan)
   ```bash
   vercel env add KV_REST_API_URL
   vercel env add KV_REST_API_TOKEN
   ```

2. **Option B: Upstash Redis** (has free tier)
   - Sign up at [upstash.com](https://upstash.com)
   - Create a Redis database
   - Add REST API URL and token to Vercel environment variables

Then update `/api/messages.js` to use Redis instead of in-memory storage.

## Support

- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Anthropic API Docs: [docs.anthropic.com](https://docs.anthropic.com)
