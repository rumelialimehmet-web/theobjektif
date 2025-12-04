import { notFound } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, Check, X, Trophy, Scale } from "lucide-react";

type PageProps = {
  params: { comparison: string };
};

// Mock comparison data
const mockComparisons: Record<string, any> = {
  "iphone-15-pro-vs-samsung-s24-ultra": {
    product1: {
      name: "iPhone 15 Pro",
      brand: "Apple",
      rating: 8.7,
      price: 54999,
      image: "/products/iphone-15-pro.jpg",
    },
    product2: {
      name: "Samsung Galaxy S24 Ultra",
      brand: "Samsung",
      rating: 8.9,
      price: 52999,
      image: "/products/samsung-s24.jpg",
    },
    winner: "Samsung S24 Ultra",
    category: "Akıllı Telefonlar",
    specs: [
      {
        feature: "İşlemci",
        product1: "A17 Pro (3nm)",
        product2: "Snapdragon 8 Gen 3",
        winner: "product1",
      },
      {
        feature: "Ekran",
        product1: '6.1" OLED',
        product2: '6.8" Dynamic AMOLED 2X',
        winner: "product2",
      },
      {
        feature: "RAM",
        product1: "8 GB",
        product2: "12 GB",
        winner: "product2",
      },
      {
        feature: "Kamera",
        product1: "48 MP (Ana)",
        product2: "200 MP (Ana)",
        winner: "product2",
      },
      {
        feature: "Batarya",
        product1: "3274 mAh",
        product2: "5000 mAh",
        winner: "product2",
      },
      {
        feature: "Şarj Hızı",
        product1: "27W (Kablolu)",
        product2: "45W (Kablolu)",
        winner: "product2",
      },
      {
        feature: "İşletim Sistemi",
        product1: "iOS 17",
        product2: "Android 14",
        winner: "tie",
      },
      {
        feature: "S Pen Desteği",
        product1: "Yok",
        product2: "Var",
        winner: "product2",
      },
    ],
    editorChoice: {
      winner: "Samsung S24 Ultra",
      reason: "Samsung S24 Ultra, daha büyük ekranı, güçlü kamerası ve S Pen desteği ile iPhone 15 Pro'dan bir adım önde. Ancak iOS ekosistemini seviyorsanız, iPhone hala mükemmel bir seçim.",
      prosProduct1: [
        "Premium build kalitesi (Titanium)",
        "iOS ekosistemi entegrasyonu",
        "Uzun yazılım desteği",
        "Harika kamera performansı",
      ],
      prosProduct2: [
        "Çok daha büyük batarya",
        "S Pen desteği (üretkenlik için harika)",
        "200 MP kamera",
        "Daha uygun fiyat",
      ],
    },
  },
  "roborock-s8-vs-dreame-l10s-ultra": {
    product1: {
      name: "Roborock S8 Pro Ultra",
      brand: "Roborock",
      rating: 9.2,
      price: 18999,
    },
    product2: {
      name: "Dreame L10s Ultra",
      brand: "Dreame",
      rating: 8.8,
      price: 16999,
    },
    winner: "Roborock S8 Pro",
    category: "Robot Süpürgeler",
    specs: [
      { feature: "Emme Gücü", product1: "6000 Pa", product2: "5300 Pa", winner: "product1" },
      { feature: "Mop Sistemi", product1: "Vibrasonic 2.0", product2: "DualBoost 2.0", winner: "product1" },
      { feature: "Otomatik Paspas Yıkama", product1: "Var", product2: "Var", winner: "tie" },
      { feature: "Toz Toplama", product1: "2.5L (60 gün)", product2: "2.5L (60 gün)", winner: "tie" },
      { feature: "Batarya", product1: "5200 mAh", product2: "5200 mAh", winner: "tie" },
      { feature: "Engel Algılama", product1: "3D Yapılandırılmış Işık", product2: "AI Görüntü", winner: "product1" },
    ],
    editorChoice: {
      winner: "Roborock S8 Pro Ultra",
      reason: "Roborock S8 Pro, daha güçlü emme gücü ve gelişmiş mop sistemiyle Dreame L10s'ten daha iyi temizlik yapıyor. Fiyat farkı buna değer.",
      prosProduct1: ["Daha güçlü emme", "Daha sessiz çalışma", "Harika haritalama"],
      prosProduct2: ["Daha uygun fiyat", "İyi yapay zeka", "Kompakt istasyon"],
    },
  },
  "cybex-sirona-vs-britax-dualfix": {
    product1: {
      name: "Cybex Sirona S i-Size",
      brand: "Cybex",
      rating: 9.5,
      price: 12999,
    },
    product2: {
      name: "Britax Romer Dualfix",
      brand: "Britax",
      rating: 9.3,
      price: 11499,
    },
    winner: "Cybex Sirona",
    category: "Oto Koltukları",
    specs: [
      { feature: "ADAC Test Puanı", product1: "1.7 (Çok İyi)", product2: "1.9 (İyi)", winner: "product1" },
      { feature: "Dönme", product1: "360° (Tek El)", product2: "360° (İki El)", winner: "product1" },
      { feature: "i-Size", product1: "Var", product2: "Var", winner: "tie" },
      { feature: "Isofix", product1: "Var", product2: "Var", winner: "tie" },
      { feature: "Yan Darbe Koruması", product1: "LSP Sistem", product2: "SICT Sistem", winner: "product1" },
      { feature: "Ağırlık", product1: "15 kg", product2: "14.5 kg", winner: "product2" },
      { feature: "Yaş Aralığı", product1: "0-4 Yaş", product2: "0-4 Yaş", winner: "tie" },
    ],
    editorChoice: {
      winner: "Cybex Sirona S i-Size",
      reason: "ADAC testlerinde daha iyi puan alan Cybex Sirona, bebeğinizin güvenliği için biraz daha fazla ödemeye değer. Tek elle 360° dönme özelliği de çok pratik.",
      prosProduct1: ["ADAC testinde daha yüksek puan", "Tek elle dönme", "Premium kumaş"],
      prosProduct2: ["Daha uygun fiyat", "Hafif daha hafif", "İyi yan darbe koruması"],
    },
  },
};

