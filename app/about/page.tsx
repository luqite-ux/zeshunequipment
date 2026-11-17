import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AboutContent } from "@/components/about/about-content"
import { ManufacturingCapabilities } from "@/components/about/manufacturing-capabilities"
import { Certifications } from "@/components/about/certifications"
import { PageHero } from "@/components/site-content/page-hero"
import { getSiteContent, pageModule } from "@/lib/site-content/site-content"

export const metadata: Metadata = {
  title: "About Us - JIANGYIN ZESHUN MACHINERY CO., LTD.",
  description: "Learn about Zeshun Machinery - a professional manufacturer of stainless steel equipment with 15,000m² modern facility, advanced CNC equipment, and 6+ years of industry experience.",
  keywords: "Zeshun Machinery, about us, stainless steel manufacturer, Jiangyin, China machinery, equipment manufacturer",
}

export default async function AboutPage() {
  const siteContent = await getSiteContent("en")
  return (
    <main className="min-h-screen pt-[88px] md:pt-[104px]" data-hq-content-version={siteContent?.version}>
      <Header />
      
      <PageHero image="/images/workshop.jpg" values={pageModule(siteContent, "/about", "page-header")} />

      <AboutContent />
      <ManufacturingCapabilities />
      <Certifications />
      <Footer />
    </main>
  )
}
