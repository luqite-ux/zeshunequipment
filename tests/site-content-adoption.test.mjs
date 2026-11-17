import assert from 'node:assert/strict'
import fs from 'node:fs'
import test from 'node:test'

const read = (file) => fs.readFileSync(new URL(`../${file}`, import.meta.url), 'utf8')

test('registered public pages consume the shared site-content snapshot', () => {
  for (const file of ['app/page.tsx', 'app/about/page.tsx', 'app/solutions/page.tsx', 'app/cases/page.tsx', 'app/contact/page.tsx']) {
    const source = read(file)
    assert.match(source, /getSiteContent\("en"\)/, `${file} must load the published snapshot`)
    assert.match(source, /data-hq-content-version/, `${file} must expose the adopted version`)
  }
})

test('preview routes and middleware protection are installed', () => {
  assert.match(read('middleware.ts'), /protectPreviewResponse/)
  assert.match(read('app/api/site-content/preview/route.ts'), /exchangePreview/)
  assert.match(read('app/api/site-content/exit-preview/route.ts'), /PREVIEW_COOKIE/)
})
