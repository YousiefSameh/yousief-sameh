-- 1. Enhance Tasks Table
alter table public.tasks 
add column if not exists type text check (type in ('feature', 'bug', 'chore', 'refactor', 'meeting', 'other')) default 'feature';

-- 2. Create Weekly Reports Table
create table if not exists public.weekly_reports (
  id uuid default gen_random_uuid() primary key,
  project_id uuid references public.projects(id) on delete cascade not null,
  title text not null,
  content text, -- Rich Text (HTML/Markdown)
  status text check (status in ('draft', 'published')) default 'draft',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Create Project Files Table
create table if not exists public.project_files (
  id uuid default gen_random_uuid() primary key,
  project_id uuid references public.projects(id) on delete cascade not null,
  name text not null,
  url text not null,
  resource_type text check (resource_type in ('file', 'link')) default 'file',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Enable RLS
alter table public.weekly_reports enable row level security;
alter table public.project_files enable row level security;

-- Policies
create policy "Allow generic access for authenticated users" on public.weekly_reports for all using (auth.role() = 'authenticated');
create policy "Allow generic access for authenticated users" on public.project_files for all using (auth.role() = 'authenticated');

-- Public Access Policies (for Portal via token lookup - typically handled via code bypassing RLS or specific public policies if table is public)
-- For this app pattern, we usually fetch server-side with admin rights or create a specific function.
-- Keeping RLS tight for now.
