"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground text-lg">
              Last updated: January 2024
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 flex-1">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-8"
            >
              <div className="bg-card rounded-xl p-8 shadow-sm border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  JIANGYIN ZESHUN MACHINERY CO., LTD. (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to protecting your privacy. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
                  visit our website or engage with our services.
                </p>
              </div>

              <div className="bg-card rounded-xl p-8 shadow-sm border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Information We Collect</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We may collect information about you in various ways, including:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li><strong>Personal Data:</strong> Name, email address, phone number, company name, and job title that you voluntarily provide when contacting us or submitting inquiries.</li>
                  <li><strong>Technical Data:</strong> IP address, browser type, operating system, and other technical information collected automatically when you visit our website.</li>
                  <li><strong>Business Data:</strong> Product requirements, project specifications, and other business-related information you share with us.</li>
                  <li><strong>Communication Data:</strong> Records of your correspondence with us, including emails and inquiry forms.</li>
                </ul>
              </div>

              <div className="bg-card rounded-xl p-8 shadow-sm border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">3. How We Use Your Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use the information we collect for the following purposes:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>To respond to your inquiries and provide customer support</li>
                  <li>To process and fulfill your orders and requests</li>
                  <li>To send you technical information about our products and services</li>
                  <li>To improve our website and user experience</li>
                  <li>To comply with legal obligations and protect our rights</li>
                  <li>To communicate with you about industry news and company updates (with your consent)</li>
                </ul>
              </div>

              <div className="bg-card rounded-xl p-8 shadow-sm border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Information Sharing</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li><strong>Service Providers:</strong> With trusted third-party service providers who assist us in operating our website and conducting our business.</li>
                  <li><strong>Legal Requirements:</strong> When required by law, court order, or governmental authority.</li>
                  <li><strong>Business Transfers:</strong> In connection with any merger, acquisition, or sale of company assets.</li>
                  <li><strong>With Your Consent:</strong> With your explicit consent for any other purpose.</li>
                </ul>
              </div>

              <div className="bg-card rounded-xl p-8 shadow-sm border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate technical and organizational security measures to protect your personal 
                  information against unauthorized access, alteration, disclosure, or destruction. However, no method 
                  of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee 
                  absolute security.
                </p>
              </div>

              <div className="bg-card rounded-xl p-8 shadow-sm border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Cookies and Tracking Technologies</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Our website may use cookies and similar tracking technologies to enhance your browsing experience. 
                  These technologies help us:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Remember your preferences and settings</li>
                  <li>Understand how you use our website</li>
                  <li>Improve our website functionality</li>
                  <li>Analyze website traffic and usage patterns</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  You can control cookies through your browser settings. However, disabling cookies may affect the 
                  functionality of our website.
                </p>
              </div>

              <div className="bg-card rounded-xl p-8 shadow-sm border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">7. Your Rights</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Depending on your location, you may have the following rights regarding your personal information:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li><strong>Access:</strong> Request access to your personal data</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate data</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                  <li><strong>Objection:</strong> Object to processing of your personal data</li>
                  <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  To exercise these rights, please contact us using the information provided below.
                </p>
              </div>

              <div className="bg-card rounded-xl p-8 shadow-sm border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">8. International Data Transfers</h2>
                <p className="text-muted-foreground leading-relaxed">
                  As an international business, we may transfer your information to countries outside your country 
                  of residence. We will ensure appropriate safeguards are in place to protect your personal 
                  information in accordance with applicable data protection laws.
                </p>
              </div>

              <div className="bg-card rounded-xl p-8 shadow-sm border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">9. Changes to This Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time. Any changes will be posted on this page 
                  with an updated revision date. We encourage you to review this policy periodically to stay 
                  informed about how we protect your information.
                </p>
              </div>

              <div className="bg-card rounded-xl p-8 shadow-sm border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">10. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us at:
                </p>
                <div className="text-muted-foreground space-y-2">
                  <p><strong>JIANGYIN ZESHUN MACHINERY CO., LTD.</strong></p>
                  <p>Address: Jiangyin City, Jiangsu Province, China</p>
                  <p>Email: info@zeshun-machinery.com</p>
                  <p>Phone: +86-510-8888-8888</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
