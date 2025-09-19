-- OneLink Database Setup Script
-- Run this entire script in the Supabase SQL Editor

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  slug TEXT UNIQUE NOT NULL CHECK (char_length(slug) > 3 AND slug ~ '^[a-zA-Z0-9_-]+$'),
  full_name TEXT,
  bio TEXT CHECK (char_length(bio) < 250),
  avatar_url TEXT,
  status_message TEXT CHECK (char_length(status_message) < 100),
  kudos_count INT NOT NULL DEFAULT 0,
  theme_settings JSONB,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create blocks table
CREATE TABLE public.blocks (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  content JSONB NOT NULL,
  display_order SMALLINT DEFAULT 0
);

-- Create questions table
CREATE TABLE public.questions (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  answer_text TEXT,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create function to increment profile kudos count
CREATE OR REPLACE FUNCTION increment_profile_kudos(profile_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE public.profiles 
  SET kudos_count = kudos_count + 1 
  WHERE id = profile_id;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles table
-- Allow users to read all profiles (for public pages)
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

-- Allow users to insert/update their own profile
CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for blocks table
-- Allow users to read all blocks (for public pages)
CREATE POLICY "Blocks are viewable by everyone" ON public.blocks
  FOR SELECT USING (true);

-- Allow users to manage their own blocks
CREATE POLICY "Users can manage their own blocks" ON public.blocks
  FOR ALL USING (
    profile_id IN (
      SELECT id FROM public.profiles WHERE id = auth.uid()
    )
  );

-- RLS Policies for questions table
-- Allow users to read published questions for any profile
CREATE POLICY "Published questions are viewable by everyone" ON public.questions
  FOR SELECT USING (is_published = true);

-- Allow anyone to insert questions (for asking questions)
CREATE POLICY "Anyone can ask questions" ON public.questions
  FOR INSERT WITH CHECK (true);

-- Allow profile owners to manage questions on their profile
CREATE POLICY "Profile owners can manage their questions" ON public.questions
  FOR ALL USING (
    profile_id IN (
      SELECT id FROM public.profiles WHERE id = auth.uid()
    )
  );

-- Create indexes for better performance
CREATE INDEX idx_profiles_slug ON public.profiles(slug);
CREATE INDEX idx_blocks_profile_id ON public.blocks(profile_id);
CREATE INDEX idx_blocks_display_order ON public.blocks(profile_id, display_order);
CREATE INDEX idx_questions_profile_id ON public.questions(profile_id);
CREATE INDEX idx_questions_published ON public.questions(profile_id, is_published);
CREATE INDEX idx_questions_created_at ON public.questions(created_at DESC);

-- Insert sample data (optional - you can remove this section if you don't want sample data)
-- This creates a demo profile for testing
DO $$
DECLARE
  demo_user_id UUID;
BEGIN
  -- Create a demo user profile (only if you want sample data)
  -- You can remove this entire DO block if you don't want sample data
  
  -- Note: This assumes you have a user in auth.users table
  -- If you don't have any users yet, comment out this section
  
  /*
  SELECT id INTO demo_user_id FROM auth.users LIMIT 1;
  
  IF demo_user_id IS NOT NULL THEN
    INSERT INTO public.profiles (id, slug, full_name, bio, status_message, theme_settings)
    VALUES (
      demo_user_id,
      'demo-user',
      'Demo User',
      'This is a demo profile to showcase OneLink features.',
      'Welcome to my OneLink page!',
      '{
        "theme": "light",
        "primaryColor": "#3B82F6",
        "backgroundColor": "#FFFFFF",
        "textColor": "#1F2937",
        "font": "inter"
      }'::jsonb
    ) ON CONFLICT (id) DO NOTHING;
    
    -- Add sample blocks
    INSERT INTO public.blocks (profile_id, type, content, display_order)
    VALUES 
      (demo_user_id, 'link', '{"title": "My Website", "url": "https://example.com", "description": "Check out my personal website"}', 0),
      (demo_user_id, 'spotlight', '{"title": "Featured Project", "description": "This is my latest project that I am really excited about!", "image": "https://via.placeholder.com/600x300"}', 1);
    
    -- Add sample question
    INSERT INTO public.questions (profile_id, question_text, answer_text, is_published)
    VALUES (demo_user_id, 'What is OneLink?', 'OneLink is a platform that lets you create a beautiful page with all your links and content in one place!', true);
  END IF;
  */
END $$;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.profiles TO anon, authenticated;
GRANT ALL ON public.blocks TO anon, authenticated;
GRANT ALL ON public.questions TO anon, authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'OneLink database setup completed successfully!';
  RAISE NOTICE 'Tables created: profiles, blocks, questions';
  RAISE NOTICE 'RLS policies enabled for security';
  RAISE NOTICE 'Indexes created for performance';
  RAISE NOTICE 'You can now start using your OneLink application!';
END $$;