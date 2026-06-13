"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, Phone, Mail, MapPin, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getProductCategories, type ProductCategory } from "@/lib/products-db"
import { DEFAULT_SITE_SETTINGS, getSiteSettings, type SiteSettings } from "@/lib/site-settings"

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "Products",
    href: "/products",
    isMegaMenu: true,
  },
  {
    name: "Industries",
    href: "/solutions",
    children: [
      { name: "Chemical Industry", href: "/solutions#chemical" },
      { name: "Lithium Battery", href: "/solutions#lithium" },
      { name: "Pharmaceutical", href: "/solutions#pharmaceutical" },
      { name: "Food Processing", href: "/solutions#food" },
    ],
  },
  { name: "Cases", href: "/cases" },
  { name: "About Us", href: "/about" },
  { name: "News", href: "/news" },
  { name: "Contact", href: "/contact" },
]

const fallbackProductCategories: ProductCategory[] = [
  { slug: "production-line", name: "Production Line Systems", nameEn: "Production Line Systems" },
  { slug: "emulsifying", name: "Emulsifying Equipment", nameEn: "Emulsifying Equipment" },
  { slug: "mixing", name: "Mixing Equipment", nameEn: "Mixing Equipment" },
  { slug: "dispersing", name: "Dispersing Equipment", nameEn: "Dispersing Equipment" },
  { slug: "storage-tank", name: "Storage Tanks", nameEn: "Storage Tanks" },
  { slug: "reactor", name: "Reactor Equipment", nameEn: "Reactor Equipment" },
  { slug: "heat-exchange", name: "Heat Exchange Equipment", nameEn: "Heat Exchange Equipment" },
  { slug: "conveying", name: "Mixing & Conveying", nameEn: "Mixing & Conveying" },
  { slug: "auxiliary", name: "Auxiliary Equipment", nameEn: "Auxiliary Equipment" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [productCategories, setProductCategories] = useState<ProductCategory[]>(fallbackProductCategories)
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    let cancelled = false

    Promise.all([getProductCategories(), getSiteSettings()])
      .then(([categories, settings]) => {
        if (cancelled) return
        if (categories.length > 0) setProductCategories(categories)
        setSiteSettings(settings)
      })
      .catch((error) => {
        console.error("[header] failed to load dynamic navigation:", error)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Bar */}
      <div className="bg-foreground text-background text-sm">
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              <a href={siteSettings.phoneHref} className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <Phone className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{siteSettings.phone}</span>
              </a>
              <a href={`mailto:${siteSettings.email}`} className="flex items-center gap-1.5 hover:text-primary transition-colors">
                <Mail className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{siteSettings.email}</span>
              </a>
            </div>
            <div className="flex items-center gap-1.5 text-background/70">
              <MapPin className="h-3.5 w-3.5" />
              <span className="hidden md:inline">{siteSettings.address}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={`transition-all duration-300 ${isScrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-background"
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="Zeshun Equipment"
                width={180}
                height={50}
                className="h-10 md:h-12 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => {
                    if (item.isMegaMenu || item.children) {
                      setActiveDropdown(item.name)
                    }
                  }}
                  onMouseLeave={() => {
                    setActiveDropdown(null)
                  }}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                    {(item.children || item.isMegaMenu) && <ChevronDown className="h-4 w-4" />}
                  </Link>

                  {/* Regular Dropdown Menu */}
                  <AnimatePresence>
                    {item.children && !item.isMegaMenu && activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 w-56 bg-background rounded-lg shadow-xl border border-border py-2 mt-1"
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm text-foreground hover:bg-secondary hover:text-primary transition-colors"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Mega Menu for Products - Simplified without product previews */}
                  <AnimatePresence>
                    {item.isMegaMenu && activeDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 w-72 bg-background rounded-lg shadow-xl border border-border mt-1"
                      >
                        <div className="p-4">
                          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-2">
                            Product Categories
                          </h3>
                          <div className="space-y-1">
                            {productCategories.map((category) => (
                              <Link
                                key={category.slug}
                                href={`/products?category=${category.slug}`}
                                className="flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium text-foreground hover:bg-muted hover:text-primary transition-colors"
                              >
                                <span>{category.nameEn}</span>
                                <ChevronRight className="h-4 w-4" />
                              </Link>
                            ))}
                          </div>
                          <div className="mt-4 pt-4 border-t border-border">
                            <Link
                              href="/products"
                              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-primary hover:underline"
                            >
                              View All Products
                              <ChevronRight className="h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Button asChild className="bg-primary hover:bg-accent text-primary-foreground font-semibold">
                <Link href="/contact">Get Quote</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-background border-t border-border overflow-hidden max-h-[70vh] overflow-y-auto"
            >
              <div className="container mx-auto px-4 py-4">
                {navigation.map((item) => (
                  <div key={item.name} className="border-b border-border last:border-0">
                    {item.isMegaMenu ? (
                      <div>
                        <button
                          onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                          className="flex items-center justify-between w-full py-3 text-foreground font-medium"
                        >
                          {item.name}
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${activeDropdown === item.name ? "rotate-180" : ""
                              }`}
                          />
                        </button>
                        <AnimatePresence>
                          {activeDropdown === item.name && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="pl-4 pb-3 space-y-2"
                            >
                              {productCategories.map((category) => (
                                <Link
                                  key={category.slug}
                                  href={`/products?category=${category.slug}`}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                  {category.nameEn}
                                </Link>
                              ))}
                              <Link
                                href="/products"
                                onClick={() => setMobileMenuOpen(false)}
                                className="block py-2 text-sm font-medium text-primary"
                              >
                                View All Products
                              </Link>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : item.children ? (
                      <div>
                        <button
                          onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                          className="flex items-center justify-between w-full py-3 text-foreground font-medium"
                        >
                          {item.name}
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${activeDropdown === item.name ? "rotate-180" : ""
                              }`}
                          />
                        </button>
                        <AnimatePresence>
                          {activeDropdown === item.name && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="pl-4 pb-3 space-y-2"
                            >
                              {item.children.map((child) => (
                                <Link
                                  key={child.name}
                                  href={child.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                                >
                                  {child.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-3 text-foreground font-medium hover:text-primary transition-colors"
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                <div className="pt-4">
                  <Button asChild className="w-full bg-primary hover:bg-accent text-primary-foreground font-semibold">
                    <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                      Get Quote
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
