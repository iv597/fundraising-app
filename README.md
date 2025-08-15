# Fundraising App

A modern fundraising platform built with Next.js App Router and Clerk authentication.

## Features

- ✨ **Next.js 14+** with App Router
- 🔐 **Clerk Authentication** - Modern, secure user management
- 🎨 **Tailwind CSS** - Beautiful, responsive design
- 📱 **TypeScript** - Type-safe development
- 🚀 **Ready to deploy** - Optimized for production

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- A Clerk account (free at [clerk.com](https://clerk.com))

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd fundraising-app
npm install
```

### 2. Set up Clerk Authentication

1. **Create a Clerk Application:**
   - Go to [https://dashboard.clerk.com/](https://dashboard.clerk.com/)
   - Click "Add application"
   - Choose your preferred sign-in methods
   - Note your API keys

2. **Configure Environment Variables:**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your Clerk keys:
   ```bash
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
   CLERK_SECRET_KEY=sk_test_your_key_here
   ```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app!

## Clerk Integration Details

This app follows the **current Clerk best practices** for Next.js App Router:

### ✅ Correct Implementation

- **Middleware**: Uses `clerkMiddleware()` from `@clerk/nextjs/server`
- **Provider**: App wrapped with `<ClerkProvider>` in `app/layout.tsx`
- **Components**: Uses current Clerk components (`<SignInButton>`, `<UserButton>`, etc.)
- **Imports**: All imports from `@clerk/nextjs` and `@clerk/nextjs/server`

### 🚫 Outdated Patterns Avoided

- ❌ `authMiddleware()` (deprecated)
- ❌ Pages Router approach (`_app.tsx`)
- ❌ Old environment variable patterns

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with ClerkProvider
│   ├── page.tsx            # Home page with auth state
│   └── globals.css         # Global styles with Tailwind
├── middleware.ts           # Clerk middleware with clerkMiddleware()
└── ...
```

## Key Files

- **`src/middleware.ts`** - Clerk authentication middleware
- **`src/app/layout.tsx`** - App wrapper with ClerkProvider and auth UI
- **`src/app/page.tsx`** - Home page demonstrating auth states
- **`.env.local`** - Environment variables (not in git)

## Authentication Flow

1. **Unauthenticated users** see sign-in/sign-up buttons
2. **Click sign-in** → Clerk modal appears
3. **Sign in/up** → User is authenticated
4. **Authenticated users** see user button and protected content

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

This app is ready to deploy to:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **Railway**
- **Any platform supporting Node.js**

### Environment Variables for Production

Make sure to set these in your deployment platform:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`

## Next Steps

- Add protected routes using Clerk's route protection
- Implement user profiles and role-based access
- Add database integration for fundraising campaigns
- Set up payment processing for donations

## Learn More

- [Clerk Documentation](https://clerk.com/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Tailwind CSS](https://tailwindcss.com/docs)