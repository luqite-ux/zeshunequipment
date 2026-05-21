"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Sparkles, Settings, Droplets, CheckCircle } from "lucide-react"

const capabilities = [
  {
    icon: Settings,
    title: "Modern Workshop",
    description: "Advanced CNC equipment, efficient production lines, strict quality control systems, and a comfortable and safe working environment.",
    image: "/images/workshop.jpg",
  },
  {
    icon: Sparkles,
    title: "Surface Treatment",
    description: "Professional polishing team with automated equipment for tanks, vessels, silos, and heads. Mirror, brushed, matte, and sandblasted finishes available.",
    image: "/images/polishing.jpg",
  },
  {
    icon: Droplets,
    title: "Ultrasonic Cleaning",
    description: "Advanced ultrasonic cleaning technology for comprehensive internal and external cleaning, ensuring product cleanliness and extending equipment life.",
    image: "/images/quality-control.jpg",
  },
]

const processSteps = [
  "Requirements Analysis",
  "Design & Engineering",
  "Material Selection",
  "Precision Manufacturing",
  "Surface Treatment",
  "Quality Inspection",
  "Assembly & Testing",
  "Delivery & Installation",
]

export function ManufacturingCapabilities() {
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
            MANUFACTURING
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Our Manufacturing Capabilities
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            State-of-the-art facilities and processes ensure the highest quality standards for every piece of equipment we produce.
          </p>
        </motion.div>

        {/* Capabilities Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background rounded-xl overflow-hidden shadow-md"
            >
              <div className="relative h-48">
                <Image
                  src={capability.image}
                  alt={capability.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                  <capability.icon className="h-6 w-6 text-primary-foreground" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3">{capability.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{capability.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Process Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-background rounded-2xl p-8 md:p-12"
        >
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Our Production Process</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {processSteps.map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-center gap-3 p-4 bg-secondary rounded-lg"
              >
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm shrink-0">
                  {index + 1}
                </div>
                <span className="text-sm font-medium text-foreground">{step}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
