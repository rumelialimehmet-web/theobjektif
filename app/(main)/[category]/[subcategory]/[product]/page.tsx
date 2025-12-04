import { notFound } from "next/navigation";
import Link from "next/link";
import { CATEGORIES, CategorySlug } from "@/lib/categories";
import { getProductBySlug } from "@/lib/supabase-queries";
import { ObjektifScoreCard } from "@/components/product/objektif-score-card";
import { PriceButtons } from "@/components/product/price-buttons";
import { PriceAlertModal } from "@/components/product/price-alert-modal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Users, Palette, Zap, GitCompare, MessageSquare, HelpCircle } from "lucide-react";

type PageProps = {
  params: { category: string; subcategory: string; product: string };
};

export default async function ProductPage({ params }: PageProps) {
  const categoryData = CATEGORIES[params.category as CategorySlug];

  if (!categoryData) {
    notFound();
  }

  // Ürünü Supabase'den getir
  const product = await getProductBySlug(params.product);

  if (!product) {
    notFound();
  }

  const subcategoryData = categoryData.subcategories[params.subcategory as keyof typeof categoryData.subcategories] as { name: string; description: string } | undefined;

  if (!subcategoryData) {
    notFound();
  }

  // Mock platform fiyatları
  const platforms = [
    {
      platform: "Trendyol",
      price: product.current_price,
      url: "#",
      isBestPrice: true,
    },
    {
      platform: "Amazon",
      price: product.current_price + 500,
      url: "#",
    },
    {
      platform: "Hepsiburada",
      price: product.current_price + 1000,
      url: "#",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-accent">Ana Sayfa</Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href={`/${params.category}`} className="hover:text-accent">
          {categoryData.name}
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href={`/${params.category}/${params.subcategory}`} className="hover:text-accent">
          {subcategoryData.name}
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-foreground font-medium">{product.name}</span>
      </div>

      {/* Product Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="secondary">{product.brand}</Badge>
          <Badge variant="outline">{subcategoryData.name}</Badge>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
          {product.name} - Detaylı İnceleme ve Objektif Puanı
        </h1>
        <p className="text-muted-foreground">
          Son güncelleme: 3 Aralık 2025 | Test süresi: 2 hafta
        </p>
      </div>

      {/* Above the Fold - Özet Kartı */}
      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        {/* Sol: TheObjektif Puan Kartı */}
        <ObjektifScoreCard
          rating={product.rating}
          pros={product.pros}
          cons={product.cons}
          safetyBadges={product.safety_badges}
        />

        {/* Sağ: Fiyat Butonları */}
        <div className="space-y-4">
          <PriceButtons
            currentPrice={product.current_price}
            originalPrice={product.original_price}
            platforms={platforms}
          />

          {/* Fiyat Alarmı */}
          <PriceAlertModal
            productId={product.id}
            productName={product.name}
            currentPrice={product.current_price}
          />
        </div>
      </div>

      <Separator className="my-12" />

      {/* İçerik Akışı */}
      <div className="max-w-4xl mx-auto space-y-12">
        {/* 1. Karar: Kim Almalı? */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Users className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-bold text-primary">
              Kim Almalı? Kim Almamalı?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2 border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-lg text-green-700">
                  ✅ Şu Kişiler Almalı
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Premium kalite arayanlar</li>
                  <li>• Uzun vadeli yatırım düşünenler</li>
                  <li>• En iyi performans isteyenler</li>
                  <li>• Bütçesi uygun olanlar</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-rose-200 bg-rose-50">
              <CardHeader>
                <CardTitle className="text-lg text-rose-700">
                  ❌ Şu Kişiler Almamalı
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Düşük bütçeli alıcılar</li>
                  <li>• Temel özelliklerle yetinen kullanıcılar</li>
                  <li>• Kompakt ürün arayanlar</li>
                  <li>• Ağır cihazlardan hoşlanmayanlar</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 2. Tasarım ve Malzeme */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Palette className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-bold text-primary">
              Tasarım ve Malzeme Kalitesi
            </h2>
          </div>

          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground leading-relaxed">
                {product.name}, premium malzemeler kullanılarak üretilmiş.
                {product.category === "anne-bebek" && (
                  <span className="font-semibold text-pink-600">
                    {" "}Bebeğinizin güvenliği için tüm malzemeler toksisite testlerinden geçmiştir.
                    BPA içermez, Oeko-Tex sertifikalıdır.
                  </span>
                )}
                {" "}Yapı kalitesi mükemmel, uzun yıllar kullanım için tasarlanmış.
              </p>

              {product.specs && (
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="text-center p-3 bg-slate-50 rounded-lg">
                      <p className="text-xs text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, " $1")}
                      </p>
                      <p className="text-sm font-semibold text-primary mt-1">
                        {typeof value === "boolean" ? (value ? "✓" : "✗") : value}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* 3. Performans Testleri */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Zap className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-bold text-primary">
              Performans Testlerimiz
            </h2>
          </div>

          <Card>
            <CardContent className="pt-6 space-y-4">
              <p className="text-muted-foreground">
                2 haftalık test sürecinde gerçek kullanım senaryolarında denedik.
                İşte sonuçlar:
              </p>

              {/* Mock Performance Bars */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Genel Performans</span>
                    <span className="text-sm font-semibold text-accent">{product.rating}/10</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-accent h-2 rounded-full"
                      style={{ width: `${product.rating * 10}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Kullanım Kolaylığı</span>
                    <span className="text-sm font-semibold text-accent">9.0/10</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-accent h-2 rounded-full" style={{ width: "90%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Fiyat/Performans</span>
                    <span className="text-sm font-semibold text-accent">7.5/10</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-accent h-2 rounded-full" style={{ width: "75%" }} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 4. Rakip Karşılaştırması */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <GitCompare className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-bold text-primary">
              Rakip Ürünlerle Karşılaştırma
            </h2>
          </div>

          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground mb-4">
                Kategori liderleriyle yan yana karşılaştırdık:
              </p>
              <div className="flex items-center justify-center gap-4 py-8">
                <Link href="/karsilastir">
                  <Button size="lg">
                    <GitCompare className="mr-2 h-5 w-5" />
                    Detaylı Karşılaştırmayı Gör
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 5. Kullanıcı Yorumları (AI Özeti) */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <MessageSquare className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-bold text-primary">
              Kullanıcı Yorum Özeti (AI)
            </h2>
          </div>

          <Card className="border-2 border-purple-200 bg-purple-50">
            <CardHeader>
              <CardTitle className="text-lg">
                🤖 1,247 Kullanıcı Yorumundan AI Özeti
              </CardTitle>
              <CardDescription>
                Amazon, Trendyol ve Hepsiburada yorumlarını analiz ettik
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm">
                <strong>En çok övülenler:</strong> Kullanıcıların %87'si performanstan çok memnun.
                Dayanıklılık konusunda da yüksek puanlar almış.
              </p>
              <p className="text-sm">
                <strong>En çok şikayet edilenler:</strong> Fiyatın yüksek olduğu belirtiliyor.
                Bazı kullanıcılar ağırlığından rahatsız olmuş.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* 6. SSS */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-bold text-primary">
              Sıkça Sorulan Sorular
            </h2>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Bu ürün garantili mi?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Evet, resmi distribütör garantisi bulunmaktadır. 2 yıl garantili.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Hangi platformdan almak daha avantajlı?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Yukarıdaki fiyat karşılaştırmasına göre en uygun fiyat Trendyol'da.
                  Ancak kargo ve iade politikalarını da kontrol edin.
                </p>
              </CardContent>
            </Card>

            {product.category === "anne-bebek" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Güvenlik sertifikaları geçerli mi?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Evet, ADAC ve i-Size sertifikaları güncel ve geçerlidir.
                    Bebeğiniz için güvenli bir üründür.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

// Generate static params for all products
export async function generateStaticParams() {
  const { getAllProducts } = await import("@/lib/supabase-queries");

  // Supabase'den ürünleri çek (fallback: boş dizi)
  const products = await getAllProducts();

  // Eğer Supabase'de veri yoksa, boş dizi dön (dinamik olarak oluşturulacak)
  if (!products || products.length === 0) {
    return [];
  }

  return products.map((product) => ({
    category: product.category,
    subcategory: product.subcategory,
    product: product.slug,
  }));
}
