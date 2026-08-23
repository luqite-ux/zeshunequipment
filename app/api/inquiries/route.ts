import {
  createSupabaseCaptchaContextFromEnv,
  verifyCaptchaSubmission,
} from '@/lib/inquiry-captcha'

export const dynamic = 'force-dynamic'

const NO_STORE_HEADERS = { 'Cache-Control': 'no-store, max-age=0' }

type InquiryBody = {
  name?: unknown
  email?: unknown
  phone?: unknown
  company?: unknown
  subject?: unknown
  message?: unknown
  captchaScope?: unknown
  captchaToken?: unknown
  captchaAnswer?: unknown
}

function text(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

export async function POST(request: Request) {
  const json = await request.json().catch(() => null) as InquiryBody | null
  const captchaSecret = process.env.CAPTCHA_SECRET?.trim()
  if (!captchaSecret) {
    return Response.json(
      { message: 'Verification service is temporarily unavailable.' },
      { status: 503, headers: NO_STORE_HEADERS },
    )
  }

  try {
    const captcha = await verifyCaptchaSubmission({
      secret: captchaSecret,
      ...createSupabaseCaptchaContextFromEnv(),
      scope: text(json?.captchaScope, 160),
      token: text(json?.captchaToken, 4096),
      answer: text(json?.captchaAnswer, 16),
    })
    if (!captcha.ok) {
      return Response.json(
        { message: 'The verification code is incorrect or expired. Please try again.' },
        { status: 400, headers: NO_STORE_HEADERS },
      )
    }
  } catch {
    return Response.json(
      { message: 'Verification service is temporarily unavailable.' },
      { status: 503, headers: NO_STORE_HEADERS },
    )
  }

  const tenantId = process.env.NEXT_PUBLIC_TENANT_ID?.trim() ?? ''
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/\/+$/, '') ?? ''
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ?? ''
  const inquiry = {
    tenant_id: tenantId,
    name: text(json?.name, 200),
    email: text(json?.email, 320),
    phone: text(json?.phone, 80) || null,
    company: text(json?.company, 200) || null,
    subject: text(json?.subject, 300) || null,
    message: text(json?.message, 10_000),
  }
  if (
    !tenantId || !supabaseUrl || !serviceRoleKey || !inquiry.name || !inquiry.message
    || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email)
  ) {
    return Response.json(
      { message: 'Please complete all required inquiry fields.' },
      { status: 400, headers: NO_STORE_HEADERS },
    )
  }

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/inquiries`, {
      method: 'POST',
      headers: {
        apikey: serviceRoleKey,
        authorization: `Bearer ${serviceRoleKey}`,
        'content-type': 'application/json',
        prefer: 'return=minimal',
      },
      body: JSON.stringify(inquiry),
      cache: 'no-store',
    })
    if (!response.ok) throw new Error(`Inquiry persistence failed with HTTP ${response.status}`)
    return Response.json({ message: 'Inquiry submitted.' }, { status: 201, headers: NO_STORE_HEADERS })
  } catch {
    return Response.json(
      { message: 'Submission failed. Please try again.' },
      { status: 503, headers: NO_STORE_HEADERS },
    )
  }
}
