export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">
          <span className="text-accent">Tarafsız</span> İnceleme,{" "}
          <span className="text-accent">Net</span> Karar.
        </h1>
        <p className="text-lg text-muted-foreground">
          The Objektif'e hoş geldiniz! Teknoloji, ev yaşam ve anne-bebek ürünleri için
          veri odaklı, tarafsız incelemeler ve karşılaştırmalar.
        </p>
        <p className="text-sm text-muted-foreground border-l-4 border-accent pl-4 text-left">
          🚀 <strong>Not:</strong> Site kurulumu devam ediyor. Header ve Footer hazır!
          Ana sayfa, kategori sayfaları ve ürün detayları yakında eklenecek.
        </p>
      </div>
    </div>
  );
}