export default function ComparisonDetailPage({ params }: PageProps) {
  const data = mockComparisons[params.comparison];

  if (!data) {
    notFound();
  }

  const { product1, product2, winner, category, specs, editorChoice } = data;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-accent">Ana Sayfa</Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href="/karsilastir" className="hover:text-accent">Karşılaştırmalar</Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-foreground font-medium">
          {product1.name} vs {product2.name}
        </span>
      </div>

      {/* Page Header */}
      <div className="mb-8">
        <Badge variant="secondary" className="mb-3">{category}</Badge>
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
          {product1.name} vs {product2.name}
        </h1>
        <p className="text-muted-foreground">
          Yan yana detaylı karşılaştırma | Editör seçimi: <strong>{winner}</strong>
        </p>
      </div>

      {/* Products Overview */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {/* Product 1 */}
        <Card className={winner === product1.name ? "border-2 border-accent" : ""}>
          <CardHeader>
            {winner === product1.name && (
              <Badge variant="default" className="w-fit mb-2 bg-accent">
                <Trophy className="h-3 w-3 mr-1" />
                Editör Seçimi
              </Badge>
            )}
            <div className="flex items-center justify-between">
              <Badge variant="secondary">{product1.brand}</Badge>
              <div className="flex items-center gap-1">
                <span className="text-2xl font-bold text-accent">{product1.rating}</span>
                <span className="text-sm text-muted-foreground">/10</span>
              </div>
            </div>
            <CardTitle className="text-2xl">{product1.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <span className="text-3xl font-bold text-primary">
                  {product1.price.toLocaleString("tr-TR")} ₺
                </span>
              </div>
              <Button className="w-full" asChild>
                <Link href={`/teknoloji/akilli-telefonlar/${product1.name.toLowerCase().replace(/\s+/g, "-")}`}>
                  Detaylı İnceleme
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Product 2 */}
        <Card className={winner === product2.name ? "border-2 border-accent" : ""}>
          <CardHeader>
            {winner === product2.name && (
              <Badge variant="default" className="w-fit mb-2 bg-accent">
                <Trophy className="h-3 w-3 mr-1" />
                Editör Seçimi
              </Badge>
            )}
            <div className="flex items-center justify-between">
              <Badge variant="secondary">{product2.brand}</Badge>
              <div className="flex items-center gap-1">
                <span className="text-2xl font-bold text-accent">{product2.rating}</span>
                <span className="text-sm text-muted-foreground">/10</span>
              </div>
            </div>
            <CardTitle className="text-2xl">{product2.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <span className="text-3xl font-bold text-primary">
                  {product2.price.toLocaleString("tr-TR")} ₺
                </span>
              </div>
              <Button className="w-full" asChild>
                <Link href={`/teknoloji/akilli-telefonlar/${product2.name.toLowerCase().replace(/\s+/g, "-")}`}>
                  Detaylı İnceleme
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-12" />

      {/* Specs Comparison Table */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Scale className="h-6 w-6 text-accent" />
          <h2 className="text-2xl font-bold text-primary">
            Teknik Özellik Karşılaştırması
          </h2>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="p-4 text-left font-semibold">Özellik</th>
                    <th className="p-4 text-center font-semibold">{product1.name}</th>
                    <th className="p-4 text-center font-semibold">{product2.name}</th>
                  </tr>
                </thead>
                <tbody>
                  {specs.map((spec: any, index: number) => (
                    <tr key={index} className="border-t hover:bg-slate-50 transition-colors">
                      <td className="p-4 font-medium">{spec.feature}</td>
                      <td className={`p-4 text-center ${spec.winner === "product1" ? "bg-green-50 font-semibold" : ""}`}>
                        <div className="flex items-center justify-center gap-2">
                          {spec.winner === "product1" && <Check className="h-4 w-4 text-green-600" />}
                          {spec.product1}
                        </div>
                      </td>
                      <td className={`p-4 text-center ${spec.winner === "product2" ? "bg-green-50 font-semibold" : ""}`}>
                        <div className="flex items-center justify-center gap-2">
                          {spec.winner === "product2" && <Check className="h-4 w-4 text-green-600" />}
                          {spec.product2}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Editor's Choice */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="h-6 w-6 text-accent" />
          <h2 className="text-2xl font-bold text-primary">
            Editörün Kararı
          </h2>
        </div>

        <Card className="border-2 border-accent">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              🏆 Kazanan: <span className="text-accent">{editorChoice.winner}</span>
            </CardTitle>
            <CardDescription className="text-base">
              {editorChoice.reason}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Product 1 Pros */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-600" />
                  {product1.name} - Güçlü Yönler
                </h4>
                <ul className="space-y-2">
                  {editorChoice.prosProduct1.map((pro: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Product 2 Pros */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-600" />
                  {product2.name} - Güçlü Yönler
                </h4>
                <ul className="space-y-2">
                  {editorChoice.prosProduct2.map((pro: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-green-600 mt-0.5">✓</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Generate static params for comparisons
export async function generateStaticParams() {
  return Object.keys(mockComparisons).map((comparison) => ({
    comparison,
  }));
}
