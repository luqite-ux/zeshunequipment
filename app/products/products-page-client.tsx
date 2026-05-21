"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Grid3X3, List, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Product, ProductCategory } from "@/lib/products-db"

interface ProductsPageClientProps {
  products: Product[]
  categories: ProductCategory[]
  initialCategory?: string
}

export function ProductsPageClient({ products, categories, initialCategory }: ProductsPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || "all")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Filter products based on category and search
  const filteredProducts = useMemo(() => {
    let result = products

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter(p => p.categorySlug === selectedCategory)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.nameEn.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.descriptionEn.toLowerCase().includes(query)
      )
    }

    return result
  }, [products, selectedCategory, searchQuery])

  // Group products by category for display
  const productsByCategory = useMemo(() => {
    if (selectedCategory !== "all") {
      const category = categories.find(c => c.slug === selectedCategory)
      if (category) {
        return [{ category, products: filteredProducts }]
      }
    }
    
    return categories.map(category => ({
      category,
      products: filteredProducts.filter(p => p.categorySlug === category.slug)
    })).filter(group => group.products.length > 0)
  }, [categories, filteredProducts, selectedCategory])

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        {/* Filters Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("all")}
            >
              All Products
            </Button>
            {categories.map((category) => (
              <Button
                key={category.slug}
                variant={selectedCategory === category.slug ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.slug)}
              >
                {category.nameEn}
              </Button>
            ))}
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 ml-auto">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("list")}
              aria-label="List view"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-sm text-muted-foreground">
          Showing {filteredProducts.length} products
          {selectedCategory !== "all" && (
            <span> in {categories.find(c => c.slug === selectedCategory)?.nameEn}</span>
          )}
          {searchQuery && <span> for &quot;{searchQuery}&quot;</span>}
        </div>

        {/* Products Display */}
        {productsByCategory.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCategory("all")
                setSearchQuery("")
              }}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="space-y-12">
            {productsByCategory.map(({ category, products: categoryProducts }) => (
              <div key={category.slug}>
                {/* Category Header */}
                {selectedCategory === "all" && (
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-foreground">{category.nameEn}</h2>
                    <Link
                      href={`/products?category=${category.slug}`}
                      className="text-primary hover:underline text-sm font-medium"
                    >
                      View All ({categoryProducts.length})
                    </Link>
                  </div>
                )}

                {/* Products Grid/List */}
                {viewMode === "grid" ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {categoryProducts.map((product, index) => (
                      <motion.div
                        key={product.slug}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {categoryProducts.map((product, index) => (
                      <motion.div
                        key={product.slug}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <ProductListItem product={product} />
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function ProductCard({ product }: { product: Product }) {
  const imageUrl = product.images[0] || product.image
  
  return (
    <Link href={`/products/${product.slug}`} className="group block h-full">
      <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
        <div className="aspect-square relative bg-white">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.nameEn}
              className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
              No Image
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
            {product.nameEn}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {product.descriptionEn}
          </p>
        </CardContent>
      </Card>
    </Link>
  )
}

function ProductListItem({ product }: { product: Product }) {
  const imageUrl = product.images[0] || product.image
  
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="flex flex-col sm:flex-row">
          <div className="w-full sm:w-48 h-48 relative bg-white flex-shrink-0">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={product.nameEn}
                className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                No Image
              </div>
            )}
          </div>
          <CardContent className="flex-1 p-4 flex flex-col justify-center">
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors mb-2">
              {product.nameEn}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.descriptionEn}
            </p>
            <span className="text-primary text-sm font-medium mt-3 group-hover:underline">
              View Details →
            </span>
          </CardContent>
        </div>
      </Card>
    </Link>
  )
}
