-- 1. Create Clients Table
create table if not exists public.clients (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text,
  company text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Update Projects Table to support Clients and extended Logic
alter table public.projects 
add column if not exists client_id uuid references public.clients(id),
add column if not exists type text check (type in ('personal', 'client')) default 'personal',
add column if not exists access_token text, -- For client portal
add column if not exists start_date timestamp with time zone,
add column if not exists due_date timestamp with time zone,
add column if not exists budget numeric,
add column if not exists invoice_status text check (invoice_status in ('unpaid', 'paid', 'pending', 'cancelled'));

-- 3. Create Unified Tasks Table (replacing old ClientProjectTask concepts)
create table if not exists public.tasks (
  id uuid default gen_random_uuid() primary key,
  project_id uuid references public.projects(id) on delete cascade not null,
  title text not null,
  description text,
  status text check (status in ('backlog', 'todo', 'in-progress', 'review', 'done')) default 'todo',
  priority text check (priority in ('low', 'medium', 'high', 'urgent')) default 'medium',
  due_date timestamp with time zone,
  assignee_id uuid references auth.users(id), -- Optional: if you expand to team
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Enable RLS (Row Level Security) - standard boilerplate
alter table public.clients enable row level security;
alter table public.tasks enable row level security;

-- Policies (Adjust based on your Auth setup - assuming authenticated admin)
create policy "Allow generic access for authenticated users" on public.clients for all using (auth.role() = 'authenticated');
create policy "Allow generic access for authenticated users" on public.tasks for all using (auth.role() = 'authenticated');
