import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactInfo } from "@/components/contact/contact-info"
import { PageHero } from "@/components/site-content/page-hero"
import { getSiteContent, pageModule } from "@/lib/site-content/site-content"

export const metadata: Metadata = {
  title: "Contact Us - Request a Quote | Zeshun Machinery",
  description: "Contact JIANGYIN ZESHUN MACHINERY CO., LTD. for custom stainless steel equipment quotes. Get in touch with our engineering team for professional consultation.",
  keywords: "contact Zeshun, request quote, machinery inquiry, custom equipment, B2B inquiry",
}

export default async function ContactPage() {
  const siteContent = await getSiteContent("en")
  return (
    <main className="min-h-screen pt-[88px] md:pt-[104px]" data-hq-content-version={siteContent?.version}>
      <Header />
      
      <PageHero values={pageModule(siteContent, "/contact", "page-header")} />

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
