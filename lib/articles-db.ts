import { getSupabaseClient, getTenantId } from "@/lib/supabase"
import { pickI18n, type I18nField } from "@/lib/products-db-helpers"

export interface Article {
  slug: string
  title: string
  summary: string
  content: string
  coverImage: string
  publishedAt: string
  tags: string[]
  category: string
}

type ArticleRow = {
  slug: string
  title: string | null
  title_i18n: I18nField
  excerpt: string | null
  excerpt_i18n: I18nField
  content: string | null
  content_en: string | null
  content_i18n: I18nField
  featured_image: string | null
  published_at: string | null
  created_at: string
}

function pickContent(row: ArticleRow): string {
  const fromI18n = pickI18n(row.content_i18n, "en").trim()
  if (fromI18n) return fromI18n
  const en = typeof row.content_en === "string" ? row.content_en.trim() : ""
  const zh = typeof row.content === "string" ? row.content.trim() : ""
  return en || zh
}

function rowToArticle(row: ArticleRow): Article {
  const title = pickI18n(row.title_i18n, "en") || row.title || "(Untitled)"
  const summary = pickI18n(row.excerpt_i18n, "en") || row.excerpt || ""
  return {
    slug: row.slug,
    title,
    summary,
    content: pickContent(row),
    coverImage: row.featured_image || "",
    publishedAt: row.published_at || row.created_at,
    tags: [],
    category: "News",
  }
}

const ARTICLE_SELECT =
  "slug, title, title_i18n, excerpt, excerpt_i18n, content, content_en, content_i18n, featured_image, published_at, created_at"

export async function getArticles(): Promise<Article[]> {
  const tenantId = getTenantId()
  const supabase = getSupabaseClient()
  if (!tenantId || !supabase) return []

  const { data, error } = await supabase
    .from("articles")
    .select(ARTICLE_SELECT)
    .eq("tenant_id", tenantId)
    .eq("is_published", true)
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false })

  if (error) {
    console.error("[articles-db] getArticles error:", error.message)
    return []
  }

  return (data ?? []).map((r) => rowToArticle(r as ArticleRow))
}

export async function getArticle(slug: string): Promise<Article | null> {
  const tenantId = getTenantId()
  const supabase = getSupabaseClient()
  if (!tenantId || !supabase) return null

  const { data, error } = await supabase
    .from("articles")
    .select(ARTICLE_SELECT)
    .eq("tenant_id", tenantId)
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle()

  if (error) {
    console.error("[articles-db] getArticle error:", error.message)
    return null
  }

  return data ? rowToArticle(data as ArticleRow) : null
}

export async function getLatestArticles(limit: number = 3): Promise<Article[]> {
  const articles = await getArticles()
  return articles.slice(0, limit)
}
