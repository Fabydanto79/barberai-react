# BarberAI - React + Tailwind (Vercel ready)

This project is a Next.js frontend with Tailwind and a serverless API route for Groq proxy.

## Quick start (local)
1. `npm install`
2. `npm run dev`
3. Visit http://localhost:3000

## Deploy to Vercel
- Create a GitHub repo, push this project.
- Import the repo in Vercel.
- Set Environment Variables in Vercel:
  - `GROQ_API_KEY`
  - `GROQ_ENDPOINT`
- Deploy.

## Notes
- API key must NOT be in the client.
- Swap localStorage to a DB for production (Supabase/Firebase/Postgres).
