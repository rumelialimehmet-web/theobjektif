import { HeroSection } from "@/components/home/hero-section";
import { CategoryCards } from "@/components/home/category-cards";
import { FeaturedLists } from "@/components/home/featured-lists";
import { TrustSignals } from "@/components/home/trust-signals";

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <CategoryCards />
      <FeaturedLists />
      <TrustSignals />
    </div>
  );
}
