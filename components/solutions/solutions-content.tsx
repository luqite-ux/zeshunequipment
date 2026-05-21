"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const industries = [
  {
    id: "adhesives",
    title: "Adhesives",
    description: "Comprehensive equipment solutions for adhesive manufacturing enterprises, covering hot melt adhesive reaction, two-component mixing, and vacuum degassing to ensure bonding strength and stability.",
    image: "/images/Industries/行业解决方案/1胶粘剂.png",
    applications: [
      "Hot melt adhesive production",
      "Two-component adhesive mixing",
      "Pressure-sensitive adhesive manufacturing",
      "Structural adhesive processing",
      "UV-curable adhesive preparation",
    ],
    equipment: [
      "Reaction kettles with precise temperature control",
      "Vacuum degassing systems",
      "High-viscosity mixing equipment",
      "Automated dispensing systems",
    ],
  },
  {
    id: "electronic-paste",
    title: "Electronic Paste",
    description: "Serving electronic paste production enterprises with equipment capable of nano-level particle dispersion and precision batching to meet micro-electronic component printing requirements.",
    image: "/images/Industries/行业解决方案/2电子浆料.png",
    applications: [
      "Conductive paste manufacturing",
      "Silver paste for solar cells",
      "Solder paste production",
      "Thick film paste processing",
      "MLCC electrode paste",
    ],
    equipment: [
      "Nano-level dispersing equipment",
      "Precision batching systems",
      "Three-roll mills",
      "Clean room compatible mixers",
    ],
  },
  {
    id: "new-energy",
    title: "New Energy",
    description: "Targeting lithium battery and photovoltaic enterprises with equipment covering electrode slurry dispersion, electrolyte storage, and photovoltaic silver paste preparation to support cell and module performance.",
    image: "/images/Industries/行业解决方案/3新能源.png",
    applications: [
      "Cathode material mixing",
      "Anode slurry preparation",
      "Electrolyte handling and storage",
      "Photovoltaic silver paste production",
      "Battery separator coating",
    ],
    equipment: [
      "Dual planetary mixers",
      "High-shear dispersers with vacuum",
      "Precision powder feeding systems",
      "Temperature-controlled vessels",
    ],
  },
  {
    id: "water-treatment",
    title: "Water Treatment",
    description: "For water treatment engineering enterprises, our equipment handles raw water storage, chemical dosing, and membrane separation support to ensure water quality purification throughout the entire cycle.",
    image: "/images/Industries/行业解决方案/4水处理.png",
    applications: [
      "Chemical dosing systems",
      "Flocculant preparation",
      "pH adjustment solutions",
      "Disinfectant mixing",
      "Membrane cleaning chemical preparation",
    ],
    equipment: [
      "Chemical storage tanks",
      "Automated dosing equipment",
      "Mixing and dilution systems",
      "Corrosion-resistant vessels",
    ],
  },
  {
    id: "resin",
    title: "Resin",
    description: "Serving resin synthesis enterprises with equipment resistant to strong acid and alkali corrosion, covering polymerization reactions, vacuum drying, and high-purity storage processes.",
    image: "/images/Industries/行业解决方案/5树脂.png",
    applications: [
      "Epoxy resin synthesis",
      "Polyester resin production",
      "Acrylic resin manufacturing",
      "Alkyd resin processing",
      "Specialty resin development",
    ],
    equipment: [
      "Corrosion-resistant reaction kettles",
      "Vacuum drying systems",
      "High-purity storage vessels",
      "Condensation and reflux systems",
    ],
  },
  {
    id: "ink",
    title: "Ink",
    description: "For ink production enterprises, our equipment focuses on ultra-fine pigment dispersion and precision batching to support ink printing leveling and color stability.",
    image: "/images/Industries/行业解决方案/6油墨.png",
    applications: [
      "Offset ink production",
      "Flexographic ink manufacturing",
      "Gravure ink processing",
      "Screen printing ink preparation",
      "Digital ink formulation",
    ],
    equipment: [
      "High-speed dispersers",
      "Bead mills for fine grinding",
      "Precision batching systems",
      "Color matching equipment",
    ],
  },
  {
    id: "paint",
    title: "Paint",
    description: "In the paint manufacturing sector, our equipment is suitable for solvent-based and water-based systems, covering reaction synthesis, degassing, impurity removal, and explosion-proof storage.",
    image: "/images/Industries/行业解决方案/7油漆.png",
    applications: [
      "Automotive paint production",
      "Industrial paint manufacturing",
      "Wood coating preparation",
      "Marine paint processing",
      "Powder coating formulation",
    ],
    equipment: [
      "Explosion-proof mixing tanks",
      "Vacuum degassing systems",
      "Filtration equipment",
      "Solvent-resistant storage vessels",
    ],
  },
  {
    id: "coating",
    title: "Coating",
    description: "For coating production enterprises, our equipment covers the entire process from formula mixing, dispersion grinding to finished product storage, ensuring coating system uniformity and stability.",
    image: "/images/Industries/行业解决方案/8涂料.png",
    applications: [
      "Architectural coating production",
      "Protective coating manufacturing",
      "Functional coating preparation",
      "Decorative coating processing",
      "Specialty coating development",
    ],
    equipment: [
      "Pre-mixing dispersers",
      "Horizontal bead mills",
      "Finished product storage tanks",
      "Automated production lines",
    ],
  },
]

export function SolutionsContent() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Industry Overview Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
            EPC SOLUTIONS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Full-Process Industry Solutions
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Focusing on the needs of paint, ink, coating, and resin production enterprises, 
            we provide full-process EPC solutions including process planning, equipment integration, 
            production line commissioning, and operation & maintenance support to solve production pain points 
            such as explosion-proof safety, uneven dispersion, and system instability.
          </p>
        </motion.div>

        {/* Industry Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={industry.image}
                    alt={industry.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-xs text-primary-foreground/80 bg-primary/80 px-2 py-1 rounded">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-xl font-bold text-background mt-2">{industry.title}</h3>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {industry.description}
                  </p>
                  <Link 
                    href={`#${industry.id}`}
                    className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-3 hover:gap-2 transition-all"
                  >
                    Learn More <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Detailed Industry Sections */}
        <div className="space-y-24">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.id}
              id={industry.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src={industry.image}
                    alt={industry.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
                  <div className="absolute bottom-6 left-6 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <span className="text-xl font-bold text-background">{industry.title}</span>
                  </div>
                </div>
              </div>
              
              <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
                  {String(index + 1).padStart(2, "0")} / Industry Solution
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {industry.title} Industry Solutions
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {industry.description}
                </p>
                
                <div className="grid sm:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Applications</h4>
                    <ul className="space-y-2">
                      {industry.applications.map((app) => (
                        <li key={app} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                          {app}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Equipment</h4>
                    <ul className="space-y-2">
                      {industry.equipment.map((equip) => (
                        <li key={equip} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                          {equip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Button asChild className="bg-primary hover:bg-accent text-primary-foreground font-semibold">
                  <Link href="/contact">
                    Get Industry Solution <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
