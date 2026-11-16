import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('customer site exposes the standard proxied admin portal', () => {
  const config = read('next.config.mjs')
  const middleware = read('middleware.ts')
  const loginPage = read('app/admin/login/page.tsx')
  const loginRoute = read('app/api/auth/login/route.ts')

  assert.match(config, /NEXT_PUBLIC_ADMIN_URL/)
  assert.match(config, /source:\s*['"]\/admin['"]/)
  assert.match(config, /source:\s*['"]\/api\/admin\/:path\*['"]/)
  assert.match(middleware, /hq_admin_session|SESSION_COOKIE/)
  assert.match(middleware, /hq_tenant_id|TENANT_COOKIE/)
  assert.match(loginPage, /action=["']\/api\/auth\/login["']/)
  assert.match(loginRoute, /NextResponse\.redirect\(new URL\(['"]\/admin['"]/)
  assert.doesNotMatch(loginRoute, /must_change_password/)
})
