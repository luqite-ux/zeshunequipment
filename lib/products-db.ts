import { getSupabaseClient, getTenantId } from "@/lib/supabase"
import { pickI18n, toStringArray, readSpecs, readExtra, I18nField } from "@/lib/products-db-helpers"

export interface Product {
  slug: string
  name: string
  nameEn: string
  description: string
  descriptionEn: string
  image: string
  images: string[]
  category: string
  categorySlug: string
  specs: Record<string, string>
  features: string[]
  sortOrder: number
}

export interface ProductCategory {
  slug: string
  name: string
  nameEn: string
}

function rowToProduct(row: Record<string, unknown>): Product {
  const extra = readExtra(row.extra_data)
  const specs = readSpecs(row.specs)
  const features = toStringArray(row.features)
  
  // Get images from extra_data or fallback to single image
  const mainImage = (row.image_url as string) || ""
  const extraImages = toStringArray(extra.images)
  const images = extraImages.length > 0 ? extraImages : (mainImage ? [mainImage] : [])
  
  return {
    slug: (row.slug as string) || "",
    name: pickI18n(row.name_i18n as I18nField, "zh") || (row.name as string) || "",
    nameEn: pickI18n(row.name_i18n as I18nField, "en") || (row.name_en as string) || (row.name as string) || "",
    description: pickI18n(row.description_i18n as I18nField, "zh") || (row.description as string) || "",
    descriptionEn: pickI18n(row.description_i18n as I18nField, "en") || (row.description as string) || "",
    image: mainImage,
    images,
    category: (extra.category_name_en as string) || (row.category as string) || "",
    categorySlug: (row.category as string) || "",
    specs,
    features,
    sortOrder: (row.sort_order as number) || 0,
  }
}

export async function getProducts(): Promise<Product[]> {
  const tenantId = getTenantId()
  const supabase = getSupabaseClient()
  if (!tenantId || !supabase) return []
  
  const { data, error } = await supabase
    .from("products")
    .select("slug, name, name_en, name_i18n, description, description_i18n, image_url, category, specs, features, extra_data, sort_order")
    .eq("tenant_id", tenantId)
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
  
  if (error) {
    console.error("[products-db] getProducts error:", error.message)
    return []
  }
  
  return (data ?? []).map((r) => rowToProduct(r as Record<string, unknown>))
}

export async function getProduct(slug: string): Promise<Product | null> {
  const tenantId = getTenantId()
  const supabase = getSupabaseClient()
  if (!tenantId || !supabase) return null
  
  const { data, error } = await supabase
    .from("products")
    .select("slug, name, name_en, name_i18n, description, description_i18n, image_url, category, specs, features, extra_data, sort_order")
    .eq("tenant_id", tenantId)
    .eq("slug", slug)
    .eq("is_active", true)
    .single()
  
  if (error) {
    console.error("[products-db] getProduct error:", error.message)
    return null
  }
  
  return data ? rowToProduct(data as Record<string, unknown>) : null
}

export async function getProductCategories(): Promise<ProductCategory[]> {
  const tenantId = getTenantId()
  const supabase = getSupabaseClient()
  if (!tenantId || !supabase) return []
  
  const { data, error } = await supabase
    .from("product_categories")
    .select("slug, name, name_en, name_i18n, sort_order")
    .eq("tenant_id", tenantId)
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
  
  if (error) {
    console.error("[products-db] getProductCategories error:", error.message)
    return []
  }
  
  return (data ?? []).map((row) => ({
    slug: (row.slug as string) || "",
    name: pickI18n(row.name_i18n as I18nField, "zh") || (row.name as string) || "",
    nameEn: pickI18n(row.name_i18n as I18nField, "en") || (row.name_en as string) || (row.name as string) || "",
  }))
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const tenantId = getTenantId()
  const supabase = getSupabaseClient()
  if (!tenantId || !supabase) return []
  
  const { data, error } = await supabase
    .from("products")
    .select("slug, name, name_en, name_i18n, description, description_i18n, image_url, category, specs, features, extra_data, sort_order")
    .eq("tenant_id", tenantId)
    .eq("category", categorySlug)
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
  
  if (error) {
    console.error("[products-db] getProductsByCategory error:", error.message)
    return []
  }
  
  return (data ?? []).map((r) => rowToProduct(r as Record<string, unknown>))
}

export async function getFeaturedProducts(limit: number = 6): Promise<Product[]> {
  const tenantId = getTenantId()
  const supabase = getSupabaseClient()
  if (!tenantId || !supabase) return []
  
  const { data, error } = await supabase
    .from("products")
    .select("slug, name, name_en, name_i18n, description, description_i18n, image_url, category, specs, features, extra_data, sort_order")
    .eq("tenant_id", tenantId)
    .eq("is_active", true)
    .eq("is_featured", true)
    .order("sort_order", { ascending: true })
    .limit(limit)
  
  if (error) {
    console.error("[products-db] getFeaturedProducts error:", error.message)
    return []
  }
  
  return (data ?? []).map((r) => rowToProduct(r as Record<string, unknown>))
}
