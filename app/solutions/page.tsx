import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SolutionsContent } from "@/components/solutions/solutions-content"
import { PageHero } from "@/components/site-content/page-hero"
import { getSiteContent, pageModule } from "@/lib/site-content/site-content"

export const metadata: Metadata = {
  title: "Industry Solutions - Chemical, Pharmaceutical, Lithium Battery | Zeshun Machinery",
  description: "Comprehensive equipment solutions for chemical, lithium battery, pharmaceutical, and food processing industries. Custom-designed mixing, emulsification, and automation systems.",
  keywords: "chemical industry solutions, pharmaceutical equipment, lithium battery machinery, food processing, industry solutions",
}

export default async function SolutionsPage() {
  const siteContent = await getSiteContent("en")
  return (
    <main className="min-h-screen pt-[88px] md:pt-[104px]" data-hq-content-version={siteContent?.version}>
      <Header />
      
      <PageHero values={pageModule(siteContent, "/solutions", "page-header")} />

      <SolutionsContent />
      <Footer />
    </main>
  )
}
