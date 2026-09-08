# 🏛️ Civic Trust Portal

> **Empowering Citizens Through Transparency & Access**  
> A citizen-first digital platform for legal awareness, government schemes, scholarships, jobs, and public accountability.

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF?style=flat-square)](https://clerk.com/)
[![Neon](https://img.shields.io/badge/Database-Neon_PostgreSQL-00E5FF?style=flat-square)](https://neon.tech/)
[![License](https://img.shields.io/badge/License-ISC-green?style=flat-square)](LICENSE)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Database Setup](#-database-setup)
- [Authentication Setup](#-authentication-setup)
- [API Routes](#-api-routes)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

---

## 🌟 Overview

The **Civic Trust Portal** is a full-stack Next.js web application designed to bridge the gap between citizens and public resources. It aggregates critical civic information — legal rights, government schemes, scholarships, internships, and jobs — into a single, easy-to-navigate platform.

The portal also features a **Transparency Dashboard** that enables citizens to track scheme progress, budget utilization, and government department performance in real time.

**Key Stats:**
- 🏛️ 500+ Government Schemes
- 🎓 1,200+ Scholarships
- 💼 10,000+ Job Listings
- ⚖️ 50+ Legal Resources

---

## ✨ Features

| Feature | Description |
|---|---|
| ⚖️ **Legal Rights** | Browse your fundamental rights across consumer, cyber, labour, and student law |
| 🎓 **Scholarships** | Discover scholarships from government & private institutions, filtered by eligibility |
| 💼 **Jobs & Internships** | Browse curated job and internship listings from verified sources |
| 🏛️ **Government Schemes** | Access a comprehensive directory of schemes with eligibility and application guides |
| 📊 **Transparency Dashboard** | Track scheme progress, budget utilization, and department performance metrics |
| 🤖 **AI Chatbot** | Get instant answers about rights, schemes, and resources powered by Google Gemini |
| 🔔 **Smart Notifications** | Real-time alerts for closing scholarships, new jobs, and scheme updates |
| 👤 **User Profile** | Personalized experience based on state, category, and preferences |
| 🌙 **Dark Mode** | Full light/dark theme support |

---

## 🛠️ Tech Stack

### Frontend
- **[Next.js 16](https://nextjs.org/)** — App Router with React Server Components
- **[React 19](https://react.dev/)** — Latest React with concurrent features
- **[TypeScript 5.7](https://www.typescriptlang.org/)** — Full type safety
- **[Tailwind CSS v4](https://tailwindcss.com/)** — Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** — Radix UI primitives with Tailwind
- **[Lucide React](https://lucide.dev/)** — Beautiful icon library
- **[Recharts](https://recharts.org/)** — Composable charting library for the transparency dashboard

### Backend & Database
- **[Neon PostgreSQL](https://neon.tech/)** — Serverless Postgres database
- **[Drizzle ORM](https://orm.drizzle.team/)** — Type-safe SQL ORM with schema migrations
- **[Supabase](https://supabase.com/)** — Storage and additional backend services

### Authentication
- **[Clerk](https://clerk.com/)** — Complete user authentication and management

### AI & Integrations
- **[Google Gemini AI](https://ai.google.dev/)** — Powering the civic chatbot
- **[Nodemailer](https://nodemailer.com/)** — Email notifications via SMTP

### Infrastructure
- **[Vercel](https://vercel.com/)** — Deployment and serverless functions
- **[Vercel Cron Jobs](https://vercel.com/docs/cron-jobs)** — Scheduled notification pipelines

---

## 📁 Project Structure

```
civic-trust-portal/
├── app/
│   ├── (dashboard)/            # Protected dashboard pages
│   │   ├── dashboard/          # Main dashboard overview
│   │   ├── jobs/               # Jobs & internships listing
│   │   ├── notifications/      # User notifications
│   │   ├── profile/            # User profile management
│   │   ├── rights/             # Legal rights browser
│   │   ├── schemes/            # Government schemes directory
│   │   ├── scholarships/       # Scholarships browser
│   │   └── transparency/       # Transparency KPI dashboard
│   ├── api/
│   │   ├── auth/               # Auth-related endpoints (OTP, sign-up)
│   │   ├── chat/               # Gemini AI chatbot endpoint
│   │   ├── cron/               # Scheduled notification jobs
│   │   └── notifications/      # Notification processing endpoints
│   ├── auth/                   # Clerk sign-in / sign-up pages
│   ├── login/                  # Public login redirect page
│   ├── layout.tsx              # Root layout with ClerkProvider
│   └── page.tsx                # Public landing page
│
├── components/
│   ├── landing/                # Landing page sections
│   │   ├── hero-section.tsx
│   │   ├── features-section.tsx
│   │   ├── how-it-works.tsx
│   │   └── sdg-section.tsx
│   ├── ui/                     # shadcn/ui component library
│   ├── chatbot.tsx             # AI chatbot widget
│   ├── dashboard-layout.tsx    # Dashboard wrapper with sidebar
│   ├── dashboard-sidebar.tsx   # Navigation sidebar
│   ├── navbar.tsx              # Public navbar with auth state
│   └── footer.tsx              # Site footer
│
├── lib/
│   └── db/
│       ├── index.ts            # Drizzle + Neon DB client
│       └── schema.ts           # Full database schema definitions
│
├── services/                   # Data fetching service layer
├── hooks/                      # Custom React hooks
├── types/                      # Shared TypeScript types
├── context/                    # React Context providers
├── styles/                     # Global styles
├── public/                     # Static assets
├── supabase/                   # Supabase config and migrations
├── scripts/                    # Utility scripts
│
├── drizzle.config.ts           # Drizzle ORM configuration
├── next.config.mjs             # Next.js configuration
├── vercel.json                 # Vercel deployment & cron config
└── tsconfig.json               # TypeScript configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** `>= 18.x`
- **pnpm** `>= 10.x` (this project enforces pnpm via `preinstall`)
- A **Neon PostgreSQL** database
- A **Clerk** account
- A **Supabase** project
- A **Google Gemini API** key

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/civic-trust-portal.git
cd civic-trust-portal
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Set Up Environment Variables

Copy the example environment file and fill in your values:

```bash
cp .env.local.example .env.local
```

See the [Environment Variables](#-environment-variables) section for all required keys.

### 4. Set Up the Database

Run Drizzle migrations to set up your Neon PostgreSQL schema:

```bash
pnpm drizzle-kit migrate
```

### 5. Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
# =============================================================================
# DATABASE (Neon PostgreSQL)
# Get this from: https://console.neon.tech
# =============================================================================
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require

# =============================================================================
# CLERK AUTHENTICATION
# Get these from: https://dashboard.clerk.com
# Use pk_live_... and sk_live_... for production!
# =============================================================================
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
WEBHOOK_SECRET=whsec_...

# =============================================================================
# SUPABASE
# Get these from: https://app.supabase.com/project/[id]/settings/api
# =============================================================================
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# =============================================================================
# EMAIL (SMTP)
# For Gmail: use an App Password (not your regular password)
# =============================================================================
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-specific-password
SMTP_FROM=your-email@gmail.com

# =============================================================================
# AI
# Get your Gemini API key from: https://aistudio.google.com/app/apikey
# =============================================================================
GEMINI_API_KEY=your_gemini_api_key

# =============================================================================
# APPLICATION
# =============================================================================
NEXT_PUBLIC_SITE_URL=http://localhost:3000   # Change to your domain in production

# =============================================================================
# SECURITY SECRETS
# Generate: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
# =============================================================================
CRON_SECRET=your_cron_secret
NOTIFICATION_PIPELINE_SECRET=your_notification_pipeline_secret

# =============================================================================
# NOTIFICATION SETTINGS
# =============================================================================
NOTIFICATION_CLOSING_SOON_DAYS=3
NOTIFICATION_RECENT_DAYS=7
```

---

## 🗄️ Database Setup

This project uses **Neon PostgreSQL** with **Drizzle ORM**.

### Schema Overview

| Table | Description |
|---|---|
| `profiles` | User profiles linked to Clerk user IDs |
| `rights` | Legal rights content by category |
| `schemes` | Government scheme directory |
| `scholarships` | Scholarship listings |
| `jobs` | Job and internship listings |
| `notifications` | Per-user notification records |
| `saved_opportunities` | User's saved jobs/scholarships/schemes |
| `transparency_kpis` | KPI metrics for the transparency dashboard |
| `scheme_progress` | Scheme target vs. achieved progress data |
| `department_scores` | Department performance scores |

### Running Migrations

```bash
# Generate migration files from schema changes
pnpm drizzle-kit generate

# Apply migrations to the database
pnpm drizzle-kit migrate

# Open Drizzle Studio (DB browser)
pnpm drizzle-kit studio
```

---

## 🔑 Authentication Setup

This project uses **Clerk** for authentication.

### Protected Routes

All dashboard routes are protected via Next.js middleware:

| Route | Status |
|---|---|
| `/` | ✅ Public |
| `/login` | ✅ Public |
| `/auth/sign-in` | ✅ Public |
| `/auth/sign-up` | ✅ Public |
| `/dashboard` | 🔒 Requires login |
| `/jobs`, `/rights`, `/schemes`, etc. | 🔒 Requires login |

### For Production

1. Go to your [Clerk Dashboard](https://dashboard.clerk.com)
2. Switch from **Development** to **Production** mode
3. Replace your `.env` keys:  
   `pk_test_...` → `pk_live_...`  
   `sk_test_...` → `sk_live_...`
4. Configure your **Clerk Webhook** pointing to:  
   `https://your-domain.com/api/auth/sign-up`

---

## 📡 API Routes

| Endpoint | Method | Description |
|---|---|---|
| `/api/auth/send-otp` | `POST` | Sends OTP via email (Nodemailer + Supabase) |
| `/api/auth/sign-up` | `POST` | Handles Clerk webhook on new user signup |
| `/api/chat` | `POST` | Streams AI responses from Google Gemini |
| `/api/notifications/login-success` | `POST` | Fires a notification on successful login |
| `/api/notifications/process` | `POST` | Processes and dispatches notifications |
| `/api/cron/notifications` | `GET` | Runs daily via Vercel Cron (midnight UTC) |

---

## 🚢 Deployment

This project is pre-configured for **Vercel** deployment via `vercel.json`.

### Deploy to Vercel

1. Push your code to a GitHub repository.
2. Import the repository at [vercel.com/new](https://vercel.com/new).
3. Configure all environment variables in the Vercel dashboard (copy from `.env.local`).
4. **Important**: Update these values for production:
   - `NEXT_PUBLIC_SITE_URL` → your actual domain
   - Clerk keys → switch to Live keys (`pk_live_...`, `sk_live_...`)
5. Deploy! Vercel will automatically run `pnpm build`.

### Cron Jobs

The following cron job is configured in `vercel.json` and runs automatically on Vercel:

| Schedule | Endpoint | Description |
|---|---|---|
| Daily at midnight UTC | `/api/cron/notifications` | Sends scholarship deadline alerts, job alerts, and scheme notifications |

> **Note:** Cron Jobs require a **Vercel Pro** plan or higher.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'feat: add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 🙏 Acknowledgements

- Built with [Next.js](https://nextjs.org/), [Clerk](https://clerk.com/), [Neon](https://neon.tech/), [Supabase](https://supabase.com/), and [Google Gemini](https://ai.google.dev/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Aligned with the UN Sustainable Development Goals (SDGs) for inclusive and transparent governance

---

<div align="center">
  <p>Made with ❤️ for every citizen</p>
</div>
