# Security Guide - Protecting Your API Key

This guide shows you how to keep your Anthropic API key secure and prevent it from being exposed on GitHub or to other users.

## ✅ What's Already Protected

Your `.gitignore` file already includes:
```
.env
.env.local
.vercel
```

This means these files will **NEVER** be committed to GitHub. ✨

## 🔐 Setup: Local Development

### Step 1: Create Your `.env` File

In your project root, create a file called `.env`:

```bash
cd /Users/meepmop/Documents/Claude-Code/mlk-app
touch .env
```

### Step 2: Add Your API Key

Open `.env` and add:

```bash
ANTHROPIC_API_KEY=sk-ant-api03-your-actual-key-here
```

**Important**: Replace `sk-ant-api03-your-actual-key-here` with your real API key from [console.anthropic.com](https://console.anthropic.com/)

### Step 3: Test Locally

```bash
vercel dev
```

Vercel CLI will automatically read from `.env` when running locally.

## ☁️ Setup: Vercel Production

For production deployment, **never** commit your `.env` file. Instead:

### Method 1: Vercel CLI (Recommended)

```bash
# Add environment variable to Vercel
vercel env add ANTHROPIC_API_KEY

# When prompted:
# - Paste your API key
# - Select: Production, Preview, and Development
# - Confirm
```

### Method 2: Vercel Dashboard

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Click **Add**:
   - **Name**: `ANTHROPIC_API_KEY`
   - **Value**: Your actual API key
   - **Environments**: Select all (Production, Preview, Development)
5. Click **Save**
6. Redeploy your app

## 🚨 Security Checklist

Before pushing to GitHub:

- [ ] `.env` file exists locally with your API key
- [ ] `.env` is listed in `.gitignore` (already done ✓)
- [ ] You've run `git status` and confirmed `.env` is NOT staged
- [ ] Environment variable is set in Vercel dashboard
- [ ] You're using `process.env.ANTHROPIC_API_KEY` in your code (already done ✓)

## 🔍 Verify Your API Key is Safe

### Check What Will Be Committed

```bash
git status
```

You should **NOT** see `.env` listed. If you do:

```bash
# Make sure .gitignore includes .env
cat .gitignore | grep ".env"

# Remove .env from staging if accidentally added
git rm --cached .env
```

### Check Vercel Environment Variables

```bash
# List all environment variables in Vercel
vercel env ls
```

You should see `ANTHROPIC_API_KEY` listed for production, preview, and development.

## 🛡️ Best Practices

### ✅ DO

- **Use `.env` for local development**
- **Use Vercel environment variables for production**
- **Keep `.env` in `.gitignore`**
- **Use `env.example` (without real keys) to show structure**
- **Rotate your API key if it's ever exposed**
- **Monitor your API usage** at [console.anthropic.com](https://console.anthropic.com/)

### ❌ DON'T

- **NEVER commit `.env` to GitHub**
- **NEVER hardcode API keys in your code**
- **NEVER share your `.env` file**
- **NEVER push API keys to public repositories**
- **NEVER share screenshots that show your API key**

## 🔄 Rotating Your API Key

If your API key is ever exposed:

1. **Immediately disable it** at [console.anthropic.com](https://console.anthropic.com/)
2. **Generate a new key**
3. **Update locally**:
   ```bash
   # Edit .env with new key
   nano .env
   ```
4. **Update Vercel**:
   ```bash
   vercel env rm ANTHROPIC_API_KEY production
   vercel env add ANTHROPIC_API_KEY production
   # Enter new key
   ```
5. **Redeploy**:
   ```bash
   vercel --prod
   ```

## 📁 File Structure

```
mlk-app/
├── .env                    ← Your secret key (NEVER commit)
├── env.example             ← Template (safe to commit)
├── .gitignore              ← Protects .env (already configured ✓)
└── api/
    └── messages.js         ← Uses process.env.ANTHROPIC_API_KEY ✓
```

## 🧪 Testing Security

### Test 1: Verify `.env` is Ignored

```bash
# This should return nothing (good!)
git ls-files | grep .env
```

### Test 2: Verify Vercel Has Your Key

```bash
vercel env pull .env.local
cat .env.local | grep ANTHROPIC_API_KEY
```

### Test 3: Test Locally

```bash
vercel dev
# Visit http://localhost:3000 and try the app
```

## ⚠️ What to Do If You Accidentally Commit Your Key

If you accidentally commit your `.env` file with your API key:

### 1. Remove from Git History

```bash
# Remove from current commit
git rm --cached .env
git commit --amend -m "Remove sensitive .env file"

# If already pushed, you need to rewrite history (dangerous!)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (only if you own the repo and it's private)
git push origin --force --all
```

### 2. Immediately Rotate Your API Key

Follow the "Rotating Your API Key" section above.

### 3. Consider Your Repository Compromised

If it was a public repository, assume your key is compromised and rotate immediately.

## 📞 Support

- **Anthropic Security**: [docs.anthropic.com/claude/docs/security](https://docs.anthropic.com/claude/docs/security)
- **Vercel Environment Variables**: [vercel.com/docs/concepts/projects/environment-variables](https://vercel.com/docs/concepts/projects/environment-variables)
- **GitHub Security**: [docs.github.com/en/code-security](https://docs.github.com/en/code-security)

---

🔐 Stay secure! Your API key is like a password - treat it with the same level of care.
