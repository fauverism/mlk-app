# Bridges - Finding Unity in Difference

A Martin Luther King Jr. Day celebration app that helps people find common ground between seemingly opposing perspectives.

## ✨ Features

- **AI-Powered Bridge Finding**: Uses Claude Sonnet 4 to discover shared values and common ground
- **10 Free Daily Uses**: No signup required, rate limited per device
- **Interactive Examples**: Pre-loaded scenarios to explore
- **Auto-Save**: Your work is saved automatically
- **Beautiful UI**: Elegant sepia-toned design honoring MLK's legacy
- **Fully Deployable**: Ready for Vercel deployment

## 🚀 Quick Start (Local Development)

This app now uses **Vercel Serverless Functions** instead of Python! Test it locally with:

```bash
# Install Vercel CLI globally (one time only)
npm install -g vercel

# Run local development server
vercel dev
```

Then open: **http://localhost:3000**

## ☁️ Deploy to Vercel (Production)

### One-Command Deploy:

```bash
vercel
```

Then add your API key:

```bash
vercel env add ANTHROPIC_API_KEY
# Enter your key when prompted: sk-ant-...
# Choose: Production, Preview, and Development

# Redeploy with the environment variable
vercel --prod
```

**Detailed deployment guide**: See [DEPLOY.md](DEPLOY.md)

## 📁 Project Structure

```
mlk-app/
├── index.html              # Main app (formerly bridges-mlk.html)
├── api/
│   ├── messages.js         # Serverless function for Anthropic API
│   └── usage.js            # Serverless function for usage stats
├── vercel.json             # Vercel configuration
├── package.json            # Project metadata
├── DEPLOY.md              # Detailed deployment guide
└── README.md              # This file
```

## 🔧 How It Works

1. **Frontend** (`index.html`): Single-page app with vanilla JavaScript
2. **Backend** (`/api/*.js`): Vercel Serverless Functions handle:
   - Secure API key management
   - Rate limiting (10 uses per 24 hours)
   - Anthropic API proxy

## 🎛️ Configuration

### Rate Limiting

Edit `/api/messages.js`:

```javascript
const MAX_FREE_USES = 10;  // Change this
const RATE_LIMIT_WINDOW_MS = 24 * 60 * 60 * 1000;  // 24 hours
```

### API Model

Change the Claude model in `index.html` (line ~1151):

```javascript
model: 'claude-sonnet-4-20250514',  // Or any other model
max_tokens: 1024,
```

## 🔒 Security

- ✅ API key stored as Vercel environment variable (never exposed to client)
- ✅ Rate limiting prevents abuse
- ✅ Client IDs are random, non-identifying
- ✅ No data stored server-side
- ✅ All API calls go directly to Anthropic

## 🌐 Technologies

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Backend**: Vercel Serverless Functions (Node.js)
- **AI**: Anthropic Claude Sonnet 4
- **Storage**: Browser LocalStorage (client-side only)
- **Hosting**: Vercel

## 📝 Notes

### Rate Limiting
- Current implementation uses **in-memory storage**
- Resets on serverless function cold starts
- For production with strict limits, use Vercel KV or Upstash Redis

### Serverless Function Limits
- **Hobby Plan**: 10-second timeout
- **Pro Plan**: 60-second timeout
- Current config uses 30 seconds (works on Pro, needs adjustment for Hobby)

## 🚧 Future Enhancements

- [ ] Persistent rate limiting with database
- [ ] User authentication system
- [ ] Usage analytics dashboard
- [ ] Social sharing functionality
- [ ] Multi-language support

## 📄 License

MIT

---

Made with ❤️ to honor Dr. Martin Luther King Jr.'s vision of unity and understanding.
