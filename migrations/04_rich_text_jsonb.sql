-- Migration: Convert Rich Text columns to JSONB for Clean Architecture

-- 1. Weekly Reports
-- First, try to convert existing content. If it's empty string, make it null or empty JSON object.
-- If it's a JSON string, it will be CAST to jsonb.
-- If it's plain text (unlikely given previous logic), this might fail, so we use a safe approach if possible, 
-- but identifying "invalid" data in SQL is hard without functions.
-- We assume data is either valid JSON string or empty.

ALTER TABLE public.weekly_reports 
ALTER COLUMN content TYPE jsonb 
USING content::jsonb;

-- 2. Projects
-- Projects full_description
ALTER TABLE public.projects 
ALTER COLUMN full_description TYPE jsonb 
USING full_description::jsonb;

-- 3. Blog Posts
-- Blog posts content
ALTER TABLE public.blog_posts 
ALTER COLUMN content TYPE jsonb 
USING content::jsonb;
