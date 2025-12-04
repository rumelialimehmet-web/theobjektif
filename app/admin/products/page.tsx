import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { requireAuth } from "@/lib/auth";
import { DeleteProductButton } from "@/components/admin/delete-product-button";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  // Require authentication
  await requireAuth();
  // Tüm ürünleri getir
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
  }

  const productCount = products?.length || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Ürünler</h1>
          <p className="text-muted-foreground">
            Toplam {productCount} ürün
          </p>
        </div>
        <Link href="/admin/products/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Yeni Ürün
          </Button>
        </Link>
      </div>

      {/* Products List */}
      {productCount === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 mx-auto bg-accent/10 rounded-full flex items-center justify-center">
                <Plus className="h-8 w-8 text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Henüz ürün yok</h3>
                <p className="text-muted-foreground mb-6">
                  İlk ürününüzü ekleyerek başlayın
                </p>
                <Link href="/admin/products/new">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Yeni Ürün Ekle
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {products?.map((product) => (
            <Card key={product.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{product.brand}</Badge>
                      <Badge>
                        {product.category}/{product.subcategory}
                      </Badge>
                      {product.safety_badges && product.safety_badges.length > 0 && (
                        <Badge variant="success">🛡️ {product.safety_badges.length} sertifika</Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl">{product.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      /{product.category}/{product.subcategory}/{product.slug}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-1">
                      <span className="text-2xl font-bold text-accent">
                        {product.rating}
                      </span>
                      <span className="text-sm text-muted-foreground">/10</span>
                    </div>
                    <span className="text-lg font-bold text-primary">
                      {product.current_price.toLocaleString("tr-TR")} ₺
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex gap-4 text-sm">
                    <span className="text-success">✓ {product.pros?.length || 0} artı</span>
                    <span className="text-destructive">✗ {product.cons?.length || 0} eksi</span>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/${product.category}/${product.subcategory}/${product.slug}`} target="_blank">
                      <Button variant="outline" size="sm">
                        Önizle
                      </Button>
                    </Link>
                    <Link href={`/admin/products/${product.id}/edit`}>
                      <Button variant="outline" size="sm">
                        <Pencil className="h-4 w-4 mr-1" />
                        Düzenle
                      </Button>
                    </Link>
                    <DeleteProductButton
                      productId={product.id}
                      productName={product.name}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
