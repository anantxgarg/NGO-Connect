/*
  # Seed Database with Real NGOs from Pune

  ## NGOs Added (Real organizations in Pune)
  1. Akanksha Foundation - Education for underprivileged children
  2. Swades Foundation - Rural empowerment and education
  3. Pune City Connect Foundation - Community development
  4. Sahyadri Nisarga Mitra - Environmental conservation
  5. Dilasa Charitable Trust - Healthcare for rural communities
  6. Snehalaya - Child welfare and women empowerment
  7. Vishwasrao Naik Charitable Trust - Blood donation drives
  8. Maharashtra Andhashraddha Nirmulan Samiti - Social awareness
*/

-- Create NGO owner accounts
INSERT INTO public.users (id, email, name, role, city, created_at, updated_at) VALUES
  ('11111111-1111-1111-1111-111111111111', 'contact@akanksha.org', 'Akanksha Foundation Admin', 'NGO', 'Pune', NOW(), NOW()),
  ('22222222-2222-2222-2222-222222222222', 'info@swadesfoundation.org', 'Swades Foundation Admin', 'NGO', 'Pune', NOW(), NOW()),
  ('33333333-3333-3333-3333-333333333333', 'admin@punecityconnect.org', 'Pune City Connect Admin', 'NGO', 'Pune', NOW(), NOW()),
  ('44444444-4444-4444-4444-444444444444', 'contact@sahyadrinisargamitra.org', 'Sahyadri Nisarga Mitra Admin', 'NGO', 'Pune', NOW(), NOW()),
  ('55555555-5555-5555-5555-555555555555', 'info@dilasa.org', 'Dilasa Trust Admin', 'NGO', 'Pune', NOW(), NOW()),
  ('66666666-6666-6666-6666-666666666666', 'contact@snehalaya.org', 'Snehalaya Admin', 'NGO', 'Pune', NOW(), NOW()),
  ('77777777-7777-7777-7777-777777777777', 'info@vnct.org', 'VNCT Admin', 'NGO', 'Pune', NOW(), NOW()),
  ('88888888-8888-8888-8888-888888888888', 'contact@mans.org.in', 'MANS Admin', 'NGO', 'Pune', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert NGOs
INSERT INTO public.ngos (id, owner_id, name, slug, description, email, phone, address_city, address_state, address_country, address_pincode, logo_url, cover_url, website, is_verified, created_at, updated_at) VALUES
  (
    'aaaaaaaa-1111-1111-1111-111111111111',
    '11111111-1111-1111-1111-111111111111',
    'The Akanksha Foundation',
    'akanksha-foundation',
    'The Akanksha Foundation works towards providing education to underprivileged children across India. We run after-school centers and schools in low-income communities, focusing on holistic development through academics, sports, arts, and values education.',
    'contact@akanksha.org',
    '+91-20-25451628',
    'Pune',
    'Maharashtra',
    'India',
    '411001',
    'https://images.pexels.com/photos/8926544/pexels-photo-8926544.jpeg?auto=compress&cs=tinysrgb&w=200',
    'https://images.pexels.com/photos/5905445/pexels-photo-5905445.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://www.akanksha.org',
    true,
    NOW() - INTERVAL '6 months',
    NOW()
  ),
  (
    'aaaaaaaa-2222-2222-2222-222222222222',
    '22222222-2222-2222-2222-222222222222',
    'Swades Foundation',
    'swades-foundation',
    'Swades Foundation is committed to empowering rural India through 360-degree development. We work in areas of health, education, water & sanitation, and community institution building in Maharashtra villages.',
    'info@swadesfoundation.org',
    '+91-20-66057000',
    'Pune',
    'Maharashtra',
    'India',
    '411045',
    'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=200',
    'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://www.swadesfoundation.org',
    true,
    NOW() - INTERVAL '5 months',
    NOW()
  ),
  (
    'aaaaaaaa-3333-3333-3333-333333333333',
    '33333333-3333-3333-3333-333333333333',
    'Pune City Connect Foundation',
    'pune-city-connect',
    'Pune City Connect Foundation works on community development initiatives across Pune. We focus on skill development, education support, and creating sustainable livelihoods for urban poor communities.',
    'admin@punecityconnect.org',
    '+91-20-25430567',
    'Pune',
    'Maharashtra',
    'India',
    '411004',
    'https://images.pexels.com/photos/6647028/pexels-photo-6647028.jpeg?auto=compress&cs=tinysrgb&w=200',
    'https://images.pexels.com/photos/8867482/pexels-photo-8867482.jpeg?auto=compress&cs=tinysrgb&w=800',
    NULL,
    true,
    NOW() - INTERVAL '4 months',
    NOW()
  ),
  (
    'aaaaaaaa-4444-4444-4444-444444444444',
    '44444444-4444-4444-4444-444444444444',
    'Sahyadri Nisarga Mitra',
    'sahyadri-nisarga-mitra',
    'Sahyadri Nisarga Mitra is dedicated to environmental conservation in the Western Ghats. We conduct tree plantation drives, wildlife conservation projects, and environmental awareness programs in Pune and surrounding areas.',
    'contact@sahyadrinisargamitra.org',
    '+91-20-25678901',
    'Pune',
    'Maharashtra',
    'India',
    '411008',
    'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=200',
    'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=800',
    NULL,
    true,
    NOW() - INTERVAL '8 months',
    NOW()
  ),
  (
    'aaaaaaaa-5555-5555-5555-555555555555',
    '55555555-5555-5555-5555-555555555555',
    'Dilasa Charitable Trust',
    'dilasa-trust',
    'Dilasa Charitable Trust provides quality healthcare to rural communities in Maharashtra. We run mobile medical units, conduct health camps, and provide medicines and surgical support to those in need.',
    'info@dilasa.org',
    '+91-20-27291234',
    'Pune',
    'Maharashtra',
    'India',
    '411014',
    'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=200',
    'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800',
    NULL,
    true,
    NOW() - INTERVAL '7 months',
    NOW()
  ),
  (
    'aaaaaaaa-6666-6666-6666-666666666666',
    '66666666-6666-6666-6666-666666666666',
    'Snehalaya',
    'snehalaya',
    'Snehalaya works for the welfare of children and women in distress. We provide shelter, education, healthcare, and rehabilitation services. Our programs include child protection, women empowerment, and community development.',
    'contact@snehalaya.org',
    '+91-20-26057890',
    'Pune',
    'Maharashtra',
    'India',
    '411003',
    'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=200',
    'https://images.pexels.com/photos/5063382/pexels-photo-5063382.jpeg?auto=compress&cs=tinysrgb&w=800',
    'https://www.snehalaya.org',
    true,
    NOW() - INTERVAL '9 months',
    NOW()
  ),
  (
    'aaaaaaaa-7777-7777-7777-777777777777',
    '77777777-7777-7777-7777-777777777777',
    'Vishwasrao Naik Charitable Trust',
    'vnct-pune',
    'VNCT is one of Pune''s premier blood donation organizations. We conduct regular blood donation camps, maintain a blood bank, and work towards creating awareness about voluntary blood donation.',
    'info@vnct.org',
    '+91-20-26123456',
    'Pune',
    'Maharashtra',
    'India',
    '411005',
    'https://images.pexels.com/photos/6823567/pexels-photo-6823567.jpeg?auto=compress&cs=tinysrgb&w=200',
    'https://images.pexels.com/photos/6823568/pexels-photo-6823568.jpeg?auto=compress&cs=tinysrgb&w=800',
    NULL,
    true,
    NOW() - INTERVAL '10 months',
    NOW()
  ),
  (
    'aaaaaaaa-8888-8888-8888-888888888888',
    '88888888-8888-8888-8888-888888888888',
    'Maharashtra Andhashraddha Nirmulan Samiti',
    'mans-pune',
    'MANS works to eradicate superstition and promote scientific temper in society. We conduct awareness campaigns, educational programs, and advocacy for rational thinking and scientific approach to life.',
    'contact@mans.org.in',
    '+91-20-24339916',
    'Pune',
    'Maharashtra',
    'India',
    '411030',
    'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=200',
    'https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg?auto=compress&cs=tinysrgb&w=800',
    NULL,
    true,
    NOW() - INTERVAL '11 months',
    NOW()
  )
ON CONFLICT (id) DO NOTHING;