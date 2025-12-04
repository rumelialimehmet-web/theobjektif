import { notFound } from "next/navigation";
import Link from "next/link";
import { CATEGORIES, CategorySlug } from "@/lib/categories";
import { getProductsBySubcategory } from "@/lib/supabase-queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, SlidersHorizontal } from "lucide-react";

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

type PageProps = {
  params: Promise<{ category: string; subcategory: string }>;
};

export default async function SubcategoryPage({ params }: PageProps) {
  const { category, subcategory } = await params;
  const categoryData = CATEGORIES[category as CategorySlug];

  if (!categoryData || !categoryData.subcategories[subcategory as keyof typeof categoryData.subcategories]) {
    notFound();
  }

  const subcategoryData = categoryData.subcategories[subcategory as keyof typeof categoryData.subcategories] as { name: string; description: string } | undefined;

  if (!subcategoryData) {
    notFound();
  }

  // Bu alt kategorideki ürünleri Supabase'den getir
  const products = await getProductsBySubcategory(category, subcategory);

  // Anne-Bebek kategorisi mi?
  const isBabyCategory = category === "anne-bebek";

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-accent">Ana Sayfa</Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href={`/${category}`} className="hover:text-accent">
          {categoryData.name}
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-foreground font-medium">{subcategoryData.name}</span>
      </div>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">
          {subcategoryData.name}
        </h1>
        <p className="text-lg text-muted-foreground">
          {subcategoryData.description}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar - Filters */}
        <aside className="lg:w-64 flex-shrink-0">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <SlidersHorizontal className="h-5 w-5" />
                Filtreler
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Price Filter */}
              <div>
                <h3 className="font-semibold text-sm mb-3">Fiyat Aralığı</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded" />
                    0 - 5.000 ₺
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded" />
                    5.000 - 10.000 ₺
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded" />
                    10.000 - 20.000 ₺
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded" />
                    20.000+ ₺
                  </label>
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <h3 className="font-semibold text-sm mb-3">Objektif Puanı</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded" />
                    9.0+ (Mükemmel)
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded" />
                    8.0 - 8.9 (Çok İyi)
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded" />
                    7.0 - 7.9 (İyi)
                  </label>
                </div>
              </div>

              {/* Anne-Bebek Özel Filtreler */}
              {isBabyCategory && (
                <>
                  {/* Security Certificates */}
                  <div className="border-t pt-4">
                    <h3 className="font-semibold text-sm mb-3 text-pink-600">
                      🛡️ Güvenlik Sertifikaları
                    </h3>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded" />
                        ADAC Testli
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded" />
                        i-Size (R129)
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded" />
                        Oeko-Tex
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded" />
                        BPA-Free
                      </label>
                    </div>
                  </div>

                  {/* Age Range */}
                  {'ageRanges' in categoryData && categoryData.ageRanges && (
                    <div>
                      <h3 className="font-semibold text-sm mb-3 text-pink-600">
                        👶 Yaş Aralığı
                      </h3>
                      <div className="space-y-2">
                        {categoryData.ageRanges.map((range) => (
                          <label key={range} className="flex items-center gap-2 text-sm">
                            <input type="checkbox" className="rounded" />
                            {range}
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              <Button variant="outline" className="w-full">
                Filtreleri Temizle
              </Button>
            </CardContent>
          </Card>
        </aside>

        {/* Main Content - Products */}
        <div className="flex-1">
          {/* Sort & Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{products.length}</span> ürün bulundu
            </p>
            <select className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent">
              <option>En Popüler</option>
              <option>En Yüksek Puan</option>
              <option>Fiyat (Düşükten Yükseğe)</option>
              <option>Fiyat (Yüksekten Düşüğe)</option>
              <option>Yeni Eklenenler</option>
            </select>
          </div>

          {/* Products Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary">{product.brand}</Badge>
                      <div className="flex items-center gap-1">
                        <span className="text-2xl font-bold text-accent">
                          {product.rating}
                        </span>
                        <span className="text-sm text-muted-foreground">/10</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl">{product.name}</CardTitle>
                    {product.safety_badges && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {product.safety_badges.map((badge: string) => (
                          <Badge key={badge} variant="success" className="text-xs">
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-primary">
                        {product.current_price.toLocaleString("tr-TR")} ₺
                      </span>
                      {product.original_price && product.original_price > product.current_price && (
                        <>
                          <span className="text-sm text-muted-foreground line-through">
                            {product.original_price.toLocaleString("tr-TR")} ₺
                          </span>
                          <Badge variant="success" className="text-xs">
                            %{Math.round(((product.original_price - product.current_price) / product.original_price) * 100)} İndirim
                          </Badge>
                        </>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div>
                        <p className="text-sm font-medium text-green-600 mb-1">✓ Artılar</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {product.pros.slice(0, 2).map((pro: string, i: number) => (
                            <li key={i}>• {pro}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link href={`/${product.category}/${product.subcategory}/${product.slug}`} className="flex-1">
                        <Button className="w-full">
                          Detaylı İnceleme
                        </Button>
                      </Link>
                      <Button variant="outline" size="icon">
                        ⚖️
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground">
                Bu kategoride henüz ürün incelemesi bulunmuyor.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Yakında yeni incelemeler eklenecek!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
