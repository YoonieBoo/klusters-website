create table if not exists public.creator_signups (
  id uuid primary key default gen_random_uuid(),
  signup_type text,
  role_label text,
  display_name text,
  email text,
  location text,
  nickname text,
  university_program text,
  scholarship_student boolean,
  year text,
  phone_number text,
  line_id text,
  instagram_handle text,
  tiktok_handle text,
  other_platforms text,
  primary_creative_focus text,
  follower_count int4,
  experience_level text,
  hours_available int4,
  portfolio_links text,
  contribution text,
  interested_content_types text,
  additional_notes text,
  status text default 'pending_review',
  created_at timestamptz default now()
);

alter table public.creator_signups
  add column if not exists scholarship_student boolean;
