"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const slides = [
  {
    id: 1,
    image: "/images/hero-1.jpg",
    title: "Professional Stainless Steel Equipment",
    subtitle: "Custom Solutions for Chemical, Pharmaceutical & Food Industries",
    description: "With 6+ years of expertise, we deliver high-precision mixing equipment, emulsifiers, and automated dosing systems tailored to your production needs.",
  },
  {
    id: 2,
    image: "/images/hero-2.jpg",
    title: "Advanced Mixing & Emulsification",
    subtitle: "High Shear Dispersers & Homogenizers",
    description: "GMP-compliant equipment with precise control systems, ensuring consistent quality for pharmaceutical and cosmetic applications.",
  },
  {
    id: 3,
    image: "/images/hero-3.jpg",
    title: "Automated Production Lines",
    subtitle: "Industry 4.0 Ready Solutions",
    description: "Complete powder dosing and batching systems with intelligent automation, improving efficiency and reducing labor costs.",
  },
]

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, nextSlide])

  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] w-full overflow-hidden">
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex items-center">
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="inline-block px-4 py-1.5 bg-primary text-primary-foreground text-sm font-semibold rounded-full mb-6">
                ZESHUN MACHINERY
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-background mb-4 leading-tight text-balance">
                {slides[currentSlide].title}
              </h1>
              <p className="text-xl md:text-2xl text-primary font-medium mb-4">
                {slides[currentSlide].subtitle}
              </p>
              <p className="text-background/80 text-lg mb-8 leading-relaxed max-w-xl">
                {slides[currentSlide].description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-primary hover:bg-accent text-primary-foreground font-semibold px-8">
                  <Link href="/products">Explore Products</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-background/80 bg-background/10 backdrop-blur-sm text-background hover:bg-background hover:text-foreground font-semibold px-8">
                  <Link href="/contact">Request Quote</Link>
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => { prevSlide(); setIsAutoPlaying(false); }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/20 backdrop-blur-sm text-background hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={() => { nextSlide(); setIsAutoPlaying(false); }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/20 backdrop-blur-sm text-background hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => { setCurrentSlide(index); setIsAutoPlaying(false); }}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? "bg-primary w-8"
                : "bg-background/50 hover:bg-background"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
