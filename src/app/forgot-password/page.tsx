"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, ShieldCheck } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSent(true);
      } else {
        setError(data.error || "Failed to send reset link.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <div className="w-full max-w-md bg-white p-10 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-slate-900"></div>

        <div className="mb-8 overflow-hidden">
           <Link href="/login" className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors group">
              <ArrowLeft className="h-3 w-3 mr-1.5 transition-transform group-hover:-translate-x-1" />
              Back to login
           </Link>
        </div>

        <div className="mb-10 text-center">
          <h2 className="text-2xl font-semibold text-slate-900">Forgot Password?</h2>
          <p className="mt-2 text-sm text-slate-500">
            {isSent 
              ? "Check your inbox for a reset link." 
              : "Enter your email to receive a password reset link."}
          </p>
        </div>

        {!isSent ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-medium text-slate-700 ml-0.5">
                Email address
              </label>
              <div className="group relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-slate-900 transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full rounded-md border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5"
                />
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-500 text-center font-medium">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 py-2.5 rounded-md text-sm font-semibold text-white transition-all hover:bg-slate-800 active:scale-[0.98] disabled:opacity-70"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        ) : (
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 text-blue-600 rounded-full mb-2">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <p className="text-sm text-slate-600 leading-relaxed px-4">
              We&apos;ve sent a password reset link to <span className="font-bold text-slate-900">{email}</span>. Please follow the instructions in the email.
            </p>
            <button
              onClick={() => setIsSent(false)}
              className="text-sm font-semibold text-slate-900 hover:opacity-70 transition-opacity"
            >
              Did not receive? Resend
            </button>
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">
               AccessNest Security Team
            </p>
        </div>
      </div>
    </main>
  );
}
