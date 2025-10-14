# NGO Connect - Bridge Between NGOs and Volunteers

A full-stack web platform connecting verified NGOs with volunteers and donors in Pune, Maharashtra.

## Features

### For Users (Volunteers/Donors)
- Browse verified NGOs and their active drives
- Apply for volunteer opportunities
- Contact NGOs for donations
- Track application status
- Save posts for later
- Real-time notifications

### For NGOs
- Create organization profile
- Post volunteer drives and donation needs
- Manage applications from volunteers
- Track engagement and views
- Get verified by admins

### For Admins
- Verify NGO registrations
- Moderate content
- View platform statistics
- Audit user activities

## Tech Stack

- **Frontend**: Next.js 13+ (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Next.js Server Actions
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Icons**: Lucide React

## Database

The platform includes 8 real NGOs from Pune:

1. **The Akanksha Foundation** - Education for underprivileged children
2. **Swades Foundation** - Rural empowerment and education
3. **Pune City Connect Foundation** - Community development
4. **Sahyadri Nisarga Mitra** - Environmental conservation
5. **Dilasa Charitable Trust** - Healthcare for rural communities
6. **Snehalaya** - Child welfare and women empowerment
7. **Vishwasrao Naik Charitable Trust** - Blood donation drives
8. **Maharashtra Andhashraddha Nirmulan Samiti** - Social awareness

Sample data includes 12 posts across categories like Education, Medical, Environment, Books, Clothes, and Technology.

## Getting Started

### Prerequisites
- Node.js 18+ installed
- Supabase account (already configured)

### Installation

1. Install dependencies:
```bash
npm install
```

2. The environment variables are already configured in `.env`

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm run start
```

## Authentication

The platform uses Supabase Auth with email/password authentication.

### To Sign Up:
1. Go to `/auth/sign-up`
2. Enter your details
3. Choose role: User or NGO
4. Submit to create account

### To Sign In:
1. Go to `/auth/sign-in`
2. Enter email and password
3. You'll be redirected to the appropriate dashboard based on your role

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages
│   ├── dashboard/         # User dashboard
│   ├── ngo/              # NGO dashboard
│   ├── admin/            # Admin dashboard
│   ├── explore/          # Browse opportunities
│   └── ngos/             # NGO directory
├── components/
│   ├── shared/           # Shared components
│   └── ui/               # UI components (shadcn)
├── lib/                  # Utilities and configs
│   ├── auth.ts          # Auth helpers
│   ├── database.types.ts # TypeScript types
│   ├── supabase.ts      # Supabase client (server)
│   └── supabase-client.ts # Supabase client (client)
├── actions/             # Server actions
│   ├── ngos.ts         # NGO-related actions
│   └── posts.ts        # Post-related actions
└── contexts/           # React contexts
    └── auth-context.tsx # Auth state management
```

## Database Schema

- **users** - User accounts with roles (USER, NGO, ADMIN)
- **ngos** - Organization profiles
- **posts** - Volunteer drives and donation needs
- **applications** - User applications to posts
- **ngo_verifications** - NGO verification records
- **contact_inquiries** - Messages to NGOs
- **notifications** - User notifications
- **saved_posts** - Bookmarked posts
- **audit_logs** - Activity audit trail

## Security

- Row Level Security (RLS) enabled on all tables
- Role-based access control
- Authenticated sessions via Supabase
- Secure password hashing
- CSRF protection

## Key Features Implemented

✅ Complete database schema with RLS policies
✅ Proper Supabase Auth integration with triggers
✅ Role-based authentication (USER, NGO, ADMIN)
✅ Beautiful, responsive UI with Tailwind CSS
✅ 8 verified NGOs from Pune with real information
✅ 12 sample posts (drives and donations)
✅ Server-side data fetching with Server Actions
✅ Type-safe database queries
✅ Mobile-responsive design

## What's Next

Future enhancements could include:
- Post detail pages with apply functionality
- NGO profile pages
- Post creation and management forms
- Application management (accept/reject)
- Search and advanced filtering
- File uploads for images and documents
- Email notifications
- Payment integration for donations
- Maps integration for locations

## License

This project is for educational purposes.
