// Kategori tanımlamaları
export const CATEGORIES = {
  teknoloji: {
    name: "Teknoloji",
    slug: "teknoloji",
    description: "En yeni teknoloji ürünlerini test ediyoruz. Akıllı telefonlar, laptoplar, giyilebilir teknoloji ve daha fazlası.",
    subcategories: {
      "akilli-telefonlar": { name: "Akıllı Telefonlar", description: "iOS ve Android telefonların detaylı incelemeleri" },
      "laptoplar": { name: "Laptoplar", description: "Oyun, iş ve öğrenci laptopları" },
      "giyilebilir-teknoloji": { name: "Giyilebilir Teknoloji", description: "Akıllı saatler ve fitness takip cihazları" },
      "kulakliklar": { name: "Kulaklıklar", description: "Bluetooth ve kablolu kulaklıklar" },
    },
  },
  "ev-yasam": {
    name: "Ev & Yaşam",
    slug: "ev-yasam",
    description: "Ev yaşamınızı kolaylaştıran ürünleri objektif olarak inceliyoruz.",
    subcategories: {
      "robot-supurgeler": { name: "Robot Süpürgeler", description: "Otomatik temizlik robotları" },
      "kahve-makineleri": { name: "Kahve Makineleri", description: "Filtre, Türk kahvesi ve espresso makineleri" },
      "hava-temizleyiciler": { name: "Hava Temizleyiciler", description: "HEPA filtreli hava temizleme cihazları" },
    },
  },
  "anne-bebek": {
    name: "Anne & Bebek",
    slug: "anne-bebek",
    description: "Bebeğinizin güvenliği için en güvenilir ürünleri seçiyoruz. ADAC testleri ve güvenlik sertifikaları.",
    subcategories: {
      "bebek-arabalari": { name: "Bebek Arabaları", description: "Travel sistem, baston ve jogging arabalar" },
      "oto-koltuklari": { name: "Oto Koltukları", description: "ADAC test sonuçlarına göre en güvenli modeller" },
      "bebek-telsizleri": { name: "Bebek Telsizleri", description: "Video ve ses monitörleri" },
      "sut-sagim-pompalari": { name: "Süt Sağım Pompaları", description: "Elektrikli ve manuel pompalar" },
      "mama-sandalyeleri": { name: "Mama Sandalyeleri", description: "Güvenli ve pratik mama sandalyeleri" },
    },
    // Anne-Bebek kategorisine özel özellikler
    hasSecurityFilters: true,
    hasAgeFilters: true,
    ageRanges: ["0-6 Ay", "6-12 Ay", "1-3 Yaş", "3+ Yaş"],
  },
  "yazilim-araclar": {
    name: "Yazılım & Araçlar",
    slug: "yazilim-araclar",
    description: "İşinizi kolaylaştıran dijital araçlar ve yazılımlar. B2B ve bireysel çözümler.",
    subcategories: {
      "vpn-servisleri": { name: "VPN Servisleri", description: "Güvenli internet erişimi" },
      "proje-yonetimi": { name: "Proje Yönetimi", description: "Asana, Trello, Monday.com karşılaştırmaları" },
      "hosting-firmalari": { name: "Hosting Firmaları", description: "Web hosting ve domain servisleri" },
    },
  },
} as const;

export type CategorySlug = keyof typeof CATEGORIES;

// Mock ürün verisi (Gerçekte Supabase'den gelecek)
export const MOCK_PRODUCTS = [
  {
    id: "1",
    slug: "iphone-15-pro",
    name: "iPhone 15 Pro",
    category: "teknoloji",
    subcategory: "akilli-telefonlar",
    brand: "Apple",
    image_url: "/products/iphone-15-pro.jpg",
    current_price: 54999,
    original_price: 59999,
    rating: 8.7,
    pros: ["Titanium kasa", "A17 Pro işlemci", "USB-C desteği", "Harika kamera"],
    cons: ["Çok pahalı", "Şarj adaptörü yok", "Kamera çıkıntısı büyük"],
  },
  {
    id: "2",
    slug: "roborock-s8-pro",
    name: "Roborock S8 Pro Ultra",
    category: "ev-yasam",
    subcategory: "robot-supurgeler",
    brand: "Roborock",
    image_url: "/products/roborock-s8.jpg",
    current_price: 18999,
    original_price: 21999,
    rating: 9.2,
    pros: ["Kendini yıkayan mop", "6000 Pa emme gücü", "Harika haritalama", "Sessiz çalışma"],
    cons: ["Pahalı", "İstasyon büyük"],
  },
  {
    id: "3",
    slug: "cybex-sirona-s",
    name: "Cybex Sirona S i-Size",
    category: "anne-bebek",
    subcategory: "oto-koltuklari",
    brand: "Cybex",
    image_url: "/products/cybex-sirona.jpg",
    current_price: 12999,
    rating: 9.5,
    pros: ["ADAC 'çok iyi' notu", "360° dönebilir", "Isofix", "Yan darbe koruması"],
    cons: ["Ağır (15kg)", "Pahalı"],
    safety_badges: ["ADAC", "i-Size", "5 Yıldız"],
    specs: {
      ageRange: "0-4 Yaş",
      weight: "15 kg",
      isofix: true,
      rotation: "360°",
    },
  },
];
