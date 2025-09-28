-- Fix security issue: Restrict profile data access
-- Remove the overly permissive policy that allows everyone to read all profiles
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;

-- Create a secure policy that only allows users to view their own profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

-- For cases where we need limited public profile info (like displaying author names),
-- we can create a view with only non-sensitive fields if needed in the future
-- For now, we're securing all profile data to the profile owner only