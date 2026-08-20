import { Hero } from "@/components/hero";
import { ValueProps } from "@/components/value-props";
import { CategoryCards } from "@/components/category-cards";
import { FeaturedProducts } from "@/components/featured-products";
import { SchoolsCta } from "@/components/schools-cta";
import { CustomCta } from "@/components/custom-cta";
import { JoineryDivider } from "@/components/joinery-divider";

export default function HomePage() {
  return (
    <>
      <Hero />
      <JoineryDivider />
      <ValueProps />
      <CategoryCards />
      <FeaturedProducts />
      <SchoolsCta />
      <CustomCta />
    </>
  );
}
