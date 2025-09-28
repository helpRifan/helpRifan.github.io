-- Create contacts table for contact form submissions
CREATE TABLE public.contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on contacts table
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Create policy for contacts (admin can view all, users can insert)
CREATE POLICY "Anyone can submit contact form" 
ON public.contacts 
FOR INSERT 
WITH CHECK (true);

-- Create projects table for dynamic project showcase
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  technologies TEXT[] NOT NULL,
  github_url TEXT,
  live_url TEXT,
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  category TEXT DEFAULT 'personal',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on projects table
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Create policy for projects (publicly readable)
CREATE POLICY "Projects are publicly readable" 
ON public.projects 
FOR SELECT 
USING (true);

-- Create visitor analytics table
CREATE TABLE public.page_visits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT NOT NULL,
  user_agent TEXT,
  referrer TEXT,
  ip_address INET,
  visited_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on page_visits table
ALTER TABLE public.page_visits ENABLE ROW LEVEL SECURITY;

-- Create policy for page visits (anyone can insert)
CREATE POLICY "Anyone can log page visits" 
ON public.page_visits 
FOR INSERT 
WITH CHECK (true);

-- Create profiles table for user authentication
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Public profiles are viewable by everyone" 
ON public.profiles 
FOR SELECT 
USING (true);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, email)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'full_name',
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for new user profiles
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample projects
INSERT INTO public.projects (title, description, technologies, github_url, live_url, featured, category) VALUES
('AI-Powered Chatbot', 'Intelligent conversational AI built with Python and TensorFlow, featuring natural language processing and machine learning capabilities.', ARRAY['Python', 'TensorFlow', 'NLP', 'Flask'], 'https://github.com/student/ai-chatbot', 'https://ai-chatbot-demo.vercel.app', true, 'AI/ML'),
('Smart IoT Home System', 'Complete home automation system using Arduino, Raspberry Pi, and mobile app integration for controlling lights, temperature, and security.', ARRAY['Arduino', 'Raspberry Pi', 'React Native', 'Python'], 'https://github.com/student/smart-home', null, true, 'IoT'),
('E-commerce Web App', 'Full-stack e-commerce platform with user authentication, payment integration, and admin dashboard.', ARRAY['React', 'Node.js', 'MongoDB', 'Stripe'], 'https://github.com/student/ecommerce-app', 'https://ecommerce-demo.netlify.app', false, 'Web Dev'),
('Data Visualization Dashboard', 'Interactive dashboard for analyzing and visualizing large datasets with real-time updates and custom charts.', ARRAY['D3.js', 'React', 'Python', 'PostgreSQL'], 'https://github.com/student/data-viz', null, false, 'Data Science'),
('Mobile Game Development', 'Cross-platform mobile game built with Unity featuring physics-based gameplay and multiplayer capabilities.', ARRAY['Unity', 'C#', 'Firebase'], 'https://github.com/student/mobile-game', null, false, 'Game Dev'),
('Blockchain Voting System', 'Secure and transparent voting application using blockchain technology and smart contracts.', ARRAY['Solidity', 'Web3.js', 'React', 'Ethereum'], 'https://github.com/student/blockchain-voting', null, false, 'Blockchain');