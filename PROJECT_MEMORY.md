# PROJECT_MEMORY.md
> **Project Name:** The Objektif - Veri Odaklı Ürün İnceleme Platformu
> **Last Updated:** 2025-12-04
> **Current Phase:** Admin Panel Tamamlandı - Ürün Ekleme Aktif
> **Active Context:** Admin Panel ile Veri Yönetimi

---

## [1. PROJECT VISION & GOALS]
* **Core Concept:** Türkiye'nin en objektif, veri odaklı ürün inceleme platformu. Teknoloji, ev yaşam ve anne-bebek kategorilerinde tarafsız puanlama sistemi ile kullanıcılara en doğru bilgiyi sunar.
* **Target Audience:**
  - Online alışveriş yapan 25-45 yaş arası kullanıcılar
  - Teknoloji meraklıları
  - Yeni ebeveynler (Anne & Bebek kategorisi için)
  - Bilinçli tüketiciler (fiyat/performans arayanlar)
* **Success Criteria:**
  - Kullanıcılar objektif puanlama sistemine güveniyor
  - Fiyat düşüş alarmları aktif kullanılıyor
  - Anne-Bebek kategorisinde güvenlik odaklı içerik takdir ediliyor
  - SEO ile organik trafik artışı

## [2. TECH STACK & CONSTRAINTS]
* **Language/Framework:** TypeScript + Next.js 14+ (App Router)
* **Backend/DB:** Supabase (PostgreSQL) - Serverless
* **State Management:** React Server Components (minimal client state)
* **UI Library:** Shadcn/UI (Radix UI) + Tailwind CSS v3
* **Styling:** Tailwind CSS v3 (downgraded from v4 for Shadcn compatibility)
* **Icons:** Lucide React
* **Deployment:** Vercel (auto-deploy from Git)
* **Key Packages:**
  - @supabase/supabase-js (database)
  - @radix-ui/react-* (accessible UI primitives)
  - class-variance-authority (variant management)
  - tailwind-merge (className conflicts)
