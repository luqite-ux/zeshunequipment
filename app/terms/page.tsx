"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"

export default function TermsOfServicePage() {
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
              Terms of Service
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
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Agreement to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing or using the website of JIANGYIN ZESHUN MACHINERY CO., LTD. (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), 
                  you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree with any part of these 
                  Terms, you may not access or use our website or services.
                </p>
              </div>

              <div className="bg-card rounded-xl p-8 shadow-sm border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Description of Services</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Zeshun Machinery provides:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Manufacturing of stainless steel mixing equipment and reactors</li>
                  <li>High shear emulsifiers and dispersers</li>
                  <li>Automated powder dosing and batching systems</li>
                  <li>Custom equipment design and OEM/ODM services</li>
                  <li>Technical consultation and after-sales support</li>
                  <li>Complete production line solutions</li>
                </ul>
              </div>

              <div className="bg-card rounded-xl p-8 shadow-sm border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">3. Use of Website</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  When using our website, you agree to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Provide accurate and complete information when submitting inquiries</li>
                  <li>Use the website only for lawful purposes</li>
                  <li>Not attempt to gain unauthorized access to our systems</li>
                  <li>Not interfere with or disrupt the website or servers</li>
                  <li>Not reproduce, duplicate, or exploit any portion of the website without permission</li>
                  <li>Comply with all applicable local, national, and international laws</li>
                </ul>
              </div>

              <div className="bg-card rounded-xl p-8 shadow-sm border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Intellectual Property Rights</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  All content on this website, including but not limited to:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Text, graphics, logos, and images</li>
                  <li>Product designs and technical specifications</li>
                  <li>Software and technology</li>
                  <li>Trademarks and trade names</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  are the property of JIANGYIN ZESHUN MACHINERY CO., LTD. or its licensors and are protected by 
                  intellectual property laws. Unauthorized use, reproduction, or distribution of this content is 
                  strictly prohibited.
                </p>
              </div>

              <div className="bg-card rounded-xl p-8 shadow-sm border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Product Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  While we strive to provide accurate product information on our website, we do not warrant that 
                  product descriptions, specifications, or other content is accurate, complete, or error-free. 
                  All product information is subject to change without notice. Final specifications and pricing 
                  will be confirmed in formal quotations and contracts.
                </p>
              </div>

              <div className="bg-card rounded-xl p-8 shadow-sm border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Quotations and Orders</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Regarding quotations and orders:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Quotations are valid for the period specified therein</li>
                  <li>Orders are subject to acceptance by our company</li>
                  <li>Payment terms will be specified in the formal quotation or contract</li>
                  <li>Delivery times are estimates and may vary based on order specifications</li>
                  <li>Custom equipment orders may be subject to additional terms and conditions</li>
                </ul>
              </div>

              <div className="bg-card rounded-xl p-8 shadow-sm border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">7. Warranty and Liability</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  <strong>Product Warranty:</strong> Our equipment comes with manufacturer warranty as specified 
                  in the sales contract. Warranty terms, duration, and coverage will be detailed in the warranty 
                  documentation provided with each product.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  <strong>Limitation of Liability:</strong> To the fullest extent permitted by law, we shall not 
                  be liable for any indirect, incidental, special, consequential, or punitive damages arising from 
                  your use of our website or services.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>Website Disclaimer:</strong> The website and its content are provided &quot;as is&quot; without 
                  warranties of any kind, either express or implied.
                </p>
              </div>

              <div className="bg-card rounded-xl p-8 shadow-sm border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">8. Confidentiality</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Any technical drawings, specifications, or proprietary information you share with us will be 
                  treated as confidential. We will not disclose your confidential information to third parties 
                  without your consent, except as required by law or as necessary to fulfill your order. Similarly, 
                  any technical information we provide to you should be treated as confidential.
                </p>
              </div>

              <div className="bg-card rounded-xl p-8 shadow-sm border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">9. Export Compliance</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our products may be subject to export control laws and regulations. Customers are responsible 
                  for compliance with all applicable export laws and regulations of their respective countries. 
                  We reserve the right to refuse orders that may violate export control regulations.
                </p>
              </div>

              <div className="bg-card rounded-xl p-8 shadow-sm border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">10. Indemnification</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You agree to indemnify, defend, and hold harmless JIANGYIN ZESHUN MACHINERY CO., LTD. and its 
                  officers, directors, employees, and agents from any claims, liabilities, damages, costs, or 
                  expenses arising from your violation of these Terms or your use of our website or services.
                </p>
              </div>

              <div className="bg-card rounded-xl p-8 shadow-sm border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">11. Governing Law and Dispute Resolution</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  These Terms shall be governed by and construed in accordance with the laws of the People&apos;s 
                  Republic of China. Any disputes arising from these Terms or related to our services shall be 
                  resolved through:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Friendly negotiation between the parties</li>
                  <li>Mediation by a mutually agreed mediator</li>
                  <li>Arbitration or litigation in the competent courts of Jiangyin City, Jiangsu Province, China</li>
                </ul>
              </div>

              <div className="bg-card rounded-xl p-8 shadow-sm border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">12. Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify these Terms at any time. Changes will be effective immediately 
                  upon posting on this page. Your continued use of the website after any modifications indicates 
                  your acceptance of the updated Terms.
                </p>
              </div>

              <div className="bg-card rounded-xl p-8 shadow-sm border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">13. Severability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If any provision of these Terms is found to be invalid, illegal, or unenforceable, the remaining 
                  provisions shall continue in full force and effect.
                </p>
              </div>

              <div className="bg-card rounded-xl p-8 shadow-sm border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-4">14. Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  For questions about these Terms or our services, please contact:
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
