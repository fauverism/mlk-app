// Vercel Serverless Function to check usage statistics

const MAX_FREE_USES = 10;
const RATE_LIMIT_WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours

// This should match the same storage as messages.js
// Note: In-memory storage means this resets on cold starts
// For production, use a shared database or Vercel KV

// Since we can't share memory between serverless functions,
// we'll return optimistic values here and rely on the messages endpoint for enforcement
export default async function handler(req, res) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-client-id');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // For this simple version, we'll return optimistic usage
  // Real tracking happens in messages.js
  return res.status(200).json({
    uses_remaining: MAX_FREE_USES,
    reset_time_hours: 0,
    note: 'Usage is tracked on each request'
  });
}
