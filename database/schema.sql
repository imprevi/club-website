-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    role VARCHAR(20) DEFAULT 'member' CHECK (role IN ('admin', 'member', 'visitor')),
    discord_id VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    github_url TEXT,
    status VARCHAR(20) DEFAULT 'planning' CHECK (status IN ('planning', 'in_progress', 'completed', 'archived')),
    created_by UUID REFERENCES public.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create events table
CREATE TABLE IF NOT EXISTS public.events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    location VARCHAR(255),
    max_participants INTEGER,
    current_participants INTEGER DEFAULT 0,
    created_by UUID REFERENCES public.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create resources table
CREATE TABLE IF NOT EXISTS public.resources (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    url TEXT,
    file_url TEXT,
    category VARCHAR(20) DEFAULT 'other' CHECK (category IN ('datasheet', 'tutorial', 'tool', 'library', 'other')),
    created_by UUID REFERENCES public.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create event_participants table (many-to-many relationship)
CREATE TABLE IF NOT EXISTS public.event_participants (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    registered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(event_id, user_id)
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_resources_updated_at BEFORE UPDATE ON public.resources FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_participants ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view all profiles" ON public.users FOR SELECT USING (true);
CREATE POLICY "Users can insert own profile" ON public.users FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can update any profile" ON public.users FOR UPDATE USING (
    EXISTS (
        SELECT 1 FROM public.users 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- Projects policies
CREATE POLICY "Anyone can view projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create projects" ON public.projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update own projects" ON public.projects FOR UPDATE USING (auth.uid() = created_by);
CREATE POLICY "Admins can update any project" ON public.projects FOR UPDATE USING (
    EXISTS (
        SELECT 1 FROM public.users 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- Events policies
CREATE POLICY "Anyone can view events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create events" ON public.events FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update own events" ON public.events FOR UPDATE USING (auth.uid() = created_by);
CREATE POLICY "Admins can update any event" ON public.events FOR UPDATE USING (
    EXISTS (
        SELECT 1 FROM public.users 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- Resources policies
CREATE POLICY "Anyone can view resources" ON public.resources FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create resources" ON public.resources FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update own resources" ON public.resources FOR UPDATE USING (auth.uid() = created_by);
CREATE POLICY "Admins can update any resource" ON public.resources FOR UPDATE USING (
    EXISTS (
        SELECT 1 FROM public.users 
        WHERE id = auth.uid() AND role = 'admin'
    )
);

-- Event participants policies
CREATE POLICY "Anyone can view event participants" ON public.event_participants FOR SELECT USING (true);
CREATE POLICY "Authenticated users can register for events" ON public.event_participants FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can unregister from events" ON public.event_participants FOR DELETE USING (auth.uid() = user_id);

-- Function to handle user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, username, full_name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to automatically create user profile
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user(); 