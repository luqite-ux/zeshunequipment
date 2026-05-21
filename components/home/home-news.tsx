"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Article } from "@/lib/articles-db"

interface HomeNewsProps {
  articles: Article[]
}

export function HomeNews({ articles }: HomeNewsProps) {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
            NEWS & INSIGHTS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Latest News & Technical Guides
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay updated with company news, industry insights, and technical guides 
            for industrial mixing and processing equipment.
          </p>
        </motion.div>

        {articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No articles available at the moment.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {articles.map((article, index) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link 
                  href={`/news/${article.slug}`}
                  className="group block bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-border h-full"
                >
                  <div className="relative h-48 overflow-hidden">
                    {article.coverImage ? (
                      <Image
                        src={article.coverImage}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <span className="text-muted-foreground">No Image</span>
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="h-4 w-4" />
                      <time dateTime={article.publishedAt}>
                        {new Date(article.publishedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric"
                        })}
                      </time>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {article.summary}
                    </p>
                    <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm mt-4 group-hover:gap-3 transition-all">
                      Read More <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button asChild className="bg-primary hover:bg-accent text-primary-foreground font-semibold">
            <Link href="/news">
              View All News <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
