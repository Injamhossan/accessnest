import Image from "next/image";
import Link from "next/link";
import { Search, ShoppingCart, User } from "lucide-react";
import navLogo from "@/assets/navlogo.png";

export default function Navbar() {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 w-full max-w-7xl px-4 z-50">
      <nav className="flex items-center justify-between px-6 py-3 md:px-8 md:py-4 rounded-full bg-white/70 backdrop-blur-md border border-black/10 shadow-sm transition-all duration-300 hover:shadow-md">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src={navLogo} 
            alt="Access Nest Logo" 
            width={120} 
            height={40} 
            className="object-contain h-8 w-auto md:h-10"
            priority
          />
        </Link>
        
        {/* Icons / Route Links */}
        <div className="flex items-center gap-6 text-zinc-600">
          <Link href="/search" className="flex items-center gap-2 hover:text-black transition-colors group">
            <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline font-medium text-sm">Search</span>
          </Link>
          <Link href="/cart" className="flex items-center gap-2 hover:text-black transition-colors group">
            <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline font-medium text-sm">Cart</span>
          </Link>
          <Link href="/user" className="flex items-center gap-2 hover:text-black transition-colors group">
            <User className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline font-medium text-sm">User</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
