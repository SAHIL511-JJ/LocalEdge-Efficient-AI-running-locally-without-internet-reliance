# How to Deploy to Vercel (Free)

Your AI Chat App is now configured for public deployment! Follow these steps to get it live in minutes.

## 1. Push to GitHub
Ensure your latest changes are pushed to GitHub:
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push
```

## 2. Deploy on Vercel
1. Go to [Vercel.com](https://vercel.com) and sign up/login.
2. Click **"Add New..."** -> **"Project"**.
3. Import your `ai-chat-app` repository.
4. In the **"Configure Project"** screen:
   - **Framework Preset**: Next.js (should be auto-detected)
   - **Root Directory**: `./` (default)
   - **Environment Variables**: Expand this section and add:

| Key | Value |
|-----|-------|
| `GROQ_API_KEY` | Your actual Groq API Key (starts with `gsk_...`) |
| `GROQ_MODEL` | `llama-3.3-70b-versatile` |
| `NEXT_PUBLIC_APP_URL` | `https://your-project-name.vercel.app` (you can update this after deployment) |

5. Click **"Deploy"**.

## 3. That's it!
Vercel will build your app and give you a live URL (e.g., `https://ai-chat-app-xyz.vercel.app`).
Anyone can now visit your link and chat with the AI!

---

### ⚠️ Important Notes
- **No Database Required**: The app uses in-memory storage for conversations. This means chat history resets if the server restarts (which happens frequently on Vercel's free tier). This is expected for this "demo" mode.
- **Public Access**: Since we removed authentication, **anyone** with the link can use your API credits.
- **Rate Limits**: Groq has generous free limits, but if you share the link widely, you might hit them.
