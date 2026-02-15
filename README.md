# Smart Bookmark App

Live URL:   https://abhi112244-smart-bookmark-app.vercel.app/
GitHub Repo: https://github.com/abhi112244/smart-bookmark-app

## Features

- Google OAuth Login (Supabase Auth)
- Add Bookmark (Title + URL)
- Private bookmarks per user (Row Level Security enabled)
- Real-time updates using Supabase Realtime
- Delete bookmarks
- Deployed on Vercel

## Tech Stack

- Next.js (App Router)
- Supabase (Auth, Database, Realtime)
- Tailwind CSS
- Vercel Deployment

## Challenges Faced

### 1. Node Modules Errors
Initially modified node_modules accidentally.  
Solution: Deleted node_modules and reinstalled dependencies.

### 2. Supabase Import Path Errors
Incorrect file structure caused module resolution issues.  
Solution: Corrected file path and updated import statements.

### 3. Metadata Export Error
Exporting metadata inside a Client Component caused build failure.  
Solution: Removed "use client" from layout.tsx.

### 4. Production Build Prerender Error
Dashboard page tried to prerender during build.  
Solution: Added:
export const dynamic = "force-dynamic";

### 5. Environment Variable Error
Supabase URL was invalid in Vercel.  
Solution: Properly configured environment variables in Vercel settings.

## What I Learned

- Difference between development and production builds
- Importance of environment variables
- Next.js App Router rendering behavior
- Supabase RLS for secure multi-user data
- How to deploy a full-stack app to Vercel
