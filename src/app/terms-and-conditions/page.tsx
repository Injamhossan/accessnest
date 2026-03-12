import Link from "next/link";

export const metadata = {
  title: "Terms and Conditions | Access Nest",
  description: "Read our terms and conditions to understand your rights and responsibilities when using Access Nest.",
};

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 border-b border-slate-100 pb-8">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Terms and Conditions</h1>
          <p className="text-slate-500 font-medium">Last updated: March 13, 2026</p>
        </header>

        <article className="prose prose-slate prose-blue max-w-none space-y-8 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using <strong>Access Nest</strong> (www.accessnest.tech), you agree to be bound by these Terms and Conditions. 
              If you do not agree with any part of these terms, you must not use our website or purchase any digital products.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Digital Products and Licenses</h2>
            <p className="mb-4">All products sold on Access Nest are digital assets. Purchasing a product grants you a non-exclusive, non-transferable license to use the asset according to its specific product description.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Product delivery is automated and occurs via email and user dashboard instantly after payment.</li>
              <li>Redistribution or reselling of purchased assets is strictly prohibited unless specified otherwise.</li>
              <li>Licenses are valid only for the intended number of users/sites as described on the product page.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Guest Checkout and Accounts</h2>
            <p>
              Users may purchase products without creating an account (Guest Checkout). However, <strong>creating an account is highly recommended</strong>. 
              Registered users can access their purchase history, download links, and license keys permanently from their dashboard. 
              Guest users must rely on the email sent at the time of purchase.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Payment and Pricing</h2>
            <p>
              All prices are listed in BDT (or USD where applicable). We reserve the right to change prices at any time without notice. 
              Payments are processed through secure third-party gateways. Access Nest does not store sensitive card information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Refund Policy</h2>
            <p>
              Due to the nature of digital goods, refunds are generally not provided once a product has been accessed or downloaded. 
              However, if a product is fundamentally defective or not as described, you may request a refund within 14 days of purchase.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Limitation of Liability</h2>
            <p>
              Access Nest is not liable for any direct, indirect, or incidental damages resulting from the use or inability to use 
              purchased digital assets. We do not guarantee that all software assets will be compatible with all future hardware or software environments.
            </p>
          </section>

          <section className="bg-blue-50 p-8 rounded-2xl border border-blue-100 mt-12">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Legal Help?</h2>
            <p className="text-sm">
              If you have any questions about these Terms, please contact our legal department:
            </p>
            <div className="mt-4 flex flex-col sm:flex-row gap-4">
              <span className="text-sm font-bold text-slate-600">Email: legal@accessnest.tech</span>
              <Link href="/contact" className="text-sm font-bold text-blue-600 hover:underline">Support Center</Link>
            </div>
          </section>
        </article>

        <footer className="mt-16 pt-8 border-t border-slate-100 flex justify-between items-center">
          <Link href="/" className="text-sm font-bold text-slate-500 hover:text-blue-600 flex items-center gap-2">
            &larr; Back to Home
          </Link>
          <p className="text-[10px] uppercase font-black tracking-widest text-slate-300">Access Nest Legal Team</p>
        </footer>
      </div>
    </main>
  );
}
