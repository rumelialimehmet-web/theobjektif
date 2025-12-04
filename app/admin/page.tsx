import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Plus, TrendingUp, Users } from "lucide-react";
import { requireAuth } from "@/lib/auth";

export default async function AdminDashboard() {
  // Require authentication
  await requireAuth();
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
        <p className="text-muted-foreground">The Objektif admin paneline hoş geldiniz</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Toplam Ürün</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Henüz ürün eklenmedi</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Fiyat Alarmları</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">Aktif alarm yok</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Kategoriler</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Ana kategori</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Hızlı İşlemler</CardTitle>
          <CardDescription>
            Admin panelinde yapabileceğiniz temel işlemler
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Link href="/admin/products/new">
            <Button className="w-full justify-start" size="lg">
              <Plus className="h-5 w-5 mr-2" />
              Yeni Ürün Ekle
            </Button>
          </Link>
          <Link href="/admin/products">
            <Button variant="outline" className="w-full justify-start" size="lg">
              <Package className="h-5 w-5 mr-2" />
              Tüm Ürünleri Görüntüle
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Getting Started */}
      <Card className="border-accent">
        <CardHeader>
          <CardTitle className="text-accent">Başlangıç Rehberi</CardTitle>
          <CardDescription>
            İlk ürününüzü ekleyerek başlayın
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
              1
            </div>
            <div>
              <p className="font-medium">Yeni Ürün Ekle butonuna tıklayın</p>
              <p className="text-sm text-muted-foreground">
                Form üzerinden ürün bilgilerini doldurun
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
              2
            </div>
            <div>
              <p className="font-medium">Kategori ve alt kategoriyi seçin</p>
              <p className="text-sm text-muted-foreground">
                Ürünün hangi kategoriye ait olduğunu belirleyin
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
              3
            </div>
            <div>
              <p className="font-medium">Objektif puanını ve özelliklerini girin</p>
              <p className="text-sm text-muted-foreground">
                Rating, artılar, eksiler ve teknik özellikleri ekleyin
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
