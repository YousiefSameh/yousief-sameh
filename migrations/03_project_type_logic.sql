-- Migration: 03_project_type_logic
-- Description: Standardize project types, add visibility flags, and drop legacy client tables.

-- 1. Drop Legacy Tables
DROP TABLE IF EXISTS client_project_files;
DROP TABLE IF EXISTS client_project_updates;
DROP TABLE IF EXISTS client_project_tasks;
DROP TABLE IF EXISTS client_projects;

-- 2. Update Projects Table
-- Ensure type check constraint allows 'portfolio' and 'client'
ALTER TABLE projects DROP CONSTRAINT IF EXISTS projects_type_check;
ALTER TABLE projects ADD CONSTRAINT projects_type_check CHECK (type IN ('portfolio', 'client'));

-- Migrate existing 'personal' projects to 'portfolio'
UPDATE projects SET type = 'portfolio' WHERE type = 'personal';

-- Ensure client_id exists (it was added in 01_unify_projects.sql, but verifying)
-- ALTER TABLE projects ADD COLUMN IF NOT EXISTS client_id UUID REFERENCES clients(id) ON DELETE SET NULL;

-- 3. Update Tasks Table
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS is_client_visible BOOLEAN DEFAULT false;

-- 4. Update Clients Table
ALTER TABLE clients ADD COLUMN IF NOT EXISTS access_token TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS clients_access_token_idx ON clients(access_token);
