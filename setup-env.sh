#!/bin/bash

# Setup script for environment variables
# This helps you create a secure .env file

echo "🔐 Bridges MLK App - Environment Setup"
echo "========================================"
echo ""

# Check if .env already exists
if [ -f .env ]; then
    echo "⚠️  Warning: .env file already exists!"
    echo ""
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Setup cancelled. Your existing .env file was not modified."
        exit 1
    fi
fi

echo "Please enter your Anthropic API key."
echo "Get it from: https://console.anthropic.com/"
echo ""
read -p "API Key (starts with sk-ant-): " -r API_KEY

# Validate API key format
if [[ ! $API_KEY =~ ^sk-ant- ]]; then
    echo ""
    echo "⚠️  Warning: Your API key doesn't start with 'sk-ant-'"
    echo "Are you sure this is correct?"
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Setup cancelled."
        exit 1
    fi
fi

# Create .env file
cat > .env << EOF
# Anthropic API Configuration
# This file is ignored by git - never commit it!

ANTHROPIC_API_KEY=$API_KEY

# Created: $(date)
EOF

echo ""
echo "✅ Success! Your .env file has been created."
echo ""
echo "📋 Next steps:"
echo "   1. Test locally:"
echo "      vercel dev"
echo ""
echo "   2. Deploy to Vercel:"
echo "      vercel env add ANTHROPIC_API_KEY"
echo "      vercel --prod"
echo ""
echo "🔒 Security reminders:"
echo "   - Never commit .env to git (already in .gitignore ✓)"
echo "   - Never share your API key"
echo "   - Monitor usage at console.anthropic.com"
echo ""
echo "📚 For more info, see SECURITY.md"
