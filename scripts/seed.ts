import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { resolve } from 'path';

// .env.local dosyasını yükle
config({ path: resolve(process.cwd(), '.env.local') });

// Supabase client oluştur
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase bilgileri bulunamadı! .env.local dosyasını kontrol edin.');
  console.error('URL:', supabaseUrl);
  console.error('Key:', supabaseKey ? 'Mevcut' : 'Yok');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Örnek ürünler
const sampleProducts = [
  // TEKNOLOJİ - Akıllı Telefonlar
  {
    name: 'iPhone 15 Pro Max',
    slug: 'iphone-15-pro-max',
    category: 'teknoloji',
    subcategory: 'akilli-telefonlar',
    brand: 'Apple',
    current_price: 74999,
    original_price: 79999,
    rating: 9.2,
    pros: ['A17 Pro çip ile üstün performans', '5x optik zoom kamera', 'Titanyum kasa - hafif ve dayanıklı', '120Hz ProMotion ekran'],
    cons: ['Yüksek fiyat', 'Şarj adaptörü kutuda yok', 'Lightning yerine USB-C (eski aksesuarlar uyumsuz)'],
    specs: {
      'Ekran': '6.7 inç',
      'İşlemci': 'A17 Pro',
      'RAM': '8GB',
      'Depolama': '256GB',
      'Kamera': '48MP Ana + 12MP Ultra Wide',
      'Pil': '4422 mAh'
    },
    safety_badges: []
  },
  // TEKNOLOJİ - Laptop
  {
    name: 'MacBook Air M3',
    slug: 'macbook-air-m3',
    category: 'teknoloji',
    subcategory: 'laptop-bilgisayar',
    brand: 'Apple',
    current_price: 54999,
    original_price: 59999,
    rating: 9.1,
    pros: ['M3 çip ile güçlü performans', 'Sessiz çalışma (fansız)', '18 saate kadar pil ömrü', 'Liquid Retina ekran'],
    cons: ['Sadece 2 USB-C port', 'Temel model 8GB RAM', 'SSD yükseltme pahalı'],
    specs: {
      'İşlemci': 'Apple M3',
      'RAM': '8GB',
      'SSD': '256GB',
      'Ekran': '13.6 inç',
      'Ağırlık': '1.24 kg',
      'Pil': '18 saat'
    },
    safety_badges: []
  },
  // TEKNOLOJİ - Kulaklık
  {
    name: 'Sony WH-1000XM5',
    slug: 'sony-wh-1000xm5',
    category: 'teknoloji',
    subcategory: 'kulaklik-ses',
    brand: 'Sony',
    current_price: 11999,
    original_price: 13999,
    rating: 9.3,
    pros: ['Mükemmel aktif gürültü önleme', 'Üstün ses kalitesi', '30 saat pil ömrü', 'Çok rahat kullanım'],
    cons: ['Katlanamıyor', 'Fiyat yüksek', 'Kılıf büyük'],
    specs: {
      'Sürücü': '30mm',
      'Bluetooth': '5.2',
      'Pil': '30 saat',
      'Şarj': 'USB-C',
      'Ağırlık': '250g',
      'ANC': 'Evet'
    },
    safety_badges: []
  },
  // ANNE-BEBEK - Oto Koltuğu
  {
    name: 'Cybex Sirona Z i-Size',
    slug: 'cybex-sirona-z-i-size',
    category: 'anne-bebek',
    subcategory: 'oto-koltugu',
    brand: 'Cybex',
    current_price: 15999,
    original_price: 17999,
    rating: 9.3,
    pros: ['ADAC testlerinde mükemmel', '360 derece dönebilme', 'i-Size (R129) standardı', 'SensorSafe teknolojisi'],
    cons: ['Ağır (15kg)', 'Yüksek fiyat', 'Bazı araçlara geniş gelebilir'],
    specs: {
      'Yaş': '0-4 yaş',
      'Ağırlık': '15 kg',
      'İsofix': 'Evet',
      'Döner': 'Evet',
      'Standart': 'i-Size (R129)'
    },
    safety_badges: ['ADAC', 'i-Size (R129)', 'Oeko-Tex']
  },
  // ANNE-BEBEK - Bebek Arabası
  {
    name: 'Joie Chrome DLX',
    slug: 'joie-chrome-dlx',
    category: 'anne-bebek',
    subcategory: 'bebek-arabasi',
    brand: 'Joie',
    current_price: 8999,
    original_price: 9999,
    rating: 8.7,
    pros: ['Hafif ve kolay katlanır', 'Geniş sepet', 'Yüksek kalite/fiyat oranı', 'Travel sistem uyumlu'],
    cons: ['Tekerlek süspansiyonu sert', 'Sele yastığı ince', 'Güneşlik kısa'],
    specs: {
      'Yaş': '0-3 yaş',
      'Ağırlık': '12 kg',
      'Katlanma': 'Tek el',
      'Tekerlek': '4 tekerlekli',
      'Sepet': '10 kg'
    },
    safety_badges: ['CE', 'BPA-Free']
  },
  // EV YAŞAM - Temizlik
  {
    name: 'Dyson V15 Detect',
    slug: 'dyson-v15-detect',
    category: 'ev-yasam',
    subcategory: 'temizlik',
    brand: 'Dyson',
    current_price: 18999,
    original_price: 21999,
    rating: 9.0,
    pros: ['Lazer ile toz algılama', 'Güçlü emme', '60 dakika pil', 'LCD ekran'],
    cons: ['Ağır', 'Yüksek fiyat', 'Aksesuar fiyatları pahalı'],
    specs: {
      'Güç': '230W',
      'Pil': '60 dakika',
      'Filtre': 'HEPA',
      'Kapasite': '0.77L',
      'Ağırlık': '3.1 kg',
      'Şarj': '4.5 saat'
    },
    safety_badges: []
  },
  // EV YAŞAM - Ev Aletleri
  {
    name: 'Philips Airfryer XXL',
    slug: 'philips-airfryer-xxl',
    category: 'ev-yasam',
    subcategory: 'ev-aletleri',
    brand: 'Philips',
    current_price: 6999,
    original_price: 7999,
    rating: 8.9,
    pros: ['Büyük kapasite (1.4kg)', 'Eşit pişirme', 'Kolay temizleme', 'QuickControl kumanda'],
    cons: ['Büyük - yer kaplar', 'Gürültülü', 'Plastik koku (ilk kullanımda)'],
    specs: {
      'Kapasite': '1.4 kg',
      'Güç': '2225W',
      'Sıcaklık': '40-200°C',
      'Zamanlayıcı': '60 dakika',
      'Boyut': '31.5 x 28.7 x 42.3 cm'
    },
    safety_badges: []
  },
  // TEKNOLOJİ - Akıllı Saat
  {
    name: 'Apple Watch Series 9',
    slug: 'apple-watch-series-9',
    category: 'teknoloji',
    subcategory: 'akilli-saat',
    brand: 'Apple',
    current_price: 14999,
    original_price: 16999,
    rating: 9.0,
    pros: ['S9 çip - hızlı', 'Double tap özelliği', 'Always-On Retina ekran', 'Sağlık sensörleri'],
    cons: ['Android ile uyumsuz', 'Pil ömrü kısa (18 saat)', 'Yüksek fiyat'],
    specs: {
      'Ekran': '1.9 inç',
      'İşlemci': 'S9',
      'Pil': '18 saat',
      'Su Geçirmez': '50m',
      'GPS': 'Evet',
      'Sensörler': 'Kalp, EKG, Oksijen'
    },
    safety_badges: []
  },
  // ANNE-BEBEK - Monitör
  {
    name: 'Motorola Baby MBP36XL',
    slug: 'motorola-baby-mbp36xl',
    category: 'anne-bebek',
    subcategory: 'monitor-guvenlik',
    brand: 'Motorola',
    current_price: 3499,
    original_price: 3999,
    rating: 8.5,
    pros: ['5 inç renkli ekran', 'Uzaktan kumanda', 'Gece görüşü', 'İki yönlü konuşma'],
    cons: ['Kamera sabit', 'Wi-Fi yok', 'Pil ömrü orta'],
    specs: {
      'Ekran': '5 inç',
      'Menzil': '300m',
      'Kamera': '720p',
      'Gece görüşü': 'Evet',
      'Ninni': 'Evet',
      'Sıcaklık': 'Evet'
    },
    safety_badges: ['CE', 'BPA-Free']
  },
  // EV YAŞAM - Mutfak
  {
    name: 'KitchenAid Artisan Stand Mixer',
    slug: 'kitchenaid-artisan-stand-mixer',
    category: 'ev-yasam',
    subcategory: 'mutfak-robotlari',
    brand: 'KitchenAid',
    current_price: 12999,
    original_price: 14999,
    rating: 9.2,
    pros: ['Güçlü motor (300W)', '10 hız seviyesi', 'Metal gövde', '15+ aksesuar uyumlu'],
    cons: ['Ağır (11kg)', 'Pahalı', 'Gürültülü'],
    specs: {
      'Güç': '300W',
      'Kapasite': '4.8L',
      'Hız': '10 seviye',
      'Ağırlık': '11 kg',
      'Malzeme': 'Metal',
      'Renk': 'Çoklu'
    },
    safety_badges: []
  }
];

