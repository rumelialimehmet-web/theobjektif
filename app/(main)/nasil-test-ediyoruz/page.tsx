import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
