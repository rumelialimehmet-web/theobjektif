import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Nasıl Test Ediyoruz?",
  description: "The Objektif'in 2 haftalık test süreci. Uzman testleri, kalite kontrol ve objektif puanlama metodolojimiz hakkında detaylı bilgi.",
  keywords: ["ürün testi", "test süreci", "uzman incelemeleri", "kalite kontrol", "objektif değerlendirme"],
  openGraph: {
    title: "Nasıl Test Ediyoruz? - The Objektif",
    description: "2 haftalık uzman testi ve objektif puanlama sistemimiz.",
    url: "https://theobjektif.com/nasil-test-ediyoruz",
  },
  alternates: {
    canonical: "https://theobjektif.com/nasil-test-ediyoruz",
  },
};

export default function NasilTestEdiyoruzPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold text-primary mb-8">Nasıl Test Ediyoruz?</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>2 Haftalık Test Süreci</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-slate max-w-none">
            <p>
              Her ürünü minimum 2 hafta boyunca günlük kullanımda test ediyoruz.
              Gerçek hayat senaryolarında performansını ölçüyoruz.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Objektif Değerlendirme</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-slate max-w-none">
            <p>
              Hiçbir markadan sponsorluk almıyoruz. Tüm ürünler bağımsız olarak test ediliyor.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
