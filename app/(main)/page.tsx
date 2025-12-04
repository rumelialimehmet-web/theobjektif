import { HeroSection } from "@/components/home/hero-section";
import { CategoryCards } from "@/components/home/category-cards";
import { FeaturedLists } from "@/components/home/featured-lists";
import { TrustSignals } from "@/components/home/trust-signals";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Supabase'den en yüksek puanlı ürünleri çek
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('rating', { ascending: false })
    .limit(6);

  return (
    <div className="w-full">
      <HeroSection />
      <CategoryCards />

      {/* Gerçek Ürünler */}
      {products && products.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                En Yüksek Puanlı Ürünler
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Test ettiğimiz tüm ürünler arasından en yüksek puanı alanlar
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-primary">
                        {product.current_price?.toLocaleString("tr-TR")} ₺
                      </span>
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
        </section>
      )}

      <FeaturedLists />
      <TrustSignals />
    </div>
  );
}
