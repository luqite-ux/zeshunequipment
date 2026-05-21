import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { NewsPageClient } from "./news-page-client"
import { getArticles } from "@/lib/articles-db"

export const revalidate = 60

export const metadata: Metadata = {
  title: "News & Insights - Industry Updates | Zeshun Equipment",
  description: "Stay updated with the latest news, industry insights, and company updates from Zeshun Equipment. Learn about new products, technologies, and manufacturing trends.",
  keywords: "machinery news, industry insights, manufacturing updates, equipment technology, company news",
}

export default async function NewsPage() {
  const articles = await getArticles()

  return (
    <main className="min-h-screen pt-[88px] md:pt-[104px]">
      <Header />
      
      {/* Page Header */}
      <section className="bg-foreground py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-primary text-primary-foreground text-sm font-semibold rounded-full mb-6">
              NEWS & INSIGHTS
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-background mb-6 leading-tight text-balance">
              Latest Updates & Industry News
            </h1>
            <p className="text-background/80 text-lg leading-relaxed">
              Stay informed about our latest developments, industry trends, and technical insights 
              in industrial mixing and processing equipment.
            </p>
          </div>
        </div>
      </section>

      <NewsPageClient articles={articles} />
      <Footer />
    </main>
  )
}
