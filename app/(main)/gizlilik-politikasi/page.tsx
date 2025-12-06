import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description: "The Objektif gizlilik politikası. Kişisel verilerinizin korunması, çerez kullanımı ve veri güvenliği hakkında bilgi.",
  keywords: ["gizlilik politikası", "kişisel veri", "KVKK", "veri güvenliği", "çerez politikası"],
  openGraph: {
    title: "Gizlilik Politikası - The Objektif",
    description: "Kişisel verilerinizin korunması ve gizlilik politikamız.",
    url: "https://theobjektif.com/gizlilik-politikasi",
  },
  alternates: {
    canonical: "https://theobjektif.com/gizlilik-politikasi",
  },
  robots: {
    index: false, // Gizlilik sayfasını indexleme
    follow: true,
  },
};

export default function GizlilikPolitikasiPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold text-primary mb-8">Gizlilik Politikası</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Kişisel Verileriniz</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-slate max-w-none">
            <p>
              The Objektif olarak, kullanıcılarımızın gizliliğine önem veriyoruz.
              Bu sayfa yakında detaylı gizlilik politikamızla güncellenecektir.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Çerezler (Cookies)</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-slate max-w-none">
            <p>
              Sitemizde kullanıcı deneyimini iyileştirmek için çerezler kullanılmaktadır.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
