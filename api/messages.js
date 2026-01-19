// Vercel Serverless Function for Anthropic API proxy with rate limiting
// This function runs on Vercel's edge network

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const MAX_FREE_USES = 10;
const RATE_LIMIT_WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours

// In-memory storage (resets on cold starts, but good enough for basic rate limiting)
// For production, use Vercel KV, Upstash Redis, or a database
const userUsage = new Map();

// Clean up old entries periodically
function cleanupOldEntries() {
  const now = Date.now();
  for (const [clientId, data] of userUsage.entries()) {
    if (now - data.firstUse > RATE_LIMIT_WINDOW_MS) {
      userUsage.delete(clientId);
    }
  }
}

function checkRateLimit(clientId) {
  cleanupOldEntries();
  
  if (!userUsage.has(clientId)) {
    return { allowed: true, remaining: MAX_FREE_USES };
  }
  
  const data = userUsage.get(clientId);
  const timeSinceFirstUse = Date.now() - data.firstUse;
  
  // Reset if window has passed
  if (timeSinceFirstUse > RATE_LIMIT_WINDOW_MS) {
    userUsage.delete(clientId);
    return { allowed: true, remaining: MAX_FREE_USES };
  }
  
  const remaining = MAX_FREE_USES - data.count;
  return {
    allowed: remaining > 0,
    remaining: Math.max(0, remaining),
    resetTimeHours: ((RATE_LIMIT_WINDOW_MS - timeSinceFirstUse) / (60 * 60 * 1000)).toFixed(1)
  };
}

function incrementUsage(clientId) {
  if (!userUsage.has(clientId)) {
    userUsage.set(clientId, {
      count: 1,
      firstUse: Date.now()
    });
  } else {
    const data = userUsage.get(clientId);
    data.count += 1;
  }
}

export default async function handler(req, res) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-client-id');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: { message: 'Method not allowed' } });
  }
  
  // Check if API key is configured
  if (!ANTHROPIC_API_KEY) {
    return res.status(500).json({
      error: { message: 'Server not configured. Please set ANTHROPIC_API_KEY environment variable.' }
    });
  }
  
  // Get client ID for rate limiting
  const clientId = req.headers['x-client-id'] || req.headers['x-forwarded-for'] || 'anonymous';
  
  // Check rate limit
  const rateLimitCheck = checkRateLimit(clientId);
  
  if (!rateLimitCheck.allowed) {
    return res.status(429).json({
      error: {
        type: 'rate_limit_exceeded',
        message: 'Daily limit reached',
        remaining_time_hours: rateLimitCheck.resetTimeHours
      }
    });
  }
  
  try {
    // Forward request to Anthropic API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify(req.body)
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      return res.status(response.status).json(data);
    }
    
    // Increment usage count
    incrementUsage(clientId);
    
    // Get updated remaining count
    const updatedCheck = checkRateLimit(clientId);
    
    // Return success with usage info
    res.setHeader('X-Uses-Remaining', updatedCheck.remaining.toString());
    return res.status(200).json(data);
    
  } catch (error) {
    console.error('Error calling Anthropic API:', error);
    return res.status(500).json({
      error: { message: error.message || 'Internal server error' }
    });
  }
}
