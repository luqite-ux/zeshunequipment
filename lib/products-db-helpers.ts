// 复制到 <客户站>/lib/products-db-helpers.ts
// 所有新 10 站共享的小工具（避免每个站的 products-db.ts 重复 30 行 boilerplate）

export type I18nField = Record<string, unknown> | null

export function pickI18n(field: I18nField, preferred: string = "en"): string {
  if (!field || typeof field !== "object") return ""
  const obj = field as Record<string, unknown>
  if (typeof obj[preferred] === "string" && obj[preferred]) return obj[preferred] as string
  if (typeof obj.en === "string" && obj.en) return obj.en as string
  if (typeof obj.zh === "string" && obj.zh) return obj.zh as string
  for (const v of Object.values(obj)) {
    if (typeof v === "string" && v) return v
  }
  return ""
}

export function readExtra(v: unknown): Record<string, unknown> {
  if (!v || typeof v !== "object" || Array.isArray(v)) return {}
  return v as Record<string, unknown>
}

export function toStringArray(v: unknown): string[] {
  if (!Array.isArray(v)) return []
  return v.filter((x): x is string => typeof x === "string")
}

export function readSpecs(v: unknown): Record<string, string> {
  if (!v || typeof v !== "object" || Array.isArray(v)) return {}
  const out: Record<string, string> = {}
  for (const [k, val] of Object.entries(v as Record<string, unknown>)) {
    if (typeof val === "string") out[k] = val
  }
  return out
}
