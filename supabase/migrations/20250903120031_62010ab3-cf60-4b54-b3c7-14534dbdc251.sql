-- Ensure enum exists
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Create table if not exists
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Policies for user_roles
DO $$ BEGIN
  DROP POLICY IF EXISTS "Users can view their roles" ON public.user_roles;
EXCEPTION WHEN undefined_object THEN NULL; END $$;
CREATE POLICY "Users can view their roles"
ON public.user_roles
FOR SELECT TO authenticated
USING (auth.uid() = user_id);

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;

-- Orders policies for admins
DO $$ BEGIN
  DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;
  DROP POLICY IF EXISTS "Admins can update all orders" ON public.orders;
EXCEPTION WHEN undefined_object THEN NULL; END $$;
CREATE POLICY "Admins can view all orders"
ON public.orders
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update all orders"
ON public.orders
FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Order items policies for admins
DO $$ BEGIN
  DROP POLICY IF EXISTS "Admins can view all order_items" ON public.order_items;
  DROP POLICY IF EXISTS "Admins can insert order_items via admin" ON public.order_items;
EXCEPTION WHEN undefined_object THEN NULL; END $$;
CREATE POLICY "Admins can view all order_items"
ON public.order_items
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert order_items via admin"
ON public.order_items
FOR INSERT TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Reservations policies for admins
DO $$ BEGIN
  DROP POLICY IF EXISTS "Admins can view all reservations" ON public.reservations;
  DROP POLICY IF EXISTS "Admins can update all reservations" ON public.reservations;
EXCEPTION WHEN undefined_object THEN NULL; END $$;
CREATE POLICY "Admins can view all reservations"
ON public.reservations
FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update all reservations"
ON public.reservations
FOR UPDATE TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
