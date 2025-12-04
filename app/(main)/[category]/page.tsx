import { notFound } from "next/navigation";
import Link from "next/link";
import { CATEGORIES, CategorySlug } from "@/lib/categories";
import { getProductsByCategory } from "@/lib/supabase-queries";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronRight } from "lucide-react";

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

type PageProps = {
  params: { category: string };
};

export default async function CategoryPage({ params }: PageProps) {
  const categoryData = CATEGORIES[params.category as CategorySlug];

  if (!categoryData) {
    notFound();
  }

  // Bu kategorideki ürünleri Supabase'den getir
  const categoryProducts = await getProductsByCategory(params.category);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category Header */}
      <div className="mb-8">
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <Link href="/" className="hover:text-accent">Ana Sayfa</Link>
          <ChevronRight className="h-4 w-4 mx-2" />
          <span className="text-foreground font-medium">{categoryData.name}</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          {categoryData.name}
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          {categoryData.description}
        </p>
      </div>

      <Separator className="mb-8" />

      {/* Subcategories Grid */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-primary mb-6">Alt Kategoriler</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(categoryData.subcategories).map(([slug, subcat]) => (
            <Link key={slug} href={`/${params.category}/${slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <CardTitle className="text-lg group-hover:text-accent transition-colors">
                    {subcat.name}
                  </CardTitle>
                  <CardDescription>{subcat.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-accent font-medium">
                    İncelemeleri Gör
                    <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      {categoryProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-primary mb-6">
            {categoryData.name} Kategorisinde Öne Çıkanlar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryProducts.map((product) => (
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
                      <span className="text-sm text-muted-foreground line-through">
                        {product.original_price.toLocaleString("tr-TR")} ₺
                      </span>
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

                  <Link href={`/${product.category}/${product.subcategory}/${product.slug}`}>
                    <Button className="w-full">
                      Detaylı İnceleme
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Anne-Bebek özel mesaj */}
      {params.category === "anne-bebek" && (
        <div className="mt-12 p-6 bg-pink-50 rounded-xl border border-pink-200">
          <h3 className="text-lg font-semibold text-primary mb-2">
            🛡️ Güvenlik Önceliğimiz
          </h3>
          <p className="text-muted-foreground">
            Anne & Bebek kategorisindeki tüm ürünleri güvenlik sertifikalarına göre değerlendiriyoruz.
            ADAC testleri, Oeko-Tex standartları ve toksisite kontrollerini dikkate alıyoruz.
          </p>
        </div>
      )}
    </div>
  );
}
