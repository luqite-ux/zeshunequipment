"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Product } from "@/lib/products-db"

interface BusinessScopeProps {
  products: Product[]
}

export function BusinessScope({ products }: BusinessScopeProps) {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
            FEATURED PRODUCTS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Recommended Product Series
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our most popular stainless steel equipment solutions, trusted by customers 
            across chemical, lithium battery, pharmaceutical, and food industries.
          </p>
        </motion.div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No featured products available at the moment.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, index) => {
              const imageUrl = product.images[0] || product.image
              return (
                <motion.div
                  key={product.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    href={`/products/${product.slug}`}
                    className="group block bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border h-full"
                  >
                    <div className="relative h-56 overflow-hidden bg-white">
                      {imageUrl && (
                        <img
                          src={imageUrl}
                          alt={product.nameEn}
                          className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                        />
                      )}
                      <div className="absolute top-3 left-3">
                        <span className="inline-block px-2 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded">
                          Featured
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {product.nameEn}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {product.descriptionEn}
                      </p>
                      <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                        View Details <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        )}

        {/* View All Products Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background font-semibold rounded-lg hover:bg-foreground/90 transition-colors"
          >
            View All Products
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
