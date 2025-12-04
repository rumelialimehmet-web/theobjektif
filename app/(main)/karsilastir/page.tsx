import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GitCompare, TrendingUp } from "lucide-react";

// Mock karşılaştırma verileri
const popularComparisons = [
  {
    slug: "iphone-15-pro-vs-samsung-s24-ultra",
    title: "iPhone 15 Pro vs Samsung S24 Ultra",
    category: "Akıllı Telefonlar",
    views: "12,459",
    product1: { name: "iPhone 15 Pro", rating: 8.7 },
    product2: { name: "Samsung S24 Ultra", rating: 8.9 },
    winner: "Samsung S24 Ultra",
  },
  {
    slug: "roborock-s8-vs-dreame-l10s-ultra",
    title: "Roborock S8 Pro vs Dreame L10s Ultra",
    category: "Robot Süpürgeler",
    views: "8,234",
    product1: { name: "Roborock S8 Pro", rating: 9.2 },
    product2: { name: "Dreame L10s Ultra", rating: 8.8 },
    winner: "Roborock S8 Pro",
  },
  {
    slug: "cybex-sirona-vs-britax-dualfix",
    title: "Cybex Sirona vs Britax Dualfix",
    category: "Oto Koltukları",
    views: "6,891",
    product1: { name: "Cybex Sirona", rating: 9.5 },
    product2: { name: "Britax Dualfix", rating: 9.3 },
    winner: "Cybex Sirona",
  },
  {
    slug: "macbook-pro-m3-vs-dell-xps-15",
    title: "MacBook Pro M3 vs Dell XPS 15",
    category: "Laptoplar",
    views: "15,678",
    product1: { name: "MacBook Pro M3", rating: 9.4 },
    product2: { name: "Dell XPS 15", rating: 8.6 },
    winner: "MacBook Pro M3",
  },
];

export default function ComparisonPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <GitCompare className="h-8 w-8 text-accent" />
          <h1 className="text-4xl md:text-5xl font-bold text-primary">
            Ürün Karşılaştırmaları
          </h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Rakip ürünleri yan yana koyup objektif olarak karşılaştırıyoruz.
          Hangi ürün size daha uygun, hemen öğrenin!
        </p>
      </div>

      {/* Search / Coming Soon */}
      <Card className="max-w-2xl mx-auto mb-12 border-2 border-accent/30">
        <CardHeader>
          <CardTitle className="text-center">
            🔍 Hangi Ürünleri Karşılaştırmak İstersiniz?
          </CardTitle>
          <CardDescription className="text-center">
            Karşılaştırma arama özelliği yakında eklenecek!
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Popular Comparisons */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="h-6 w-6 text-accent" />
          <h2 className="text-2xl font-bold text-primary">
            En Popüler Karşılaştırmalar
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {popularComparisons.map((comparison) => (
            <Link key={comparison.slug} href={`/karsilastir/${comparison.slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{comparison.category}</Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      👁️ {comparison.views} görüntülenme
                    </span>
                  </div>
                  <CardTitle className="text-xl group-hover:text-accent transition-colors">
                    {comparison.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Products */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="font-medium">{comparison.product1.name}</span>
                      <Badge variant="outline" className="font-bold">
                        {comparison.product1.rating}/10
                      </Badge>
                    </div>
                    <div className="text-center text-sm text-muted-foreground font-semibold">
                      VS
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="font-medium">{comparison.product2.name}</span>
                      <Badge variant="outline" className="font-bold">
                        {comparison.product2.rating}/10
                      </Badge>
                    </div>
                  </div>

                  {/* Winner */}
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Editör Seçimi:</span>
                      <Badge variant="default" className="bg-accent">
                        🏆 {comparison.winner}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h2 className="text-2xl font-bold text-primary mb-6">
          Kategoriye Göre Karşılaştırmalar
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Teknoloji", "Ev & Yaşam", "Anne & Bebek", "Yazılım"].map((category) => (
            <Card key={category} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <CardTitle className="text-lg">{category}</CardTitle>
                <CardDescription className="text-xs">
                  Karşılaştırmaları Gör
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 p-8 bg-gradient-to-r from-teal-50 to-slate-50 rounded-xl text-center">
        <h3 className="text-xl font-bold text-primary mb-2">
          Görmek İstediğiniz Karşılaştırma Var mı?
        </h3>
        <p className="text-muted-foreground mb-4">
          Bize bildirin, hemen test edip karşılaştıralım!
        </p>
        <Button>
          Karşılaştırma Talep Et
        </Button>
      </div>
    </div>
  );
}
