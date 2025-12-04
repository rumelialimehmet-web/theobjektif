import { supabase } from "./supabase";

// Kategorileri getir
export async function getCategories() {
  try {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("name", { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

// Belirli bir kategorideki ürünleri getir
export async function getProductsByCategory(categorySlug: string) {
  try {
    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        category:categories(name, slug)
      `)
      .eq("categories.slug", categorySlug)
      .order("rating", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
}

// Belirli bir alt kategorideki ürünleri getir
export async function getProductsBySubcategory(
  categorySlug: string,
  subcategorySlug: string
) {
  try {
    // Mock implementation - gerçek subcategory yapısı kategoriler tablosunda parent_id ile kurulacak
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("rating", { ascending: false });

    if (error) throw error;

    // Client-side filtreleme (geçici)
    const filtered = data?.filter(
      (p) => p.category === categorySlug && p.subcategory === subcategorySlug
    );

    return filtered || [];
  } catch (error) {
    console.error("Error fetching products by subcategory:", error);
    return [];
  }
}

// Slug'a göre tek bir ürün getir
export async function getProductBySlug(productSlug: string) {
  try {
    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        category:categories(name, slug)
      `)
      .eq("slug", productSlug)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
}

// Öne çıkan ürünleri getir (rating >= 9.0)
export async function getFeaturedProducts(limit: number = 6) {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .gte("rating", 9.0)
      .order("rating", { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}

// Fiyatı düşen ürünleri getir
export async function getProductsWithPriceDrops(limit: number = 10) {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .not("original_price", "is", null)
      .lt("current_price", supabase.rpc("original_price"))
      .order("current_price", { ascending: true })
      .limit(limit);

    if (error) {
      // Fallback: basit filtreleme
      const { data: allProducts } = await supabase
        .from("products")
        .select("*")
        .not("original_price", "is", null);

      const filtered = allProducts?.filter(
        (p) => p.original_price && p.current_price < p.original_price
      );

      return filtered?.slice(0, limit) || [];
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching price drops:", error);
    return [];
  }
}

// FİYAT ALARMI KAYDETME
export async function createPriceAlert(data: {
  productId: string;
  email: string;
  targetPrice: number;
  currentPrice: number;
}) {
  try {
    const { data: alert, error } = await supabase
      .from("price_alerts")
      .insert({
        product_id: data.productId,
        email: data.email,
        target_price: data.targetPrice,
        current_price: data.currentPrice,
        is_active: true,
        is_triggered: false,
      })
      .select()
      .single();

    if (error) throw error;
    return { success: true, data: alert };
  } catch (error) {
    console.error("Error creating price alert:", error);
    return { success: false, error };
  }
}

// Kullanıcının aktif fiyat alarmlarını getir
export async function getPriceAlertsByEmail(email: string) {
  try {
    const { data, error } = await supabase
      .from("price_alerts")
      .select(`
        *,
        product:products(name, slug, current_price, image_url)
      `)
      .eq("email", email)
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching price alerts:", error);
    return [];
  }
}

// Fiyat geçmişi ekle
export async function addPriceHistory(
  productId: string,
  price: number,
  platform: string
) {
  try {
    const { data, error } = await supabase
      .from("price_history")
      .insert({
        product_id: productId,
        price,
        platform,
      })
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error("Error adding price history:", error);
    return { success: false, error };
  }
}

// Ürün için fiyat geçmişini getir
export async function getPriceHistory(productId: string, days: number = 30) {
  try {
    const { data, error } = await supabase
      .from("price_history")
      .select("*")
      .eq("product_id", productId)
      .gte(
        "recorded_at",
        new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()
      )
      .order("recorded_at", { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching price history:", error);
    return [];
  }
}
