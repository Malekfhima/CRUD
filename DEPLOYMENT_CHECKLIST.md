# Deployment checklist

Backend (Heroku):

- Create Heroku app
- Set config vars: MONGO_URI, NODE_ENV=production
- Add Procfile: web: node server.js

Backend (Render/Railway):

- Create service, set environment variables, deploy from GitHub

Frontend (Netlify/Vercel/Surge):

- Build web: cd client && npm run build:web
- Upload `web-build` folder to host
- Add env var EXPO_PUBLIC_API_URL to point to backend

Security and production notes

- Use HTTPS endpoints and keep secrets (Mongo credentials) in platform env vars
- Consider rate-limiting and authentication for production
