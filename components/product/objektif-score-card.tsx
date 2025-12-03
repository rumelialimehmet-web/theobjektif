import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle } from "lucide-react";

type ObjektifScoreCardProps = {
  rating: number;
  pros: string[];
  cons: string[];
  safetyBadges?: string[];
};

export function ObjektifScoreCard({
  rating,
  pros,
  cons,
  safetyBadges,
}: ObjektifScoreCardProps) {
  // Puan rengini belirle
  const getScoreColor = (score: number) => {
    if (score >= 9.0) return "text-emerald-600"; // Mükemmel
    if (score >= 8.0) return "text-teal-600"; // Çok İyi
    if (score >= 7.0) return "text-amber-500"; // İyi
    return "text-rose-600"; // Orta
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 9.0) return "bg-emerald-50 border-emerald-200";
    if (score >= 8.0) return "bg-teal-50 border-teal-200";
    if (score >= 7.0) return "bg-amber-50 border-amber-200";
    return "bg-rose-50 border-rose-200";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 9.0) return "Mükemmel";
    if (score >= 8.0) return "Çok İyi";
    if (score >= 7.0) return "İyi";
    return "Orta";
  };

  return (
    <Card className={`${getScoreBgColor(rating)} border-2`}>
      <CardHeader>
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold text-primary">
            TheObjektif Puanı
          </h3>
          <div className="flex items-center justify-center gap-3">
            <span className={`text-6xl font-bold ${getScoreColor(rating)}`}>
              {rating}
            </span>
            <div className="text-left">
              <div className="text-2xl text-muted-foreground">/10</div>
              <div className={`text-sm font-semibold ${getScoreColor(rating)}`}>
                {getScoreLabel(rating)}
              </div>
            </div>
          </div>

          {safetyBadges && safetyBadges.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 pt-4 border-t">
              {safetyBadges.map((badge) => (
                <Badge key={badge} variant="success" className="text-xs">
                  🛡️ {badge}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-6">
        {/* Artılar */}
        <div className="space-y-3">
          <h4 className="font-semibold text-green-700 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5" />
            Artılar
          </h4>
          <ul className="space-y-2">
            {pros.map((pro, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Eksiler */}
        <div className="space-y-3">
          <h4 className="font-semibold text-rose-700 flex items-center gap-2">
            <XCircle className="h-5 w-5" />
            Eksiler
          </h4>
          <ul className="space-y-2">
            {cons.map((con, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="text-rose-600 mt-0.5">✗</span>
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
