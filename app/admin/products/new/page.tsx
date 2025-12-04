"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, X, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { createProduct } from "@/app/admin/actions";
import { CATEGORIES } from "@/lib/categories";

export default function NewProductPage() {
  const router = useRouter();
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
  const [pros, setPros] = useState<string[]>([""]);
  const [cons, setCons] = useState<string[]>([""]);
  const [specKey, setSpecKey] = useState("");
  const [specValue, setSpecValue] = useState("");
  const [specs, setSpecs] = useState<Record<string, string>>({});
  const [safetyBadges, setSafetyBadges] = useState<string[]>([]);

  // Slug oluştur
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ş/g, "s")
      .replace(/ı/g, "i")
      .replace(/ö/g, "o")
      .replace(/ç/g, "c")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const slug = generateSlug(name);

  // Alt kategorileri getir
  const subcategories = category
    ? Object.entries(CATEGORIES[category as keyof typeof CATEGORIES]?.subcategories || {})
    : [];

  // Anne-bebek kategorisi mi?
  const isBabyCategory = category === "anne-bebek";

  const handleAddPro = () => {
    setPros([...pros, ""]);
  };

  const handleRemovePro = (index: number) => {
    setPros(pros.filter((_, i) => i !== index));
  };

  const handleProChange = (index: number, value: string) => {
    const newPros = [...pros];
    newPros[index] = value;
    setPros(newPros);
  };

  const handleAddCon = () => {
    setCons([...cons, ""]);
  };

  const handleRemoveCon = (index: number) => {
    setCons(cons.filter((_, i) => i !== index));
  };

  const handleConChange = (index: number, value: string) => {
    const newCons = [...cons];
    newCons[index] = value;
    setCons(newCons);
  };

  const handleAddSpec = () => {
    if (specKey && specValue) {
      setSpecs({ ...specs, [specKey]: specValue });
      setSpecKey("");
      setSpecValue("");
    }
  };

  const handleRemoveSpec = (key: string) => {
    const newSpecs = { ...specs };
    delete newSpecs[key];
    setSpecs(newSpecs);
  };

  const handleToggleSafetyBadge = (badge: string) => {
    if (safetyBadges.includes(badge)) {
      setSafetyBadges(safetyBadges.filter((b) => b !== badge));
    } else {
      setSafetyBadges([...safetyBadges, badge]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const result = await createProduct({
        name,
        slug,
        category,
        subcategory,
        brand,
        currentPrice: parseFloat(currentPrice),
        originalPrice: parseFloat(originalPrice),
        rating: parseFloat(rating),
        pros: pros.filter((p) => p.trim() !== ""),
        cons: cons.filter((c) => c.trim() !== ""),
        specs,
        safetyBadges: isBabyCategory ? safetyBadges : undefined,
      });

      if (result.success) {
        router.push("/admin/products");
      } else {
        setError(result.error || "Bir hata oluştu");
      }
    } catch (err) {
      setError("Beklenmeyen bir hata oluştu");
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <h1 className="text-3xl font-bold text-primary">Yeni Ürün Ekle</h1>
          <p className="text-muted-foreground">Ürün bilgilerini doldurun</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Temel Bilgiler */}
        <Card>
          <CardHeader>
            <CardTitle>Temel Bilgiler</CardTitle>
            <CardDescription>Ürünün temel bilgilerini girin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Ürün Adı *</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Örn: Cybex Sirona Z i-Size"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Slug (Otomatik)</label>
                <Input value={slug} disabled className="bg-muted" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Marka *</label>
                <Input
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="Örn: Cybex"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Objektif Puanı (1-10) *</label>
                <Input
                  type="number"
                  step="0.1"
                  min="1"
                  max="10"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  placeholder="8.7"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Kategori */}
        <Card>
          <CardHeader>
            <CardTitle>Kategori Seçimi</CardTitle>
            <CardDescription>Ürünün kategorisini seçin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Ana Kategori *</label>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setSubcategory("");
                  }}
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  required
                >
                  <option value="">Seçin...</option>
                  {Object.entries(CATEGORIES).map(([slug, cat]) => (
                    <option key={slug} value={slug}>
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
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  required
                  disabled={!category}
                >
                  <option value="">Seçin...</option>
                  {subcategories.map(([slug, subcat]) => (
                    <option key={slug} value={slug}>
                      {subcat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fiyatlar */}
        <Card>
          <CardHeader>
            <CardTitle>Fiyat Bilgileri</CardTitle>
            <CardDescription>Ürünün fiyat bilgilerini girin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Güncel Fiyat (₺) *</label>
                <Input
                  type="number"
                  value={currentPrice}
                  onChange={(e) => setCurrentPrice(e.target.value)}
                  placeholder="15999"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Orijinal Fiyat (₺)</label>
                <Input
                  type="number"
                  value={originalPrice}
                  onChange={(e) => setOriginalPrice(e.target.value)}
                  placeholder="17999"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Artılar */}
        <Card>
          <CardHeader>
            <CardTitle>Artılar (Pros)</CardTitle>
            <CardDescription>Ürünün olumlu özelliklerini ekleyin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pros.map((pro, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={pro}
                  onChange={(e) => handleProChange(index, e.target.value)}
                  placeholder="Artı özellik girin"
                />
                {pros.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => handleRemovePro(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" onClick={handleAddPro} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Artı Ekle
            </Button>
          </CardContent>
        </Card>

        {/* Eksiler */}
        <Card>
          <CardHeader>
            <CardTitle>Eksiler (Cons)</CardTitle>
            <CardDescription>Ürünün olumsuz özelliklerini ekleyin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {cons.map((con, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={con}
                  onChange={(e) => handleConChange(index, e.target.value)}
                  placeholder="Eksi özellik girin"
                />
                {cons.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => handleRemoveCon(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" onClick={handleAddCon} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Eksi Ekle
            </Button>
          </CardContent>
        </Card>

        {/* Teknik Özellikler */}
        <Card>
          <CardHeader>
            <CardTitle>Teknik Özellikler</CardTitle>
            <CardDescription>Ürünün teknik detaylarını ekleyin</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(specs).length > 0 && (
              <div className="space-y-2">
                {Object.entries(specs).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <span className="font-medium">{key}:</span> {value}
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveSpec(key)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <Input
                value={specKey}
                onChange={(e) => setSpecKey(e.target.value)}
                placeholder="Özellik adı (örn: Ağırlık)"
                className="flex-1"
              />
              <Input
                value={specValue}
                onChange={(e) => setSpecValue(e.target.value)}
                placeholder="Değer (örn: 15kg)"
                className="flex-1"
              />
              <Button type="button" onClick={handleAddSpec}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Güvenlik Rozetleri (Anne-Bebek için) */}
        {isBabyCategory && (
          <Card className="border-pink-200">
            <CardHeader>
              <CardTitle className="text-pink-600">🛡️ Güvenlik Rozetleri</CardTitle>
              <CardDescription>Anne & Bebek kategorisi için güvenlik sertifikaları</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {["ADAC", "i-Size (R129)", "Oeko-Tex", "BPA-Free", "CE"].map((badge) => (
                  <Badge
                    key={badge}
                    variant={safetyBadges.includes(badge) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleToggleSafetyBadge(badge)}
                  >
                    {badge}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-lg">
            {error}
          </div>
        )}

        {/* Submit */}
        <div className="flex gap-4">
          <Button type="submit" size="lg" disabled={isSubmitting} className="flex-1">
            {isSubmitting ? "Ekleniyor..." : "Ürünü Ekle"}
          </Button>
          <Link href="/admin/products" className="flex-1">
            <Button type="button" variant="outline" size="lg" className="w-full">
              İptal
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
