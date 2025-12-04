"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, X, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { updateProduct } from "@/app/admin/actions";
import { CATEGORIES } from "@/lib/categories";
import { supabase } from "@/lib/supabase";
import { ImageUpload } from "@/components/admin/image-upload";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Form state
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [brand, setBrand] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [rating, setRating] = useState("");
  const [pros, setPros] = useState<string[]>(["", ""]);
  const [cons, setCons] = useState<string[]>(["", ""]);
  const [specs, setSpecs] = useState<Array<{ key: string; value: string }>>([
    { key: "", value: "" },
  ]);
  const [safetyBadges, setSafetyBadges] = useState<string[]>([]);
  const [imageUrl, setImageUrl] = useState<string>("");

  // Auto-generate slug from name
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
      .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const slug = generateSlug(name);

  // Load product data
  useEffect(() => {
    async function loadProduct() {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", productId)
          .single();

        if (error) throw error;
        if (!data) throw new Error("Ürün bulunamadı");

        // Set form values
        setName(data.name);
        setCategory(data.category);
        setSubcategory(data.subcategory);
        setBrand(data.brand);
        setCurrentPrice(data.current_price.toString());
        setOriginalPrice(data.original_price?.toString() || "");
        setRating(data.rating.toString());
        setPros(data.pros || ["", ""]);
        setCons(data.cons || ["", ""]);

        // Convert specs to array format
        const specsArray = Object.entries(data.specs || {}).map(([key, value]) => ({
          key,
          value: String(value),
        }));
        setSpecs(specsArray.length > 0 ? specsArray : [{ key: "", value: "" }]);

        setSafetyBadges(data.safety_badges || []);
        setImageUrl(data.image_url || "");
      } catch (err) {
        console.error("Error loading product:", err);
        setError("Ürün yüklenirken hata oluştu");
      } finally {
        setIsLoading(false);
      }
    }

    loadProduct();
  }, [productId]);

  const isBabyCategory = category === "anne-bebek";

  // Get subcategories for selected category
  const subcategories = category && CATEGORIES[category as keyof typeof CATEGORIES]
    ? Object.entries(CATEGORIES[category as keyof typeof CATEGORIES].subcategories)
    : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Convert specs array to object
    const specsObject: Record<string, string> = {};
    specs.forEach((spec) => {
      if (spec.key.trim() && spec.value.trim()) {
        specsObject[spec.key.trim()] = spec.value.trim();
      }
    });

    const result = await updateProduct(productId, {
      name,
      slug,
      category,
      subcategory,
      brand,
      currentPrice: parseFloat(currentPrice),
      originalPrice: parseFloat(originalPrice) || 0,
      rating: parseFloat(rating),
      pros: pros.filter((p) => p.trim() !== ""),
      cons: cons.filter((c) => c.trim() !== ""),
      specs: specsObject,
      imageUrl: imageUrl || undefined,
      safetyBadges: isBabyCategory ? safetyBadges : undefined,
    });

    if (result.success) {
      router.push("/admin/products");
      router.refresh();
    } else {
      setError(result.error || "Ürün güncellenirken hata oluştu");
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/products">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-primary">Ürün Düzenle</h1>
            <p className="text-muted-foreground">Yükleniyor...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !name) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/products">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-primary">Hata</h1>
            <p className="text-destructive">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/products">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-primary">Ürün Düzenle</h1>
          <p className="text-muted-foreground">
            Ürün bilgilerini güncelleyin
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle>Temel Bilgiler</CardTitle>
            <CardDescription>Ürün adı, marka ve kategori</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Ürün Adı *</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="iPhone 15 Pro Max"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Marka *</label>
                <Input
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="Apple"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">URL Slug (Otomatik)</label>
              <Input value={slug} disabled className="bg-muted" />
              <p className="text-xs text-muted-foreground">
                Bu slug URL'de kullanılacak: .../{slug}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Kategori *</label>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setSubcategory("");
                  }}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                >
                  <option value="">Seçiniz</option>
                  {Object.entries(CATEGORIES).map(([key, cat]) => (
                    <option key={key} value={key}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Alt Kategori *</label>
                <select
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                  disabled={!category}
                >
                  <option value="">Seçiniz</option>
                  {subcategories.map(([key, subcat]: [string, any]) => (
                    <option key={key} value={key}>
                      {subcat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ürün Resmi */}
        <Card>
          <CardHeader>
            <CardTitle>Ürün Resmi</CardTitle>
            <CardDescription>Ürünün görselini yükleyin veya güncelleyin</CardDescription>
          </CardHeader>
          <CardContent>
            <ImageUpload
              currentImageUrl={imageUrl}
              productSlug={slug || "product"}
              onImageUploaded={(url) => setImageUrl(url)}
              onImageRemoved={() => setImageUrl("")}
            />
          </CardContent>
        </Card>

        {/* Pricing & Rating */}
        <Card>
          <CardHeader>
            <CardTitle>Fiyat ve Puan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Güncel Fiyat (₺) *</label>
                <Input
                  type="number"
                  step="0.01"
                  value={currentPrice}
                  onChange={(e) => setCurrentPrice(e.target.value)}
                  placeholder="12999"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Orijinal Fiyat (₺)</label>
                <Input
                  type="number"
                  step="0.01"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  placeholder="14999"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Objektif Puanı (0-10) *</label>
                <Input
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  placeholder="8.5"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pros */}
        <Card>
          <CardHeader>
            <CardTitle>Artılar (+)</CardTitle>
            <CardDescription>Ürünün güçlü yönleri</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {pros.map((pro, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={pro}
                  onChange={(e) => {
                    const newPros = [...pros];
                    newPros[index] = e.target.value;
                    setPros(newPros);
                  }}
                  placeholder={`Artı ${index + 1}`}
                />
                {pros.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setPros(pros.filter((_, i) => i !== index))}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => setPros([...pros, ""])}
            >
              <Plus className="h-4 w-4 mr-2" />
              Artı Ekle
            </Button>
          </CardContent>
        </Card>

        {/* Cons */}
        <Card>
          <CardHeader>
            <CardTitle>Eksiler (-)</CardTitle>
            <CardDescription>Ürünün zayıf yönleri</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {cons.map((con, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={con}
                  onChange={(e) => {
                    const newCons = [...cons];
                    newCons[index] = e.target.value;
                    setCons(newCons);
                  }}
                  placeholder={`Eksi ${index + 1}`}
                />
                {cons.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setCons(cons.filter((_, i) => i !== index))}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => setCons([...cons, ""])}
            >
              <Plus className="h-4 w-4 mr-2" />
              Eksi Ekle
            </Button>
          </CardContent>
        </Card>

        {/* Specs */}
        <Card>
          <CardHeader>
            <CardTitle>Teknik Özellikler</CardTitle>
            <CardDescription>Anahtar-değer çiftleri olarak</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {specs.map((spec, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={spec.key}
                  onChange={(e) => {
                    const newSpecs = [...specs];
                    newSpecs[index].key = e.target.value;
                    setSpecs(newSpecs);
                  }}
                  placeholder="Ekran Boyutu"
                />
                <Input
                  value={spec.value}
                  onChange={(e) => {
                    const newSpecs = [...specs];
                    newSpecs[index].value = e.target.value;
                    setSpecs(newSpecs);
                  }}
                  placeholder="6.7 inç"
                />
                {specs.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setSpecs(specs.filter((_, i) => i !== index))}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={() => setSpecs([...specs, { key: "", value: "" }])}
            >
              <Plus className="h-4 w-4 mr-2" />
              Özellik Ekle
            </Button>
          </CardContent>
        </Card>

        {/* Safety Badges (Anne-Bebek only) */}
        {isBabyCategory && (
          <Card className="border-success/50 bg-success/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🛡️ Güvenlik Sertifikaları
              </CardTitle>
              <CardDescription>Anne-Bebek kategorisi için özel</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {["ADAC", "i-Size", "Oeko-Tex", "5 Yıldız", "CE"].map((badge) => (
                <label key={badge} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={safetyBadges.includes(badge)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSafetyBadges([...safetyBadges, badge]);
                      } else {
                        setSafetyBadges(safetyBadges.filter((b) => b !== badge));
                      }
                    }}
                    className="w-4 h-4"
                  />
                  <Badge variant="success">{badge}</Badge>
                </label>
              ))}
            </CardContent>
          </Card>
        )}

        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Submit */}
        <div className="flex gap-3">
          <Button type="submit" disabled={isSubmitting} size="lg">
            {isSubmitting ? "Güncelleniyor..." : "Ürünü Güncelle"}
          </Button>
          <Link href="/admin/products">
            <Button type="button" variant="outline" size="lg">
              İptal
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
