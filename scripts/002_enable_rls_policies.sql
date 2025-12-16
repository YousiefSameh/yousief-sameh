-- Enable Row Level Security and create policies
-- Public tables allow read access, admin-only for write operations

-- Projects: Public read, admin write
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Projects are viewable by everyone" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Only authenticated users can insert projects" ON projects
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can update projects" ON projects
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can delete projects" ON projects
  FOR DELETE USING (auth.role() = 'authenticated');

-- Blog Posts: Public read for published, admin full access
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published blog posts are viewable by everyone" ON blog_posts
  FOR SELECT USING (is_published = true OR auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can insert blog posts" ON blog_posts
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can update blog posts" ON blog_posts
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can delete blog posts" ON blog_posts
  FOR DELETE USING (auth.role() = 'authenticated');

-- Services: Public read, admin write
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Services are viewable by everyone" ON services
  FOR SELECT USING (is_active = true OR auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can insert services" ON services
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can update services" ON services
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can delete services" ON services
  FOR DELETE USING (auth.role() = 'authenticated');

-- Testimonials: Public read for visible, admin write
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Visible testimonials are viewable by everyone" ON testimonials
  FOR SELECT USING (is_visible = true OR auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can insert testimonials" ON testimonials
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can update testimonials" ON testimonials
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can delete testimonials" ON testimonials
  FOR DELETE USING (auth.role() = 'authenticated');

-- Contact Submissions: Anyone can insert, only admin can read
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form" ON contact_submissions
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Only authenticated users can view submissions" ON contact_submissions
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can update submissions" ON contact_submissions
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can delete submissions" ON contact_submissions
  FOR DELETE USING (auth.role() = 'authenticated');

-- Client Projects: Admin only
ALTER TABLE client_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only authenticated users can manage client projects" ON client_projects
  FOR ALL USING (auth.role() = 'authenticated');

-- Allow public read by access_token (for client portal)
CREATE POLICY "Clients can view their project by token" ON client_projects
  FOR SELECT USING (true);

-- Client Project Tasks
ALTER TABLE client_project_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view tasks" ON client_project_tasks
  FOR SELECT USING (true);

CREATE POLICY "Only authenticated users can manage tasks" ON client_project_tasks
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can update tasks" ON client_project_tasks
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can delete tasks" ON client_project_tasks
  FOR DELETE USING (auth.role() = 'authenticated');

-- Client Project Updates
ALTER TABLE client_project_updates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view updates" ON client_project_updates
  FOR SELECT USING (true);

CREATE POLICY "Only authenticated users can manage updates" ON client_project_updates
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can delete updates" ON client_project_updates
  FOR DELETE USING (auth.role() = 'authenticated');

-- Client Project Files
ALTER TABLE client_project_files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view files" ON client_project_files
  FOR SELECT USING (true);

CREATE POLICY "Only authenticated users can manage files" ON client_project_files
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can delete files" ON client_project_files
  FOR DELETE USING (auth.role() = 'authenticated');

-- Skills: Public read, admin write
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Skills are viewable by everyone" ON skills
  FOR SELECT USING (is_visible = true OR auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can manage skills" ON skills
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can update skills" ON skills
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can delete skills" ON skills
  FOR DELETE USING (auth.role() = 'authenticated');

-- Site Settings: Public read, admin write
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Site settings are viewable by everyone" ON site_settings
  FOR SELECT USING (true);

CREATE POLICY "Only authenticated users can manage settings" ON site_settings
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can update settings" ON site_settings
  FOR UPDATE USING (auth.role() = 'authenticated');
