import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

type PriceButton = {
  platform: string;
  price: number;
  url: string;
  isBestPrice?: boolean;
};

type PriceButtonsProps = {
  currentPrice: number;
  originalPrice?: number;
  platforms: PriceButton[];
};

export function PriceButtons({
  currentPrice,
  originalPrice,
  platforms,
}: PriceButtonsProps) {
  const discount =
    originalPrice && originalPrice > currentPrice
      ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
      : null;

  return (
    <div className="space-y-4">
      {/* Current Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-4xl font-bold text-primary">
          {currentPrice.toLocaleString("tr-TR")} ₺
        </span>
        {originalPrice && originalPrice > currentPrice && (
          <>
            <span className="text-xl text-muted-foreground line-through">
              {originalPrice.toLocaleString("tr-TR")} ₺
            </span>
            <Badge variant="success" className="text-sm">
              %{discount} İndirim
            </Badge>
          </>
        )}
      </div>

      {/* Platform Buttons */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">
          En İyi Fiyatlar:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {platforms.map((platform) => (
            <a
              key={platform.platform}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="block"
            >
              <Button
                variant={platform.isBestPrice ? "default" : "outline"}
                className="w-full relative"
              >
                {platform.isBestPrice && (
                  <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs px-2 py-0.5 rounded-full">
                    En İyi
                  </span>
                )}
                <div className="flex items-center justify-between w-full">
                  <span className="font-semibold">{platform.platform}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-sm">
                      {platform.price.toLocaleString("tr-TR")} ₺
                    </span>
                    <ExternalLink className="h-3 w-3" />
                  </div>
                </div>
              </Button>
            </a>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          ⚡ Fiyatlar son 1 saat içinde güncellendi. Tıklayarak satın aldığınızda
          sizin için hiçbir ekstra maliyet yoktur.
        </p>
      </div>
    </div>
  );
}
