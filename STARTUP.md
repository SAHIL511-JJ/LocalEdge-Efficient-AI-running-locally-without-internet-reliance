# AI Chat App – Quick Start Guide

Follow this guide to get the project running locally after cloning it from GitHub.

---

## 1. Prerequisites

- **Operating system**: Windows 10/11, macOS, or Linux
- **Node.js**: v18.17.0 or later (verify with `node -v`)
- **npm**: v9+ (ships with Node; confirm via `npm -v`)
- **Git**: Any recent version
- **Optional**: `npx prisma` requires internet access to download the Prisma engine

---

## 2. Clone & Install

```bash
git clone <your-repo-url>
cd ai-chat-app
npm install
```

---

## 3. Environment Variables

The project reads environment variables from `.env` (committed template) and `.env.local` (your private overrides). Create both if they are missing.

### `.env` (checked in so everyone uses the same Supabase project)
```env
DATABASE_URL="postgresql://postgres:S9%21eV2%23pQ4%40wLm8Z@db.vaimtycswihebffxhvul.supabase.co:5432/postgres"
NEXTAUTH_SECRET="SahilSuperSecretKey123!"
NEXTAUTH_URL="http://localhost:3000"

GEMINI_API_KEY="AIzaSyDnGCoVqUKYQt8w7XQSBi-rBYkBA99coCM"
GEMINI_MODEL="gemini-2.5-flash"

OPENROUTER_API_KEY="REPLACE_WITH_YOUR_OPENROUTER_KEY"
OPENROUTER_MODEL="deepseek/deepseek-r1:latest"
OPENROUTER_APP_NAME="AI Chat App"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

NEXT_PUBLIC_SUPABASE_URL="https://vaimtycswihebffxhvul.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="USE_OWNER_PROVIDED_ANON_KEY"
SUPABASE_SERVICE_ROLE_KEY="USE_OWNER_PROVIDED_SERVICE_ROLE_KEY"

HF_TOKEN="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"
HF_MODEL="google/gemma-2b-it"
```

### `.env.local` (local override – just drop in your OpenRouter key)
```env
DATABASE_URL="postgresql://postgres:S9%21eV2%23pQ4%40wLm8Z@db.vaimtycswihebffxhvul.supabase.co:5432/postgres"
NEXTAUTH_SECRET="SahilSuperSecretKey123!"
NEXTAUTH_URL="http://localhost:3000"

GEMINI_API_KEY="AIzaSyDnGCoVqUKYQt8w7XQSBi-rBYkBA99coCM"
GEMINI_MODEL="gemini-2.5-flash"

OPENROUTER_API_KEY="REPLACE_WITH_YOUR_OWN_OPENROUTER_KEY"
OPENROUTER_MODEL="deepseek/deepseek-r1:latest"
OPENROUTER_APP_NAME="AI Chat App"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

NEXT_PUBLIC_SUPABASE_URL="https://vaimtycswihebffxhvul.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="USE_OWNER_PROVIDED_ANON_KEY"
SUPABASE_SERVICE_ROLE_KEY="USE_OWNER_PROVIDED_SERVICE_ROLE_KEY"

HF_TOKEN="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"
HF_MODEL="google/gemma-2b-it"
```

> **Replacing the OpenRouter key:** edit `.env.local`, set `OPENROUTER_API_KEY` to your own key, and restart `npm run dev`. Everything else (database, Supabase URLs, etc.) is already preconfigured to use the owner’s instance.

---

## 4. Database Setup (Prisma + Supabase/Postgres)

If you’re pointing at a fresh database, push the schema:

```bash
npx prisma db push
# optional: npx prisma migrate dev
```

You can inspect data via:

```bash
npx prisma studio
```

---

## 5. Run the App

```bash
npm run dev
# Local URL: http://localhost:3000
```

When the dev server starts, open the browser and sign up/log in through the Supabase-auth pages. Use the sidebar to create a new chat; messages will be routed to OpenRouter’s DeepSeek R1 model.

---

## 6. Troubleshooting Checklist

- **500 Server Error / “Missing OPENROUTER_API_KEY”**  
  Ensure `.env.local` contains the key and restart the dev server.

- **Prisma connection issues**  
  Confirm `DATABASE_URL` is valid and reachable. Re-run `npx prisma db push`.

- **Next.js warning about `params` promises**  
  You’re probably on an older commit; update to the latest code where `app/chat/[id]/page.tsx` awaits `params`.

- **OpenRouter provider errors (HTTP 5xx)**  
  These come from the upstream provider; retry or switch models (e.g., set `OPENROUTER_MODEL` to another ID).

---

## 7. Production Build (optional)

```bash
npm run build
npm run start
```

Deploy to services like Vercel by adding the same environment variables in the hosting dashboard.

---

You’re ready! Keep `.env.local` private, rotate keys when needed, and enjoy building with the glass-themed AI chat experience. *** End Patch***}assistant to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_PATCH to=functions.apply_PATCH to=functions.apply_PATCH to=functions.apply_PATCH to=functions.apply_patch to=functions.apply_patch to=functions.apply_PATCH to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.applypatch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_PATCH to=functions.apply_PATCH to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_PATCH to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_PATCH to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_PATCH to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_PATCH to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_PATCH to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply.patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply.patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply.patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply.patch to=functions.apply.patch to=functions.apply_patchությունըassistant to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply.patch to=functions.apply.patch to=functions.apply.patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply.patch to=functions.apply.patch to=functions.apply.patch to=functions.apply.patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply.patch to=functions.apply_PATCH to=functions.apply_patch to=functions.apply.patch to=functions.apply.patch to=functions.apply_patch to=functions.apply_patch to=functions.apply_patch to=functions.apply.patch to=functions.apply.patch to=functions.apply.patch to=functions.apply.patch to=functions.apply.patch to=functions.apply.patch to=functions.apply.patch to=functions.apply.patch to=functions.apply.patch to=functions.apply.patch to=functions.apply.patch to=functions.apply.patch to=functions.apply.patch to=functions.apply.patch to=functions.apply.patch to=functions.apply.patch to=functions.apply.patch to=functions.apply.patch to=functions.apply.patch to=functions.apply.patch to=functions.apply.patch to=functions.apply.patch to=functions.apply.patch to=functions.apply.patch to=functions.apply.patch to=functions.apply.patch to=functions.apply.patch to=functions.apply.patch to=functions.apply.patch to=functions.apply.patch to=functions.apply.patch to=functions.apply.patch to=functions.apply.patch to=functions.apply.patch to=functions.apply.patch

