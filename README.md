# Creative Storytelling & Painting for Children 🎨✨

A multilingual (Dutch, English, Farsi) workshop registration system for children's creative storytelling and painting workshops in Maastricht.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy on Railway

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push
```

### 2. Deploy on Railway
1. Go to [railway.app](https://railway.app)
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your repository
4. Railway will auto-detect Next.js and start deploying

### 3. Add PostgreSQL Database
1. In your Railway project, click **"+ New"** → **"Database"** → **"PostgreSQL"**
2. Railway will automatically inject the `DATABASE_URL` environment variable
3. Redeploy your app (it will auto-create the tables on first run)

### 4. Generate a Domain
1. Go to your app's **Settings** → **Networking**
2. Click **"Generate Domain"** to get a public URL

## Local Development

For local development, the app uses file-based storage (`data/registrations.json`).

To use PostgreSQL locally:
1. Copy `.env.example` to `.env.local`
2. Set your `DATABASE_URL`
3. Restart the dev server

## Features

- 🌐 Multilingual support (Dutch, English, Farsi)
- 📱 Responsive design
- 🎫 Workshop registration with capacity limits
- ⏳ Automatic waiting list when sessions are full
- 🗄️ PostgreSQL database for production

