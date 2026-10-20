# ShowCase Product Gallery

A MERN-stack product gallery built to match the three activities in the NU MOA laboratory guide:

1. **Frontend:** React + Vite + Tailwind CSS; responsive gallery, product management, image preview, and add/edit/delete.
2. **Backend:** Express REST API + Mongoose/MongoDB Atlas; persistent product CRUD.
3. **Hosting:** GitHub repository, Render API, and Vercel website, connected through `VITE_API_URL`.

## Run locally

Requirements: Node.js 20.19+ (or 22.12+) and npm. MongoDB Atlas is needed for saved products.

1. Copy `server/.env.example` to `server/.env` and add your MongoDB Atlas connection string as `MONGO_URI`.
2. In a terminal:

   ```powershell
   cd server
   npm.cmd install
   npm.cmd start
   ```

3. In a second terminal:

   ```powershell
   cd client
   npm.cmd install
   npm.cmd run dev
   ```

4. Open the Vite URL shown in the terminal (normally `http://localhost:5173`).

Products are stored in MongoDB, so they remain after refreshing. Use **Manage** to add, edit, and delete. Images must be PNG, JPG/JPEG, or WebP and no larger than 1 MB.

## Deployment settings

The assignment's deployment settings are documented in `DEPLOYMENT.md`. The API expects `MONGO_URI` on Render. The Vercel client expects `VITE_API_URL` set to the Render service base URL (no trailing slash). Never commit `.env` or database credentials.

## Submission checklist from the guide

- Cover page: student name, section/year, GitHub repository URL, Render API URL, Vercel URL, and activity scores.
- Activity 1 screenshots: gallery with three products; Manage page while editing; VS Code sidebar with `components` and `pages`.
- Activity 2 screenshots: Atlas Network Access (`0.0.0.0/0`) and Database Access; VS Code `server` folder.
- Activity 3 screenshots: GitHub repository; Render showing Live; Thunder Client status 201; live Vercel site with 5+ products; site open on a phone.

Do not include credentials or `.env` files in screenshots or the public repository.
