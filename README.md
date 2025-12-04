# The Objektif

**The Objektif** - Veri odaklı, tarafsız ürün inceleme platformu. Teknoloji, ev yaşam ve anne-bebek kategorilerinde objektif puanlama sistemi ile kullanıcılara en doğru bilgiyi sunuyoruz.

## Özellikler

### 🎯 Temel Özellikler
- **Objektif Puanlama Sistemi**: Her ürün için 10 üzerinden detaylı puanlama
- **Çoklu Platform Fiyat Karşılaştırma**: Trendyol, Amazon, Hepsiburada fiyatları yan yana
- **Fiyat Düşüş Alarmı**: E-posta ile fiyat düşüşü bildirimleri
- **Detaylı İncelemeler**: 2 haftalık test süreciyle hazırlanan kapsamlı reviews
- **VS Karşılaştırma Sayfaları**: Ürünleri yan yana karşılaştırma

### 👶 Anne & Bebek Özel Özellikleri
- **Güvenlik Sertifikaları**: ADAC, i-Size, Oeko-Tex rozetleri
- **Yaş Aralığı Filtreleri**: 0-6 ay, 6-12 ay, 1-3 yaş, 3+ yaş
- **Toksisite Testleri**: BPA-free, güvenlik öncelikli incelemeler

### 🎨 Tasarım Sistemi
- **Primary Color**: Slate-900 (Otorite)
- **Accent Color**: Teal-600 (Objektiflik)
- **Success**: Emerald-600 (Yüksek puanlar, fiyat düşüşleri)
- **Warning**: Amber-500 (Orta puanlar)
- **Danger**: Rose-600 (Düşük puanlar, negatif özellikler)

## Teknoloji Stack

- **Framework**: Next.js 14+ (App Router)
- **Dil**: TypeScript
- **Styling**: Tailwind CSS v3
- **UI Kütüphanesi**: Shadcn/UI (Radix UI)
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel
- **Icons**: Lucide React

## Kurulum

### 1. Projeyi Klonlayın

```bash
git clone https://github.com/rumelialimehmet-web/theobjektif.git
cd theobjektif
```

### 2. Bağımlılıkları Yükleyin

```bash
npm install
```

### 3. Ortam Değişkenlerini Ayarlayın

`.env.local` dosyası oluşturun ve Supabase bilgilerinizi ekleyin:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. Supabase Veritabanını Kurun