* **Constraints:**
  - No external CSS frameworks
  - Mobile-first responsive design
  - Server Components > Client Components (for performance)
  - Pure white background (#FFFFFF) for modern, clean UX
  - Anne-Bebek kategorisi için özel güvenlik filtreleri zorunlu

## [3. ARCHITECTURE & PATTERNS]
* **Design Pattern:** Server-First Architecture with Next.js App Router
* **Folder Structure:**
    * `/app/(main)`: Ana layout grubu - Header/Footer paylaşımlı
      - `/[category]`: Kategori sayfaları (dynamic routing)
      - `/[category]/[subcategory]`: Alt kategori sayfaları
      - `/[category]/[subcategory]/[product]`: Ürün detay ("KALP KISMI")
    * `/app/admin`: Admin panel (middleware ile korumalı)
      - `/login`: Admin giriş sayfası
      - `/products`: Ürün listesi
      - `/products/new`: Yeni ürün ekleme formu
      - `actions.ts`: Server actions (createProduct, deleteProduct)
    * `/app/karsilastir`: VS karşılaştırma sayfaları
    * `/app/api/admin/logout`: Logout endpoint
    * `/components/home`: Ana sayfa component'leri
    * `/components/product`: Ürün-spesifik component'ler (ObjektifScoreCard, PriceButtons)
    * `/components/shared`: Paylaşılan component'ler (Header, Footer)
    * `/components/ui`: Shadcn/UI primitives
    * `/lib`: Utility fonksiyonlar ve Supabase client
      - `categories.ts`: Kategori tanımları (CATEGORIES const)
      - `supabase.ts`: Supabase client
      - `supabase-queries.ts`: Tüm database sorguları
    * `middleware.ts`: Admin route koruma
* **Naming Conventions:**
  - Components: PascalCase (ObjektifScoreCard.tsx)
  - Functions: camelCase (getProductsByCategory)
  - Database tables: snake_case (price_alerts, price_history)
  - CSS classes: Tailwind utility classes
  - Slugs: kebab-case (anne-bebek, oto-koltugu)

## [4. ACTIVE RULES (The "Laws")]
*(Yapay zekanın asla çiğnememesi gereken kurallar)*
1. **Supabase Güvenliği**: ASLA API Key'leri koda gömme. `.env.local` kullan ve `.gitignore`'a ekle.
2. **Admin Panel Auth**: Admin şifresi: `objektif2024` (development). Production'da değiştirilmeli.
3. **Renk Sistemi**: Objektif puanlama için dinamik renkler kullan:
   - 9.0+: emerald-600 (Mükemmel)
   - 8.0-8.9: teal-600 (Çok İyi)
   - 7.0-7.9: amber-500 (İyi)
   - <7.0: rose-600 (Orta)
3. **Anne-Bebek Özel Kurallar**:
   - Güvenlik rozetleri (ADAC, i-Size, Oeko-Tex) her zaman gösterilmeli
   - Yaş aralığı filtreleri aktif olmalı
   - Toksisite bilgileri vurgulanmalı
4. **Server Components First**: Client component sadece interaktif özellikler için (modal, form, button clicks)
5. **TypeScript Strict Mode**: Tüm props ve return type'lar tanımlanmalı
6. **Pure White Background**: Ana arka plan #FFFFFF (rgb(255 255 255)), section'larda slate-50 kullanılabilir
7. **Responsive Design**: Mobile-first yaklaşım, her component mobilde çalışmalı
8. **SEO**: Her sayfa için generateStaticParams kullan (static generation)
9. **Mock Data Yasağı**: Artık MOCK_PRODUCTS kullanma, her zaman Supabase'den çek

## [5. PROGRESS & ROADMAP]
- [x] Phase 1: Setup & Configuration
  - [x] Next.js 14+ App Router setup
  - [x] Tailwind CSS v3 (Shadcn uyumlu)
  - [x] Shadcn/UI component'leri eklendi
- [x] Phase 2: Core Features
  - [x] Ana sayfa (Hero, CategoryCards, FeaturedLists, TrustSignals)
  - [x] Header & Footer component'leri
  - [x] Kategori sayfaları (dinamik routing)
  - [x] Alt kategori sayfaları (filtreler ile)
  - [x] Ürün detay sayfası (ObjektifScoreCard - KALP KISMI)
  - [x] VS Karşılaştırma sayfaları
- [x] Phase 3: Supabase Integration
  - [x] Supabase client setup
  - [x] Database schema (supabase-schema.sql)
  - [x] Query functions (supabase-queries.ts)
  - [x] Fiyat alarmı (price_alerts table)
  - [x] Tüm sayfalarda Supabase entegrasyonu (MOCK_PRODUCTS kaldırıldı)
- [x] Phase 4: UI Polish & UX
  - [x] Pure white background (#FFFFFF)
  - [x] Renk sistemi optimize edildi
  - [x] Anne-Bebek özel güvenlik filtreleri
  - [x] Responsive design
- [x] Phase 5: Admin Panel (Vibecoder Friendly!)
  - [x] Admin login sayfası (password: objektif2024)
  - [x] Middleware ile route koruma
  - [x] Admin dashboard
  - [x] Ürün listesi sayfası
  - [x] Tam özellikli ürün ekleme formu
    - [x] Kategori/alt kategori seçimi
    - [x] Dinamik artılar/eksiler listesi
    - [x] Teknik özellikler (key-value)
    - [x] Güvenlik rozetleri (anne-bebek)
    - [x] Otomatik slug oluşturma
  - [x] Server actions (createProduct, deleteProduct)
  - [x] Logout endpoint
  - [ ] Ürün düzenleme formu
  - [ ] Ürün silme konfirmasyonu
- [ ] Phase 6: Production Enhancements
  - [ ] Admin üzerinden 5-10 örnek ürün ekle
  - [ ] Fiyat geçmişi grafiği
  - [ ] E-posta bildirimleri (price alerts için)
  - [ ] SEO meta tags
  - [ ] Sitemap.xml
  - [ ] Analytics (Vercel Analytics)
- [ ] Phase 7: Advanced Features
  - [ ] Kullanıcı yorumları (AI özeti ile)
  - [ ] Fiyat tracking cron job
  - [ ] Newsletter sistemi
  - [ ] Bulk product import

## [6. DECISION LOG & ANTI-PATTERNS]
*(Hatalardan ders çıkarma günlüğü)*

### Karar Günlüğü
* **[2025-12-04 - Tailwind v4 -> v3 Downgrade]:** Shadcn/UI, Tailwind v4 ile uyumlu değil. Registry'ye bağlanamıyor. v3.4.18'e geri döndük. ✅ Çözüm: Tailwind v3 kullan.
* **[2025-12-04 - Supabase Schema]:** `category_id` (UUID) yerine `category` ve `subcategory` (TEXT slug) kullanıyoruz. Daha basit, daha hızlı sorgular. ✅ Karar: Slug-based routing.
* **[2025-12-04 - Server Components]:** Tüm sayfalar async server component'e dönüştürüldü. Client component sadece PriceAlertModal. ✅ Performans artışı.
* **[2025-12-04 - Pure White Background]:** Kullanıcı arka plan rengini göz yorucu buldu. slate-50 -> #FFFFFF değişikliği. ✅ Modern, temiz görünüm.
* **[2025-12-04 - Admin Panel Eklendi]:** Supabase SQL yazmak yerine UI üzerinden ürün yönetimi. Vibecoder-friendly! Basit password auth (objektif2024). ✅ Kullanıcı deneyimi çok daha iyi.

### Anti-Patterns (Bir Daha Yapma!)
* **❌ Tailwind v4 Kullanma:** Shadcn/UI ile uyumsuz. v3.4.x'de kal.
* **❌ MOCK_PRODUCTS Kullanma:** Artık tüm veri Supabase'den gelir. Mock data sadece development başlangıcı için.
* **❌ Client Component Abuse:** Her şeyi "use client" yapma. Sadece interaktif özellikler için.
* **❌ Inline Styles:** Tailwind utility classes kullan. Inline style yasak (performance).
* **❌ Hard-coded Kategoriler:** CATEGORIES object'i lib/categories.ts'de merkezileştirildi. Başka yerde kategori tanımlama.
* **❌ TypeScript any kullanımı:** Her zaman explicit type tanımla. `any` yasak.

---

## [7. SUPABASE DATABASE SCHEMA]

### Tablolar
```sql
- products: Ürün bilgileri
  - id (UUID), slug (TEXT), name, category, subcategory
  - brand, current_price, original_price, rating
  - pros (TEXT[]), cons (TEXT[]), specs (JSONB), safety_badges (TEXT[])

- price_alerts: Fiyat düşüş alarmları
  - id, product_id, email, target_price, current_price
  - is_active, is_triggered

- price_history: Fiyat geçmişi
  - id, product_id, price, platform, recorded_at

- reviews: Editör incelemeleri (future)
  - id, product_id, content (Markdown), author_id, summary_ai
```

### Query Functions (lib/supabase-queries.ts)
- `getProductsByCategory(categorySlug)`
- `getProductsBySubcategory(categorySlug, subcategorySlug)`
- `getProductBySlug(productSlug)`
- `getAllProducts()` - generateStaticParams için
- `getFeaturedProducts(limit)` - rating >= 9.0
- `createPriceAlert(data)` - Fiyat alarmı kaydet
- `getPriceHistory(productId, days)` - Fiyat geçmişi

---

## [8. KATEGORI YAPISI]

### Ana Kategoriler
1. **Teknoloji** (`teknoloji`)
   - Akıllı Telefonlar (`akilli-telefonlar`)
   - Laptop & Bilgisayar (`laptop-bilgisayar`)
   - Kulaklık & Ses (`kulaklik-ses`)
   - Akıllı Saat (`akilli-saat`)

2. **Ev Yaşam** (`ev-yasam`)
   - Ev Aletleri (`ev-aletleri`)
   - Mutfak Robotları (`mutfak-robotlari`)
   - Temizlik (`temizlik`)
   - Küçük Ev Aletleri (`kucuk-ev-aletleri`)

3. **Anne & Bebek** (`anne-bebek`)
   - Oto Koltuğu (`oto-koltugu`)
   - Bebek Arabası (`bebek-arabasi`)
   - Monitör & Güvenlik (`monitor-guvenlik`)
   - Beslenme (`beslenme`)
   - **Özel Özellikler:**
     - Güvenlik sertifikaları (ADAC, i-Size, Oeko-Tex, BPA-Free)
     - Yaş aralığı filtreleri (0-6 ay, 6-12 ay, 1-3 yaş, 3+ yaş)
     - Toksisite testleri vurgulanır

4. **Yazılım Araçları** (`yazilim-araclar`)
   - Tasarım Araçları (`tasarim-araclari`)
   - Geliştirici Araçları (`gelistirici-araclari`)
   - Productivity (`productivity`)

---

## [9. COMPONENT REFERENCE]

### Ana Sayfa Component'leri
- `HeroSection`: Above-the-fold hero banner
- `CategoryCards`: 4 ana kategori kartları
- `FeaturedLists`: Öne çıkan ürün listeleri (4 tane)
- `TrustSignals`: Güven sinyalleri (test süreci, tarafsızlık vb.)

### Ürün Component'leri
- `ObjektifScoreCard`: TheObjektif puanı kartı (KALP KISMI)
  - Dinamik renk sistemi (rating'e göre)
  - Pros/Cons listesi
  - Güvenlik rozetleri (anne-bebek için)
- `PriceButtons`: Fiyat karşılaştırma butonları (Trendyol, Amazon, Hepsiburada)
- `PriceAlertModal`: Fiyat alarmı kurma modal'ı (client component)

### Paylaşılan Component'ler
- `Header`: Sticky header, kategori dropdown'ları, mobile menu
- `Footer`: 4-column footer, affiliate disclaimer

---

**OPERATIONAL DIRECTIVE:**
1. **Read First:** Before answering any prompt, check this file for context.
2. **Update Often:** If a task is completed, check the box [x]. If a tech decision changes, update Section 2 or 6.
3. **Stay Consistent:** Do not suggest code that violates "Active Rules" (Section 4).
4. **Color System:** Always use the objektif scoring color system (Section 4, Rule 2).
5. **Anne-Bebek Priority:** When working on baby category, always include safety features (Section 4, Rule 3).
6. **No Mock Data:** Always use Supabase queries (Section 4, Rule 9).

---

**QUICK REFERENCE:**
- **Main Color:** Teal-600 (`#0e7490`) - Objektiflik
- **Background:** Pure White (`#FFFFFF`)
- **Typography:** Inter (Google Fonts)
- **Border Radius:** 0.75rem (rounded-xl)
- **Database:** Supabase (PostgreSQL)
- **Deploy:** Vercel (auto from Git)

---

**LAST ACTION:** Admin panel eklendi! Artık UI üzerinden ürün eklenebilir. Login: /admin/login (şifre: objektif2024). Vibecoder-friendly tam özellikli ürün yönetimi.
