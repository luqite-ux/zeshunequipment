"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Upload, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-card rounded-2xl p-8 shadow-lg border border-border"
    >
      <h2 className="text-2xl font-bold text-foreground mb-2">Request for Quotation</h2>
      <p className="text-muted-foreground mb-8">
        Fill out the form below and our team will get back to you within 24 hours.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name *</Label>
            <Input id="name" placeholder="John Smith" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company Name</Label>
            <Input id="company" placeholder="Your Company Ltd." />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input id="email" type="email" placeholder="email@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" placeholder="+1 234 567 890" />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="country">Country/Region</Label>
            <Input id="country" placeholder="United States" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="product">Product Interest</Label>
            <select 
              id="product" 
              className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select a product category</option>
              <option value="mixing">Mixing Equipment</option>
              <option value="emulsifier">Emulsifiers</option>
              <option value="disperser">High Shear Dispersers</option>
              <option value="dosing">Powder Dosing Systems</option>
              <option value="tank">Storage Tanks</option>
              <option value="reactor">Reactors</option>
              <option value="custom">Custom Equipment</option>
              <option value="production-line">Complete Production Line</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="industry">Industry</Label>
          <select 
            id="industry" 
            className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Select your industry</option>
            <option value="chemical">Chemical</option>
            <option value="lithium">Lithium Battery</option>
            <option value="pharmaceutical">Pharmaceutical</option>
            <option value="food">Food & Beverage</option>
            <option value="cosmetics">Cosmetics</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Project Details *</Label>
          <Textarea 
            id="message" 
            placeholder="Please describe your requirements, including specifications, capacity, materials to process, and any special requirements..." 
            rows={5}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="drawing">Attach Drawing/Specifications (Optional)</Label>
          <div className="relative">
            <input
              type="file"
              id="drawing"
              accept=".pdf,.dwg,.dxf,.step,.stp,.igs,.jpg,.jpeg,.png,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="drawing"
              className="flex items-center gap-3 p-4 border-2 border-dashed border-input rounded-lg cursor-pointer hover:border-primary transition-colors bg-secondary/50"
            >
              <Upload className="h-6 w-6 text-muted-foreground" />
              <div>
                <span className="text-sm font-medium text-foreground">
                  {fileName || "Click to upload or drag and drop"}
                </span>
                <p className="text-xs text-muted-foreground mt-1">
                  PDF, DWG, DXF, STEP, IGES, JPG, PNG, DOC (Max 10MB)
                </p>
              </div>
            </label>
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-primary hover:bg-accent text-primary-foreground font-semibold h-12 text-base"
          disabled={isSubmitted}
        >
          {isSubmitted ? (
            <>
              <CheckCircle className="h-5 w-5 mr-2" />
              Inquiry Submitted Successfully!
            </>
          ) : (
            <>
              <Send className="h-5 w-5 mr-2" />
              Submit Inquiry
            </>
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          By submitting this form, you agree to our privacy policy. We will never share your information with third parties.
        </p>
      </form>
    </motion.div>
  )
}
