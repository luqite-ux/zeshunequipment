import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ArrowLeft, MessageSquareQuote, Share2 } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProductGallery } from "@/components/products/product-gallery";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProduct, getProducts, getProductCategories } from "@/lib/products-db";

export const revalidate = 60
export const dynamicParams = true

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  
  if (!product) {
    return {
      title: "Product Not Found - Zeshun Equipment",
    };
  }

  return {
    title: `${product.nameEn} - Zeshun Equipment`,
    description: product.descriptionEn,
    keywords: `${product.nameEn}, ${product.category}, industrial equipment, stainless steel machinery`,
    openGraph: {
      title: `${product.nameEn} - Zeshun Equipment`,
      description: product.descriptionEn,
      images: product.image ? [{ url: product.image }] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  // Get categories and related products
  const [categories, allProducts] = await Promise.all([
    getProductCategories(),
    getProducts(),
  ]);
  
  const category = categories.find(c => c.slug === product.categorySlug);
  const relatedProducts = allProducts
    .filter((p) => p.categorySlug === product.categorySlug && p.slug !== product.slug)
    .slice(0, 4);

  const productImages = product.images.length > 0 ? product.images : (product.image ? [product.image] : []);

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Breadcrumb */}
      <section className="bg-muted/50 border-b border-border pt-[88px] md:pt-[104px]">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/products" className="hover:text-primary transition-colors">
              Products
            </Link>
            {category && (
              <>
                <ChevronRight className="h-4 w-4" />
                <Link
                  href={`/products?category=${category.slug}`}
                  className="hover:text-primary transition-colors"
                >
                  {category.nameEn}
                </Link>
              </>
            )}
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium truncate max-w-[200px]">
              {product.nameEn}
            </span>
          </nav>
        </div>
      </section>

      {/* Product Detail */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Gallery */}
            <div>
              <ProductGallery images={productImages} productName={product.nameEn} />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Category Badge */}
              {category && (
                <Link
                  href={`/products?category=${category.slug}`}
                  className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium hover:bg-primary/20 transition-colors"
                >
                  {category.nameEn}
                </Link>
              )}

              {/* Product Name */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  {product.nameEn}
                </h1>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-foreground">Product Description</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {product.descriptionEn}
                </p>
              </div>

              {/* Features */}
              {product.features.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-foreground">Key Features</h2>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="w-2 h-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Specs */}
              {Object.keys(product.specs).length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-foreground">Specifications</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(product.specs).map(([key, value]) => (
                      <div key={key} className="border-b border-border pb-2">
                        <span className="text-sm text-muted-foreground block">{key}</span>
                        <span className="font-medium text-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" className="gap-2" asChild>
                  <Link href="/contact">
                    <MessageSquareQuote className="h-5 w-5" />
                    Request Quote
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <Share2 className="h-5 w-5" />
                  Share
                </Button>
              </div>

              {/* Quick Info Card */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className="text-lg">Why Choose This Product?</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-muted-foreground">
                        Premium 304/316L stainless steel construction
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-muted-foreground">
                        Customizable specifications to meet your requirements
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-muted-foreground">
                        CE certified with comprehensive quality assurance
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-muted-foreground">
                        Professional technical support and after-sales service
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-8">Related Products</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => {
                const relatedImage = relatedProduct.images[0] || relatedProduct.image;
                return (
                  <Link
                    key={relatedProduct.slug}
                    href={`/products/${relatedProduct.slug}`}
                    className="group"
                  >
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="aspect-square relative bg-white">
                        {relatedImage && (
                          <img
                            src={relatedImage}
                            alt={relatedProduct.nameEn}
                            className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                          />
                        )}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {relatedProduct.nameEn}
                        </h3>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            Interested in This Product?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Contact our team for detailed specifications, customization options, and competitive pricing.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Get a Free Quote</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              asChild
            >
              <a href="mailto:info@zeshunequipment.com">Email Us Directly</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
