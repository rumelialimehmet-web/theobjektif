"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { uploadProductImage } from "@/lib/storage";
import Image from "next/image";

type ImageUploadProps = {
  currentImageUrl?: string;
  productSlug: string;
  onImageUploaded: (url: string) => void;
  onImageRemoved: () => void;
};

export function ImageUpload({
  currentImageUrl,
  productSlug,
  onImageUploaded,
  onImageRemoved,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImageUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Lütfen bir resim dosyası seçin");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Resim boyutu 5MB'dan küçük olmalıdır");
      return;
    }

    setError("");
    setIsUploading(true);

    try {
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Upload to Supabase
      const result = await uploadProductImage(file, productSlug);

      if (result.success && result.url) {
        onImageUploaded(result.url);
        setPreviewUrl(result.url);
      } else {
        setError(result.error || "Yükleme başarısız");
        setPreviewUrl(null);
      }
    } catch (err) {
      setError("Resim yüklenirken hata oluştu");
      setPreviewUrl(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    onImageRemoved();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 hover:border-accent transition-colors">
        {previewUrl ? (
          <div className="relative">
            <div className="relative w-full h-64 rounded-lg overflow-hidden bg-slate-100">
              <Image
                src={previewUrl}
                alt="Product preview"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2"
              onClick={handleRemove}
            >
              <X className="h-4 w-4 mr-1" />
              Kaldır
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <ImageIcon className="h-8 w-8 text-slate-400" />
            </div>
            <div className="mb-4">
              <p className="text-sm font-medium text-slate-700 mb-1">
                Ürün Resmi Yükle
              </p>
              <p className="text-xs text-slate-500">
                PNG, JPG veya WEBP (max 5MB)
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              disabled={isUploading}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              <Upload className="h-4 w-4 mr-2" />
              {isUploading ? "Yükleniyor..." : "Resim Seç"}
            </Button>
          </div>
        )}
      </div>

      {error && (
        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}
    </div>
  );
}
