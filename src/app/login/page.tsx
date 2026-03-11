"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Github, Lock, Mail, Sparkles, ShieldCheck } from "lucide-react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await signIn("credentials", {
        redirect: false,
        callbackUrl: "/dashboard",
        email,
        password,
      });

      if (res?.error) {
        setError("Invalid email or password");
      } else {
        window.location.href = "/dashboard";
      }
    } catch (err: any) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side: Brand & Visuals */}
      <div className="relative hidden lg:flex flex-col justify-between bg-[#0f7af7] p-12 xl:p-24 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f7af7] via-[#2185f8] to-[#0452ab] opacity-90 z-0"></div>
        
        {/* Decorative Orbs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/10 blur-3xl z-0"></div>
        <div className="absolute bottom-10 -right-10 w-72 h-72 rounded-full bg-cyan-300/20 blur-2xl z-0"></div>
        
        {/* Top Content */}
        <div className="relative z-10 w-full">
          <div className="inline-flex flex-row items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-white backdrop-blur-md shadow-sm">
            <Sparkles className="h-4 w-4 text-cyan-200" />
            <span>AccessNest Secure Gateway</span>
          </div>
          
          <h1 className="mt-12 text-5xl/tight font-extrabold tracking-tight">
            Welcome back to your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-white">smart access</span> dashboard.
          </h1>
          <p className="mt-6 max-w-lg text-lg text-blue-100/90 leading-relaxed font-normal">
            Monitor visitors, manage approvals seamlessly, and oversee site activity from one beautifully secure place.
          </p>
        </div>
        
        {/* Bottom Content */}
        <div className="relative z-10 space-y-5">
          <div className="flex items-center gap-4 rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur-sm transition-transform hover:-translate-y-1 hover:bg-white/10 w-max pr-12">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/20">
              <ShieldCheck className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-base">Enterprise-Grade Security</h3>
              <p className="text-sm text-blue-200 mt-1">Your data is encrypted and secure at all times.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-2xl bg-white/5 border border-white/10 p-5 backdrop-blur-sm transition-transform hover:-translate-y-1 hover:bg-white/10 w-max pr-12">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/20">
              <Lock className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-base">One-Click Approvals</h3>
              <p className="text-sm text-blue-200 mt-1">Streamlined workflows for your entire team.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="relative flex items-center justify-center p-8 sm:p-12 lg:p-16 bg-white overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Sign In</h2>
            <p className="mt-3 text-base text-slate-500 font-medium">
              Access your dashboard to continue.
            </p>
          </div>

          <form className="space-y-6" action="#" method="POST" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-medium border border-red-100">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-slate-700 ml-1">
                Email address
              </label>
              <div className="group relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#0f7af7] transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="name@company.com"
                  suppressHydrationWarning={true}
                  className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/50 py-3.5 pl-12 pr-4 text-sm text-slate-900 shadow-sm outline-none transition-all placeholder:text-slate-400 hover:bg-white focus:bg-white focus:border-[#0f7af7] focus:ring-4 focus:ring-[#0f7af7]/15"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label htmlFor="password" className="text-sm font-semibold text-slate-700">
                  Password
                </label>
                <Link href="/login" className="text-xs font-bold text-[#0f7af7] hover:text-[#085fc3] transition-colors focus:outline-none focus:underline underline-offset-2">
                  Forgot password?
                </Link>
              </div>
              <div className="group relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#0f7af7] transition-colors">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Enter your password"
                  suppressHydrationWarning={true}
                  className="w-full rounded-2xl border border-slate-200/80 bg-slate-50/50 py-3.5 pl-12 pr-4 text-sm text-slate-900 shadow-sm outline-none transition-all placeholder:text-slate-400 hover:bg-white focus:bg-white focus:border-[#0f7af7] focus:ring-4 focus:ring-[#0f7af7]/15"
                />
              </div>
            </div>

            <div className="flex items-center ml-1">
              <label className="relative flex cursor-pointer items-center gap-3 text-sm font-medium text-slate-600">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  className="peer sr-only"
                />
                <div className="h-5 w-5 rounded border border-slate-300 bg-white shadow-sm transition-all peer-checked:border-[#0f7af7] peer-checked:bg-[#0f7af7] peer-focus-visible:ring-2 peer-focus-visible:ring-[#0f7af7] flex items-center justify-center">
                  <svg className="h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                Keep me logged in
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#0f7af7] to-[#0a66d1] px-4 py-4 text-sm font-bold text-white shadow-[0_8px_20px_rgba(15,122,247,0.3)] transition-all hover:scale-[1.01] hover:shadow-[0_12px_25px_rgba(15,122,247,0.4)] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0" />
              <span className="relative flex items-center justify-center gap-2">
                {loading ? "Signing in..." : "Continue to Dashboard"}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </button>
          </form>

          <div className="my-8 flex items-center gap-4">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Or continue with</span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent via-slate-200 to-transparent" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
              className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200/80 bg-white px-4 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 hover:shadow"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200/80 bg-white px-4 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 hover:shadow"
            >
              <Github className="h-5 w-5 text-slate-900" />
              GitHub
            </button>
          </div>

          <p className="mt-10 text-center text-sm font-medium text-slate-600">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-[#0f7af7] hover:text-[#085fc3] font-bold underline decoration-2 underline-offset-4 transition-colors">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

