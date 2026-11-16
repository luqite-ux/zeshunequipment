import { randomUUID } from 'node:crypto'
import bcrypt from 'bcryptjs'
import { NextResponse, type NextRequest } from 'next/server'
import { adminDb, tenantId } from '@/lib/admin-db'
import { SESSION_COOKIE, TENANT_COOKIE } from '@/lib/admin-session'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  const fail = (reason: string) => {
    const url = new URL('/admin/login', request.url)
    url.searchParams.set('error', reason)
    return NextResponse.redirect(url, 303)
  }
  if (request.headers.get('origin') !== request.nextUrl.origin) return new NextResponse('Invalid request origin', { status: 403 })
  try {
    if (Number(request.headers.get('content-length') || 0) > 8192) return fail('invalid')
    const form = await request.formData()
    const email = String(form.get('email') ?? '').trim().toLowerCase()
    const password = String(form.get('password') ?? '')
    if (!email || email.length > 254 || !password || password.length > 200) return fail('invalid')

    const db = adminDb()
    const tenant = tenantId()
    const { data: user, error } = await db.from('admin_users')
      .select('id,email,password_hash,tenant_id,is_active,role')
      .eq('email', email)
      .maybeSingle()
    if (error) return fail('unavailable')
    if (!user || user.tenant_id !== tenant || user.is_active !== true || !await bcrypt.compare(password, user.password_hash)) {
      return fail('invalid')
    }

    const token = randomUUID()
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const { error: sessionError } = await db.from('admin_user_sessions').insert({
      admin_user_id: user.id,
      token,
      expires_at: expires.toISOString(),
      user_agent: request.headers.get('user-agent')?.slice(0, 500) || null,
    })
    if (sessionError) return fail('unavailable')
    await db.from('admin_users').update({ last_login_at: new Date().toISOString() }).eq('id', user.id).eq('tenant_id', tenant)

    const response = NextResponse.redirect(new URL('/admin', request.url), 303)
    for (const [name, value] of [[SESSION_COOKIE, token], [TENANT_COOKIE, tenant]]) {
      response.cookies.set(name, value, {
        httpOnly: true,
        secure: request.nextUrl.protocol === 'https:',
        sameSite: 'lax',
        path: '/',
        expires,
      })
    }
    response.headers.set('Cache-Control', 'no-store')
    return response
  } catch {
    return fail('unavailable')
  }
}
