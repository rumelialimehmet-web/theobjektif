"use client";

import { useState } from "react";
import { Bell, TrendingDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { createPriceAlert } from "@/lib/supabase-queries";

type PriceAlertModalProps = {
  productId: string;
  productName: string;
  currentPrice: number;
};

export function PriceAlertModal({ productId, productName, currentPrice }: PriceAlertModalProps) {
  const [open, setOpen] = useState(false);
  const [targetPrice, setTargetPrice] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Supabase'e kaydet
    const result = await createPriceAlert({
      productId,
      email,
      targetPrice: parseFloat(targetPrice),
      currentPrice,
    });

    setIsSubmitting(false);

    if (result.success) {
      setIsSuccess(true);

      // 2 saniye sonra modalı kapat
      setTimeout(() => {
        setOpen(false);
        setIsSuccess(false);
        setTargetPrice("");
        setEmail("");
      }, 2000);
    } else {
      setError("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  const suggestedPrices = [
    Math.floor(currentPrice * 0.9), // %10 indirim
    Math.floor(currentPrice * 0.85), // %15 indirim
    Math.floor(currentPrice * 0.8), // %20 indirim
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full gap-2">
          <Bell className="h-4 w-4" />
          Fiyat Düşünce Haber Ver
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        {!isSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-accent" />
                Fiyat Alarmı Kur
              </DialogTitle>
              <DialogDescription>
                {productName} için hedef fiyat belirleyin. Fiyat düştüğünde sizi hemen haberdar edelim!
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Current Price */}
              <div className="p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Mevcut Fiyat:</span>
                  <span className="text-lg font-bold text-primary">
                    {currentPrice.toLocaleString("tr-TR")} ₺
                  </span>
                </div>
              </div>

              {/* Target Price */}
              <div className="space-y-3">
                <label className="text-sm font-medium">
                  Hedef Fiyat <span className="text-rose-600">*</span>
                </label>
                <Input
                  type="number"
                  placeholder="Örn: 45000"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(e.target.value)}
                  required
                  min="1"
                  max={currentPrice - 1}
                  className="text-lg"
                />
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs text-muted-foreground">Hızlı seçim:</span>
                  {suggestedPrices.map((price) => (
                    <Button
                      key={price}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setTargetPrice(price.toString())}
                      className="text-xs"
                    >
                      {price.toLocaleString("tr-TR")} ₺
                      <Badge variant="success" className="ml-2 text-[10px]">
                        %{Math.round(((currentPrice - price) / currentPrice) * 100)}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-3">
                <label className="text-sm font-medium">
                  E-posta Adresiniz <span className="text-rose-600">*</span>
                </label>
                <Input
                  type="email"
                  placeholder="ornek@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  🔒 E-posta adresiniz sadece fiyat düşüş bildirimleri için kullanılır.
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-sm text-rose-600">
                  {error}
                </div>
              )}

              {/* Submit */}
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Kaydediliyor...
                  </span>
                ) : (
                  <>
                    <Bell className="mr-2 h-4 w-4" />
                    Alarmı Kur
                  </>
                )}
              </Button>
            </form>
          </>
        ) : (
          <div className="py-12 text-center space-y-4">
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                <Bell className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary mb-2">
                ✅ Fiyat Alarmı Kuruldu!
              </h3>
              <p className="text-sm text-muted-foreground">
                Fiyat <strong>{parseInt(targetPrice).toLocaleString("tr-TR")} ₺</strong>'ye düştüğünde
                size e-posta göndereceğiz.
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
