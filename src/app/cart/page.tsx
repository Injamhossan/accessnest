import Link from "next/link";
import { Minus, Plus, ShieldCheck, ShoppingCart, Trash2 } from "lucide-react";

const cartItems = [
  {
    name: "Cloud Storage Pro",
    plan: "Starter Plan",
    price: 9,
    qty: 1,
  },
  {
    name: "AI Assistant Plus",
    plan: "Team Plan",
    price: 19,
    qty: 1,
  },
];

export default function CartPage() {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const serviceFee = 3;
  const total = subtotal + serviceFee;

  return (
    <main className="min-h-screen px-4 py-10 sm:py-12">
      <section className="mx-auto grid w-full max-w-7xl gap-5 lg:grid-cols-[1.3fr_0.8fr]">
        <article className="rounded-3xl border border-white/80 bg-white/70 p-5 shadow-[0_14px_60px_rgba(16,33,48,0.1)] backdrop-blur-xl sm:p-8">
          <header className="mb-6 flex items-start justify-between gap-3">
            <div>
              <p className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold tracking-wide text-blue-700">
                Shopping Cart
              </p>
              <h1 className="mt-3 text-3xl font-bold text-slate-900">Review your order</h1>
              <p className="mt-1 text-sm text-slate-600">
                Confirm plans and continue to secure checkout.
              </p>
            </div>
            <ShoppingCart className="h-8 w-8 text-slate-300" />
          </header>

          <ul className="space-y-3">
            {cartItems.map((item) => (
              <li key={item.name} className="list-none rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">{item.name}</h2>
                    <p className="text-sm text-slate-500">{item.plan}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-slate-500">Price</p>
                    <p className="text-lg font-bold text-slate-900">${item.price}/mo</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-2 py-1.5 text-slate-700">
                    <button type="button" className="rounded-md p-1 hover:bg-slate-200" aria-label="Decrease quantity">
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="min-w-8 text-center text-sm font-semibold">{item.qty}</span>
                    <button type="button" className="rounded-md p-1 hover:bg-slate-200" aria-label="Increase quantity">
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
            <p>Want to add more products?</p>
            <Link href="/search" className="font-semibold text-[#0f7af7] hover:text-[#085fc3]">
              Continue shopping
            </Link>
          </div>
        </article>

        <aside className="rounded-3xl border border-white/80 bg-white/70 p-5 shadow-[0_14px_60px_rgba(16,33,48,0.1)] backdrop-blur-xl sm:p-6">
          <h2 className="text-xl font-bold text-slate-900">Order summary</h2>

          <div className="mt-5 space-y-3 text-sm">
            <div className="flex items-center justify-between text-slate-600">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-800">${subtotal}</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Service fee</span>
              <span className="font-semibold text-slate-800">${serviceFee}</span>
            </div>
            <div className="h-px bg-slate-200" />
            <div className="flex items-center justify-between text-base font-bold text-slate-900">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>

          <button
            type="button"
            className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-linear-to-r from-[#0f7af7] to-[#0a66d1] px-4 py-3 text-sm font-semibold text-white transition hover:to-[#085fc3]"
          >
            Proceed to Checkout
          </button>

          <p className="mt-4 inline-flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            Secure payment with encrypted checkout
          </p>

          <Link
            href="/login"
            className="mt-4 inline-flex w-full justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Sign in before checkout
          </Link>
        </aside>
      </section>
    </main>
  );
}
