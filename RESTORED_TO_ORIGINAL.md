# ✅ Restored to Original JWT Authentication

## What Was Done

### Frontend

- ✅ Removed `@clerk/react` package
- ✅ Restored original `App.jsx` with Login/Register
- ✅ Restored original `main.jsx` with AuthContext
- ✅ Restored original `Sidebar.jsx` with logout button
- ✅ Restored original `axios.js` with JWT token handling
- ✅ Cleaned up `.env` file

### Backend

- ✅ Removed `@clerk/clerk-sdk-node` package
- ✅ Restored original `authMiddleware.js` with JWT verification
- ✅ Restored original `Habit.js` model with ObjectId
- ✅ Cleaned up `.env` file
- ✅ Removed Clerk-related test files

## How to Run

### 1. Start Backend

```bash
cd server
npm run dev
```

You should see:

```
Server running on port 5000
```

### 2. Start Frontend

```bash
cd client
npm run dev
```

You should see:

```
Local: http://localhost:5173
```

### 3. Open Browser

Navigate to: `http://localhost:5173`

## What You'll See

### Landing Page

- Login form with email and password
- "Don't have an account? Create Account" link
- Or Register form with name, email, and password
- "Already have an account? Sign In" link

### After Login

- Full dashboard with habits
- Left sidebar with navigation
- Right sidebar with progress
- User name displayed in sidebar
- Sign Out button

## Authentication Flow

1. **Register**: Create account with name, email, password
2. **Login**: Sign in with email and password
3. **Token**: JWT token stored in localStorage
4. **API Calls**: Token automatically sent with requests
5. **Logout**: Token removed from localStorage

## Features Working

✅ Register new account
✅ Login with email/password
✅ Create habits
✅ Mark habits complete
✅ View statistics
✅ View by category
✅ Dark mode
✅ Sign out

## Database

- Uses MongoDB with Mongoose
- User model stores hashed passwords (bcrypt)
- Habit model uses ObjectId for userId reference
- JWT tokens for authentication

## Environment Variables

### Frontend (.env)

```env
# No environment variables needed
```

### Backend (.env)

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Sign in

### Habits (Protected)

- `GET /api/habits` - Get all user habits
- `POST /api/habits` - Create new habit
- `PUT /api/habits/:id` - Update habit
- `DELETE /api/habits/:id` - Delete habit
- `POST /api/habits/:id/toggle` - Toggle completion

## Security

- Passwords hashed with bcrypt
- JWT tokens for authentication
- Tokens expire (configurable)
- Protected routes require valid token
- CORS enabled for frontend

## Troubleshooting

### Can't login

- Check MongoDB is connected
- Verify user exists in database
- Check password is correct
- Look at server console for errors

### Can't create habits

- Verify you're logged in
- Check token in localStorage
- Check server is running
- Look at browser console for errors

### Token expired

- Sign out and sign in again
- Token will be refreshed

## Success Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] Can see login page
- [ ] Can register new account
- [ ] Can login with credentials
- [ ] Dashboard loads after login
- [ ] Can create habits
- [ ] Can mark habits complete
- [ ] Can sign out

## Notes

- All Clerk code has been removed
- Back to original JWT authentication
- No external authentication service needed
- Everything runs locally
- Simple and straightforward

## Next Steps

1. Start both servers
2. Register a new account
3. Login with your credentials
4. Start tracking your habits!

Your Habit Tracker is back to the original authentication system! 🎉
