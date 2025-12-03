import { createClient } from "@supabase/supabase-js";

// Environment variables - Bu değerleri .env.local dosyasında tanımlayacaksınız
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("⚠️ Supabase URL veya Anon Key bulunamadı. .env.local dosyasını kontrol edin.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions for database
export type Product = {
  id: string;
  slug: string;
  name: string;
  category_id: string;
  brand?: string;
  image_url?: string;
  current_price?: number;
  rating?: number;
  pros?: string[];
  cons?: string[];
  specs?: Record<string, any>;
  safety_badges?: string[];
  created_at: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  parent_id?: string;
};

export type PriceHistory = {
  id: string;
  product_id: string;
  price: number;
  platform: string;
  recorded_at: string;
};

export type Review = {
  id: string;
  product_id: string;
  content: string;
  author_id: string;
  summary_ai?: string;
};
