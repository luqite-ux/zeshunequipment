export type AdapterConfig = { adminUrl: string; tenantId: string; domain: string; integrationKey: string }
export type SiteSnapshot = { version: string; definitionVersion: number; locale: string; pages: Array<{ key: string; path: string; modules: Array<{ key: string; type: string; values: Record<string, unknown> }> }> }

const endpoint = (config: AdapterConfig, suffix = '') => `${new URL(config.adminUrl).origin}/api/site-content/${encodeURIComponent(config.tenantId)}${suffix}`

export async function loadSiteSnapshot(config: AdapterConfig, locale: string, previewSession: string | null): Promise<SiteSnapshot | null> {
  const response = previewSession
    ? await fetch(endpoint(config, '/preview-session'), { method: 'POST', cache: 'no-store', redirect: 'error', headers: { 'Content-Type': 'application/json', 'X-Site-Content-Key': config.integrationKey }, body: JSON.stringify({ domain: config.domain, session: previewSession, locale }) })
    : await fetch(`${endpoint(config)}?locale=${encodeURIComponent(locale)}`, { cache: 'force-cache', next: { revalidate: 60 }, redirect: 'error' })
  if (!previewSession && response.status === 404) return null
  if (!response.ok) throw new Error(previewSession ? 'Site preview denied or expired; exit preview to view the public site.' : 'Site content unavailable')
  return await response.json() as SiteSnapshot
}

export async function exchangePreview(config: AdapterConfig, token: string) {
  const response = await fetch(endpoint(config, '/preview'), { method: 'POST', cache: 'no-store', redirect: 'error', headers: { 'Content-Type': 'application/json', 'X-Site-Content-Key': config.integrationKey }, body: JSON.stringify({ domain: config.domain, token }) })
  if (!response.ok) throw new Error('Preview denied or expired')
  return await response.json() as { session: string; expiresAt: string }
}
