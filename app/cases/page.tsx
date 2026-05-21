import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CasesGrid } from "@/components/cases/cases-grid"

export const metadata: Metadata = {
  title: "Engineering Cases - Project Portfolio | Zeshun Machinery",
  description: "Explore our successful engineering projects across chemical, lithium battery, pharmaceutical, and food industries. See how Zeshun Machinery delivers custom solutions.",
  keywords: "engineering cases, project portfolio, chemical equipment, pharmaceutical machinery, lithium battery equipment, food processing",
}

export default function CasesPage() {
  return (
    <main className="min-h-screen pt-[88px] md:pt-[104px]">
      <Header />
      
      {/* Page Header */}
      <section className="bg-foreground py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-primary text-primary-foreground text-sm font-semibold rounded-full mb-6">
              ENGINEERING CASES
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-background mb-6 leading-tight text-balance">
              Our Project Portfolio
            </h1>
            <p className="text-background/80 text-lg leading-relaxed">
              With over 1,000 successful projects completed, we have extensive experience delivering 
              custom equipment solutions across various industries worldwide.
            </p>
          </div>
        </div>
      </section>

      <CasesGrid />
      <Footer />
    </main>
  )
}
