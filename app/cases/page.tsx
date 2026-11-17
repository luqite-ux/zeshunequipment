import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CasesGrid } from "@/components/cases/cases-grid"
import { PageHero } from "@/components/site-content/page-hero"
import { getSiteContent, pageModule } from "@/lib/site-content/site-content"

export const metadata: Metadata = {
  title: "Engineering Cases - Project Portfolio | Zeshun Machinery",
  description: "Explore our successful engineering projects across chemical, lithium battery, pharmaceutical, and food industries. See how Zeshun Machinery delivers custom solutions.",
  keywords: "engineering cases, project portfolio, chemical equipment, pharmaceutical machinery, lithium battery equipment, food processing",
}

export default async function CasesPage() {
  const siteContent = await getSiteContent("en")
  return (
    <main className="min-h-screen pt-[88px] md:pt-[104px]" data-hq-content-version={siteContent?.version}>
      <Header />
      
      <PageHero values={pageModule(siteContent, "/cases", "page-header")} />

      <CasesGrid />
      <Footer />
    </main>
  )
}
