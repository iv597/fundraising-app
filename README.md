# Fundraising App with Clerk Authentication

A modern fundraising application built with Next.js 14 (App Router) and Clerk authentication.

## Features

-   ✅ **Next.js 14** with App Router
-   ✅ **Clerk Authentication** - Latest integration patterns
-   ✅ **TypeScript** support
-   ✅ **Tailwind CSS** for styling
-   ✅ **Responsive Design** with modern UI components
-   ✅ **Protected Routes** using Clerk middleware

## Tech Stack

-   **Framework**: Next.js 14 (App Router)
-   **Authentication**: Clerk (@clerk/nextjs@latest)
-   **Styling**: Tailwind CSS
-   **Language**: TypeScript
-   **Package Manager**: npm/yarn/pnpm

## Quick Start

### 1. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Set Up Clerk

1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Create a new application
3. Copy your API keys
4. Create a `.env.local` file with your keys:

```bash
cp env.example .env.local
```

Then edit `.env.local` with your actual Clerk keys:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key_here
CLERK_SECRET_KEY=sk_test_your_actual_secret_here
```

### 3. Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
fundraising-app/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with ClerkProvider
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── middleware.ts           # Clerk middleware
├── package.json            # Dependencies
├── tsconfig.json          # TypeScript config
├── tailwind.config.js     # Tailwind CSS config
├── postcss.config.js      # PostCSS config
└── env.example            # Environment variables template
```

## Clerk Integration Details

This project follows the **current, correct Clerk integration patterns** for Next.js App Router:

### ✅ What's Implemented (Current Best Practices)

1. **`clerkMiddleware()`** in `middleware.ts` - Latest approach
2. **`<ClerkProvider>`** wrapping the app in `app/layout.tsx`
3. **App Router structure** - No deprecated `pages/` or `_app.tsx`
4. **Latest imports** from `@clerk/nextjs` and `@clerk/nextjs/server`
5. **Proper middleware matchers** for optimal performance

### ❌ What's NOT Used (Deprecated Patterns)

-   ❌ No `authMiddleware()` (replaced by `clerkMiddleware()`)
-   ❌ No `pages/` directory structure
-   ❌ No `_app.tsx` wrapper
-   ❌ No deprecated Clerk APIs

## Available Scripts

-   `npm run dev` - Start development server
-   `npm run build` - Build for production
-   `npm run start` - Start production server
-   `npm run lint` - Run ESLint

## Environment Variables

Required Clerk environment variables:

-   `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Your Clerk publishable key
-   `CLERK_SECRET_KEY` - Your Clerk secret key

## Learn More

-   [Clerk Documentation](https://clerk.com/docs)
-   [Next.js Documentation](https://nextjs.org/docs)
-   [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Support

For Clerk-specific issues, visit the [Clerk Support](https://clerk.com/support) or check their [Discord community](https://discord.gg/clerk).
