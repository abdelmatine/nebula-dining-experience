-- Create test users with roles
-- First, create admin user role
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role
FROM auth.users 
WHERE email = 'admin@mondas.com'
ON CONFLICT (user_id, role) DO NOTHING;

-- Insert sample menu items if they don't exist
INSERT INTO public.menu_items (name, description, price, category, image_url, ingredients, allergens, nutrition, rating) VALUES
('Mediterranean Bowl', 'Fresh quinoa with grilled vegetables, olives, and tahini dressing', 16.99, 'bowls', 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop', ARRAY['quinoa', 'bell peppers', 'olives', 'tahini', 'cucumber'], ARRAY['sesame'], '{"calories": 450, "protein": 12, "carbs": 65, "fat": 18}', 4.5),
('Truffle Pasta', 'Handmade pasta with black truffle and parmesan cheese', 24.99, 'pasta', 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop', ARRAY['pasta', 'black truffle', 'parmesan', 'cream', 'garlic'], ARRAY['gluten', 'dairy'], '{"calories": 680, "protein": 22, "carbs": 78, "fat": 28}', 4.8),
('Grilled Salmon', 'Atlantic salmon with herb crust and seasonal vegetables', 28.99, 'seafood', 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop', ARRAY['salmon', 'herbs', 'asparagus', 'carrots', 'lemon'], ARRAY['fish'], '{"calories": 520, "protein": 45, "carbs": 15, "fat": 32}', 4.7),
('Beef Tenderloin', 'Premium grass-fed beef with red wine reduction', 34.99, 'meat', 'https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=300&fit=crop', ARRAY['beef tenderloin', 'red wine', 'shallots', 'thyme'], NULL, '{"calories": 620, "protein": 52, "carbs": 8, "fat": 38}', 4.9),
('Caesar Salad', 'Crisp romaine lettuce with house-made caesar dressing', 14.99, 'appetizers', 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400&h=300&fit=crop', ARRAY['romaine', 'parmesan', 'croutons', 'anchovies'], ARRAY['gluten', 'dairy', 'fish'], '{"calories": 320, "protein": 8, "carbs": 18, "fat": 24}', 4.3),
('Chocolate Fondant', 'Warm chocolate cake with molten center and vanilla ice cream', 12.99, 'desserts', 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop', ARRAY['dark chocolate', 'butter', 'eggs', 'vanilla ice cream'], ARRAY['gluten', 'dairy', 'eggs'], '{"calories": 480, "protein": 6, "carbs": 45, "fat": 28}', 4.6)
ON CONFLICT (name) DO NOTHING;

-- Insert sample events
INSERT INTO public.events (title, description, date, time, price, max_attendees, type, image_url) VALUES
('Wine Tasting Experience', 'Premium wine selection featuring carefully curated wines from renowned vineyards', '2025-01-11', '21:00:00', 45.00, 20, 'wine_tasting', 'https://images.unsplash.com/photo-1510972527921-ce03766a1cf1?w=400&h=300&fit=crop'),
('Chef''s Table Experience', 'Exclusive 7-course tasting menu with chef interaction', '2025-01-18', '19:00:00', 95.00, 12, 'chefs_table', 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop'),
('Live Jazz Evening', 'Dinner with live jazz music performance', '2025-01-25', '20:00:00', 25.00, 50, 'entertainment', 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop')
ON CONFLICT (title, date) DO NOTHING;