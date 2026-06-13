import { getSupabaseClient, getTenantId } from "@/lib/supabase"
import { pickI18n, toStringArray, readSpecs, readExtra, I18nField } from "@/lib/products-db-helpers"
import type { SupabaseClient } from "@supabase/supabase-js"

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

const PRODUCT_SELECT =
  "slug, name, name_en, name_i18n, description, description_i18n, image_url, category, specs, features, extra_data, sort_order"

const CATEGORY_SELECT = "slug, name, name_en, name_i18n, sort_order"

function normalizeCategoryKey(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]+/g, "")
}

function readString(value: unknown): string {
  return typeof value === "string" ? value.trim() : ""
}

function rowToCategory(row: Record<string, unknown>): ProductCategory {
  return {
    slug: (row.slug as string) || "",
    name: pickI18n(row.name_i18n as I18nField, "zh") || (row.name as string) || "",
    nameEn: pickI18n(row.name_i18n as I18nField, "en") || (row.name_en as string) || (row.name as string) || "",
  }
}

function buildCategoryLookup(categories: ProductCategory[]): Map<string, ProductCategory> {
  const lookup = new Map<string, ProductCategory>()
  for (const category of categories) {
    for (const value of [category.slug, category.name, category.nameEn]) {
      const key = normalizeCategoryKey(value)
      if (key) lookup.set(key, category)
    }
  }
  return lookup
}

async function fetchProductCategories(
  supabase: SupabaseClient,
  tenantId: string,
): Promise<ProductCategory[]> {
  const { data, error } = await supabase
    .from("product_categories")
    .select(CATEGORY_SELECT)
    .eq("tenant_id", tenantId)
    .eq("is_active", true)
    .order("sort_order", { ascending: true })

  if (error) {
    console.error("[products-db] getProductCategories error:", error.message)
    return []
  }

  return (data ?? []).map((row) => rowToCategory(row as Record<string, unknown>))
}

function resolveCategory(
  rawCategory: string,
  categoryLookup: Map<string, ProductCategory>,
): ProductCategory | null {
  const key = normalizeCategoryKey(rawCategory)
  return key ? categoryLookup.get(key) ?? null : null
}

function rowToProduct(row: Record<string, unknown>, categories: ProductCategory[] = []): Product {
  const extra = readExtra(row.extra_data)
  const specs = readSpecs(row.specs)
  const features = toStringArray(row.features)
  const categoryLookup = buildCategoryLookup(categories)
  const rawCategory =
    readString(extra.category_slug) ||
    readString(extra.categorySlug) ||
    readString(row.category)
  const resolvedCategory = resolveCategory(rawCategory, categoryLookup)
  
  // Get images from extra_data or fallback to single image
  const mainImage = readString(row.image_url)
  const extraImages = toStringArray(extra.images)
  const galleryImages = toStringArray(extra.gallery)
  const allExtraImages = extraImages.length > 0 ? extraImages : galleryImages
  const images = allExtraImages.length > 0 ? allExtraImages : (mainImage ? [mainImage] : [])
  
  return {
    slug: (row.slug as string) || "",
    name: pickI18n(row.name_i18n as I18nField, "zh") || (row.name as string) || "",
    nameEn: pickI18n(row.name_i18n as I18nField, "en") || (row.name_en as string) || (row.name as string) || "",
    description: pickI18n(row.description_i18n as I18nField, "zh") || (row.description as string) || "",
    descriptionEn: pickI18n(row.description_i18n as I18nField, "en") || (row.description as string) || "",
    image: mainImage,
    images,
    category: resolvedCategory?.nameEn || (extra.category_name_en as string) || rawCategory,
    categorySlug: resolvedCategory?.slug || rawCategory,
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
    .select(PRODUCT_SELECT)
    .eq("tenant_id", tenantId)
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
  
  if (error) {
    console.error("[products-db] getProducts error:", error.message)
    return []
  }
  
  const categories = await fetchProductCategories(supabase, tenantId)
  return (data ?? []).map((r) => rowToProduct(r as Record<string, unknown>, categories))
}

export async function getProduct(slug: string): Promise<Product | null> {
  const tenantId = getTenantId()
  const supabase = getSupabaseClient()
  if (!tenantId || !supabase) return null
  
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("tenant_id", tenantId)
    .eq("slug", slug)
    .eq("is_active", true)
    .single()
  
  if (error) {
    console.error("[products-db] getProduct error:", error.message)
    return null
  }
  
  const categories = await fetchProductCategories(supabase, tenantId)
  return data ? rowToProduct(data as Record<string, unknown>, categories) : null
}

export async function getProductCategories(): Promise<ProductCategory[]> {
  const tenantId = getTenantId()
  const supabase = getSupabaseClient()
  if (!tenantId || !supabase) return []
  
  return fetchProductCategories(supabase, tenantId)
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const products = await getProducts()
  return products.filter((product) => product.categorySlug === categorySlug)
}

export async function getFeaturedProducts(limit: number = 6): Promise<Product[]> {
  const products = await getProducts()
  return products.slice(0, limit)
}
