import Link from "next/link";
import { Twitter, Instagram, Linkedin, Github } from "lucide-react";
import Image from "next/image";
import navLogo from "@/assets/navlogo.png";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <article className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 lg:gap-16">
          <header className="md:col-span-1 space-y-4">
            <Link href="/" className="inline-block">
               <Image 
                 src={navLogo} 
                 alt="Access Nest Logo" 
                 width={100} 
                 height={32} 
                 className="object-contain h-8 w-auto opacity-90"
               />
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              Your premium destination for secure, top-tier digital subscriptions and verified software licenses.
            </p>
            <nav aria-label="Social Links" className="flex items-center gap-4 pt-2">
              <Link href="#" className="text-slate-400 hover:text-sky-600 transition-colors">
                 <span className="sr-only">Twitter</span>
                 <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-sky-600 transition-colors">
                 <span className="sr-only">Instagram</span>
                 <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-sky-600 transition-colors">
                 <span className="sr-only">LinkedIn</span>
                 <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-sky-600 transition-colors">
                 <span className="sr-only">Github</span>
                 <Github className="h-5 w-5" />
              </Link>
            </nav>
          </header>

          <aside className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
            <nav aria-label="Product Links" className="space-y-4">
               <h3 className="font-bold text-slate-900 tracking-wide uppercase text-xs">Products</h3>
               <ul className="space-y-3 font-medium text-slate-500 list-none p-0">
                  <li><Link href="#" className="hover:text-sky-600 transition-colors">Cloud Storage</Link></li>
                  <li><Link href="#" className="hover:text-sky-600 transition-colors">AI Assistants</Link></li>
                  <li><Link href="#" className="hover:text-sky-600 transition-colors">Creative Software</Link></li>
                  <li><Link href="#" className="hover:text-sky-600 transition-colors">Top Sellers</Link></li>
               </ul>
            </nav>

            <nav aria-label="Company Links" className="space-y-4">
               <h3 className="font-bold text-slate-900 tracking-wide uppercase text-xs">Company</h3>
               <ul className="space-y-3 font-medium text-slate-500 list-none p-0">
                  <li><Link href="#" className="hover:text-sky-600 transition-colors">About Us</Link></li>
                  <li><Link href="#" className="hover:text-sky-600 transition-colors">How it Works</Link></li>
                  <li><Link href="#" className="hover:text-sky-600 transition-colors">Verified Partnerships</Link></li>
                  <li><Link href="#" className="hover:text-sky-600 transition-colors">Contact Support</Link></li>
               </ul>
            </nav>

            <nav aria-label="Legal Links" className="space-y-4">
               <h3 className="font-bold text-slate-900 tracking-wide uppercase text-xs">Legal</h3>
               <ul className="space-y-3 font-medium text-slate-500 list-none p-0">
                  <li><Link href="/privacy-policy" className="hover:text-sky-600 transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/terms-and-conditions" className="hover:text-sky-600 transition-colors">Terms of Conditions</Link></li>
                  <li><Link href="#" className="hover:text-sky-600 transition-colors">Refund Policy</Link></li>
               </ul>
            </nav>
          </aside>
        </div>

        <section className="mt-12 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-slate-100 pt-8 text-xs font-semibold text-slate-400">
          <p>&copy; {new Date().getFullYear()} AccessNest. All rights reserved.</p>
          <ul className="flex items-center gap-6 list-none p-0 m-0">
             <li>Secure SSL Checkout</li>
             <li>24/7 Support</li>
          </ul>
        </section>
      </article>
    </footer>
  );
}
