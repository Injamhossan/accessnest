import Link from "next/link";
import { ArrowRight, Github, Lock, Mail } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="min-h-screen px-4 py-12 sm:py-16">
      <section className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/70 bg-white/70 shadow-[0_14px_60px_rgba(16,33,48,0.12)] backdrop-blur-xl lg:grid-cols-[1.05fr_1fr]">
        <div className="hidden bg-linear-to-br from-[#0f7af7] via-[#1068cb] to-[#0b4e9c] p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="inline-flex rounded-full border border-white/30 px-3 py-1 text-xs font-semibold tracking-wide text-white/90">
              AccessNest Secure Login
            </p>
            <h1 className="mt-6 text-4xl font-bold leading-tight">
              Welcome back to your smart access dashboard.
            </h1>
            <p className="mt-4 max-w-md text-sm text-blue-100">
              Monitor visitors, approvals, and site activity from one secure place.
            </p>
          </div>
          <ul className="space-y-3 text-sm text-blue-50/95">
            <li>Real-time visitor flow visibility</li>
            <li>One-click approvals for teams</li>
            <li>Security-first records and audit logs</li>
          </ul>
        </div>

        <div className="p-7 sm:p-10">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900">Sign in</h2>
            <p className="mt-2 text-sm text-slate-500">
              Use your account details to continue.
            </p>
          </div>

          <form className="space-y-5" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-medium text-slate-700"
              >
                Email address
              </label>
              <div className="group relative">
                <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4.5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-[#0f7af7]" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none ring-[#0f7af7]/20 transition placeholder:text-slate-400 focus:border-[#0f7af7] focus:ring-4"
                />
              </div>
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700"
                >
                  Password
                </label>
                <Link
                  href="/login"
                  className="text-xs font-semibold text-[#0f7af7] hover:text-[#085fc3]"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="group relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4.5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-[#0f7af7]" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none ring-[#0f7af7]/20 transition placeholder:text-slate-400 focus:border-[#0f7af7] focus:ring-4"
                />
              </div>
            </div>

            <label className="inline-flex items-center gap-2 text-sm text-slate-600">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className="size-4 rounded border-slate-300 text-[#0f7af7]"
              />
              Keep me logged in on this device
            </label>

            <button
              type="submit"
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#0f7af7] to-[#0a66d1] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-300/40 transition hover:-translate-y-px hover:to-[#085fc3]"
            >
              Continue to dashboard
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="my-7 flex items-center gap-3 text-xs uppercase tracking-wide text-slate-400">
            <span className="h-px flex-1 bg-slate-200" />
            Or sign in with
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </button>
            <button
              type="button"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              <Github className="h-5 w-5 text-slate-800" />
              GitHub
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-slate-600">
            New to AccessNest?{" "}
            <Link
              href="/signup"
              className="font-semibold text-[#0f7af7] hover:text-[#085fc3] hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
