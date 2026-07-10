# Satnam Kumar — Portfolio

🌐 **Live Portfolio:** https://satnamkumar.vercel.app

Premium full-stack portfolio website built with **Next.js** (frontend) and **Express.js** (backend), connected to **MongoDB Atlas**.

## Project Structure

```
Portfolio/
├── frontend/     # Next.js App Router + TypeScript + Tailwind
├── backend/      # Express.js REST API + Mongoose
└── docs/         # Architecture documentation
```

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | Next.js, TypeScript, Tailwind CSS, Framer Motion, GSAP, Shadcn/UI, Lucide React |
| Backend | Node.js, Express.js, Express Router, MVC |
| Database | MongoDB Atlas, Mongoose |

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or MongoDB Atlas)

### 1. Backend Setup

```bash
cd backend
cp .env.example .env
npm install
npm run seed    # Seed database with portfolio data
npm run dev     # Starts on http://localhost:5000
```

### 2. Frontend Setup

```bash
cd frontend
cp .env.local.example .env.local
npm install
npm run dev     # Starts on http://localhost:3000
```

### Environment Variables

**Backend (`backend/.env`):**
```
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/satnam_portfolio
CORS_ORIGIN=http://localhost:3000
```

**Frontend (`frontend/.env.local`):**
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_GITHUB_USERNAME=Satnam-dev
```

## API Endpoints

Base URL: `http://localhost:5000/api/v1`

| Resource | Methods |
|----------|---------|
| `/projects` | GET, POST |
| `/projects/:id` | GET, PUT, DELETE |
| `/certifications` | GET, POST |
| `/certifications/:id` | GET, PUT, DELETE |
| `/experiences` | GET, POST |
| `/experiences/:id` | GET, PUT, DELETE |
| `/portfolio` | GET, PUT |
| `/health` | GET |

## Sections

1. **Landing Page** — Hero with typing animation, particles, glass card
2. **About** — Summary, education, skills, soft skills, stats
3. **Experience** — Animated timeline (Python with AI Training)
4. **Projects** — MongoDB-powered cards with search & filter
5. **Certifications** — Samsung Innovation Campus certificate
6. **GitHub** — Live profile & repository data

## Deployment

| Service | Platform |
|---------|----------|
| Frontend | Vercel |
| Backend | Render or Railway |
| Database | MongoDB Atlas |

Update `CORS_ORIGIN` and `NEXT_PUBLIC_API_URL` with production URLs before deploying.

## License

MIT
