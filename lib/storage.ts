import { supabase } from "./supabase";

const BUCKET_NAME = "product-images";

/**
 * Upload an image to Supabase Storage
 * @param file - The image file to upload
 * @param productSlug - The product slug (used for organizing files)
 * @returns The public URL of the uploaded image
 */
export async function uploadProductImage(
  file: File,
  productSlug: string
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    // Generate unique filename
    const fileExt = file.name.split(".").pop();
    const fileName = `${productSlug}-${Date.now()}.${fileExt}`;
    const filePath = `products/${fileName}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Storage upload error:", error);
      return { success: false, error: error.message };
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    return { success: true, url: urlData.publicUrl };
  } catch (error) {
    console.error("Error uploading image:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Bilinmeyen hata",
    };
  }
}

/**
 * Delete an image from Supabase Storage
 * @param imageUrl - The full URL of the image to delete
 */
export async function deleteProductImage(
  imageUrl: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Extract file path from URL
    const url = new URL(imageUrl);
    const pathParts = url.pathname.split(`/${BUCKET_NAME}/`);
    if (pathParts.length < 2) {
      return { success: false, error: "Invalid image URL" };
    }

    const filePath = pathParts[1];

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([filePath]);

    if (error) {
      console.error("Storage delete error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Error deleting image:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Bilinmeyen hata",
    };
  }
}

/**
 * Get placeholder image URL
 */
export function getPlaceholderImage(): string {
  return "https://placehold.co/600x400/e2e8f0/64748b?text=No+Image";
}
