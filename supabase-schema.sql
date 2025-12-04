-- THE OBJEKTIF SUPABASE SCHEMA
-- Bu dosyayı Supabase SQL Editor'e kopyala-yapıştır yaparak çalıştırın

-- Kategoriler Tablosu
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  parent_id UUID REFERENCES categories(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Ürünler Tablosu
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- Kategori slug'ı (örn: "anne-bebek")
  subcategory TEXT NOT NULL, -- Alt kategori slug'ı (örn: "oto-koltugu")
  category_id UUID REFERENCES categories(id), -- İleride kullanılmak üzere
  brand TEXT,
  image_url TEXT,
  current_price DECIMAL,
  original_price DECIMAL,
  rating DECIMAL(3,1), -- 8.7 gibi
  pros TEXT[], -- Artılar dizisi
  cons TEXT[], -- Eksiler dizisi
  specs JSONB, -- Esnek özellikler (Teknoloji için RAM, Bebek arabası için Ağırlık)
  safety_badges TEXT[], -- Anne-Bebek için (ADAC, Oeko-Tex)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Fiyat Geçmişi Tablosu
CREATE TABLE IF NOT EXISTS price_history (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  price DECIMAL NOT NULL,
  platform TEXT, -- "Trendyol", "Amazon", "Hepsiburada"
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- İncelemeler (Editör Yazısı)
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  content TEXT, -- Markdown formatında uzun inceleme metni
  author_id UUID REFERENCES auth.users(id),
  summary_ai TEXT, -- Yapay zeka özeti
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- FİYAT ALARMLARI TABLOSU (YENİ!)
CREATE TABLE IF NOT EXISTS price_alerts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  target_price DECIMAL NOT NULL,
  current_price DECIMAL NOT NULL, -- Alarm kurulduğu andaki fiyat
  is_active BOOLEAN DEFAULT true,
  is_triggered BOOLEAN DEFAULT false, -- Fiyat düştüğünde true olur
  triggered_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Index'ler (Performans için)
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_price_history_product ON price_history(product_id);
CREATE INDEX IF NOT EXISTS idx_price_alerts_product ON price_alerts(product_id);
CREATE INDEX IF NOT EXISTS idx_price_alerts_active ON price_alerts(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_price_alerts_email ON price_alerts(email);

-- Row Level Security (RLS) - Güvenlik için
ALTER TABLE price_alerts ENABLE ROW LEVEL SECURITY;

-- Herkes kendi email'i ile alarm kurabilir (INSERT)
CREATE POLICY "Anyone can create price alerts"
  ON price_alerts FOR INSERT
  WITH CHECK (true);

-- Herkes kendi email'ine ait alarmları görebilir (SELECT)
CREATE POLICY "Users can view their own alerts"
  ON price_alerts FOR SELECT
  USING (true);

-- Trigger: updated_at otomatik güncelleme
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
