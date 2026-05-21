"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const industries = [
  {
    id: "adhesives",
    title: "Adhesives",
    description: "Equipment solutions for hot melt adhesive reaction, two-component mixing, and vacuum degassing.",
    image: "/images/Industries/行业解决方案/1胶粘剂.png",
  },
  {
    id: "electronic-paste",
    title: "Electronic Paste",
    description: "Nano-level particle dispersion and precision batching for micro-electronic components.",
    image: "/images/Industries/行业解决方案/2电子浆料.png",
  },
  {
    id: "new-energy",
    title: "New Energy",
    description: "Electrode slurry dispersion, electrolyte storage, and photovoltaic paste preparation.",
    image: "/images/Industries/行业解决方案/3新能源.png",
  },
  {
    id: "water-treatment",
    title: "Water Treatment",
    description: "Raw water storage, chemical dosing, and membrane separation support systems.",
    image: "/images/Industries/行业解决方案/4水处理.png",
  },
  {
    id: "resin",
    title: "Resin",
    description: "Polymerization reactions, vacuum drying, and high-purity storage processes.",
    image: "/images/Industries/行业解决方案/5树脂.png",
  },
  {
    id: "ink",
    title: "Ink",
    description: "Ultra-fine pigment dispersion and precision batching for printing inks.",
    image: "/images/Industries/行业解决方案/6油墨.png",
  },
  {
    id: "paint",
    title: "Paint",
    description: "Solvent-based and water-based systems with explosion-proof storage.",
    image: "/images/Industries/行业解决方案/7油漆.png",
  },
  {
    id: "coating",
    title: "Coating",
    description: "Formula mixing, dispersion grinding, and finished product storage.",
    image: "/images/Industries/行业解决方案/8涂料.png",
  },
]

export function HomeIndustries() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
            INDUSTRY SOLUTIONS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Serving Multiple Industries
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Full-process EPC solutions for paint, ink, coating, resin, and more industries 
            with process planning, equipment integration, and operation support.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Link 
                href={`/solutions#${industry.id}`}
                className="group block bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-border h-full"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={industry.image}
                    alt={industry.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-lg font-bold text-background">{industry.title}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {industry.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button asChild className="bg-primary hover:bg-accent text-primary-foreground font-semibold">
            <Link href="/solutions">
              View All Solutions <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
