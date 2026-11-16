import { createClient } from '@supabase/supabase-js'

export function tenantId() {
  const id = process.env.NEXT_PUBLIC_TENANT_ID?.trim()
  if (!id) throw new Error('Tenant configuration is missing')
  return id
}

export function adminDb() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
  if (!url || !key) throw new Error('Admin database configuration is missing')
  return createClient(url, key, { auth: { persistSession: false } })
}
