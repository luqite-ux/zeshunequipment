"use client"

import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, Clock, Linkedin, Facebook, Youtube, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const footerLinks = {
  products: [
    { name: "Mixing Equipment", href: "/products#mixing" },
    { name: "Emulsifiers", href: "/products#emulsifier" },
    { name: "High Shear Dispersers", href: "/products#disperser" },
    { name: "Powder Dosing Systems", href: "/products#dosing" },
    { name: "Storage Tanks", href: "/products#tanks" },
    { name: "Reactors", href: "/products#reactors" },
  ],
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
                alt="Zeshun Machinery"
                width={180}
                height={50}
                className="h-12 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-background/80 mb-6 leading-relaxed">
              JIANGYIN ZESHUN MACHINERY CO., LTD. specializes in stainless steel non-standard custom equipment,
              providing professional solutions for chemical, lithium battery, pharmaceutical, and food industries.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span className="text-background/80 text-sm">
                  No.3 Railway Station Road, Yuecheng Town, Jiangyin City, Jiangsu Province, China
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <a href="tel:+8613815138483" className="text-background/80 text-sm hover:text-primary transition-colors">
                  +86 138 1513 8483
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <a href="mailto:info@zeshunequipment.com" className="text-background/80 text-sm hover:text-primary transition-colors">
                  info@zeshunequipment.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary shrink-0" />
                <span className="text-background/80 text-sm">Mon - Sat: 8:00 AM - 6:00 PM</span>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-background">Products</h3>
            <ul className="space-y-2.5">
              {footerLinks.products.map((link) => (
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
                  href="#"
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
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
              &copy; {new Date().getFullYear()} JIANGYIN ZESHUN MACHINERY CO., LTD. All rights reserved.
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
