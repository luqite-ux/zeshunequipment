import 'server-only'
import { cache } from 'react'
import { cookies } from 'next/headers'
import { loadSiteSnapshot, type AdapterConfig, type SiteSnapshot } from './transport'

export const PREVIEW_COOKIE = '__Host-hq-site-preview'
export function adapterConfig(): AdapterConfig {
  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID?.trim()
  const domain = process.env.SITE_CONTENT_DOMAIN?.trim()
  const integrationKey = process.env.SITE_CONTENT_INTEGRATION_KEY?.trim()
  if (!tenantId || !domain || !integrationKey) throw new Error('Site content adapter is not configured')
  return { adminUrl: process.env.NEXT_PUBLIC_ADMIN_URL?.trim() || 'https://admin.globle-trade.com', tenantId, domain, integrationKey }
}
export const getSiteContent = cache(async (locale: string) => {
  if (!process.env.NEXT_PUBLIC_TENANT_ID?.trim() || !process.env.SITE_CONTENT_DOMAIN?.trim() || !process.env.SITE_CONTENT_INTEGRATION_KEY?.trim()) return null
  return loadSiteSnapshot(adapterConfig(), locale, (await cookies()).get(PREVIEW_COOKIE)?.value ?? null)
})
export function pageModule(snapshot: SiteSnapshot | null, path: string, key: string) {
  return snapshot?.pages.find((page) => page.path === path)?.modules.find((module) => module.key === key)?.values ?? null
}
export async function siteContentMetadata(path: string, locale: string) {
  const snapshot = await getSiteContent(locale)
  const values = snapshot?.pages.find((page) => page.path === path)?.modules.find((module) => module.type === 'seo')?.values
  return { ...(typeof values?.title === 'string' ? { title: values.title } : {}), ...(typeof values?.description === 'string' ? { description: values.description } : {}) }
}
