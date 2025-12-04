"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";

export type ProductFormData = {
  name: string;
  slug: string;
  category: string;
  subcategory: string;
  brand: string;
  currentPrice: number;
  originalPrice: number;
  rating: number;
  pros: string[];
  cons: string[];
  specs: Record<string, string>;
  safetyBadges?: string[];
};

export async function createProduct(formData: ProductFormData) {
  try {
    const { data, error } = await supabase
      .from("products")
      .insert({
        name: formData.name,
        slug: formData.slug,
        category: formData.category,
        subcategory: formData.subcategory,
        brand: formData.brand,
        current_price: formData.currentPrice,
        original_price: formData.originalPrice,
        rating: formData.rating,
        pros: formData.pros,
        cons: formData.cons,
        specs: formData.specs,
        safety_badges: formData.safetyBadges || [],
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return { success: false, error: error.message };
    }

    revalidatePath("/admin/products");
    revalidatePath("/");

    return { success: true, data };
  } catch (error) {
    console.error("Error creating product:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Bilinmeyen hata"
    };
  }
}

export async function deleteProduct(productId: string) {
  try {
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", productId);

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath("/admin/products");
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Bilinmeyen hata"
    };
  }
}

export async function logoutAdmin() {
  redirect("/admin/login");
}
