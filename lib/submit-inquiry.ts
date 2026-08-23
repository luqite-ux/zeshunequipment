export type InquiryPayload = {
  name: string
  email: string
  phone?: string
  company?: string
  subject?: string
  message: string
  captchaScope: string
  captchaToken: string
  captchaAnswer: string
}

export async function submitInquiry(payload: InquiryPayload): Promise<{ ok: boolean; error?: string }> {
  try {
    const response = await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const body = await response.json().catch(() => null) as { message?: string } | null
    if (!response.ok) {
      return { ok: false, error: body?.message || 'Submission failed. Please try again.' }
    }
    return { ok: true }
  } catch {
    return { ok: false, error: 'Submission failed. Please try again.' }
  }
}
