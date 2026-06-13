// 复制到 <客户站>/lib/supabase.ts
// 所有客户站完全相同，零定制
import { createClient, type SupabaseClient } from "@supabase/supabase-js"

let cachedClient: SupabaseClient | null = null
let cachedKey = ""

export function getTenantId(): string | null {
  return process.env.NEXT_PUBLIC_TENANT_ID?.trim() ?? null
}

export function getSupabaseClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()
  if (!url || !anonKey) return null

  const cacheKey = `${url}:${anonKey}`
  if (!cachedClient || cachedKey !== cacheKey) {
    cachedClient = createClient(url, anonKey)
    cachedKey = cacheKey
  }
  return cachedClient
}
