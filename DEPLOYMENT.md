# Deployment checklist (Activity 3)

Deployment requires accounts and user-controlled authorization for MongoDB Atlas, GitHub, Render, and Vercel. This project is prepared for those services; do not put passwords or database connection strings in chat or source control.

## 1. GitHub

Create a public repository named `showcase-gallery` without a README, then from this folder initialize/commit/push the project using your own GitHub account. Ensure `.env` and `node_modules` are excluded. The PDF's rubric requires the repository to contain both `client` and `server`.

## 2. MongoDB Atlas

Create a free cluster, create a database user, allow the Render service to connect, and copy the Node.js connection string. Replace `<db_password>` locally with the database user's password and add `/showcase` before the query string. Keep this URI private.

## 3. Render API

- New **Web Service**, connect `showcase-gallery`.
- Language: Node; branch: `main`; region: Singapore.
- Root Directory: `server`; Build Command: `npm install`; Start Command: `npm start`; plan: Free (as required in the guide).
- Add environment variable `MONGO_URI` with the Atlas URI.
- Deploy. Wait until logs show `MongoDB Atlas connected!` and the service is live.
- Verify `https://<your-render-service>.onrender.com/api/products` responds with `[]` or product JSON.

## 4. Vercel website

- Import `showcase-gallery` into Vercel.
- Root Directory: `client`; Framework Preset: Vite; Build Command: `npm run build`; Output Directory: `dist`.
- Add `VITE_API_URL` with the Render service base URL, without a trailing slash.
- Deploy and verify gallery CRUD, refresh persistence, and phone layout.

## 5. Final evidence

Follow the PDF's Activity 3 screenshot list: repository page, Render Live page, Thunder Client `201`, live site with 5+ products, and the website open on your phone. Record the GitHub, Render, and Vercel URLs on the cover page.
