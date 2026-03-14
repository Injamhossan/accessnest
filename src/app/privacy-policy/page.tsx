import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Access Nest",
  description: "Our privacy policy explains how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 border-b border-slate-100 pb-8">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-slate-500 font-medium">Last updated: March 12, 2026</p>
        </header>

        <article className="prose prose-slate prose-blue max-w-none space-y-8 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Introduction</h2>
            <p>
              Welcome to <strong>Access Nest</strong>. We value your privacy and are committed to protecting your personal data. 
              This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website 
              (www.accessnest.tech) and purchase digital products.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Information We Collect</h2>
            <p className="mb-4">We collect information that you provide directly to us when you:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Create an account or profile.</li>
              <li>Make a purchase (Digital products, subscriptions, etc.).</li>
              <li>Sign up for our newsletter.</li>
              <li>Contact our support team.</li>
            </ul>
            <p className="mt-4 font-semibold text-slate-900 italic">Data collected includes:</p>
            <p>Name, email address, payment information (processed via secure partners), and account credentials.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. How We Use Your Information</h2>
            <p className="mb-4">We use the collected data to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Process your transactions and deliver digital assets.</li>
              <li>Provide customer support and resolve technical issues.</li>
              <li>Send transaction emails and updates about your orders.</li>
              <li>Improve our website performance and user experience.</li>
              <li>Verify accounts and ensure security against fraud.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Cookies and Tracking</h2>
            <p>
              We use standard tracking tools like <strong>Google Tag Manager</strong> and <strong>Meta Pixel</strong> to understand site traffic 
              and improve our marketing efforts. Cookies help us remember your cart items and keep you logged in. You can manage cookie 
              preferences in your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Data Sharing and Security</h2>
            <p>
              We <strong>do not sell</strong> your personal data to third parties. We only share information with trusted service providers 
              (like payment gateways and email services) necessary to fulfill your orders. All data is protected with bank-level SSL encryption.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal information. You can manage your data directly from your 
              <Link href="/dashboard/profile" className="text-blue-600 font-bold hover:underline mx-1">User Dashboard</Link> 
              or contact us for assistance.
            </p>
          </section>

          <section className="bg-slate-50 p-8 rounded-2xl border border-slate-100 mt-12">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Contact Us</h2>
            <p className="text-sm">
              If you have any questions about this Privacy Policy, please contact us at <a href="mailto:accessnestbd@gmail.com" className="text-sky-600 font-bold hover:underline">accessnestbd@gmail.com</a>.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="text-sm font-bold text-blue-600 hover:underline">Support Helpdesk</Link>
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
