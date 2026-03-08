# Backend Quick Start

## 🚨 IMPORTANT: Add Clerk Secret Key

Before starting the server, you MUST add your Clerk secret key:

### 1. Get Your Secret Key

1. Go to https://dashboard.clerk.com
2. Select your application
3. Click "API Keys" in the sidebar
4. Copy the "Secret Key" (starts with `sk_test_`)

### 2. Add to .env File

Edit `server/.env` and replace:

```env
CLERK_SECRET_KEY=your_clerk_secret_key_here
```

With your actual key:

```env
CLERK_SECRET_KEY=sk_test_abc123...
```

## 🚀 Start the Server

```bash
cd server
npm run dev
```

You should see:

```
Server running on port 5000
Clerk authentication enabled
```

## ✅ Test It's Working

Open browser or use curl:

```bash
curl http://localhost:5000/api/health
```

Should return:

```json
{
  "status": "ok",
  "message": "Server is running with Clerk authentication"
}
```

## 🔧 What Changed

- ✅ Installed `@clerk/clerk-sdk-node`
- ✅ Updated auth middleware to verify Clerk tokens
- ✅ Changed Habit model to use Clerk user IDs (strings)
- ✅ Added health check endpoint

## 🎯 How to Use

### From Frontend

The frontend automatically sends Clerk tokens with every request. No changes needed!

### Testing Manually

To test with curl, you need a valid Clerk token:

```bash
curl -H "Authorization: Bearer YOUR_CLERK_TOKEN" \
  http://localhost:5000/api/habits
```

## 🐛 Common Issues

### "Missing Clerk Secret Key"

- Add `CLERK_SECRET_KEY` to `server/.env`
- Restart server

### "Invalid token"

- Check secret key is correct
- Verify it matches your Clerk application
- Check it starts with `sk_test_` (for test) or `sk_live_` (for production)

### Server won't start

- Check MongoDB connection string
- Verify all dependencies installed: `npm install`
- Check port 5000 is not in use

## 📝 Environment Variables Needed

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Server
PORT=5000

# Clerk (REQUIRED)
CLERK_SECRET_KEY=sk_test_your_secret_key_here
CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
```

## ✨ You're Ready!

Once you've added the Clerk secret key and started the server, your backend is ready to work with Clerk authentication!
