import { NextResponse } from 'next/server'
import { adapterConfig, PREVIEW_COOKIE } from '@/lib/site-content/site-content'
import { exchangePreview } from '@/lib/site-content/transport'
import { allowsPreviewFormOrigin } from '@/lib/site-content/form-origin'

export async function POST(request: Request) {
  const config = adapterConfig()
  if (!allowsPreviewFormOrigin(request.headers, `https://${config.domain}`, new URL(config.adminUrl).origin)) return new Response('Preview origin denied', { status: 403 })
  const form = await request.formData()
  const token = String(form.get('token') ?? ''), path = String(form.get('path') ?? '/')
  if (!/^[A-Za-z0-9_-]{43,128}$/.test(token) || !/^\/(?:[a-zA-Z0-9_-]+(?:\/[a-zA-Z0-9_-]+)*)?$/.test(path)) return new Response('Invalid preview', { status: 400 })
  const session = await exchangePreview(config, token)
  const response = NextResponse.redirect(new URL(path, `https://${config.domain}`), 303)
  response.cookies.set(PREVIEW_COOKIE, session.session, { httpOnly: true, secure: true, sameSite: 'lax', path: '/', expires: new Date(session.expiresAt) })
  return response
}
