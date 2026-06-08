import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronRight, Calendar, ArrowLeft, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getArticle, getArticles } from "@/lib/articles-db"

export const revalidate = 60
export const dynamicParams = true

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const articles = await getArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    return {
      title: "Article Not Found | Zeshun Equipment",
    }
  }

  return {
    title: `${article.title} | Zeshun Equipment News`,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      images: article.coverImage ? [{ url: article.coverImage }] : [],
      type: "article",
      publishedTime: article.publishedAt,
    },
  }
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    notFound()
  }

  const allArticles = await getArticles()
  const relatedArticles = allArticles.filter(a => a.slug !== article.slug).slice(0, 3)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/news" className="hover:text-primary transition-colors">
              News
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground line-clamp-1">{article.title}</span>
          </nav>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <article className="lg:col-span-2">
              {/* Back Button */}
              <Link
                href="/news"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to News
              </Link>

              {/* Article Header */}
              <header className="mb-8">
                <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full mb-4">
                  {article.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
                  {article.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(article.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </header>

              {/* Featured Image */}
              {article.coverImage && (
                <div className="relative aspect-video rounded-xl overflow-hidden mb-8">
                  <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              {/* Article Content */}
              <div
                className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary prose-img:rounded-lg"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              {/* Share Section */}
              <div className="flex items-center gap-4 mt-12 pt-8 border-t border-border">
                <span className="text-foreground font-medium">Share this article:</span>
                <Button variant="outline" size="sm" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              {/* Related Articles */}
              <div className="sticky top-32">
                <h3 className="text-xl font-bold text-foreground mb-6">Related Articles</h3>
                <div className="space-y-4">
                  {relatedArticles.map((relatedArticle) => (
                    <Link key={relatedArticle.slug} href={`/news/${relatedArticle.slug}`}>
                      <Card className="group hover:shadow-md transition-shadow">
                        <CardContent className="p-4 flex gap-4">
                          {relatedArticle.coverImage && (
                            <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
                              <Image
                                src={relatedArticle.coverImage}
                                alt={relatedArticle.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 text-sm">
                              {relatedArticle.title}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(relatedArticle.publishedAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>

                {/* CTA */}
                <Card className="mt-8 bg-primary/5 border-primary/20">
                  <CardContent className="p-6 text-center">
                    <h4 className="text-lg font-bold text-foreground mb-2">
                      Need Equipment Consultation?
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      Our technical team is ready to help you find the right solution.
                    </p>
                    <Button asChild className="w-full">
                      <Link href="/contact">Contact Us</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
