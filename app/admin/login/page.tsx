import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Customer Admin Login',
  robots: { index: false, follow: false },
}

export default async function AdminLogin({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; reason?: string }>
}) {
  const { error, reason } = await searchParams
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-950 px-4 py-16">
      <section className="w-full max-w-md rounded-2xl border border-white/10 bg-white p-8 shadow-2xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-amber-600">Zeshun Equipment</p>
        <h1 className="mt-3 text-3xl font-bold text-neutral-950">Customer Admin Login</h1>
        <p className="mt-3 text-sm leading-6 text-neutral-600">
          Manage products, articles, inquiries and website settings.
        </p>
        <form action="/api/auth/login" method="post" className="mt-8 space-y-5">
          <label className="block text-sm font-semibold text-neutral-900" htmlFor="admin-email">
            Email
            <input id="admin-email" name="email" type="email" autoComplete="username" maxLength={254} required className="mt-2 min-h-12 w-full rounded-lg border border-neutral-300 px-4 font-normal" />
          </label>
          <label className="block text-sm font-semibold text-neutral-900" htmlFor="admin-password">
            Password
            <input id="admin-password" name="password" type="password" autoComplete="current-password" maxLength={200} required className="mt-2 min-h-12 w-full rounded-lg border border-neutral-300 px-4 font-normal" />
          </label>
          {(error || reason) && (
            <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-800">
              {error === 'unavailable' ? 'Login is temporarily unavailable. Please try again.' : 'Email, password or account access was not accepted.'}
            </p>
          )}
          <button type="submit" className="min-h-12 w-full rounded-lg bg-amber-500 px-6 font-semibold text-neutral-950 transition hover:bg-amber-400">
            Sign In
          </button>
        </form>
      </section>
    </main>
  )
}
