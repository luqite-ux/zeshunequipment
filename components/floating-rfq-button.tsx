"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { MessageSquareQuote, X, Phone, Mail } from "lucide-react"

export function FloatingRFQButton() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 bg-background rounded-xl shadow-2xl border border-border p-4 w-64 mb-2"
          >
            <h4 className="font-semibold text-foreground mb-3">Quick Contact</h4>
            <div className="space-y-3">
              <a
                href="tel:+8613815138483"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Call Us</p>
                  <p className="text-sm font-medium text-foreground">+86 138 1513 8483</p>
                </div>
              </a>
              <a
                href="mailto:info@zeshunequipment.com"
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email Us</p>
                  <p className="text-sm font-medium text-foreground">info@zeshunequipment.com</p>
                </div>
              </a>
              <Link
                href="/contact"
                className="block w-full py-2.5 bg-primary hover:bg-accent text-primary-foreground text-center rounded-lg font-semibold transition-colors"
              >
                Request Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-14 h-14 rounded-full bg-primary hover:bg-accent text-primary-foreground shadow-lg flex items-center justify-center transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Quick Quote"
      >
        {isExpanded ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageSquareQuote className="h-6 w-6" />
        )}
      </motion.button>
    </div>
  )
}
