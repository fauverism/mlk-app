# Pre-Commit Checklist

Before pushing to GitHub, make sure:

## 🔒 Security

- [ ] `.env` file is NOT staged for commit
- [ ] `.env` is listed in `.gitignore` (✓ already done)
- [ ] No API keys are hardcoded in any `.js` files
- [ ] `env.example` contains only placeholder values, no real keys

## 🧪 Testing

- [ ] App runs locally with `vercel dev`
- [ ] All features work correctly
- [ ] No console errors in browser

## 📝 Documentation

- [ ] README is up to date
- [ ] Any new features are documented

## Quick Verification Commands

```bash
# Check what will be committed
git status

# Verify .env is NOT listed (good!)
git status | grep .env

# Verify .env is in .gitignore
cat .gitignore | grep "^.env$"

# Search for any hardcoded API keys (should return nothing)
grep -r "sk-ant-" . --exclude-dir=node_modules --exclude=.git

# If you see any matches, make sure they're only in:
# - .env (not tracked by git)
# - env.example (contains placeholder only)
```

## ⚠️ Found a Problem?

### If `.env` is staged:
```bash
git reset HEAD .env
```

### If you found a hardcoded API key:
1. Remove it from the code
2. Move it to `.env` or use `process.env.ANTHROPIC_API_KEY`
3. If already committed, see [SECURITY.md](SECURITY.md) for removal instructions

## ✅ Ready to Commit

Once all checks pass:

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

---

💡 **Pro Tip**: Set up a pre-commit hook to automate these checks!

```bash
# Create pre-commit hook
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
if git diff --cached --name-only | grep -q "^.env$"; then
    echo "❌ ERROR: Attempting to commit .env file!"
    echo "Remove it from staging: git reset HEAD .env"
    exit 1
fi
echo "✅ Security check passed"
EOF

chmod +x .git/hooks/pre-commit
```
