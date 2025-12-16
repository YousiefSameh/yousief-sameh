# AWS S3 Migration Instructions

## Prerequisites

Before running the code changes, you need to:

1. **Set up Tigris S3 bucket** (or AWS S3)
2. **Add AWS credentials to .env**
3. **Run SQL migration script**

---

## Step 1: Configure Environment Variables

Add these variables to your `.env` file:

```env
# AWS/Tigris S3 Configuration
AWS_ACCESS_KEY_ID=your_access_key_id_here
AWS_SECRET_ACCESS_KEY=your_secret_access_key_here
AWS_S3_BUCKET_NAME=your_bucket_name_here
AWS_S3_REGION=auto
AWS_S3_ENDPOINT=https://fly.storage.tigris.dev
AWS_S3_FORCE_PATH_STYLE=true
```

**Get your Tigris credentials:**

1. Go to [Tigris Console](https://console.tigris.dev/)
2. Create a new bucket
3. Get your Access Key ID and Secret Access Key
4. Copy bucket name

---

## Step 2: Run SQL Migration

**IMPORTANT:** Run this SQL migration BEFORE deploying the new code.

This script consolidates thumbnail and featured images to use the same image for both.

### Option A: Using Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Open `scripts/migrate-project-images.sql`
4. Copy and paste the SQL into the editor
5. Click "Run"

### Option B: Using Command Line

```bash
# Using Supabase CLI
supabase db execute -f scripts/migrate-project-images.sql

# Or using psql directly
psql $DATABASE_URL -f scripts/migrate-project-images.sql
```

### What the migration does:

- ✅ Copies thumbnail_url to featured_image_url if missing
- ✅ Copies featured_image_url to thumbnail_url if missing
- ✅ Ensures both fields have the same value
- ✅ Uses featured_image_url as the source of truth

---

## Step 3: Verify Migration

After running the SQL script, verify the results:

```sql
SELECT
  id,
  title,
  thumbnail_url,
  featured_image_url,
  CASE
    WHEN thumbnail_url = featured_image_url THEN '✓ Matched'
    WHEN thumbnail_url IS NULL AND featured_image_url IS NULL THEN '⚠ Both NULL'
    ELSE '✗ Mismatch'
  END as status
FROM projects
ORDER BY status, id;
```

All projects should show "✓ Matched" status.

---

## Step 4: Deploy Code

Once the SQL migration is complete and environment variables are set:

1. Push code changes to your repository
2. Deploy to production (Vercel will automatically pick up new env vars)
3. Test image uploads on a new project

---

## Testing Checklist

### Upload Testing

- [ ] Create new project with single image
- [ ] Verify image uploads to Tigris S3
- [ ] Check image appears on project cards
- [ ] Check image appears on project detail page
- [ ] Test gallery images still work

### Performance Testing

- [ ] Compare upload speed (should be faster than Supabase)
- [ ] Verify image loading speed
- [ ] Check presigned URLs work correctly

---

## Rollback Plan

If you need to rollback:

1. **Code rollback**: Revert to previous commit
2. **Database**: The SQL migration is safe - both fields still exist and work

The migration is **non-destructive** - it only updates values, doesn't delete columns.

---

## Troubleshooting

**Error: "AWS credentials not configured"**

- Check `.env` file has all required AWS variables
- Restart Next.js dev server after adding env vars

**Error: "Access Denied"**

- Verify Tigris Access Key and Secret Key are correct
- Check bucket name matches exactly

**Error: "Upload failed"**

- Check S3 bucket exists
- Verify bucket allows PUT operations
- Check file size is under 5MB

**Images not displaying:**

- Verify presigned URLs are being generated correctly
- Check browser console for CORS errors
- Ensure bucket has public read access or presigned URLs enabled
