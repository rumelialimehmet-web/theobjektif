import type { Metadata } from "next";
import { HeroSection } from "@/components/home/hero-section";
import { CategoryCards } from "@/components/home/category-cards";
import { FeaturedLists } from "@/components/home/featured-lists";
import { TrustSignals } from "@/components/home/trust-signals";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { getPlaceholderImage } from "@/lib/storage";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Ana Sayfa",
  description: "Teknoloji, ev yaşam ve anne-bebek ürünleri için objektif puanlama ve tarafsız incelemeler. Uzman testleri, fiyat karşılaştırmaları ve güvenilir öneriler.",
  keywords: [
    "ürün incelemeleri",
    "en iyi ürünler",
    "objektif puanlama",
    "fiyat karşılaştırma",
    "teknoloji inceleme",
    "anne bebek ürünleri",
    "ev yaşam",
  ],
  openGraph: {
    title: "The Objektif - Tarafsız Ürün İncelemeleri",
    description: "Türkiye'nin en objektif ürün inceleme platformu. Uzman testleri ve veri odaklı analizler.",
    url: "https://theobjektif.com",
    images: [{ url: "/og-image.jpg" }],
  },
  alternates: {
    canonical: "https://theobjektif.com",
  },
};

export const dynamic = 'force-dynamic';

export default async function Home() {
<<<<<<< HEAD
  // Supabase'den en yüksek puanlı ürünleri çek
=======
  // Fetch top-rated products from Supabase
>>>>>>> bcfa0b2 (feat: Tüm sayfalarda ürün resimlerini göster)
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('rating', { ascending: false })
    .limit(6);

  return (
    <div className="w-full">
      <HeroSection />
      <CategoryCards />

<<<<<<< HEAD
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
=======
      {/* Real Products Section */}
      {products && products.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              En Yüksek Puanlı Ürünler
            </h2>
            <p className="text-muted-foreground mb-8">
              Objektif testlerimizle en yüksek puanı alan ürünler
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                  {/* Product Image */}
                  <div className="relative w-full h-48 bg-slate-100">
                    <Image
                      src={product.image_url || getPlaceholderImage()}
                      alt={product.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <Badge
                      variant="secondary"
                      className="absolute top-2 left-2 bg-white/90 backdrop-blur"
                    >
                      {product.brand}
                    </Badge>
                    <div className="absolute top-2 right-2 bg-accent text-white px-3 py-1 rounded-full">
                      <span className="text-lg font-bold">{product.rating}</span>
                      <span className="text-xs">/10</span>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-lg line-clamp-2">
                      {product.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
>>>>>>> bcfa0b2 (feat: Tüm sayfalarda ürün resimlerini göster)
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-primary">
                        {product.current_price?.toLocaleString("tr-TR")} ₺
                      </span>
<<<<<<< HEAD
                    </div>
                    <Link href={`/${product.category}/${product.subcategory}/${product.slug}`}>
                      <Button className="w-full">
                        Detaylı İnceleme
                      </Button>
=======
                      {product.original_price && product.original_price > product.current_price && (
                        <span className="text-sm text-muted-foreground line-through">
                          {product.original_price.toLocaleString("tr-TR")} ₺
                        </span>
                      )}
                    </div>
                    <Link href={`/${product.category}/${product.subcategory}/${product.slug}`}>
                      <Button className="w-full">Detaylı İnceleme</Button>
>>>>>>> bcfa0b2 (feat: Tüm sayfalarda ürün resimlerini göster)
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
