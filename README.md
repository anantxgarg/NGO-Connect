# NGO Connect

A modern web platform connecting verified NGOs with volunteers and donors to create meaningful social impact.
Built with Next.js 13.5, TypeScript, and Supabase.

## 🌍 Overview

NGO Connect bridges the gap between non-governmental organizations and people who want to make a difference.
The platform enables verified NGOs to post volunteer opportunities and donation needs while giving volunteers and donors a trusted space to discover and engage with causes they care about.

## ✨ Key Features
### 🔹 NGO Verification System
Admin-reviewed process ensuring legitimacy and trust.
### 🔹 Dual Post Types
Support for both volunteer drives and donation needs.
### 🔹 Role-Based Access Control
Separate interfaces for Users, NGOs, and Administrators.
### 🔹 Application Management
End-to-end workflow for volunteer applications.
### 🔹 Real-Time Notifications
Instant updates on application status and new opportunities.
### 🔹 Smart Search & Filtering
Find opportunities by category, location, and type.
### 🔹 Saved Posts
Bookmark interesting opportunities for later.
### 🔹 Contact System
Direct communication between users and NGOs.

## 🧩 Tech Stack
- Layer	Technology
- Framework	Next.js 13.5 (App Router)
- Language	TypeScript
- Styling	Tailwind CSS, shadcn/ui
- Database	PostgreSQL (via Supabase)
- Authentication	Supabase Auth
- Icons	Lucide React
- Date Handling	date-fns

## 🧠 Architecture Overview
The project follows a modular and type-safe structure using Server Actions for all database communication.
- Server Components → used by default for performance
- Client Components → explicitly marked with "use client" when needed
- Server Actions → located in /actions, safely execute database operations
- Supabase Integration → split between supabase.ts (server) and supabase-client.ts (client)

## ⚙️ Prerequisites
Ensure you have the following installed:
- Node.js v18.0+
- npm or yarn
- Git
- A Supabase account (free tier works perfectly)

## 🚀 Getting Started
1. Clone the Repository
```bash
git clone <your-repository-url>
cd ngo-connect\
```

2. Install Dependencies
```bash
npm install
```

3. Set Up Supabase

- Create a new project in your Supabase Dashboard.
- Navigate to Project Settings → API to find your credentials.

4. Configure Environment Variables

- Create a .env.local file in the project root:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```
5. Run Database Migrations

- Execute the following in your Supabase SQL Editor (in this order):
```bash
supabase/migrations/20251011051837_create_initial_schema.sql
#Creates all core tables and RLS policies

supabase/migrations/20251013040639_fix_auth_and_add_trigger.sql
#Syncs authentication between Supabase Auth and the users table

supabase/migrations/20251013040903_seed_pune_ngos_data.sql
#Adds sample NGO data

supabase/migrations/20251013040948_seed_posts_for_ngos.sql
#Adds sample posts
```

6. Start Development Server
```bash
npm run dev
```

Visit: http://localhost:3000

## 🧱 Project Structure
```
ngo-connect/
├── app/
│   ├── auth/                 # Authentication (sign-in / sign-up)
│   ├── dashboard/            # User dashboard
│   ├── ngo/                  # NGO pages and dashboards
│   ├── admin/                # Admin dashboard
│   ├── explore/              # Browse opportunities
│   ├── ngos/                 # NGO directory
│   ├── post/[id]/            # Post details
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/                   # shadcn/ui components
│   ├── shared/               # Reusable UI (navbar, cards, etc.)
│   └── post/                 # Post-specific buttons
├── actions/                  # Server actions (database ops)
├── contexts/                 # Context providers (e.g., Auth)
├── lib/                      # Supabase clients, types, utilities
└── supabase/
    └── migrations/           # SQL migrations
```

## 👥 User Roles
Role	Capabilities
- USER (Volunteer/Donor)	Browse NGOs, apply to drives, contact NGOs, save posts, manage applications
- NGO (Organization)	Create/manage NGO profile, post drives & donations, handle applications
- ADMIN	Verify NGOs, moderate posts, view audit logs & platform metrics
## 🔒 Security & Access Control
- Row Level Security (RLS) enabled for all tables.
- Users only see data they’re authorized for.
- Supabase Auth manages secure authentication and role assignment.
- Role-based route protection ensures isolated dashboards for each user type.
- Audit Logs track platform activity.
- RLS Policies prevent unauthorized access even from the client side.

## 🧾 Database Schema
- Table	Description
- users	Stores user accounts with roles (USER, NGO, ADMIN)
- ngos	Organization profiles, contact info, verification - - status
- posts	Volunteer drives & donation needs
- applications	Volunteer applications
- ngo_verifications	Admin-handled NGO verification
- contact_inquiries	Direct messages to NGOs
- notifications	Real-time user notifications
- saved_posts	User bookmarks
- audit_logs	Platform activity log
## 🧪 Data

Includes 8 verified NGOs from Pune, Maharashtra:

- Akanksha Foundation – Education

- Swades Foundation – Rural Empowerment

- Pune City Connect – Community Development

- Sahyadri Nisarga Mitra – Environment

- Dilasa Charitable Trust – Rural Healthcare

- Snehalaya – Child Welfare & Women Empowerment

- VNCT – Blood Donation Drives

- MANS – Scientific Awareness & Reform

Also includes 12 sample posts covering drives and donations (Education, Medical, Environment, Books, Clothes, Technology).

## 🛠️ Available Scripts
### Start development server
```bash
npm run dev
```
### Production build
```bash
npm run build
```
### Start production server
```bash
npm run start
```
### Run ESLint checks
```bash
npm run lint
```
### Type-check the codebase
```bash
npm run typecheck
```
## 💡 Development Guidelines

- Use server components by default. Add "use client" only when necessary.
- Place client-only logic (with useState/useEffect) in /components.
- Write all DB operations inside /actions with "use server".
- Maintain type safety using lib/database.types.ts.
- Follow Tailwind’s utility-first styling approach.
- Keep .env.local secure (never commit it).

## ☁️ Deployment

- Recommended: Deploy on Vercel (Next.js-native support).
- Push your code to GitHub/GitLab/Bitbucket
- Import the repo into Vercel
- Add environment variables in Project Settings
- Deploy

Vercel auto-detects build settings for Next.js.
- Database Migrations in Production
- Apply migrations first to a staging Supabase project.
- Test thoroughly, then apply to production.

## 🧰 Troubleshooting
- Issue	Possible Fix
- Auth not working	Run 20251013040639_fix_auth_and_add_trigger.sql
- RLS errors	Check Supabase Auth session and user roles
- Missing NGO data	Re-run seed migrations
- Build errors	Run npm run typecheck and npm run lint
## 🧑‍🤝‍🧑 Contributing

- Contributions are welcome!
- Before submitting a PR:
- Follow code style and directory conventions
- Include TypeScript types for new entities
- Test locally before committing
- Update docs for new features

## 📜 License

Licensed under the MIT License — see LICENSE file for details.

## ❤️ Acknowledgments

Built with the help of open-source tools:
Next.js, Supabase, shadcn/ui, and Tailwind CSS.
Special thanks to all contributors and NGOs inspiring real social change.

Built with ❤️ to empower NGOs and volunteers to create meaningful social impact.
