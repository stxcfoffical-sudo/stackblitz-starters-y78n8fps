-- Run this in Supabase Dashboard > SQL Editor.
-- Row Level Security ensures members can only read their own applications.
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  application_type text not null,
  why_join text not null,
  experience text not null default '',
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

alter table public.applications enable row level security;

drop policy if exists "Members can read their own applications" on public.applications;
create policy "Members can read their own applications"
on public.applications for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Members can submit applications for themselves" on public.applications;
create policy "Members can submit applications for themselves"
on public.applications for insert
to authenticated
with check (auth.uid() = user_id and status = 'pending');

-- There is intentionally no public update/delete policy.
-- Review applications in the Supabase dashboard for now.
-- Do not expose a Supabase service-role key in browser code.
