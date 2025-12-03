import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Target, Shield, BarChart3 } from "lucide-react";

const trustSignals = [
  {
    icon: Target,
    title: "Objektif Puan Sistemi",
    description: "Her ürünü 10 farklı kritere göre değerlendirip 10 üzerinden puan veriyoruz.",
    points: [
      "Performans testleri",
      "Kullanıcı deneyimi",
      "Fiyat/performans oranı",
      "Dayanıklılık analizi",
    ],
  },
  {
    icon: Shield,
    title: "Bağımsız Test Süreci",
    description: "Hiçbir markadan para almadan, tamamen bağımsız olarak test ediyoruz.",
    points: [
      "Kendi laboratuvarımızda test",
      "Gerçek kullanım senaryoları",
      "Uzun süreli dayanıklılık",
      "Güvenlik sertifikaları",
    ],
  },
  {
    icon: BarChart3,
    title: "Veri Odaklı İncelemeler",
    description: "Subjektif yorumlar yerine, somut veriler ve ölçümlerle karar veriyoruz.",
    points: [
      "Performans grafikleri",
      "Fiyat geçmişi takibi",
      "Kullanıcı yorum analizi",
      "Rakip karşılaştırmaları",
    ],
  },
  {
    icon: CheckCircle2,
    title: "Güvenli Alışveriş",
    description: "Anne-bebek ürünlerinde özellikle güvenlik ve sertifikasyonlara dikkat ediyoruz.",
    points: [
      "ADAC test sonuçları",
      "Oeko-Tex sertifikaları",
      "BPA-free malzeme kontrolü",
      "Toksisite testleri",
    ],
  },
];

export function TrustSignals() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Nasıl Test Ediyoruz?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The Objektif farkı: Tarafsız, veri odaklı ve güvenilir incelemeler
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {trustSignals.map((signal) => {
            const Icon = signal.icon;
            return (
              <Card key={signal.title} className="border-2 hover:border-accent/50 transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-lg">{signal.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {signal.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {signal.points.map((point) => (
                      <li key={point} className="flex items-start text-sm">
                        <CheckCircle2 className="h-4 w-4 text-accent mr-2 mt-0.5 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Link href="/nasil-test-ediyoruz">
            <Button size="lg" variant="outline">
              Test Sürecimizi Detaylı İncele
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
