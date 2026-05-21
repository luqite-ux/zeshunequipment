"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Factory } from "lucide-react"
import { Button } from "@/components/ui/button"

const featuredCases = [
  {
    id: 1,
    title: "Cosmetics Production Line",
    client: "International Cosmetics Brand",
    industry: "Cosmetics",
    description: "Complete cosmetic production facility featuring vacuum emulsifiers, homogenizers, and automated filling systems.",
    image: "/images/Cases/化妆品生产线.jpeg",
  },
  {
    id: 2,
    title: "Paint & Ink Production Line",
    client: "Coatings Manufacturer",
    industry: "Coatings",
    description: "Complete paint and printing ink manufacturing facility with high-speed dispersers and grinding mills.",
    image: "/images/Cases/油漆油墨生产线.jpeg",
  },
  {
    id: 3,
    title: "Biopharmaceutical Production Line",
    client: "Pharmaceutical Manufacturer",
    industry: "Pharmaceutical",
    description: "GMP-compliant biopharmaceutical production facility with sterile mixing vessels and CIP/SIP systems.",
    image: "/images/Cases/生物制药生产线.jpeg",
  },
  {
    id: 4,
    title: "Lithium Battery Coating Line",
    client: "EV Battery Manufacturer",
    industry: "Lithium Battery",
    description: "Advanced lithium battery electrode coating system with high-precision slurry mixing and coating machines.",
    image: "/images/Cases/锂电三元湿法包覆线.jpeg",
  },
  {
    id: 5,
    title: "Resin Production Line",
    client: "Resin & Polymer Manufacturer",
    industry: "Chemical",
    description: "High-performance resin synthesis and reaction system with jacketed reactors and condensers.",
    image: "/images/Cases/树脂生产线-反应.jpeg",
  },
  {
    id: 6,
    title: "Food Additive Production Line",
    client: "Food Ingredients Company",
    industry: "Food",
    description: "Sanitary food additive manufacturing facility with FDA-compliant mixing equipment.",
    image: "/images/Cases/食品添加剂生产线.jpeg",
  },
]

export function HomeCases() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
            PROJECT CASES
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Successful Project Cases
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Trusted by leading manufacturers worldwide with proven track record 
            in delivering complete production line solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {featuredCases.map((caseItem, index) => (
            <motion.div
              key={caseItem.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-border"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={caseItem.image}
                  alt={caseItem.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                    {caseItem.industry}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {caseItem.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Factory className="h-4 w-4 flex-shrink-0" />
                  <span>{caseItem.client}</span>
                </div>
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {caseItem.description}
                </p>
              </div>
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
            <Link href="/cases">
              View All Cases <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
