import { NextResponse, type NextRequest } from 'next/server'
import { adminDb, tenantId } from '@/lib/admin-db'
import { SESSION_COOKIE, TENANT_COOKIE } from '@/lib/admin-session'

export async function GET(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value
  if (token && request.cookies.get(TENANT_COOKIE)?.value === tenantId()) {
    const db = adminDb()
    const { data: session } = await db.from('admin_user_sessions').select('id,admin_user_id').eq('token', token).maybeSingle()
    if (session) await db.from('admin_user_sessions').delete().eq('id', session.id).eq('admin_user_id', session.admin_user_id).eq('token', token)
  }
  const response = NextResponse.redirect(new URL('/admin/login', request.url), 303)
  for (const name of [SESSION_COOKIE, TENANT_COOKIE]) {
    response.cookies.set(name, '', { httpOnly: true, secure: request.nextUrl.protocol === 'https:', sameSite: 'lax', path: '/', maxAge: 0 })
  }
  response.headers.set('Cache-Control', 'no-store')
  return response
}
