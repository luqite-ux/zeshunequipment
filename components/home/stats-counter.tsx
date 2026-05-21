"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Users, Calendar, ThumbsUp, Award, Briefcase } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: 5,
    suffix: "+",
    label: "Expert Technical Team",
  },
  {
    icon: Calendar,
    value: 6,
    suffix: "",
    label: "Years of Experience",
  },
  {
    icon: ThumbsUp,
    value: 99,
    suffix: "%+",
    label: "Customer Satisfaction",
  },
  {
    icon: Award,
    value: 20,
    suffix: "+",
    label: "Patents & Honors",
  },
  {
    icon: Briefcase,
    value: 1000,
    suffix: "+",
    label: "Completed Projects",
  },
]

function CounterNumber({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!isInView) return

    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-bold text-primary">
      {count.toLocaleString()}{suffix}
    </span>
  )
}

export function StatsCounter() {
  return (
    <section className="py-16 bg-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                <stat.icon className="h-8 w-8 text-primary" />
              </div>
              <CounterNumber value={stat.value} suffix={stat.suffix} />
              <p className="mt-2 text-background/80 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
