"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { MapPin, Users, Award, Calendar } from "lucide-react"

const highlights = [
  { icon: MapPin, label: "Location", value: "Jiangyin, Jiangsu, China" },
  { icon: Users, label: "Facility Size", value: "15,000 m²" },
  { icon: Award, label: "Patents", value: "20+ Honors" },
  { icon: Calendar, label: "Established", value: "2021" },
]

export function AboutContent() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Our Story & Mission
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Jiangyin Zeshun has been deeply engaged for many years in the field of manufacturing mixing, emulsifying, high-shear dispersion, and powder automatic batching systems and mixing equipment, with outstanding professional design and production R&D capabilities. It is a technology-oriented enterprise integrating R&D, manufacturing, sales, and service, and its products are widely used in chemical, lithium battery, pharmaceutical, food, and other fields..
              </p>
              <p>
                Our company was established in 2021, covering an area of approximately 8,000 square meters, currently employing 80 staff members with 500 partners; manufacturing is done according to international standards, following international norms such as ASME, JIS, KS, and all equipment undergoes a triple quality inspection of 'raw material testing - process control - finished product testing'; serving 400 domestic customers and 100 overseas customers (including the Middle East, Southeast Asia, etc.), with an annual production capacity of 500 units, and plans to continuously expand in the future to achieve higher output value.
              </p>
              <p>
                <b>Main Products<b/><br>
High/low speed dispersers, multi-functional mixers, vertical/horizontal ribbon mixers, concentric twin-shaft mixers, etc.;
Various reactors/tanks/vessels, heat exchange/condensers, silos/storage/mixing/stirring/conveying equipment;
Design, manufacturing and installation of complete control systems;
Non-standard customization of equipment for various industries.
              </p>
              <p>
                <b>Main Products<b/><br>
<b>Technical Highlights<b/><br>
High-precision manufacturing: Adopt advanced manufacturing processes and quality control system to ensure equipment accuracy and performance reach the industry-leading level.
Surface treatment technology: Have excellent surface treatment technical team and fully automatic polishing equipment, providing mirror surface, wire drawing, matte, polishing, sandblasting, spray painting and other process treatments, ensuring the equipment is beautiful in appearance and corrosion-resistant.
Ultrasonic cleaning: Adopt ultrasonic cleaning technology to comprehensively clean the inside and outside of the equipment, ensuring product cleanliness and improving service life.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-3 p-4 bg-secondary rounded-lg"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="font-semibold text-foreground">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/workshop.jpg"
                alt="Zeshun Machinery Workshop"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-primary rounded-2xl p-6 flex flex-col justify-center shadow-xl">
              <span className="text-5xl font-bold text-primary-foreground">6+</span>
              <span className="text-primary-foreground/80 text-sm mt-1">Years of Industry Experience</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
