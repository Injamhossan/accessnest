import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
        <Link href="/" className="inline-flex items-center text-sm font-semibold text-[#0f7af7] mb-8 hover:underline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
        
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Refund Policy</h1>
        <p className="text-slate-500 font-medium mb-12">Last Updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-8 text-slate-600 leading-relaxed font-medium">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">1. General Information</h2>
            <p>
              Thank you for purchasing digital products from Access Nest. Due to the nature of digital goods, software, and subscriptions, we have specific guidelines detailing when refunds can be processed. Please read this policy carefully before making a purchase.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">2. Digital Products Condition</h2>
            <p>
              For all digital products (such as UI kits, software keys, subscriptions), <strong>all sales are generally considered final</strong>. Once a digital product has been downloaded or a license key has been accessed, we cannot process a standard refund.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">3. Exceptional Circumstances for Refunds</h2>
            <p>We do honor refund requests if they fall under the following specific circumstances:</p>
            <ul className="list-disc pl-5 mt-4 space-y-2">
              <li><strong>Non-delivery of the product:</strong> Due to an issue with our mail or server, you do not receive a delivery email, and the download/license is not accessible via your Dashboard.</li>
              <li><strong>Download issues:</strong> You experience persistent problems that prevent you from downloading the product. (However, we recommend contacting our support first for assistance).</li>
              <li><strong>Major defects:</strong> The product has a critical technical issue, and we are unable to resolve the issue within 48 hours.</li>
              <li><strong>Product not-as-described:</strong> The product details on our site significantly misrepresent the actual item provided.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">4. Timeframe for Refund Requests</h2>
            <p>
              If your claim meets any of the conditions mentioned in Section 3, you must submit your refund request within <strong>7 days</strong> from the date of purchase. Any requests submitted beyond this period will not be considered.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">5. Processing Details</h2>
            <p>
              Approved refunds are processed via the original payment method and may take up to <strong>7-10 business days</strong> to appear in your account, depending on your bank or payment gateway.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">6. Contact Us</h2>
            <p>
              If you have any questions about our Returns and Refunds Policy, please contact us by email: <strong>accessnestbd@gmail.com</strong>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
