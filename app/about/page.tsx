import { Metadata } from "next"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AboutContent } from "@/components/about/about-content"
import { ManufacturingCapabilities } from "@/components/about/manufacturing-capabilities"
import { Certifications } from "@/components/about/certifications"

export const metadata: Metadata = {
  title: "About Us - JIANGYIN ZESHUN MACHINERY CO., LTD.",
  description: "Learn about Zeshun Machinery - a professional manufacturer of stainless steel equipment with 15,000m² modern facility, advanced CNC equipment, and 6+ years of industry experience.",
  keywords: "Zeshun Machinery, about us, stainless steel manufacturer, Jiangyin, China machinery, equipment manufacturer",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-[88px] md:pt-[104px]">
      <Header />
      
      {/* Page Header */}
      <section className="relative bg-foreground py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/workshop.jpg"
            alt="Workshop"
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-primary text-primary-foreground text-sm font-semibold rounded-full mb-6">
              ABOUT US
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-background mb-6 leading-tight text-balance">
              JIANGYIN ZESHUN MACHINERY CO., LTD.
            </h1>
            <p className="text-background/80 text-lg leading-relaxed">
              Established in 2021, we are a professional manufacturer specializing in stainless steel 
              non-standard custom equipment, serving the chemical, lithium battery, pharmaceutical, and food industries.
            </p>
          </div>
        </div>
      </section>

      <AboutContent />
      <ManufacturingCapabilities />
      <Certifications />
      <Footer />
    </main>
  )
}
