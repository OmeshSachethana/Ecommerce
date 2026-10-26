import { CategoryBento } from "@/components/home/category-bento";
import { FeaturedProducts } from "@/components/home/featured-products";
import { Hero } from "@/components/home/hero";
import { Marquee } from "@/components/home/marquee";
import { Newsletter } from "@/components/home/newsletter";
import { Spotlight } from "@/components/home/spotlight";
import { Testimonials } from "@/components/home/testimonials";
import { Values } from "@/components/home/values";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <CategoryBento />
      <FeaturedProducts />
      <Spotlight />
      <Values />
      <Testimonials />
      <Newsletter />
    </>
  );
}
