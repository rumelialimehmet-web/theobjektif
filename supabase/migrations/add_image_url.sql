-- Add image_url column to products table
ALTER TABLE products
ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Add comment
COMMENT ON COLUMN products.image_url IS 'Public URL of the product image stored in Supabase Storage';
