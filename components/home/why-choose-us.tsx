"use client"

import { motion } from "framer-motion"
import { Target, Shield, Gem, Factory, Wrench, HeadphonesIcon } from "lucide-react"

const values = [
  {
    icon: Target,
    title: "Industry Vision",
    subtitle: "Compete for coexistence, stabilize for market, create for development",
    description: "We embrace healthy competition, maintain market stability, and pursue innovation-driven growth.",
  },
  {
    icon: Shield,
    title: "Quality Philosophy",
    subtitle: "Professional standards, meticulous craftsmanship, premium quality",
    description: "We adhere to professional norms, focus on details, and consistently exceed customer expectations.",
  },
  {
    icon: Gem,
    title: "Core Values",
    subtitle: "Excellence, integrity, dedication, and standardization",
    description: "We pursue perfection, maintain honesty, commit wholeheartedly, and establish industry benchmarks.",
  },
]

const advantages = [
  {
    icon: Factory,
    title: "Modern Workshop",
    description: "15,000m² facility with advanced CNC equipment, efficient production lines, and strict quality control systems.",
  },
  {
    icon: Wrench,
    title: "Surface Treatment",
    description: "Automated polishing for tanks, vessels, and heads. Mirror, brushed, matte, and sandblasted finishes available.",
  },
  {
    icon: HeadphonesIcon,
    title: "One-Stop Service",
    description: "Complete solutions including design, manufacturing, installation, and commissioning for production lines.",
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
            WHY CHOOSE US
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Our Philosophy & Advantages
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Since establishment, Zeshun Machinery has focused on chemical, pharmaceutical, and lithium battery equipment, 
            becoming an industry leader through relentless innovation.
          </p>
        </motion.div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background rounded-xl p-8 shadow-md border border-border text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <value.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{value.title}</h3>
              <p className="text-primary font-medium text-sm mb-3">{value.subtitle}</p>
              <p className="text-muted-foreground text-sm">{value.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Advantages */}
        <div className="grid md:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <motion.div
              key={advantage.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              className="flex gap-4"
            >
              <div className="w-14 h-14 shrink-0 rounded-lg bg-primary flex items-center justify-center">
                <advantage.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-foreground mb-2">{advantage.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{advantage.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
