"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";
import { verifyPassword, getAdminToken, getCookieName } from "@/lib/auth";

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

export async function loginAdmin(password: string) {
  try {
    // Verify password
    if (!verifyPassword(password)) {
      return { success: false, error: "Hatalı şifre!" };
    }

    // Set auth cookie
    const cookieStore = await cookies();
    cookieStore.set(getCookieName(), getAdminToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Bilinmeyen hata"
    };
  }
}

export async function logoutAdmin() {
  try {
    // Remove auth cookie
    const cookieStore = await cookies();
    cookieStore.delete(getCookieName());

    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
