"use client"

import { motion } from "framer-motion"
import { Award, FileCheck, Shield, Leaf } from "lucide-react"

const certifications = [
  {
    icon: Award,
    title: "Multiple Patents",
    description: "20+ utility and invention patents covering our innovative equipment designs and manufacturing processes.",
  },
  {
    icon: FileCheck,
    title: "Quality Management",
    description: "Strict quality control systems ensuring every product meets international standards.",
  },
  {
    icon: Shield,
    title: "Safety Standards",
    description: "Equipment designed and manufactured in compliance with industry safety regulations.",
  },
  {
    icon: Leaf,
    title: "Environmental Compliance",
    description: "Sustainable manufacturing practices with minimal environmental impact.",
  },
]

export function Certifications() {
  return (
    <section className="py-20 bg-foreground">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-primary text-primary-foreground text-sm font-semibold rounded-full mb-4">
            CERTIFICATIONS & HONORS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-background mb-4 text-balance">
            Quality Assurance & Recognition
          </h2>
          <p className="text-background/70 max-w-2xl mx-auto">
            Our commitment to excellence is recognized through various certifications and industry honors.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background/10 backdrop-blur-sm rounded-xl p-6 text-center border border-background/20"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                <cert.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-background mb-2">{cert.title}</h3>
              <p className="text-background/70 text-sm">{cert.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
