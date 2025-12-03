import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const footerCategories = [
  {
    title: "Kategoriler",
    links: [
      { name: "Teknoloji", href: "/teknoloji" },
      { name: "Ev & Yaşam", href: "/ev-yasam" },
      { name: "Anne & Bebek", href: "/anne-bebek" },
      { name: "Yazılım & Araçlar", href: "/yazilim-araclar" },
    ],
  },
  {
    title: "Keşfet",
    links: [
      { name: "En İyi Ürünler", href: "/en-iyiler" },
      { name: "Karşılaştırmalar", href: "/karsilastir" },
      { name: "Fiyat Düşüşleri", href: "/fiyat-dususleri" },
      { name: "Yeni İncelemeler", href: "/yeni-incelemeler" },
    ],
  },
  {
    title: "Hakkımızda",
    links: [
      { name: "Nasıl Test Ediyoruz?", href: "/nasil-test-ediyoruz" },
      { name: "Objektif Puan Sistemi", href: "/objektif-puan-sistemi" },
      { name: "Ekibimiz", href: "/ekibimiz" },
      { name: "İletişim", href: "/iletisim" },
    ],
  },
  {
    title: "Yasal",
    links: [
      { name: "Gizlilik Politikası", href: "/gizlilik-politikasi" },
      { name: "Kullanım Şartları", href: "/kullanim-sartlari" },
      { name: "Affiliate Açıklaması", href: "/affiliate-aciklamasi" },
      { name: "Çerez Politikası", href: "/cerez-politikasi" },
    ],
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-50">
      <div className="container mx-auto px-4 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {footerCategories.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-sm mb-4 text-slate-50">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-teal-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="bg-slate-700 mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold">The</span>
            <span className="text-lg font-bold text-teal-400">Objektif</span>
          </div>

          <p className="text-sm text-slate-400 text-center md:text-right">
            © {currentYear} The Objektif. Tüm hakları saklıdır.
            <br />
            <span className="text-xs">
              Tarafsız İnceleme, Net Karar.
            </span>
          </p>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 pt-8 border-t border-slate-700">
          <p className="text-xs text-slate-500 text-center max-w-3xl mx-auto">
            The Objektif, Amazon, Trendyol ve diğer satış ortaklığı programlarının katılımcısıdır.
            Satın alımlarınızdan komisyon kazanabiliriz. Bu, sizin için hiçbir ekstra maliyet oluşturmaz
            ve inceleme sürecimizin objektifliğini etkilemez.
          </p>
        </div>
      </div>
    </footer>
  );
}
