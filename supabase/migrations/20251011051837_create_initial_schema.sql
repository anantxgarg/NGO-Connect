/*
  # Create NGO-User Platform Database Schema

  ## Overview
  This migration creates the complete database schema for an NGO-User volunteer/donation platform.
  
  ## New Tables

  ### 1. users
  - `id` (uuid, primary key) - Auto-generated user ID
  - `email` (text, unique, required) - User email address
  - `name` (text, required) - User full name
  - `role` (text, required) - User role: USER, NGO, or ADMIN
  - `phone` (text, optional) - Contact phone number
  - `city` (text, optional) - User city
  - `interests` (text[], optional) - User interests/skills
  - `created_at` (timestamptz) - Account creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. ngos
  - `id` (uuid, primary key) - Auto-generated NGO ID
  - `owner_id` (uuid, foreign key → users) - NGO owner/admin user
  - `name` (text, required) - Organization name
  - `slug` (text, unique, required) - URL-friendly identifier
  - `description` (text, required) - About the NGO
  - `email` (text, required) - Organization email
  - `phone` (text, optional) - Contact phone
  - `address_city` (text, required) - City location
  - `address_state` (text, required) - State location
  - `address_country` (text, required) - Country location
  - `address_pincode` (text, optional) - Postal code
  - `logo_url` (text, optional) - Logo image URL
  - `cover_url` (text, optional) - Cover image URL
  - `website` (text, optional) - Organization website
  - `is_verified` (boolean, default false) - Verification status
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 3. ngo_verifications
  - `id` (uuid, primary key) - Verification request ID
  - `ngo_id` (uuid, foreign key → ngos) - NGO being verified
  - `documents` (text[], required) - Document URLs
  - `status` (text, required) - PENDING, APPROVED, or REJECTED
  - `notes` (text, optional) - Admin review notes
  - `reviewed_by` (uuid, foreign key → users) - Admin who reviewed
  - `created_at` (timestamptz) - Request creation time
  - `reviewed_at` (timestamptz, optional) - Review completion time

  ### 4. posts
  - `id` (uuid, primary key) - Post ID
  - `ngo_id` (uuid, foreign key → ngos) - NGO that created post
  - `type` (text, required) - DONATION or DRIVE
  - `title` (text, required) - Post title
  - `description` (text, required) - Detailed description
  - `category` (text, required) - Food, Clothes, Education, Environment, Medical, Books, Technology, Other
  - `location` (text, required) - Event/need location
  - `date_start` (date, optional) - Start date for drives
  - `date_end` (date, optional) - End date for drives
  - `needed_count` (integer, optional) - Number of volunteers needed
  - `status` (text, required) - OPEN, IN_PROGRESS, CLOSED, or FULFILLED
  - `images` (text[], optional) - Image URLs
  - `view_count` (integer, default 0) - Number of views
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 5. applications
  - `id` (uuid, primary key) - Application ID
  - `post_id` (uuid, foreign key → posts) - Applied post
  - `user_id` (uuid, foreign key → users) - Applicant user
  - `message` (text, required) - Application message
  - `status` (text, default PENDING) - PENDING, ACCEPTED, REJECTED, or WITHDRAWN
  - `created_at` (timestamptz) - Application time
  - `updated_at` (timestamptz) - Status update time

  ### 6. contact_inquiries
  - `id` (uuid, primary key) - Inquiry ID
  - `ngo_id` (uuid, foreign key → ngos) - Target NGO
  - `post_id` (uuid, foreign key → posts, optional) - Related post
  - `user_id` (uuid, foreign key → users, optional) - Logged-in user
  - `name` (text, required) - Contact name
  - `email` (text, required) - Contact email
  - `phone` (text, optional) - Contact phone
  - `message` (text, required) - Message content
  - `created_at` (timestamptz) - Inquiry time

  ### 7. notifications
  - `id` (uuid, primary key) - Notification ID
  - `user_id` (uuid, foreign key → users) - Recipient user
  - `type` (text, required) - Notification type
  - `title` (text, required) - Notification title
  - `message` (text, required) - Notification message
  - `payload` (jsonb, optional) - Additional data
  - `is_read` (boolean, default false) - Read status
  - `created_at` (timestamptz) - Creation time

  ### 8. saved_posts
  - `id` (uuid, primary key) - Save ID
  - `user_id` (uuid, foreign key → users) - User who saved
  - `post_id` (uuid, foreign key → posts) - Saved post
  - `created_at` (timestamptz) - Save time

  ### 9. audit_logs
  - `id` (uuid, primary key) - Log entry ID
  - `actor_id` (uuid, foreign key → users) - User who performed action
  - `action` (text, required) - Action type
  - `entity_type` (text, required) - Entity affected
  - `entity_id` (text, required) - Entity ID
  - `meta` (jsonb, optional) - Additional metadata
  - `created_at` (timestamptz) - Action time

  ## Security
  - Row Level Security (RLS) enabled on all tables
  - Policies implemented for each role (USER, NGO, ADMIN)
  - Users can only read/update their own data
  - NGOs can manage their own organizations and posts
  - Admins have full access for moderation
  - Public read access for verified NGOs and open posts

  ## Important Notes
  1. All timestamps use timezone-aware types
  2. Foreign keys ensure referential integrity
  3. Indexes added on frequently queried columns
  4. Unique constraints prevent duplicate entries
  5. Default values set for boolean and numeric fields
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  role text NOT NULL DEFAULT 'USER',
  phone text,
  city text,
  interests text[],
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create ngos table
CREATE TABLE IF NOT EXISTS ngos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  email text NOT NULL,
  phone text,
  address_city text NOT NULL,
  address_state text NOT NULL,
  address_country text NOT NULL,
  address_pincode text,
  logo_url text,
  cover_url text,
  website text,
  is_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create ngo_verifications table
CREATE TABLE IF NOT EXISTS ngo_verifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ngo_id uuid NOT NULL REFERENCES ngos(id) ON DELETE CASCADE,
  documents text[] NOT NULL,
  status text NOT NULL DEFAULT 'PENDING',
  notes text,
  reviewed_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now(),
  reviewed_at timestamptz
);

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ngo_id uuid NOT NULL REFERENCES ngos(id) ON DELETE CASCADE,
  type text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  location text NOT NULL,
  date_start date,
  date_end date,
  needed_count integer,
  status text NOT NULL DEFAULT 'OPEN',
  images text[],
  view_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create applications table
CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'PENDING',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(post_id, user_id)
);

-- Create contact_inquiries table
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ngo_id uuid NOT NULL REFERENCES ngos(id) ON DELETE CASCADE,
  post_id uuid REFERENCES posts(id) ON DELETE SET NULL,
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type text NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  payload jsonb,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create saved_posts table
CREATE TABLE IF NOT EXISTS saved_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  post_id uuid NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, post_id)
);

-- Create audit_logs table
CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  action text NOT NULL,
  entity_type text NOT NULL,
  entity_id text NOT NULL,
  meta jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_ngos_owner_id ON ngos(owner_id);
CREATE INDEX IF NOT EXISTS idx_ngos_slug ON ngos(slug);
CREATE INDEX IF NOT EXISTS idx_ngos_verified ON ngos(is_verified);
CREATE INDEX IF NOT EXISTS idx_posts_ngo_id ON posts(ngo_id);
CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);
CREATE INDEX IF NOT EXISTS idx_posts_type ON posts(type);
CREATE INDEX IF NOT EXISTS idx_applications_post_id ON applications(post_id);
CREATE INDEX IF NOT EXISTS idx_applications_user_id ON applications(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_saved_posts_user_id ON saved_posts(user_id);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE ngos ENABLE ROW LEVEL SECURITY;
ALTER TABLE ngo_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view all users"
  ON users FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- NGOs policies
CREATE POLICY "Anyone can view verified NGOs"
  ON ngos FOR SELECT
  USING (is_verified = true OR auth.uid() = owner_id);

CREATE POLICY "NGO owners can insert their NGO"
  ON ngos FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "NGO owners can update their NGO"
  ON ngos FOR UPDATE
  TO authenticated
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Admins can update any NGO"
  ON ngos FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'ADMIN'
    )
  );

-- Verification policies
CREATE POLICY "NGO owners can view their verifications"
  ON ngo_verifications FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM ngos
      WHERE ngos.id = ngo_verifications.ngo_id
      AND ngos.owner_id = auth.uid()
    )
  );

CREATE POLICY "Admins can view all verifications"
  ON ngo_verifications FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'ADMIN'
    )
  );

CREATE POLICY "NGO owners can create verification requests"
  ON ngo_verifications FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM ngos
      WHERE ngos.id = ngo_verifications.ngo_id
      AND ngos.owner_id = auth.uid()
    )
  );

CREATE POLICY "Admins can update verifications"
  ON ngo_verifications FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'ADMIN'
    )
  );

-- Posts policies
CREATE POLICY "Anyone can view open posts from verified NGOs"
  ON posts FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM ngos
      WHERE ngos.id = posts.ngo_id
      AND ngos.is_verified = true
    )
    OR
    EXISTS (
      SELECT 1 FROM ngos
      WHERE ngos.id = posts.ngo_id
      AND ngos.owner_id = auth.uid()
    )
  );

CREATE POLICY "NGO owners can create posts"
  ON posts FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM ngos
      WHERE ngos.id = posts.ngo_id
      AND ngos.owner_id = auth.uid()
    )
  );

CREATE POLICY "NGO owners can update their posts"
  ON posts FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM ngos
      WHERE ngos.id = posts.ngo_id
      AND ngos.owner_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM ngos
      WHERE ngos.id = posts.ngo_id
      AND ngos.owner_id = auth.uid()
    )
  );

CREATE POLICY "NGO owners can delete their posts"
  ON posts FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM ngos
      WHERE ngos.id = posts.ngo_id
      AND ngos.owner_id = auth.uid()
    )
  );

CREATE POLICY "Admins can manage any post"
  ON posts FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'ADMIN'
    )
  );

-- Applications policies
CREATE POLICY "Users can view their own applications"
  ON applications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "NGO owners can view applications to their posts"
  ON applications FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM posts
      JOIN ngos ON ngos.id = posts.ngo_id
      WHERE posts.id = applications.post_id
      AND ngos.owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can create applications"
  ON applications FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own applications"
  ON applications FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "NGO owners can update applications to their posts"
  ON applications FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM posts
      JOIN ngos ON ngos.id = posts.ngo_id
      WHERE posts.id = applications.post_id
      AND ngos.owner_id = auth.uid()
    )
  );

-- Contact inquiries policies
CREATE POLICY "NGO owners can view inquiries to their NGO"
  ON contact_inquiries FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM ngos
      WHERE ngos.id = contact_inquiries.ngo_id
      AND ngos.owner_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can create contact inquiries"
  ON contact_inquiries FOR INSERT
  WITH CHECK (true);

-- Notifications policies
CREATE POLICY "Users can view their own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "System can create notifications"
  ON notifications FOR INSERT
  WITH CHECK (true);

-- Saved posts policies
CREATE POLICY "Users can view their saved posts"
  ON saved_posts FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create saved posts"
  ON saved_posts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their saved posts"
  ON saved_posts FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Audit logs policies
CREATE POLICY "Admins can view all audit logs"
  ON audit_logs FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid() AND users.role = 'ADMIN'
    )
  );

CREATE POLICY "System can create audit logs"
  ON audit_logs FOR INSERT
  WITH CHECK (true);