"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Factory, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

const cases = [
  {
    id: 1,
    title: "Cosmetics Production Line",
    client: "International Cosmetics Brand",
    industry: "Cosmetics",
    description: "Complete cosmetic production facility featuring vacuum emulsifiers, homogenizers, and automated filling systems for creams, lotions, and serums manufacturing.",
    image: "/images/Cases/化妆品生产线.jpeg",
    equipment: ["Vacuum Emulsifiers", "Homogenizers", "Filling Lines", "CIP Systems"],
  },
  {
    id: 2,
    title: "Chemical Raw Materials Production Line",
    client: "Chemical Materials Corporation",
    industry: "Chemical",
    description: "Industrial-scale chemical raw materials processing system with mixing reactors, storage tanks, and automated material handling for specialty chemicals.",
    image: "/images/Cases/化工原料生产线.jpeg",
    equipment: ["Mixing Reactors", "Storage Tanks", "Dosing Systems", "Heat Exchangers"],
  },
  {
    id: 3,
    title: "Industrial Mixing System",
    client: "Manufacturing Facility",
    industry: "General Industry",
    description: "Versatile mixing system designed for multiple applications with variable speed drives, customizable impellers, and integrated control systems.",
    image: "/images/Cases/搅拌系统.jpeg",
    equipment: ["Agitator Tanks", "Variable Speed Drives", "Control Panels", "Mixers"],
  },
  {
    id: 4,
    title: "Resin Production Line - Reaction System",
    client: "Resin & Polymer Manufacturer",
    industry: "Chemical",
    description: "High-performance resin synthesis and reaction system featuring jacketed reactors, condensers, and precise temperature control for polymer production.",
    image: "/images/Cases/树脂生产线-反应.jpeg",
    equipment: ["Jacketed Reactors", "Condensers", "Temperature Controllers", "Vacuum Systems"],
  },
  {
    id: 5,
    title: "Paint & Ink Production Line",
    client: "Coatings Manufacturer",
    industry: "Coatings",
    description: "Complete paint and printing ink manufacturing facility with high-speed dispersers, grinding mills, and color matching systems for industrial coatings.",
    image: "/images/Cases/油漆油墨生产线.jpeg",
    equipment: ["High-Speed Dispersers", "Grinding Mills", "Mixing Tanks", "Filling Systems"],
  },
  {
    id: 6,
    title: "Detergent Production Line",
    client: "Home Care Products Company",
    industry: "Daily Chemical",
    description: "Automated detergent and cleaning products manufacturing system with mixing equipment, homogenizers, and packaging line integration.",
    image: "/images/Cases/洗涤剂生产线.jpeg",
    equipment: ["Mixing Vessels", "Homogenizers", "Transfer Pumps", "Packaging Lines"],
  },
  {
    id: 7,
    title: "Coating Production Line - Dispersion",
    client: "Specialty Coatings Manufacturer",
    industry: "Coatings",
    description: "Advanced dispersion system for coating production featuring high-shear dispersers, basket mills, and precision pigment grinding equipment.",
    image: "/images/Cases/涂料生产线-分散.jpeg",
    equipment: ["High-Shear Dispersers", "Basket Mills", "Bead Mills", "Holding Tanks"],
  },
  {
    id: 8,
    title: "Coating Production Line - Mixing",
    client: "Industrial Coatings Producer",
    industry: "Coatings",
    description: "Large-scale coating mixing production system with multiple mixing stations, automated batching, and quality control integration.",
    image: "/images/Cases/涂料生产线-搅拌.jpeg",
    equipment: ["Mixing Tanks", "Agitators", "Batching Systems", "Transfer Systems"],
  },
  {
    id: 9,
    title: "Liquid Storage & Batching System",
    client: "Chemical Processing Plant",
    industry: "Chemical",
    description: "Comprehensive liquid storage and automated batching facility with stainless steel tanks, metering systems, and PLC-controlled dispensing.",
    image: "/images/Cases/液体存储及配料系统.jpeg",
    equipment: ["Storage Tanks", "Metering Pumps", "Load Cells", "PLC Controls"],
  },
  {
    id: 10,
    title: "Liquid Pipeline Conveying System",
    client: "Process Industry Client",
    industry: "General Industry",
    description: "Integrated liquid pipeline transfer system featuring sanitary piping, transfer pumps, flow meters, and automated valve control for safe material handling.",
    image: "/images/Cases/液体管道输送系统.jpeg",
    equipment: ["Sanitary Piping", "Transfer Pumps", "Flow Meters", "Control Valves"],
  },
  {
    id: 11,
    title: "Biopharmaceutical Production Line",
    client: "Pharmaceutical Manufacturer",
    industry: "Pharmaceutical",
    description: "GMP-compliant biopharmaceutical production facility with sterile mixing vessels, CIP/SIP systems, and validated process control for drug manufacturing.",
    image: "/images/Cases/生物制药生产线.jpeg",
    equipment: ["Sterile Vessels", "CIP/SIP Systems", "Filtration Units", "SCADA Systems"],
  },
  {
    id: 12,
    title: "Powder Storage & Batching System",
    client: "Materials Processing Company",
    industry: "General Industry",
    description: "Automated powder storage and precision batching system with silos, screw feeders, weighing hoppers, and dust collection for accurate material handling.",
    image: "/images/Cases/粉体储存及配料系统.jpeg",
    equipment: ["Storage Silos", "Screw Feeders", "Weighing Hoppers", "Dust Collectors"],
  },
  {
    id: 13,
    title: "Powder Materials Production Line",
    client: "Powder Processing Facility",
    industry: "General Industry",
    description: "Complete powder materials processing line with blenders, classifiers, and packaging systems for consistent product quality and high throughput.",
    image: "/images/Cases/粉体材料生产线.jpeg",
    equipment: ["Ribbon Blenders", "Classifiers", "Screeners", "Packaging Systems"],
  },
  {
    id: 14,
    title: "Powder Pneumatic Conveying System",
    client: "Industrial Manufacturing Plant",
    industry: "General Industry",
    description: "Dense phase pneumatic conveying system for powder materials with airlocks, diverter valves, and filter receivers for dust-free material transfer.",
    image: "/images/Cases/粉体气力输送系统.jpeg",
    equipment: ["Pneumatic Conveyors", "Airlocks", "Filter Receivers", "Diverter Valves"],
  },
  {
    id: 15,
    title: "Lithium Battery Ternary Wet Coating Line",
    client: "EV Battery Manufacturer",
    industry: "Lithium Battery",
    description: "Advanced lithium battery electrode coating system featuring high-precision slurry mixing, coating machines, and drying ovens for ternary cathode production.",
    image: "/images/Cases/锂电三元湿法包覆线.jpeg",
    equipment: ["Slurry Mixers", "Coating Machines", "Drying Ovens", "Calendering Equipment"],
  },
  {
    id: 16,
    title: "Food Additive Production Line",
    client: "Food Ingredients Company",
    industry: "Food",
    description: "Sanitary food additive manufacturing facility with FDA-compliant mixing equipment, pasteurizers, and aseptic filling systems for food-grade products.",
    image: "/images/Cases/食品添加剂生产线.jpeg",
    equipment: ["Sanitary Mixers", "Pasteurizers", "Homogenizers", "Aseptic Fillers"],
  },
]

