import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Award, Zap, Shield } from "lucide-react";

const featuredLists = [
  {
    title: "2025'in En İyi Robot Süpürgeleri",
    description: "10 farklı modeli test ettik, kazananları sizler için seçtik",
    icon: Award,
    badge: "Editör Seçimi",
    badgeVariant: "default" as const,
    href: "/listeler/en-iyi-robot-supurgeler-2025",
    products: ["Roborock S8 Pro", "Dreame L10s Ultra", "Xiaomi S10+"],
  },
  {
    title: "En Güvenli Oto Koltukları",
    description: "ADAC test sonuçlarına göre en güvenli 8 oto koltuğu",
    icon: Shield,
    badge: "Anne & Bebek",
    badgeVariant: "secondary" as const,
    href: "/listeler/en-guvenli-oto-koltukları-2025",
    products: ["Cybex Sirona", "Britax Romer Dualfix", "Maxi-Cosi Pearl"],
  },
  {
    title: "Fiyat/Performans Kralı Telefonlar",
    description: "15.000 TL altı en iyi akıllı telefon modelleri",
    icon: Zap,
    badge: "Popüler",
    badgeVariant: "warning" as const,
    href: "/listeler/fiyat-performans-telefonlar-2025",
    products: ["Poco F5", "Samsung A54", "Redmi Note 13 Pro"],
  },
  {
    title: "Bu Hafta Fiyatı Düşen Ürünler",
    description: "En çok indirime giren 12 ürün - Kaçırma!",
    icon: TrendingUp,
    badge: "Fırsat",
    badgeVariant: "success" as const,
    href: "/listeler/fiyat-dususleri",
    products: ["iPhone 14 Pro", "Dyson V15", "Philips Airfryer XXL"],
  },
];

export function FeaturedLists() {
  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Öne Çıkan Listeler
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            En çok aranan ürünler için hazırladığımız detaylı karşılaştırmalar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {featuredLists.map((list) => {
            const Icon = list.icon;
            return (
              <Card key={list.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <Badge variant={list.badgeVariant}>{list.badge}</Badge>
                  </div>
                  <CardTitle className="text-xl leading-tight">{list.title}</CardTitle>
                  <CardDescription>{list.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      Listede:
                    </p>
                    <ul className="text-sm space-y-1">
                      {list.products.map((product) => (
                        <li key={product} className="flex items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent mr-2" />
                          {product}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link href={list.href}>
                    <Button variant="outline" className="w-full">
                      Listeyi İncele
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
