import Link from "next/link";
import { ArrowRight, Github, Lock, Mail, User } from "lucide-react";

export default function SignupPage() {
  return (
    <main className="min-h-screen px-4 py-12 sm:py-16">
      <section className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/70 bg-white/70 shadow-[0_14px_60px_rgba(16,33,48,0.12)] backdrop-blur-xl lg:grid-cols-[1fr_1.05fr]">
        <div className="hidden bg-linear-to-br from-[#0b4e9c] via-[#0f7af7] to-[#27a2ff] p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="inline-flex rounded-full border border-white/35 px-3 py-1 text-xs font-semibold tracking-wide text-white/90">
              AccessNest New Account
            </p>
            <h1 className="mt-6 text-4xl font-bold leading-tight">
              Create your account and start managing access faster.
            </h1>
            <p className="mt-4 max-w-md text-sm text-blue-100">
              Add your team, automate approvals, and keep every entry tracked in
              one secure workspace.
            </p>
          </div>
          <ul className="space-y-3 text-sm text-blue-50/95">
            <li>Centralized visitor records</li>
            <li>Role-based controls for teams</li>
            <li>Built-in security and transparency</li>
          </ul>
        </div>

        <div className="p-7 sm:p-10">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-900">Create account</h2>
            <p className="mt-2 text-sm text-slate-500">
              It only takes a minute to get started.
            </p>
          </div>

          <form className="space-y-4" action="#" method="POST">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label
                  htmlFor="fullName"
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  Full name
                </label>
                <div className="group relative">
                  <User className="pointer-events-none absolute left-3.5 top-1/2 size-4.5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-[#0f7af7]" />
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none ring-[#0f7af7]/20 transition placeholder:text-slate-400 focus:border-[#0f7af7] focus:ring-4"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  Work email
                </label>
                <div className="group relative">
                  <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4.5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-[#0f7af7]" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="name@company.com"
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none ring-[#0f7af7]/20 transition placeholder:text-slate-400 focus:border-[#0f7af7] focus:ring-4"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  Password
                </label>
                <div className="group relative">
                  <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4.5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-[#0f7af7]" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    minLength={8}
                    placeholder="At least 8 characters"
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none ring-[#0f7af7]/20 transition placeholder:text-slate-400 focus:border-[#0f7af7] focus:ring-4"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  Confirm password
                </label>
                <div className="group relative">
                  <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4.5 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-[#0f7af7]" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    minLength={8}
                    placeholder="Re-enter password"
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none ring-[#0f7af7]/20 transition placeholder:text-slate-400 focus:border-[#0f7af7] focus:ring-4"
                  />
                </div>
              </div>
            </div>

            <label className="mt-1 inline-flex items-start gap-2 text-sm text-slate-600">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="mt-0.5 size-4 rounded border-slate-300 text-[#0f7af7]"
              />
              <span>
                I agree to the{" "}
                <Link
                  href="/signup"
                  className="font-medium text-[#0f7af7] hover:underline"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/signup"
                  className="font-medium text-[#0f7af7] hover:underline"
                >
                  Privacy Policy
                </Link>
                .
              </span>
            </label>

            <button
              type="submit"
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#0f7af7] to-[#0a66d1] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-300/40 transition hover:-translate-y-px hover:to-[#085fc3]"
            >
              Create account
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="my-7 flex items-center gap-3 text-xs uppercase tracking-wide text-slate-400">
            <span className="h-px flex-1 bg-slate-200" />
            Or sign up with
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
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#0f7af7] hover:text-[#085fc3] hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
