import { NextResponse, type NextRequest } from 'next/server'
import { SESSION_COOKIE, TENANT_COOKIE } from './lib/admin-session'
import { isServiceGuardExcludedPath, isWebsiteServiceAvailable } from './lib/service-status'
import { protectPreviewResponse } from './lib/site-content/preview-protection'
const PREVIEW_COOKIE = '__Host-hq-site-preview'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const finish = (response: NextResponse) => {
    protectPreviewResponse(response.headers, request.cookies.has(PREVIEW_COOKIE))
    return response
  }
  if (!isServiceGuardExcludedPath(path) && !await isWebsiteServiceAvailable()) {
    return finish(NextResponse.rewrite(new URL('/service-expired', request.url)))
  }
  if (path === '/admin/login' || path.startsWith('/admin/logout')) return finish(NextResponse.next())
  if (path === '/admin' || path.startsWith('/admin/')) {
    const expectedTenant = process.env.NEXT_PUBLIC_TENANT_ID?.trim()
    const hasSession = Boolean(request.cookies.get(SESSION_COOKIE)?.value)
    const hasTenant = Boolean(expectedTenant) && request.cookies.get(TENANT_COOKIE)?.value === expectedTenant
    if (!hasSession || !hasTenant) {
      const url = request.nextUrl.clone()
      url.pathname = '/admin/login'
      url.searchParams.set('reason', 'unauthorized')
      return finish(NextResponse.redirect(url))
    }
  }
  return finish(NextResponse.next())
}

export const config = { matcher: ['/((?!_next/static|_next/image).*)'] }
