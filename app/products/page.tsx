import { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductsPageClient } from "./products-page-client"
import { ProductsSEO } from "@/components/products/products-seo"
import { getProducts, getProductCategories } from "@/lib/products-db"

export const revalidate = 60
export const dynamicParams = true

export const metadata: Metadata = {
  title: "Products - Stainless Steel Mixing Equipment | Zeshun Equipment",
  description: "Explore our range of stainless steel mixing equipment, emulsifiers, high shear dispersers, powder dosing systems, storage tanks and reactors for chemical, pharmaceutical, lithium battery and food industries.",
  keywords: "mixing equipment, emulsifier, high shear disperser, powder dosing system, stainless steel tank, reactor, industrial mixer, homogenizer",
}

interface ProductsPageProps {
  searchParams: Promise<{ category?: string }>
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams
  const initialCategory = params.category || undefined

  // Fetch data from Supabase
  const [products, categories] = await Promise.all([
    getProducts(),
    getProductCategories(),
  ])

  return (
    <main className="min-h-screen pt-[88px] md:pt-[104px]">
      <Header />
      
      {/* Page Header */}
      <section className="bg-foreground py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-primary text-primary-foreground text-sm font-semibold rounded-full mb-6">
              OUR PRODUCTS
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-background mb-6 leading-tight text-balance">
              Professional Stainless Steel Equipment
            </h1>
            <p className="text-background/80 text-lg leading-relaxed">
              We manufacture high-quality mixing equipment, emulsifiers, dispersers, and automated systems 
              for chemical, lithium battery, pharmaceutical, and food processing industries.
            </p>
          </div>
        </div>
      </section>

      <ProductsPageClient 
        products={products} 
        categories={categories} 
        initialCategory={initialCategory} 
      />
      <ProductsSEO />
      <Footer />
    </main>
  )
}
