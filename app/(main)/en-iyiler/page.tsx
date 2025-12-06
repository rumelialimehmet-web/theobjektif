import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "En İyiler Listesi",
  description: "Editörün seçimi ve kategorilere göre en iyi ürünler. Uzman testleri sonucunda en yüksek puanı alan ürünlerin listeleri.",
  keywords: ["en iyi ürünler", "editörün seçimi", "yılın ürünleri", "önerilen ürünler", "best of"],
  openGraph: {
    title: "En İyiler Listesi - The Objektif",
    description: "Kategorilere göre en iyi ürünler ve editörün seçimleri.",
    url: "https://theobjektif.com/en-iyiler",
  },
  alternates: {
    canonical: "https://theobjektif.com/en-iyiler",
  },
};

export default function EnIyilerPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold text-primary mb-8">En İyiler</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Editörün Seçimi</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Kategorilere göre en iyi ürünler yakında burada listelenecek.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
