# Quick Start Guide

Get your Bridges MLK app running in 5 minutes!

## Prerequisites

1. **Anthropic API Key**: Get one at [console.anthropic.com](https://console.anthropic.com/) (free tier available)
2. **Node.js**: Vercel CLI requires Node.js. Install from [nodejs.org](https://nodejs.org/)

## 🔐 Step 1: Secure Your API Key

### Option A: Automated Setup (Easiest)

```bash
cd /Users/meepmop/Documents/Claude-Code/mlk-app
./setup-env.sh
```

This will:
- Create a secure `.env` file
- Prompt you for your API key
- Verify the format
- Add helpful comments

### Option B: Manual Setup

Create a `.env` file in your project root:

```bash
cd /Users/meepmop/Documents/Claude-Code/mlk-app
touch .env
```

Open `.env` and add:

```bash
ANTHROPIC_API_KEY=sk-ant-your-actual-key-here
```

**Important**: 
- ✅ `.env` is already in `.gitignore` (safe!)
- ✅ This file will NEVER be committed to GitHub
- ✅ Your API key stays private

## 🚀 Step 2: Local Development

### Install Vercel CLI (One Time Only)

```bash
npm install -g vercel
```

### Run Local Server

```bash
vercel dev
```

First time running? Follow prompts:
- Login to Vercel (opens browser)
- Link to existing project? **No**
- Project name? **bridges-mlk-app**
- Directory? **.**
- Want to modify settings? **No**

Vercel will automatically read your API key from `.env`!

Open: **http://localhost:3000** 🎉

## Deploy to Production

### Deploy Command

```bash
vercel --prod
```

### Set Environment Variable

```bash
vercel env add ANTHROPIC_API_KEY production
# Enter: sk-ant-your-key-here
# Select: All environments
```

### Redeploy

```bash
vercel --prod
```

Your app is now live! Visit the URL provided by Vercel.

## Testing

1. Visit your deployed URL
2. Enter two conflicting perspectives (or use an example)
3. Click "Explore Bridges"
4. Watch the magic happen! ✨

## Usage Limits

- **10 free explorations per user per day**
- Tracked per device (browser localStorage)
- Resets 24 hours after first use
- No signup required

## Troubleshooting

### "vercel: command not found"
Install Vercel CLI:
```bash
npm install -g vercel
```

### "Server not configured" in browser
Set your API key:
```bash
vercel env add ANTHROPIC_API_KEY
vercel --prod
```

### Can't access localhost:3000
Check if port is in use:
```bash
lsof -ti:3000
# If something is using it, kill it or use different port
vercel dev --listen 3001
```

## Next Steps

- Read [DEPLOY.md](DEPLOY.md) for detailed deployment options
- Check [README.md](README.md) for full documentation
- Customize rate limits in `/api/messages.js`

## Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Anthropic API**: [docs.anthropic.com](https://docs.anthropic.com)

---

Happy bridging! 🌉
