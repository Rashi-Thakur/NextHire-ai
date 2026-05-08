# Deployment Guide

## Backend on Render
1. Push project to GitHub.
2. Create new Web Service in Render.
3. Select `nexthire-ai/server` as root.
4. Build command: `npm install`
5. Start command: `npm start`
6. Add env vars:
   - `NODE_ENV=production`
   - `PORT=5000`
   - `MONGO_URI=<mongodb-atlas-uri>`
   - `JWT_SECRET=<strong-secret>`
   - `JWT_EXPIRES_IN=7d`
   - `OPENAI_API_KEY=<key>`
   - `CLIENT_URL=<vercel-frontend-url>`

## Frontend on Vercel
1. Import GitHub repo into Vercel.
2. Set root to `nexthire-ai/client`.
3. Framework preset: Vite.
4. Add env var:
   - `VITE_API_BASE_URL=<render-backend-url>/api`
5. Deploy.

## Post Deployment Checklist
- Register a new account.
- Upload a PDF and run analysis.
- Open history page and verify saved records.
- Download PDF report from analysis page.
