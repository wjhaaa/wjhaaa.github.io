import { Seo } from "@/components/seo";
import { HomeScreen } from "@/components/home-hero";
import {
  getHeroCarouselItems,
  getHeroPortfolio,
} from "@/content/portfolio";
import { siteConfig } from "@/lib/site-config";

export default function HomePage() {
  const featured = getHeroPortfolio();
  const carouselItems = getHeroCarouselItems();

  if (!featured) return null;

  return (
    <>
      <Seo
        title={siteConfig.titleZh}
        description={siteConfig.description}
        image={siteConfig.ogImage}
      />
      <HomeScreen featured={featured} carouselItems={carouselItems} />
    </>
  );
}