async function seedDatabase() {
  console.log('🌱 Seed işlemi başlıyor...\n');

  try {
    // Önce mevcut ürünleri kontrol et
    const { data: existingProducts, error: checkError } = await supabase
      .from('products')
      .select('slug');

    if (checkError) {
      throw checkError;
    }

    const existingSlugs = new Set(existingProducts?.map(p => p.slug) || []);
    const productsToInsert = sampleProducts.filter(p => !existingSlugs.has(p.slug));

    if (productsToInsert.length === 0) {
      console.log('✅ Tüm örnek ürünler zaten eklenmiş!');
      return;
    }

    console.log(`📦 ${productsToInsert.length} yeni ürün eklenecek...\n`);

    // Ürünleri tek tek ekle (feedback için)
    for (const product of productsToInsert) {
      const { data, error } = await supabase
        .from('products')
        .insert(product)
        .select()
        .single();

      if (error) {
        console.error(`❌ Hata (${product.name}):`, error.message);
      } else {
        console.log(`✓ ${product.brand} ${product.name} - /${product.category}/${product.subcategory}/${product.slug}`);
      }
    }

    console.log('\n🎉 Seed işlemi tamamlandı!');
    console.log(`\n📊 Toplam ${productsToInsert.length} ürün eklendi.`);
    console.log('\n🔗 Artık siteyi ziyaret edebilirsiniz:');
    console.log('   - Ana sayfa: http://localhost:3000');
    console.log('   - Admin panel: http://localhost:3000/admin');

  } catch (error) {
    console.error('❌ Seed hatası:', error);
    process.exit(1);
  }
}

// Script'i çalıştır
seedDatabase();
