import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