1. [Supabase](https://supabase.com) hesabı oluşturun
2. Yeni bir proje oluşturun
3. SQL Editor'e gidin
4. `supabase-schema.sql` dosyasındaki tüm kodu kopyalayıp çalıştırın
5. Tablolarınız otomatik oluşturulacak

### 5. Geliştirme Sunucusunu Başlatın

```bash
npm run dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## Supabase Veritabanı Yapısı

### Tablolar

#### `products`
- `id` (UUID): Primary key
- `slug` (TEXT): URL dostu ürün adı
- `name` (TEXT): Ürün adı
- `category` (TEXT): Kategori slug'ı (örn: "anne-bebek")
- `subcategory` (TEXT): Alt kategori slug'ı (örn: "oto-koltugu")
- `brand` (TEXT): Marka adı
- `current_price` (DECIMAL): Güncel fiyat
- `original_price` (DECIMAL): Orijinal fiyat
- `rating` (DECIMAL): Objektif puanı (8.7 gibi)
- `pros` (TEXT[]): Artılar dizisi
- `cons` (TEXT[]): Eksiler dizisi
- `specs` (JSONB): Ürün özellikleri
- `safety_badges` (TEXT[]): Güvenlik rozetleri

#### `price_alerts`
- `id` (UUID): Primary key
- `product_id` (UUID): Ürün referansı
- `email` (TEXT): Kullanıcı e-postası
- `target_price` (DECIMAL): Hedef fiyat
- `is_active` (BOOLEAN): Aktif mi?
- `is_triggered` (BOOLEAN): Tetiklendi mi?

#### `price_history`
- `id` (UUID): Primary key
- `product_id` (UUID): Ürün referansı
- `price` (DECIMAL): Fiyat
- `platform` (TEXT): Platform adı (Trendyol, Amazon, vb.)
- `recorded_at` (TIMESTAMP): Kayıt zamanı

## Proje Yapısı

```
theobjektif/
├── app/
│   ├── (main)/                    # Ana layout grubu
│   │   ├── page.tsx              # Ana sayfa
│   │   ├── [category]/           # Kategori sayfaları
│   │   ├── [category]/[subcategory]/     # Alt kategori sayfaları
│   │   └── [category]/[subcategory]/[product]/  # Ürün detay
│   ├── karsilastir/              # Karşılaştırma sayfaları
│   └── globals.css               # Global stiller
├── components/
│   ├── home/                     # Ana sayfa componentleri
│   ├── product/                  # Ürün componentleri
│   ├── shared/                   # Paylaşılan componentler
│   └── ui/                       # Shadcn/UI componentleri
├── lib/
│   ├── categories.ts             # Kategori tanımları
│   ├── supabase.ts              # Supabase client
│   ├── supabase-queries.ts      # Supabase sorguları
│   └── utils.ts                 # Yardımcı fonksiyonlar
├── public/                       # Statik dosyalar
├── supabase-schema.sql          # Veritabanı şeması
└── package.json
```

## Önemli Dosyalar

### `lib/categories.ts`
Kategori ve alt kategori yapılandırması. Buradan kategori ekleyebilir/çıkarabilirsiniz.

### `lib/supabase-queries.ts`
Tüm Supabase veritabanı sorguları burada. Kullanılabilir fonksiyonlar:
- `getProductsByCategory()` - Kategoriye göre ürünler
- `getProductsBySubcategory()` - Alt kategoriye göre ürünler
- `getProductBySlug()` - Tek bir ürün
- `getFeaturedProducts()` - Öne çıkan ürünler
- `createPriceAlert()` - Fiyat alarmı oluştur
- `getPriceHistory()` - Fiyat geçmişi

### `supabase-schema.sql`
Veritabanı şeması. Bu dosyayı Supabase SQL Editor'de çalıştırarak tüm tabloları oluşturabilirsiniz.

## Vercel'de Deploy

### 1. Vercel Hesabı Oluşturun
[Vercel](https://vercel.com) üzerinden GitHub hesabınızla giriş yapın.

### 2. Projeyi Import Edin
- "Add New Project" butonuna tıklayın
- GitHub repository'nizi seçin
- Import edin

### 3. Ortam Değişkenlerini Ekleyin
Vercel dashboard'unda "Environment Variables" bölümüne:
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. Deploy Edin
- "Deploy" butonuna tıklayın
- 2-3 dakika içinde siteniz yayında olacak!

## Ürün Ekleme

Supabase Table Editor'den veya SQL Editor ile ürün ekleyebilirsiniz:

```sql
INSERT INTO products (
  slug, name, category, subcategory, brand,
  current_price, original_price, rating,
  pros, cons, specs
) VALUES (
  'cybex-sirona-z',
  'Cybex Sirona Z i-Size',
  'anne-bebek',
  'oto-koltugu',
  'Cybex',
  15999,
  17999,
  9.3,
  ARRAY['ADAC testlerinde çok iyi', '360 derece dönebilme'],
  ARRAY['Ağır (15kg)', 'Yüksek fiyat'],
  '{"weight": "15kg", "isofix": true}'::jsonb
);
```

## Önemli Notlar

### Vibecoder İçin
- Kod yazmaya gerek yok! Tüm kod hazır.
- Sadece Supabase'e ürün ekleyin
- `.env.local` dosyasını doğru ayarlayın
- Vercel'e deploy edin

### Güvenlik
- `.env.local` dosyasını asla commit etmeyin
- Supabase Row Level Security (RLS) aktif
- Fiyat alarmları için e-posta doğrulaması eklenebilir

### Performans
- Next.js Image component ile otomatik görsel optimizasyonu
- Server Components ile hızlı sayfa yükleme
- Static Generation ile SEO optimizasyonu

## Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## Lisans

MIT License

## İletişim

Proje Sahibi: The Objektif Ekibi
Website: [theobjektif.com](https://theobjektif.com)

---

**The Objektif ile objektif kararlar alın!** 🎯
