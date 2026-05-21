import { Header } from "@/components/header"
import { HeroCarousel } from "@/components/home/hero-carousel"
import { StatsCounter } from "@/components/home/stats-counter"
import { BusinessScope } from "@/components/home/business-scope"
import { HomeIndustries } from "@/components/home/home-industries"
import { HomeCases } from "@/components/home/home-cases"
import { HomeNews } from "@/components/home/home-news"
import { WhyChooseUs } from "@/components/home/why-choose-us"
import { CTASection } from "@/components/home/cta-section"
import { Footer } from "@/components/footer"
import { getFeaturedProducts } from "@/lib/products-db"
import { getLatestArticles } from "@/lib/articles-db"

export const revalidate = 60

export default async function Home() {
  const [featuredProducts, latestArticles] = await Promise.all([
    getFeaturedProducts(6),
    getLatestArticles(3),
  ])

  return (
    <main className="min-h-screen pt-[88px] md:pt-[104px]">
      <Header />
      <HeroCarousel />
      <StatsCounter />
      <BusinessScope products={featuredProducts} />
      <HomeIndustries />
      <HomeCases />
      <HomeNews articles={latestArticles} />
      <WhyChooseUs />
      <CTASection />
      <Footer />
    </main>
  )
}
