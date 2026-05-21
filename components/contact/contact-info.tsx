"use client"

import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react"

const contactDetails = [
  {
    icon: Phone,
    title: "Phone",
    content: "+86 138 1513 8483",
    href: "tel:+8613815138483",
  },
  {
    icon: Mail,
    title: "Email",
    content: "info@zeshunequipment.com",
    href: "mailto:info@zeshunequipment.com",
  },
  {
    icon: MapPin,
    title: "Address",
    content: "No.3 Railway Station Road, Yuecheng Town, Jiangyin City, Jiangsu Province, China",
    href: null,
  },
  {
    icon: Clock,
    title: "Business Hours",
    content: "Monday - Saturday: 8:00 AM - 6:00 PM (GMT+8)",
    href: null,
  },
]

export function ContactInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="space-y-6"
    >
      <div className="bg-primary rounded-2xl p-6 text-primary-foreground">
        <MessageCircle className="h-10 w-10 mb-4" />
        <h3 className="text-xl font-bold mb-2">Need Immediate Assistance?</h3>
        <p className="text-primary-foreground/80 text-sm mb-4">
          Our team is available to answer your questions and provide technical support.
        </p>
        <a
          href="tel:+8613815138483"
          className="inline-block px-6 py-2.5 bg-background text-foreground font-semibold rounded-lg hover:bg-background/90 transition-colors"
        >
          Call Now
        </a>
      </div>

      <div className="bg-card rounded-2xl p-6 border border-border">
        <h3 className="text-lg font-bold text-foreground mb-6">Contact Information</h3>
        <div className="space-y-5">
          {contactDetails.map((detail, index) => (
            <motion.div
              key={detail.title}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <detail.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">{detail.title}</p>
                {detail.href ? (
                  <a
                    href={detail.href}
                    className="text-foreground font-medium hover:text-primary transition-colors"
                  >
                    {detail.content}
                  </a>
                ) : (
                  <p className="text-foreground font-medium">{detail.content}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-secondary rounded-2xl p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">Why Contact Us?</h3>
        <ul className="space-y-3 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
            Free technical consultation and solution design
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
            Competitive pricing for OEM/ODM projects
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
            Fast response within 24 hours
          </li>
          <li className="flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
            Professional after-sales support
          </li>
        </ul>
      </div>
    </motion.div>
  )
}
