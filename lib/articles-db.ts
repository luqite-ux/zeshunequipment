import { getSupabaseClient, getTenantId } from "@/lib/supabase"
import { pickI18n, I18nField, toStringArray } from "@/lib/products-db-helpers"

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

function rowToArticle(row: Record<string, unknown>): Article {
  const tags = toStringArray(row.tags)
  
  return {
    slug: (row.slug as string) || "",
    title: pickI18n(row.title_i18n as I18nField, "en") || (row.title as string) || "",
    summary: pickI18n(row.summary_i18n as I18nField, "en") || (row.summary as string) || "",
    content: pickI18n(row.content_i18n as I18nField, "en") || (row.content as string) || "",
    coverImage: (row.cover_image as string) || "",
    publishedAt: (row.published_at as string) || "",
    tags,
    category: tags[0] || "News",
  }
}

export async function getArticles(): Promise<Article[]> {
  const tenantId = getTenantId()
  const supabase = getSupabaseClient()
  if (!tenantId || !supabase) return []
  
  const { data, error } = await supabase
    .from("articles")
    .select("slug, title, title_i18n, summary, summary_i18n, content, content_i18n, cover_image, published_at, tags")
    .eq("tenant_id", tenantId)
    .eq("is_published", true)
    .order("published_at", { ascending: false })
  
  if (error) {
    console.error("[articles-db] getArticles error:", error.message)
    return []
  }
  
  return (data ?? []).map((r) => rowToArticle(r as Record<string, unknown>))
}

export async function getArticle(slug: string): Promise<Article | null> {
  const tenantId = getTenantId()
  const supabase = getSupabaseClient()
  if (!tenantId || !supabase) return null
  
  const { data, error } = await supabase
    .from("articles")
    .select("slug, title, title_i18n, summary, summary_i18n, content, content_i18n, cover_image, published_at, tags")
    .eq("tenant_id", tenantId)
    .eq("slug", slug)
    .eq("is_published", true)
    .single()
  
  if (error) {
    console.error("[articles-db] getArticle error:", error.message)
    return null
  }
  
  return data ? rowToArticle(data as Record<string, unknown>) : null
}

export async function getLatestArticles(limit: number = 3): Promise<Article[]> {
  const tenantId = getTenantId()
  const supabase = getSupabaseClient()
  if (!tenantId || !supabase) return []
  
  const { data, error } = await supabase
    .from("articles")
    .select("slug, title, title_i18n, summary, summary_i18n, content, content_i18n, cover_image, published_at, tags")
    .eq("tenant_id", tenantId)
    .eq("is_published", true)
    .order("published_at", { ascending: false })
    .limit(limit)
  
  if (error) {
    console.error("[articles-db] getLatestArticles error:", error.message)
    return []
  }
  
  return (data ?? []).map((r) => rowToArticle(r as Record<string, unknown>))
}
