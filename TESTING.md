# Testing Guide

## Testing the Authentication System

### 1. Sign Up as a User

1. Navigate to `/auth/sign-up`
2. Fill in the form:
   - **Name**: Your name
   - **Email**: Any valid email (e.g., `user@example.com`)
   - **Password**: At least 6 characters
   - **Role**: Select "Volunteer / Donor"
3. Click "Create Account"
4. You should be redirected to `/dashboard`

### 2. Sign Up as an NGO

1. Navigate to `/auth/sign-up`
2. Fill in the form:
   - **Name**: Your NGO name
   - **Email**: Any valid email (e.g., `ngo@example.com`)
   - **Password**: At least 6 characters
   - **Role**: Select "NGO / Organization"
3. Click "Create Account"
4. You should be redirected to `/ngo/dashboard`

### 3. Sign In

1. Navigate to `/auth/sign-in`
2. Enter the email and password you used during sign up
3. Click "Sign In"
4. You should be redirected to the appropriate dashboard based on your role

### 4. View Seeded NGOs

1. Click "NGOs" in the navigation
2. You should see 8 verified NGOs from Pune:
   - The Akanksha Foundation
   - Swades Foundation
   - Pune City Connect Foundation
   - Sahyadri Nisarga Mitra
   - Dilasa Charitable Trust
   - Snehalaya
   - Vishwasrao Naik Charitable Trust
   - Maharashtra Andhashraddha Nirmulan Samiti

### 5. Browse Opportunities

1. Click "Explore" in the navigation
2. You should see 12 posts including:
   - Volunteer drives (DRIVE type)
   - Donation needs (DONATION type)
3. Posts include categories like:
   - Education
   - Medical
   - Environment
   - Books
   - Clothes
   - Technology

### 6. Test Authentication Persistence

1. Sign in with any account
2. Refresh the page
3. You should remain logged in
4. The navbar should show your profile icon instead of sign-in buttons

### 7. Test Sign Out

1. While logged in, click the user icon in the navbar
2. Click "Sign Out"
3. You should be redirected to the home page
4. The navbar should show "Sign In" and "Get Started" buttons

## Verifying Database Records

You can verify the seeded data by checking:

### NGOs
```sql
SELECT name, address_city, is_verified FROM ngos;
```
Should return 8 verified NGOs from Pune.

### Posts
```sql
SELECT title, type, category, location FROM posts;
```
Should return 12 posts with various types and categories.

### Users
```sql
SELECT email, name, role FROM users;
```
Should show the NGO admin accounts plus any users you created during testing.

## Expected Behavior

### Landing Page (/)
- Shows hero section with call-to-action buttons
- Displays featured opportunities (up to 6 posts)
- Shows verified NGOs (up to 4 NGOs)
- Footer with links

### Explore Page (/explore)
- Lists all open posts
- Shows post cards with images, NGO info, and details
- Empty state if no posts exist

### NGOs Page (/ngos)
- Lists all verified NGOs
- Shows NGO cards with logo, description, and location
- Empty state if no NGOs exist

### User Dashboard (/dashboard)
- Protected route (redirects to sign-in if not authenticated)
- Shows statistics cards (Applications, Saved Posts, Notifications)
- Tabs for My Applications, Saved Posts, and Notifications
- Empty states for each section

### NGO Dashboard (/ngo/dashboard)
- Protected route (only accessible by NGO role)
- Shows statistics cards (Active Posts, Applications, Views, Verification)
- Getting started card with action buttons

### Admin Dashboard (/admin/dashboard)
- Protected route (only accessible by ADMIN role)
- Shows platform statistics
- Cards for Total NGOs, Verified NGOs, Active Posts, Total Users

## Common Issues and Solutions

### Issue: "User not found" after sign up
**Solution**: The trigger that syncs auth.users with public.users might not have fired. Check if the user exists in the public.users table.

### Issue: Can't see seeded NGOs or posts
**Solution**: Run the seed migrations again or check if they were successfully applied.

### Issue: Redirected to home page when accessing dashboard
**Solution**: You might not be logged in. Try signing in again or check if the session is valid.

### Issue: Build errors
**Solution**: Make sure all dependencies are installed with `npm install` and check the console for specific error messages.

## Test Accounts

You can create test accounts with these credentials:

**User Account:**
- Email: `volunteer@test.com`
- Password: `test123`
- Role: USER

**NGO Account:**
- Email: `ngo@test.com`
- Password: `test123`
- Role: NGO

**Admin Account** (needs to be created manually in database):
- Email: `admin@ngoconnect.com`
- ID: `99999999-9999-9999-9999-999999999999`
- Role: ADMIN

Note: For admin testing, you need to manually create an auth.users record with the same email via Supabase dashboard.
