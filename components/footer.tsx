"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, Clock, Linkedin, Facebook, Youtube, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getProductCategories, type ProductCategory } from "@/lib/products-db"
import { DEFAULT_SITE_SETTINGS, getSiteSettings, type SiteSettings } from "@/lib/site-settings"

const fallbackProductCategories: ProductCategory[] = [
  { slug: "mixers", name: "Mixers & Agitators", nameEn: "Mixers & Agitators" },
  { slug: "dispersers", name: "Dispersers & Emulsifiers", nameEn: "Dispersers & Emulsifiers" },
  { slug: "storage-systems", name: "Storage & Tank Systems", nameEn: "Storage & Tank Systems" },
  { slug: "chemical-treatment", name: "Chemical Treatment Equipment", nameEn: "Chemical Treatment Equipment" },
  { slug: "storage-silo-equipment", name: "Storage & Silo Equipment", nameEn: "Storage & Silo Equipment" },
  {
    slug: "mixing-dispersing-equipment",
    name: "Mixing & Dispersing Equipment",
    nameEn: "Mixing & Dispersing Equipment",
  },
]

const footerLinks = {
  industries: [
    { name: "Chemical Industry", href: "/solutions#chemical" },
    { name: "Lithium Battery", href: "/solutions#lithium" },
    { name: "Pharmaceutical", href: "/solutions#pharmaceutical" },
    { name: "Food Processing", href: "/solutions#food" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Engineering Cases", href: "/cases" },
    { name: "News & Insights", href: "/news" },
    { name: "Contact Us", href: "/contact" },
  ],
}

export function Footer() {
  const [productCategories, setProductCategories] = useState<ProductCategory[]>(fallbackProductCategories)
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS)

  useEffect(() => {
    let cancelled = false

    Promise.all([getProductCategories(), getSiteSettings()])
      .then(([categories, settings]) => {
        if (cancelled) return
        if (categories.length > 0) setProductCategories(categories)
        setSiteSettings(settings)
      })
      .catch((error) => {
        console.error("[footer] failed to load dynamic footer data:", error)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const productLinks = useMemo(
    () =>
      productCategories.slice(0, 8).map((category) => ({
        name: category.nameEn,
        href: `/products?category=${category.slug}`,
      })),
    [productCategories],
  )

  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/images/logo.png"
                alt={siteSettings.siteTitle}
                width={180}
                height={50}
                className="h-12 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-background/80 mb-6 leading-relaxed">
              {siteSettings.siteDescription}
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span className="text-background/80 text-sm">
                  {siteSettings.address}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <a href={siteSettings.phoneHref} className="text-background/80 text-sm hover:text-primary transition-colors">
                  {siteSettings.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <a href={`mailto:${siteSettings.email}`} className="text-background/80 text-sm hover:text-primary transition-colors">
                  {siteSettings.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary shrink-0" />
                <span className="text-background/80 text-sm">{siteSettings.businessHours}</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-background">Products</h3>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-background/70 text-sm hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-background">Industries</h3>
            <ul className="space-y-2.5">
              {footerLinks.industries.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-background/70 text-sm hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="text-lg font-semibold mb-4 mt-6 text-background">Company</h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-background/70 text-sm hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-background">Newsletter</h3>
            <p className="text-background/70 text-sm mb-4">
              Subscribe to get the latest news and product updates.
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-background/10 border-background/20 text-background placeholder:text-background/50 focus:border-primary"
              />
              <Button type="submit" className="w-full bg-primary hover:bg-accent text-primary-foreground font-semibold">
                <Send className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
            </form>
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3 text-background">Follow Us</h4>
              <div className="flex gap-3">
                <a
                  href={siteSettings.socialLinks.linkedin || "#"}
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href={siteSettings.socialLinks.facebook || "#"}
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href={siteSettings.socialLinks.youtube || "#"}
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-background/60 text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} {siteSettings.companyName}. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-background/60 text-sm hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-background/60 text-sm hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
