import { Plus } from "lucide-react";

export default function FAQSection() {
  const faqs = [
    {
      question: "How do I access my purchased digital products?",
      answer: "Once your secure checkout is complete, you will immediately receive an email with download links and license keys. You can also access everything anytime from your user dashboard under the 'Library' tab."
    },
    {
      question: "Are the software licenses permanent?",
      answer: "It depends on the specific product. We clearly mark whether a software package is a lifetime license, a yearly subscription, or a monthly recurring plan on the product page."
    },
    {
      question: "Can I get a refund if the software doesn't work?",
      answer: "Yes, we offer a 14-day money-back guarantee on all purchases if the product is fundamentally defective or does not match its description. Our support team is always available to help."
    },
    {
      question: "Are the payments truly secure?",
      answer: "Absolutely. We use bank-level 256-bit SSL encryption. We never store your credit card data directly, processing everything through verified partners like Stripe and PayPal."
    }
  ];

  return (
    <section id="faq" className="py-16 md:py-24 mx-auto w-full max-w-7xl px-4">
      <header className="mb-12 text-center">
        <h2 className="text-3xl font-extrabold text-slate-900 md:text-5xl tracking-tight mb-4">
          Frequently Asked <span className="text-blue-600">Questions</span>
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto md:text-lg">
          Everything you need to know about purchasing, licensing, and managing your digital resources.
        </p>
      </header>

      <ul className="mx-auto max-w-3xl space-y-4">
        {faqs.map((faq, idx) => (
          <li key={idx} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-sky-200 hover:shadow-md cursor-pointer">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                {faq.question}
              </h3>
              <button className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-500 group-hover:bg-sky-50 group-hover:text-sky-600 transition-colors shrink-0">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            {/* Displaying answer as visible for now, normally it would be an accordion */}
            <p className="mt-4 text-sm leading-relaxed text-slate-600 pr-8">
              {faq.answer}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
