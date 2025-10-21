# RN Web + Express + MongoDB Sample App

This repository contains a full-stack CRUD example: React Native (Expo) with react-native-web frontend and a Node/Express + MongoDB backend using Mongoose.

Project layout

- `/server` - Express API
- `/client` - Expo React Native app (web + native)

Requirements

- Node 18+
- npm 9+ or yarn 1+
- Expo CLI (npm i -g expo-cli)
- MongoDB (Atlas or local)

Quick start

1. Start the backend

- cd server
- copy `.env.example` to `.env` and edit `MONGO_URI` (Atlas or local)
- npm install
- npm run dev

2. (Optional) Seed the database

- From `/server`: node seed.js

3. Start the frontend (web)

- cd client
- copy `.env.example` to `.env` if you want to override `EXPO_PUBLIC_API_URL`
- npm install
- npm run web

Notes: Expo web will run on port 19006 by default. The dev backend runs on 5000.

Environment variables

- Server: set MONGO_URI and PORT in `/server/.env`
- Client: set EXPO_PUBLIC_API_URL in `/client/.env` to point to your backend, e.g. `http://localhost:5000/api`

Curl examples

- See `curl_examples.sh` for ready-to-run curl commands (adapt to PowerShell syntax on Windows)

Testing

- Backend (Jest + mongodb-memory-server):

  - cd server
  - npm test

- Frontend (Jest + React Native Testing Library):
  - cd client
  - npm test

Deployment checklist

- Backend (Heroku/Render/Railway):

  1.  Ensure `MONGO_URI` points to your production MongoDB Atlas URI
  2.  Set `PORT` env var (platform provides one automatically)
  3.  Enable CORS to accept your frontend domain or set to `*` during testing
  4.  Add a Procfile for Heroku: `web: node server.js`

- Frontend (web):
  1.  Run `npm run build:web` in `/client` to produce a static web-build
  2.  Deploy `/client/web-build` to Netlify, Vercel, Surge or any static host
  3.  Set `EXPO_PUBLIC_API_URL` in your hosting environment to point to production API

Why these choices

- Expo with react-native-web lets you share most UI code between native and web while keeping developer experience fast.
- mongodb-memory-server makes backend tests hermetic and fast; avoids relying on networked DB in CI.

Troubleshooting (10 common errors and fixes)

1. "MongoNetworkError" — ensure MongoDB is running locally or Atlas IP whitelist includes your IP and MONGO_URI is correct.
2. CORS errors — configure CORS on server or add appropriate origin to allowed list.
3. Expo web shows blank page — run `expo start` and open the provided web URL; check browser console for errors.
4. Jest tests failing with environment issues — ensure NODE_ENV=test and dependencies installed; backend tests use mongodb-memory-server so no external DB needed.
5. EACCES / permission errors on npm install — run shell as admin or fix file permissions.
6. Port already in use — change PORT env var or kill process using the port.
7. Images not displaying — ensure `imageUrl` is a fully qualified URL or use local assets and import them via Expo assets.
8. Network requests failing from web to localhost backend — when testing on device, use machine IP instead of `localhost`.
9. React Navigation errors — ensure correct package versions and wrap in `NavigationContainer`.
10. Slow seed script — index creation or a large dataset can slow inserts; for sample data it's small.

API endpoints (base: http://localhost:5000)

- GET /api/items
- GET /api/items/:id
- POST /api/items
- PUT /api/items/:id
- DELETE /api/items/:id

Testing

- Backend: cd server; npm test
- Frontend: cd client; npm test

Deployment notes

- Backend: set MONGO_URI and PORT in environment; enable CORS for frontend origin
- Frontend: expo build:web -> host /web-build on Netlify/Vercel

Design choices

- Expo + react-native-web: fast cross-platform dev and single codebase
- mongodb-memory-server for CI-friendly tests with no external DB

Troubleshooting (see detailed section in the repo)
