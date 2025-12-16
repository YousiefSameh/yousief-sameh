-- Seed initial data for the platform

-- Insert default services
INSERT INTO services (title, slug, short_description, full_description, icon_name, display_order) VALUES
('SaaS Development', 'saas-development', 'Full-stack SaaS applications with modern architecture, authentication, and scalable infrastructure.', 'I build complete SaaS solutions from the ground up, including user authentication, subscription management, admin dashboards, and API integrations. Using Next.js, React, and modern backend technologies to create fast, scalable, and maintainable applications.', 'Layers', 1),
('Frontend Engineering', 'frontend-engineering', 'Pixel-perfect, responsive, and performant user interfaces with React and Next.js.', 'Creating beautiful, accessible, and highly performant frontend experiences. I focus on clean code, component architecture, and modern CSS techniques to deliver interfaces that look great and work flawlessly across all devices.', 'Layout', 2),
('Backend & API Development', 'backend-api', 'Robust APIs, database design, and server-side logic for your applications.', 'Building secure, well-documented RESTful APIs and backend services. I handle database design, authentication systems, third-party integrations, and ensure your backend is scalable and maintainable.', 'Server', 3),
('Landing Pages', 'landing-pages', 'High-converting, beautifully designed landing pages that capture attention.', 'Creating landing pages that convert visitors into customers. I focus on compelling design, fast load times, SEO optimization, and clear calls-to-action to maximize your conversion rates.', 'FileText', 4),
('E-commerce Solutions', 'e-commerce', 'Custom e-commerce platforms and integrations with payment systems.', 'Building custom e-commerce solutions tailored to your business needs. From product catalogs to checkout flows, payment processing, and order management systems.', 'ShoppingCart', 5)
ON CONFLICT (slug) DO NOTHING;

-- Insert default skills
INSERT INTO skills (name, category, icon_name, proficiency_level, display_order) VALUES
-- Frontend
('React', 'frontend', 'react', 95, 1),
('Next.js', 'frontend', 'nextjs', 95, 2),
('TypeScript', 'frontend', 'typescript', 90, 3),
('Tailwind CSS', 'frontend', 'tailwindcss', 95, 4),
('JavaScript', 'frontend', 'javascript', 95, 5),
('HTML/CSS', 'frontend', 'html5', 95, 6),
-- Backend
('Node.js', 'backend', 'nodejs', 85, 1),
('Express.js', 'backend', 'express', 80, 2),
('REST APIs', 'backend', 'api', 90, 3),
-- Database
('PostgreSQL', 'database', 'postgresql', 85, 1),
('Supabase', 'database', 'supabase', 90, 2),
('MongoDB', 'database', 'mongodb', 75, 3),
-- DevOps & Tools
('Git', 'devops', 'git', 90, 1),
('Vercel', 'devops', 'vercel', 95, 2),
('Docker', 'devops', 'docker', 70, 3),
-- Currently Learning
('Go', 'currently-learning', 'go', 40, 1),
('Rust', 'currently-learning', 'rust', 30, 2),
('AWS', 'currently-learning', 'aws', 50, 3)
ON CONFLICT DO NOTHING;

-- Insert site settings
INSERT INTO site_settings (key, value) VALUES
('hero_headline', 'Building high-quality web experiences with modern technologies.'),
('hero_subtext', 'A young, ambitious engineer turning complex problems into elegant solutions. Age is not a bug — it''s a feature.'),
('about_intro', 'I''m Yousief Sameh, a passionate full-stack developer based in Egypt. I started coding at a young age, driven by curiosity and a desire to build things that matter.'),
('contact_email', 'hello@yousiefsameh.com'),
('contact_whatsapp', '+201234567890'),
('github_url', 'https://github.com/yousiefsameh'),
('linkedin_url', 'https://linkedin.com/in/yousiefsameh'),
('twitter_url', 'https://twitter.com/yousiefsameh')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Insert sample project
INSERT INTO projects (title, slug, short_description, category, tech_stack, status, is_featured, year, problem, solution, learnings) VALUES
('Sample SaaS Platform', 'sample-saas-platform', 'A full-featured SaaS application with authentication, dashboard, and subscription management.', 'saas', ARRAY['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Stripe'], 'completed', true, 2024, 'Businesses needed an affordable, easy-to-use platform for managing their operations.', 'Built a comprehensive SaaS platform with user authentication, role-based access control, real-time dashboards, and integrated payment processing.', 'Learned advanced patterns for handling authentication flows, subscription states, and real-time data synchronization.')
ON CONFLICT (slug) DO NOTHING;

-- Insert sample blog post
INSERT INTO blog_posts (title, slug, excerpt, content, category, tags, reading_time_minutes, is_published, published_at) VALUES
('Why Age Is Not A Bug', 'why-age-is-not-a-bug', 'My journey as a young developer and why starting early is a superpower, not a limitation.', '# Why Age Is Not A Bug

When people learn my age, I often see a flash of surprise. "You''re so young to be doing this!" they say. But here''s what I''ve learned: age is not a bug in my career — it''s a feature.

## The Early Start Advantage

Starting young means I have more time to learn, fail, and grow. Every mistake is a lesson, and I have years ahead to apply those lessons.

## Discipline Over Talent

I believe in discipline over raw talent. Showing up every day, writing code, learning new things — that''s what matters. Age doesn''t determine your ability to be disciplined.

## Looking Forward

My goal is to prove that with the right mindset, anyone can build great things regardless of when they started. The best time to plant a tree was 20 years ago. The second best time is now.

---

Thanks for reading. Let''s build something amazing together.', 'personal-growth', ARRAY['career', 'mindset', 'journey'], 4, true, NOW())
ON CONFLICT (slug) DO NOTHING;
