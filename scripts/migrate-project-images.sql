-- Migration Script: Consolidate Project Images
-- This script updates all projects to use featured_image_url for both thumbnail and featured image
-- Run this BEFORE deploying the new form changes

-- Step 1: For projects that have thumbnail_url but no featured_image_url, copy thumbnail to featured
UPDATE projects 
SET featured_image_url = thumbnail_url
WHERE thumbnail_url IS NOT NULL 
  AND thumbnail_url != ''
  AND (featured_image_url IS NULL OR featured_image_url = '');

-- Step 2: For projects that have featured_image_url but no thumbnail_url, copy featured to thumbnail
UPDATE projects 
SET thumbnail_url = featured_image_url
WHERE featured_image_url IS NOT NULL 
  AND featured_image_url != ''
  AND (thumbnail_url IS NULL OR thumbnail_url = '');

-- Step 3: For projects with both images but they're different, keep featured_image_url for both
-- This ensures consistency (you can manually update specific projects later if needed)
UPDATE projects 
SET thumbnail_url = featured_image_url
WHERE featured_image_url IS NOT NULL 
  AND featured_image_url != ''
  AND thumbnail_url IS NOT NULL 
  AND thumbnail_url != ''
  AND thumbnail_url != featured_image_url;

-- Step 4: Verify the migration (check for any NULL values)
SELECT 
  id,
  title,
  thumbnail_url,
  featured_image_url,
  CASE 
    WHEN thumbnail_url = featured_image_url THEN 'Matched'
    WHEN thumbnail_url IS NULL AND featured_image_url IS NULL THEN 'Both NULL'
    ELSE 'Mismatch'
  END as status
FROM projects
ORDER BY status, id;

-- Optional Step 5: If you want to deprecate thumbnail_url column in the future
-- (Run this AFTER confirming everything works in production)
-- ALTER TABLE projects DROP COLUMN thumbnail_url;

-- Notes:
-- - This script preserves data by using featured_image_url as the source of truth
-- - Projects with different thumbnails/featured images will use the featured image for both
-- - You can manually update specific projects later if needed
-- - The thumbnail_url column remains for backward compatibility
