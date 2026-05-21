import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SolutionsContent } from "@/components/solutions/solutions-content"

export const metadata: Metadata = {
  title: "Industry Solutions - Chemical, Pharmaceutical, Lithium Battery | Zeshun Machinery",
  description: "Comprehensive equipment solutions for chemical, lithium battery, pharmaceutical, and food processing industries. Custom-designed mixing, emulsification, and automation systems.",
  keywords: "chemical industry solutions, pharmaceutical equipment, lithium battery machinery, food processing, industry solutions",
}

export default function SolutionsPage() {
  return (
    <main className="min-h-screen pt-[88px] md:pt-[104px]">
      <Header />
      
      {/* Page Header */}
      <section className="bg-foreground py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-primary text-primary-foreground text-sm font-semibold rounded-full mb-6">
              INDUSTRY SOLUTIONS
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-background mb-6 leading-tight text-balance">
              Tailored Solutions for Your Industry
            </h1>
            <p className="text-background/80 text-lg leading-relaxed">
              We provide specialized equipment and complete production line solutions designed 
              specifically for your industry requirements and production challenges.
            </p>
          </div>
        </div>
      </section>

      <SolutionsContent />
      <Footer />
    </main>
  )
}
