"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, Upload, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function CTASection() {
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
    <section className="py-20 bg-foreground relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 bg-primary text-primary-foreground text-sm font-semibold rounded-full mb-6">
              GET IN TOUCH
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-background mb-6 leading-tight text-balance">
              Need Custom Equipment Solutions?
            </h2>
            <p className="text-background/80 text-lg mb-8 leading-relaxed">
              Contact our engineering team for personalized consultation. We specialize in custom stainless steel 
              equipment design and manufacturing for your specific production requirements.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-background/90">Free technical consultation</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-background/90">Custom OEM/ODM design services</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-background/90">Quick response within 24 hours</span>
              </div>
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-background rounded-2xl p-8 shadow-2xl"
          >
            <h3 className="text-xl font-bold text-foreground mb-6">Request a Quote</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name *</Label>
                  <Input id="name" placeholder="John Smith" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" placeholder="Company Name" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" placeholder="email@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+1 234 567 890" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="product">Product Interest</Label>
                <select 
                  id="product" 
                  className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                >
                  <option value="">Select a product category</option>
                  <option value="mixing">Mixing Equipment</option>
                  <option value="emulsifier">Emulsifiers</option>
                  <option value="disperser">High Shear Dispersers</option>
                  <option value="dosing">Powder Dosing Systems</option>
                  <option value="tank">Storage Tanks</option>
                  <option value="reactor">Reactors</option>
                  <option value="custom">Custom Equipment</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea 
                  id="message" 
                  placeholder="Please describe your requirements..." 
                  rows={4}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="drawing">Attach Drawing (Optional)</Label>
                <div className="relative">
                  <input
                    type="file"
                    id="drawing"
                    accept=".pdf,.dwg,.dxf,.step,.stp,.jpg,.png"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="drawing"
                    className="flex items-center gap-3 p-3 border border-dashed border-input rounded-lg cursor-pointer hover:border-primary transition-colors"
                  >
                    <Upload className="h-5 w-5 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {fileName || "Upload CAD files, drawings, or specifications"}
                    </span>
                  </label>
                </div>
                <p className="text-xs text-muted-foreground">
                  Supported: PDF, DWG, DXF, STEP, JPG, PNG (Max 10MB)
                </p>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-accent text-primary-foreground font-semibold h-12"
                disabled={isSubmitted}
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Submitted Successfully!
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Submit Inquiry
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
