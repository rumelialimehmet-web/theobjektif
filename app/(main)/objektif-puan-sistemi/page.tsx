import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Objektif Puan Sistemi",
  description: "10 üzerinden objektif puanlama sistemimiz nasıl çalışır? Performans, kalite, fiyat/performans ve kullanım deneyimi kategorilerindeki değerlendirme kriterleri.",
  keywords: ["objektif puanlama", "puan sistemi", "ürün değerlendirme", "rating sistemi", "performans testi"],
  openGraph: {
    title: "Objektif Puan Sistemi - The Objektif",
    description: "10 üzerinden objektif puanlama sistemimiz ve değerlendirme kriterleri.",
    url: "https://theobjektif.com/objektif-puan-sistemi",
  },
  alternates: {
    canonical: "https://theobjektif.com/objektif-puan-sistemi",
  },
};

export default function ObjektifPuanSistemiPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold text-primary mb-8">Objektif Puan Sistemi</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Puanlama Kategorileri</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Badge className="bg-emerald-600">9.0 - 10.0</Badge>
              <span>Mükemmel - Kesinlikle tavsiye edilir</span>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-teal-600">8.0 - 8.9</Badge>
              <span>Çok İyi - Güvenle alınabilir</span>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-amber-500">7.0 - 7.9</Badge>
              <span>İyi - Bütçeye uygun seçenek</span>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-rose-600">0 - 6.9</Badge>
              <span>Orta - Alternatiflerine bakılmalı</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
