# Satnam Kumar — Portfolio Architecture Plan

> **Status:** Planning Phase — Awaiting Approval  
> **Author:** Senior Full-Stack Architecture  
> **Date:** July 2, 2026

---

## Table of Contents

1. [Project Folder Structure](#1-project-folder-structure)
2. [UI/UX Design Plan](#2-uiux-design-plan)
3. [MongoDB Schema Design](#3-mongodb-schema-design)
4. [Express API Design](#4-express-api-design)
5. [Component Hierarchy](#5-component-hierarchy)
6. [Animation Strategy](#6-animation-strategy)
7. [Responsive Design Strategy](#7-responsive-design-strategy)
8. [Environment & Deployment](#8-environment--deployment)
9. [Implementation Phases](#9-implementation-phases)

---

## 1. Project Folder Structure

Monorepo-style layout with separate `frontend` and `backend` packages.

```
Portfolio/
├── README.md
├── docs/
│   └── ARCHITECTURE_PLAN.md
│
├── frontend/                          # Next.js App Router
│   ├── app/
│   │   ├── layout.tsx                 # Root layout, fonts, theme provider
│   │   ├── page.tsx                   # Single-page portfolio (all sections)
│   │   ├── loading.tsx                # Route-level loading UI
│   │   ├── not-found.tsx
│   │   └── globals.css                # Tailwind + CSS variables
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── ScrollProgressBar.tsx
│   │   │   └── BackToTop.tsx
│   │   │
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── ExperienceSection.tsx
│   │   │   ├── ProjectsSection.tsx
│   │   │   └── CertificationsSection.tsx
│   │   │
│   │   ├── ui/                        # Shadcn/UI components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── input.tsx
│   │   │   ├── skeleton.tsx
│   │   │   └── ...
│   │   │
│   │   ├── shared/
│   │   │   ├── SectionHeading.tsx
│   │   │   ├── AnimatedCounter.tsx
│   │   │   ├── SkillCard.tsx
│   │   │   ├── SoftSkillCard.tsx
│   │   │   ├── TimelineItem.tsx
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── CertificationCard.tsx
│   │   │   ├── GitHubRepoCard.tsx
│   │   │   ├── MagneticButton.tsx
│   │   │   ├── ThemeToggle.tsx
│   │   │   └── SocialLinks.tsx
│   │   │
│   │   └── effects/
│   │       ├── CursorGlow.tsx
│   │       ├── FloatingShapes.tsx
│   │       ├── ParticleBackground.tsx
│   │       ├── LoadingScreen.tsx
│   │       └── PageTransition.tsx
│   │
│   ├── hooks/
│   │   ├── useTheme.ts
│   │   ├── useScrollSpy.ts
│   │   ├── useMousePosition.ts
│   │   ├── useMediaQuery.ts
│   │   ├── useGitHub.ts
│   │   └── useProjects.ts
│   │
│   ├── context/
│   │   └── ThemeContext.tsx
│   │
│   ├── lib/
│   │   ├── utils.ts                   # cn() helper
│   │   └── constants.ts               # Nav links, social URLs, static copy
│   │
│   ├── animations/
│   │   ├── variants.ts                # Framer Motion variants
│   │   ├── gsap-config.ts             # GSAP ScrollTrigger setup
│   │   └── transitions.ts
│   │
│   ├── services/
│   │   ├── api.ts                     # Axios/fetch base client
│   │   ├── projectService.ts
│   │   ├── certificationService.ts
│   │   ├── experienceService.ts
│   │   ├── portfolioService.ts
│   │   └── githubService.ts           # GitHub REST API (client-side)
│   │
│   ├── utils/
│   │   ├── formatDate.ts
│   │   └── filterProjects.ts
│   │
│   ├── types/
│   │   ├── project.ts
│   │   ├── certification.ts
│   │   ├── experience.ts
│   │   ├── portfolio.ts
│   │   └── github.ts
│   │
│   ├── public/
│   │   ├── resume/
│   │   │   └── Satnam-Kumar-Resume.pdf
│   │   ├── certificates/
│   │   │   └── samsung-innovation-campus.pdf
│   │   ├── images/
│   │   │   ├── profile-placeholder.svg
│   │   │   └── projects/
│   │   └── favicon.ico
│   │
│   ├── components.json                # Shadcn config
│   ├── tailwind.config.ts
│   ├── next.config.ts
│   ├── tsconfig.json
│   ├── postcss.config.js
│   ├── .env.local.example
│   └── package.json
│
└── backend/                           # Express.js MVC
    ├── src/
    │   ├── index.ts                   # App entry, middleware, server start
    │   ├── app.ts                     # Express app configuration
    │   │
    │   ├── config/
    │   │   ├── db.ts                  # MongoDB connection
    │   │   └── env.ts                 # Validated env vars
    │   │
    │   ├── models/
    │   │   ├── Project.ts
    │   │   ├── Certification.ts
    │   │   ├── Experience.ts
    │   │   └── PortfolioInfo.ts
    │   │
    │   ├── controllers/
    │   │   ├── projectController.ts
    │   │   ├── certificationController.ts
    │   │   ├── experienceController.ts
    │   │   └── portfolioController.ts
    │   │
    │   ├── routes/
    │   │   ├── index.ts               # Route aggregator
    │   │   ├── projectRoutes.ts
    │   │   ├── certificationRoutes.ts
    │   │   ├── experienceRoutes.ts
    │   │   └── portfolioRoutes.ts
    │   │
    │   ├── middleware/
    │   │   ├── errorHandler.ts
    │   │   ├── validateRequest.ts
    │   │   ├── cors.ts
    │   │   └── rateLimiter.ts
    │   │
    │   ├── services/
    │   │   └── seedService.ts         # Initial data seeding
    │   │
    │   └── utils/
    │       ├── ApiError.ts
    │       └── asyncHandler.ts
    │
    ├── .env.example
    ├── tsconfig.json
    └── package.json
```

---

## 2. UI/UX Design Plan

### 2.1 Design Philosophy

**Aesthetic:** Refined minimalism with depth — inspired by Apple (clarity), Vercel (gradients & dark mode), Stripe (typography), Framer (motion), and Linear (precision spacing).

**Principles:**
- Content-first hierarchy — recruiter scans in 5 seconds
- Generous whitespace with intentional density in data sections
- Subtle motion that guides attention, never distracts
- Glass surfaces over animated gradients for depth without noise

### 2.2 Color Palette

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `--background` | `#FAFAFA` | `#0A0A0B` | Page background |
| `--foreground` | `#0F0F10` | `#FAFAFA` | Primary text |
| `--muted` | `#71717A` | `#A1A1AA` | Secondary text |
| `--primary` | `#6366F1` | `#818CF8` | CTAs, links, accents |
| `--primary-glow` | `#6366F1/20` | `#818CF8/15` | Glow effects |
| `--accent` | `#06B6D4` | `#22D3EE` | Highlights, gradients |
| `--surface` | `#FFFFFF/80` | `#18181B/80` | Glass cards |
| `--border` | `#E4E4E7` | `#27272A` | Subtle borders |
| `--gradient-start` | `#6366F1` | `#818CF8` | Hero gradient |
| `--gradient-end` | `#06B6D4` | `#22D3EE` | Hero gradient |

### 2.3 Typography

| Role | Font | Weight | Size (Desktop) |
|------|------|--------|----------------|
| Display | **Geist Sans** or **Inter** | 700–800 | 56–72px (Hero name) |
| Heading | Same | 600–700 | 32–48px |
| Body | Same | 400–500 | 16–18px |
| Mono (tags) | **Geist Mono** | 400 | 13–14px |

- Line height: 1.5 body, 1.1 display
- Letter spacing: `-0.02em` on large headings

### 2.4 Section Layout Wireframes

```
┌─────────────────────────────────────────────────────────┐
│  [Logo]  About  Experience  Projects  Certs  [GH][🌙]  │  ← Sticky glass navbar
├─────────────────────────────────────────────────────────┤
│                                                         │
│   Hello, I'm                                            │
│   ████ Satnam Kumar ████  ← animated gradient          │
│   B.Tech CSE Student | Typing roles...                  │
│                                                         │
│   [Glass Hero Card + Image]    [Floating shapes]        │
│   [View Projects] [Resume] [GitHub]                     │
│   ↓ scroll indicator                                    │
├─────────────────────────────────────────────────────────┤
│  ABOUT                                                  │
│  ┌──────────────┐  ┌─────────────────────────────────┐  │
│  │ Summary      │  │ Stats: Skills | Projects | ...  │  │
│  │ Education    │  │ Tech Skill Grid                 │  │
│  │ Soft Skills  │  │                                 │  │
│  └──────────────┘  └─────────────────────────────────┘  │
├─────────────────────────────────────────────────────────┤
│  EXPERIENCE — Vertical Timeline                         │
│  ● Python with AI Training — Level 1 (current)          │
│    └ learning tags                                      │
├─────────────────────────────────────────────────────────┤
│  PROJECTS                                               │
│  [Search] [Filter: All | C++ | Python]                  │
│  ┌─────────┐  ┌─────────┐                               │
│  │ Card 1  │  │ Card 2  │  ← tilt + hover border        │
│  └─────────┘  └─────────┘                               │
├─────────────────────────────────────────────────────────┤
│  CERTIFICATIONS                                         │
│  ┌─────────────────────────────────────┐                │
│  │ Samsung Innovation Campus Cert      │                │
│  │ [View] [Download]                   │                │
│  └─────────────────────────────────────┘                │
├─────────────────────────────────────────────────────────┤
│  GITHUB — Pinned repos + stats (from API)               │
├─────────────────────────────────────────────────────────┤
│  Footer — minimal, social links                         │
└─────────────────────────────────────────────────────────┘
```

### 2.5 Component Visual Specs

| Component | Style |
|-----------|-------|
| **Navbar** | `backdrop-blur-xl`, `bg-surface/70`, 1px bottom border, active pill indicator |
| **Hero Card** | Glassmorphism, soft shadow, rounded-2xl, profile image with gradient ring |
| **Skill Cards** | Icon + label, hover lift + border glow |
| **Soft Skill Cards** | Gradient border on hover, icon animation |
| **Project Cards** | 3D tilt (vanilla-tilt or custom), image top, tech badges, action buttons |
| **Timeline** | Vertical line with animated dot, stagger reveal |
| **Certification Card** | Certificate thumbnail, overlay actions |
| **Buttons** | Primary: gradient fill; Secondary: ghost with magnetic hover |

### 2.6 UX Flow

1. **Landing** → Immediate identity + role clarity + 3 CTAs
2. **Scroll** → Progress bar + section spy highlights nav
3. **Projects** → Search/filter without page reload
4. **GitHub** → Live data builds credibility
5. **Theme** → Persists; no flash on load (script in `<head>`)

### 2.7 Accessibility

- Semantic HTML (`<nav>`, `<main>`, `<section>`, heading hierarchy)
- `prefers-reduced-motion` disables heavy animations
- Focus-visible rings on all interactive elements
- ARIA labels on icon-only buttons
- Color contrast ≥ 4.5:1 (WCAG AA)
- Skip-to-content link

---

## 3. MongoDB Schema Design

Database name: `satnam_portfolio`

### 3.1 Project Collection

```typescript
// Collection: projects
{
  _id: ObjectId,
  title: String,              // "Student Grade Evaluation System"
  slug: String,               // "student-grade-evaluation-system" (unique, indexed)
  description: String,
  features: [String],
  technologies: [String],     // ["C++"]
  imageUrl: String,           // "/images/projects/grade-system.png"
  githubUrl: String,          // optional
  liveDemoUrl: String | null,
  featured: Boolean,          // default: true
  order: Number,              // display sort
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:** `{ slug: 1 }` unique, `{ technologies: 1 }`, `{ order: 1 }`

### 3.2 Certification Collection

```typescript
// Collection: certifications
{
  _id: ObjectId,
  name: String,               // "Samsung Innovation Campus Competition Certificate"
  slug: String,               // unique, indexed
  description: String,
  imageUrl: String,           // certificate preview image
  certificateUrl: String,     // PDF or external view link
  downloadUrl: String,        // direct download path
  issuer: String,             // "Samsung"
  issuedDate: Date,
  order: Number,
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:** `{ slug: 1 }` unique, `{ order: 1 }`

### 3.3 Experience Collection

```typescript
// Collection: experiences
{
  _id: ObjectId,
  title: String,              // "Python with AI Training"
  organization: String,       // optional training provider
  type: String,               // "training" | "internship" | "work"
  currentLevel: String,       // "Level 1"
  status: String,             // "current" | "completed"
  startDate: Date,
  endDate: Date | null,
  learning: [String],         // ["Python Programming", "AI Fundamentals", ...]
  description: String,
  order: Number,
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:** `{ status: 1 }`, `{ order: 1 }`

### 3.4 Portfolio Info Collection

Single-document collection for editable site metadata (optional admin use later).

```typescript
// Collection: portfolio_info (singleton)
{
  _id: ObjectId,
  name: String,               // "Satnam Kumar"
  title: String,              // "Aspiring Full-Stack Developer"
  tagline: String,
  about: String,              // full about paragraph
  education: {
    degree: String,           // "B.Tech in Computer Science Engineering"
    institution: String,
    status: String,           // "Currently in 4th Year"
  },
  roles: [String],            // typing animation roles
  skills: {
    programming: [String],
    web: [String],
    database: [String],
    tools: [String]
  },
  softSkills: [String],
  socialLinks: {
    github: String,
    linkedin: String | null,
    email: String | null
  },
  resumeUrl: String,
  stats: {
    projectsCount: Number,
    skillsCount: Number,
    certificationsCount: Number
  },
  updatedAt: Date
}
```

### 3.5 Seed Data Summary

| Collection | Initial Documents |
|------------|-------------------|
| `projects` | 2 (Grade System, Password Checker) |
| `certifications` | 1 (Samsung Innovation Campus) |
| `experiences` | 1 (Python with AI Training — Level 1) |
| `portfolio_info` | 1 (Satnam Kumar profile) |

---

## 4. Express API Design

**Base URL:** `http://localhost:5000/api/v1` (dev)  
**Production:** `https://satnam-portfolio-api.onrender.com/api/v1`

### 4.1 Standard Response Format

```json
// Success
{
  "success": true,
  "data": { ... } | [ ... ],
  "message": "Optional message"
}

// Error
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Title is required",
    "details": []
  }
}
```

### 4.2 Projects API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/projects` | List all projects (query: `?tech=C++&search=grade`) |
| `GET` | `/projects/:id` | Get single project by ID or slug |
| `POST` | `/projects` | Create project |
| `PUT` | `/projects/:id` | Update project |
| `DELETE` | `/projects/:id` | Delete project |

**GET /projects query params:**
- `search` — text search in title, description
- `technology` — filter by tech stack item
- `featured` — boolean filter

**POST/PUT body validation:**
```json
{
  "title": "required, string, max 120",
  "description": "required, string",
  "features": "array of strings",
  "technologies": "required, array, min 1",
  "githubUrl": "optional, valid URL",
  "liveDemoUrl": "optional, valid URL or null",
  "imageUrl": "optional, string"
}
```

### 4.3 Certifications API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/certifications` | List all certifications |
| `GET` | `/certifications/:id` | Get single certification |
| `POST` | `/certifications` | Create certification |
| `PUT` | `/certifications/:id` | Update certification |
| `DELETE` | `/certifications/:id` | Delete certification |

### 4.4 Experience API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/experiences` | List all experiences (sorted by order) |
| `GET` | `/experiences/:id` | Get single experience |
| `POST` | `/experiences` | Create experience |
| `PUT` | `/experiences/:id` | Update experience |
| `DELETE` | `/experiences/:id` | Delete experience |

### 4.5 Portfolio Info API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/portfolio` | Get portfolio singleton info |
| `PUT` | `/portfolio` | Update portfolio info |

### 4.6 Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Server + DB connection status |

### 4.7 Middleware Stack

```
Request
  → cors (frontend origin whitelist)
  → express.json()
  → rateLimiter (100 req/15min per IP)
  → routes
  → 404 handler
  → global errorHandler
```

### 4.8 GitHub Integration (Frontend Direct)

GitHub data fetched **client-side** from GitHub REST API (no backend proxy needed):

- `GET https://api.github.com/users/Satnam-dev`
- `GET https://api.github.com/users/Satnam-dev/repos?sort=updated&per_page=6`

Optional: cache in React Query / SWR with 5-minute stale time.

---

## 5. Component Hierarchy

```
App (layout.tsx)
├── ThemeProvider (context)
├── LoadingScreen (first visit only)
├── CursorGlow
├── ScrollProgressBar
│
├── Navbar
│   ├── Logo
│   ├── NavLinks (scroll spy active state)
│   ├── GitHubButton
│   ├── ThemeToggle
│   └── MobileMenu
│       └── AnimatedHamburger
│
├── main
│   ├── HeroSection
│   │   ├── ParticleBackground
│   │   ├── FloatingShapes
│   │   ├── GradientHeading
│   │   ├── TypingAnimation
│   │   ├── HeroGlassCard
│   │   │   └── ProfileImagePlaceholder
│   │   ├── CTAButtons (MagneticButton × 3)
│   │   ├── SocialLinks
│   │   └── ScrollDownIndicator
│   │
│   ├── AboutSection
│   │   ├── SectionHeading
│   │   ├── ProfessionalSummary
│   │   ├── EducationCard
│   │   ├── AnimatedStatistics
│   │   ├── TechnicalSkillsGrid
│   │   │   └── SkillCard (×N)
│   │   └── SoftSkillsGrid
│   │       └── SoftSkillCard (×7)
│   │
│   ├── ExperienceSection
│   │   ├── SectionHeading
│   │   └── Timeline
│   │       └── TimelineItem (×N, from API)
│   │
│   ├── ProjectsSection
│   │   ├── SectionHeading
│   │   ├── ProjectSearchFilter
│   │   ├── ProjectsGrid (Suspense + Skeleton)
│   │   │   └── ProjectCard (×N)
│   │   │       ├── TiltWrapper
│   │   │       ├── TechBadges
│   │   │       └── ActionLinks
│   │   └── EmptyState
│   │
│   ├── CertificationsSection
│   │   ├── SectionHeading
│   │   └── CertificationsGrid
│   │       └── CertificationCard (×N)
│   │
│   └── GitHubSection
│       ├── SectionHeading
│       ├── GitHubProfileCard
│       └── GitHubReposGrid
│           └── GitHubRepoCard (×N)
│
├── Footer
└── BackToTop
```

### Data Flow

```
MongoDB ← Mongoose ← Express Controllers ← REST API
                                              ↓
                                    frontend/services/*.ts
                                              ↓
                                    Custom Hooks (useProjects, etc.)
                                              ↓
                                    Section Components (client)
```

GitHub: `githubService.ts` → `useGitHub` hook → `GitHubSection`

---

## 6. Animation Strategy

### 6.1 Tool Assignment

| Use Case | Tool | Reason |
|----------|------|--------|
| Page enter, stagger lists, hover | **Framer Motion** | React-native, declarative |
| Scroll-triggered reveals | **Framer Motion** `whileInView` | Simpler than GSAP for most cases |
| Hero typing effect | **Custom + Framer** | Lightweight typewriter |
| Complex timeline scrub | **GSAP ScrollTrigger** | Only if needed for Experience |
| Magnetic buttons | **Framer Motion** `useMotionValue` | Performance |
| Particle background | **Canvas / CSS** | Avoid heavy libraries |
| Loading screen exit | **GSAP** | Smooth timeline once on mount |

**Rule:** Default to Framer Motion. GSAP only for LoadingScreen exit sequence and optional hero parallax.

### 6.2 Animation Variants (Framer Motion)

```typescript
// fadeInUp — sections, cards
{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }

// staggerContainer — grid children
{ visible: { transition: { staggerChildren: 0.1 } } }

// scaleIn — modals, cards on hover
{ rest: { scale: 1 }, hover: { scale: 1.02 } }

// slideInLeft / slideInRight — timeline alternating
```

### 6.3 Section Animation Map

| Section | Animation |
|---------|-----------|
| **Navbar** | Blur intensifies on scroll; link indicator slides |
| **Hero** | Stagger text reveal; gradient shift CSS; floating shapes `@keyframes`; particles canvas |
| **About** | Counter animate on viewport; skill cards stagger |
| **Experience** | Timeline line draws; dots pulse on current item |
| **Projects** | Cards fade-up stagger; tilt on mousemove; border gradient on hover |
| **Certifications** | Image reveal mask; button magnetic |
| **GitHub** | Repo cards slide-in; language bar width animate |
| **Global** | Scroll progress bar; back-to-top fade; cursor glow follow (desktop only) |

### 6.4 Performance Rules

- Use `transform` and `opacity` only (GPU-composited)
- `will-change` sparingly on hover elements
- Lazy load Framer Motion features via `LazyMotion` + `domAnimation`
- Disable CursorGlow + Particles on mobile
- Respect `prefers-reduced-motion: reduce` → instant transitions
- Skeleton loaders during API fetch (no layout shift)

### 6.5 Loading & Transitions

1. **Initial load:** Branded loading screen (1.5s max or until fonts ready)
2. **Data fetch:** Skeleton cards in Projects/Certifications
3. **Theme toggle:** CSS transition on `color`, `background-color` (200ms)
4. **No route transitions** (single page) — section scroll only

---

## 7. Responsive Design Strategy

### 7.1 Breakpoints (Tailwind)

| Breakpoint | Width | Layout Changes |
|------------|-------|----------------|
| `sm` | 640px | Stack hero CTAs row |
| `md` | 768px | 2-column grids; show desktop nav |
| `lg` | 1024px | Hero side-by-side; 3-col skill grid |
| `xl` | 1280px | Max container 1200px centered |
| `2xl` | 1536px | Larger hero typography |

### 7.2 Mobile-First Patterns

| Element | Mobile (<768px) | Desktop (≥768px) |
|---------|-----------------|------------------|
| Navbar | Hamburger + drawer | Horizontal links |
| Hero | Stacked: text → image → buttons | Split 60/40 layout |
| About | Single column | 2-column grid |
| Skills | 2-col grid | 4-col grid |
| Soft Skills | 1-col | 3-col |
| Projects | 1-col cards | 2-col grid |
| Timeline | Full-width vertical | Same, wider padding |
| GitHub repos | 1-col | 2–3 col |
| Cursor glow | Disabled | Enabled |
| Particles | Reduced count / off | Full |

### 7.3 Touch & Interaction

- Minimum tap target: 44×44px
- Hover effects have touch equivalents (active state)
- Mobile menu: full-screen overlay, body scroll lock
- Swipe-friendly horizontal scroll for tech badges if overflow

### 7.4 Typography Scale (Responsive)

```css
/* Hero name */
text-4xl sm:text-5xl md:text-6xl lg:text-7xl

/* Section headings */
text-2xl sm:text-3xl md:text-4xl

/* Body */
text-base md:text-lg
```

### 7.5 Image Strategy

- Next.js `<Image>` with `priority` on hero only
- WebP/AVIF via Next optimizer
- Placeholder blur for project/certificate images
- SVG for icons and decorative shapes

---

## 8. Environment & Deployment

### 8.1 Environment Variables

**Frontend (`.env.local`):**
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_GITHUB_USERNAME=Satnam-dev
```

**Backend (`.env`):**
```
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
CORS_ORIGIN=https://your-portfolio.vercel.app
```

### 8.2 Deployment Targets

| Layer | Platform | Notes |
|-------|----------|-------|
| Frontend | **Vercel** | Auto-deploy from Git; env vars in dashboard |
| Backend | **Render** or **Railway** | Web service; health check on `/api/v1/health` |
| Database | **MongoDB Atlas** | Free tier; IP whitelist 0.0.0.0/0 for cloud hosts |

---

## 9. Implementation Phases

After your approval, implementation will proceed in this order:

| Phase | Scope | Deliverable |
|-------|-------|-------------|
| **1** | Backend scaffold + MongoDB models + seed | Working REST APIs |
| **2** | Frontend scaffold + Shadcn + theme + layout | Navbar, theme, base styles |
| **3** | Hero + About sections | Landing + about complete |
| **4** | Experience + Projects (API integrated) | Timeline + CRUD display |
| **5** | Certifications + GitHub section | Full content |
| **6** | Animations polish + loading + effects | Premium feel |
| **7** | SEO, a11y, performance pass | Lighthouse optimization |
| **8** | README + env examples + deploy docs | Production-ready |

---

## Approval Checklist

Please review and confirm:

- [ ] Folder structure (monorepo: `frontend/` + `backend/`)
- [ ] UI/UX direction (glass + indigo/cyan palette, Geist/Inter typography)
- [ ] MongoDB schemas (4 collections)
- [ ] REST API endpoints (full CRUD for projects, certifications, experience)
- [ ] Component hierarchy (single-page, 5 sections + GitHub)
- [ ] Animation approach (Framer primary, GSAP minimal)
- [ ] Responsive breakpoints and mobile behavior

**Reply with approval or requested changes**, and full implementation will begin phase by phase.