const industries = ["All", "Chemical", "Coatings", "Lithium Battery", "Pharmaceutical", "Food", "Cosmetics", "Daily Chemical", "General Industry"]

export function CasesGrid() {
  const [selectedIndustry, setSelectedIndustry] = useState("All")

  const filteredCases = selectedIndustry === "All" 
    ? cases 
    : cases.filter(c => c.industry === selectedIndustry)

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Filter */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {industries.map((industry) => (
            <button
              key={industry}
              onClick={() => setSelectedIndustry(industry)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedIndustry === industry
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              {industry}
            </button>
          ))}
        </div>

        {/* Cases Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCases.map((caseItem, index) => (
            <motion.div
              key={caseItem.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
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
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {caseItem.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Factory className="h-4 w-4 flex-shrink-0" />
                  <span className="line-clamp-1">{caseItem.client}</span>
                </div>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {caseItem.description}
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <Settings className="h-4 w-4 flex-shrink-0" />
                  <span className="line-clamp-1">{caseItem.equipment.slice(0, 2).join(", ")}</span>
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:gap-3 transition-all"
                >
                  Request Similar Solution <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-6">
            Have a similar project in mind? Let us help you find the perfect solution.
          </p>
          <Button asChild className="bg-primary hover:bg-accent text-primary-foreground font-semibold px-8">
            <Link href="/contact">
              Discuss Your Project <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
