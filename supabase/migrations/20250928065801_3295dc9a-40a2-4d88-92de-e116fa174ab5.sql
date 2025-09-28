-- Create admin role system and secure contacts table (without conflicting trigger)
-- This fixes the security issue: Customer Contact Information Could Be Harvested by Spammers

-- 1. Create role enum for user types
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- 2. Create user_roles table to store role assignments
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- 3. Enable RLS on user_roles table
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 4. Create security definer function to check user roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- 5. Add RLS policies for user_roles table
-- Admins can see all role assignments
CREATE POLICY "Admins can view all user roles" ON public.user_roles
FOR SELECT 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Users can see their own roles
CREATE POLICY "Users can view their own roles" ON public.user_roles
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

-- Only admins can manage roles
CREATE POLICY "Admins can manage user roles" ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- 6. CRITICAL FIX: Secure contacts table to prevent data harvesting
-- Add admin-only SELECT policy 
CREATE POLICY "Only admins can view contact submissions" ON public.contacts
FOR SELECT 
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 7. Update profiles table to use the new role system instead of storing role directly
-- Remove the role column from profiles as it should be managed through user_roles table
ALTER TABLE public.profiles DROP COLUMN IF EXISTS role;