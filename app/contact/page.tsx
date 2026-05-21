import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactInfo } from "@/components/contact/contact-info"

export const metadata: Metadata = {
  title: "Contact Us - Request a Quote | Zeshun Machinery",
  description: "Contact JIANGYIN ZESHUN MACHINERY CO., LTD. for custom stainless steel equipment quotes. Get in touch with our engineering team for professional consultation.",
  keywords: "contact Zeshun, request quote, machinery inquiry, custom equipment, B2B inquiry",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-[88px] md:pt-[104px]">
      <Header />
      
      {/* Page Header */}
      <section className="bg-foreground py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-primary text-primary-foreground text-sm font-semibold rounded-full mb-6">
              CONTACT US
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-background mb-6 leading-tight text-balance">
              Get in Touch With Our Team
            </h1>
            <p className="text-background/80 text-lg leading-relaxed">
              Have questions about our equipment or need a custom solution? Our engineering team 
              is ready to assist you. We typically respond within 24 hours.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
            <div>
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
