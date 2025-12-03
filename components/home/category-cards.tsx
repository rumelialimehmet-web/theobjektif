import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Smartphone, Home, Baby, Code } from "lucide-react";

const categories = [
  {
    name: "Teknoloji",
    slug: "teknoloji",
    description: "Akıllı telefonlar, laptoplar ve daha fazlası",
    icon: Smartphone,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    count: "150+ İnceleme",
  },
  {
    name: "Ev & Yaşam",
    slug: "ev-yasam",
    description: "Robot süpürgeler, kahve makineleri, hava temizleyiciler",
    icon: Home,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    count: "80+ İnceleme",
  },
  {
    name: "Anne & Bebek",
    slug: "anne-bebek",
    description: "Bebek arabaları, oto koltukları, güvenli ürünler",
    icon: Baby,
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    count: "60+ İnceleme",
  },
  {
    name: "Yazılım & Araçlar",
    slug: "yazilim-araclar",
    description: "VPN, hosting, proje yönetimi araçları",
    icon: Code,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    count: "40+ İnceleme",
  },
];

export function CategoryCards() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Kategorileri Keşfet
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Her kategoride detaylı incelemeler, karşılaştırmalar ve objektif puanlar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link key={category.slug} href={`/${category.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg ${category.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className={`h-6 w-6 ${category.color}`} />
                    </div>
                    <CardTitle className="text-xl">{category.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm font-medium text-accent">
                      {category.count}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
