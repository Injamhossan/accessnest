import { ShieldCheck, Lock, CreditCard } from "lucide-react";

export default function TrustSection() {
  return (
    <section className="py-16 bg-slate-50">
      <article className="container mx-auto px-6">
        <header>
          <p className="text-center text-slate-400 text-sm font-medium tracking-wider uppercase mb-10">Trusted & Secure Subscriptions</p>
        </header>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto list-none p-0">
          <li className="flex flex-col items-center text-center gap-4">
            <figure className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-slate-700 mb-2">
              <ShieldCheck className="w-7 h-7" />
            </figure>
            <hgroup>
              <h3 className="text-lg font-semibold text-slate-900">100% Genuine Licenses</h3>
              <p className="text-slate-500 text-sm max-w-[250px] mx-auto">Every resource & software offered is directly partnered or official.</p>
            </hgroup>
          </li>
          <li className="flex flex-col items-center text-center gap-4">
            <figure className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-slate-700 mb-2">
              <Lock className="w-7 h-7" />
            </figure>
            <hgroup>
              <h3 className="text-lg font-semibold text-slate-900">Secure Delivery</h3>
              <p className="text-slate-500 text-sm max-w-[250px] mx-auto">Instant, encrypted delivery to your email or dashboard effortlessly.</p>
            </hgroup>
          </li>
          <li className="flex flex-col items-center text-center gap-4">
            <figure className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-slate-700 mb-2">
              <CreditCard className="w-7 h-7" />
            </figure>
            <hgroup>
              <h3 className="text-lg font-semibold text-slate-900">Safe Payments</h3>
              <p className="text-slate-500 text-sm max-w-[250px] mx-auto">SSL-encrypted fast checkout supporting cards, crypto, and wallets.</p>
            </hgroup>
          </li>
        </ul>
      </article>
    </section>
  );
}
