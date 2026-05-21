"use client"

import { motion } from "framer-motion"

export function ProductsSEO() {
  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Leading Manufacturer of Industrial Mixing & Processing Equipment
          </h2>
          <div className="prose prose-gray max-w-none text-muted-foreground">
            <p className="mb-4 leading-relaxed">
              JIANGYIN ZESHUN MACHINERY CO., LTD. is a professional manufacturer specializing in stainless steel 
              non-standard custom equipment for the chemical, lithium battery, pharmaceutical, and food processing 
              industries. With over 6 years of industry experience and a 15,000 square meter modern manufacturing 
              facility, we have established ourselves as a trusted partner for businesses seeking high-quality 
              mixing, emulsification, and automated processing solutions.
            </p>
            <p className="mb-4 leading-relaxed">
              Our product range includes industrial mixing equipment, high-shear emulsifiers, dispersers, powder 
              dosing and batching systems, storage tanks, and reaction vessels. Each piece of equipment is 
              manufactured using premium 304 or 316L stainless steel, processed through advanced CNC machining, 
              and finished with our proprietary surface treatment technology including mirror polishing, brushed 
              finishes, and sandblasting options.
            </p>
            <p className="mb-4 leading-relaxed">
              What sets Zeshun Machinery apart is our commitment to precision manufacturing and comprehensive 
              service. We employ advanced quality control systems, ultrasonic cleaning technology, and automated 
              polishing equipment to ensure every product meets the highest standards. Our experienced engineering 
              team provides complete turnkey solutions including production line design, equipment integration, 
              installation, and commissioning services.
            </p>
            <p className="leading-relaxed">
              Whether you require standard mixing equipment or fully customized processing systems, Zeshun 
              Machinery delivers reliable, efficient, and cost-effective solutions. Our equipment is currently 
              serving over 1,000 clients globally, with a customer satisfaction rate exceeding 99%. Contact our 
              team today to discuss how we can support your production requirements with our professional 
              stainless steel equipment solutions.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
