import type { Metadata } from "next";
import Script from "next/script";

import { Roboto } from "next/font/google";
import localFont from "next/font/local";
import WrapperLayout from "@/components/WrapperLayout";
import "./globals.css";

const roboto = Roboto({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

const banglaFont = localFont({
  src: "../assets/fonts/bangla.ttf",
  variable: "--font-bangla",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://accessnest.tech"),
  title: {
    default: "Access Nest | Premium Digital Products & Assets Marketplace",
    template: "%s | Access Nest"
  },
  description: "The ultimate destination for high-quality digital products. Explore premium software, UI kits, design assets, and development tools at Access Nest. Empowering creators and developers with professional-grade assets.",
  keywords: ["digital products", "marketplace", "UI kits", "software", "design assets", "development tools", "Access Nest"],
  authors: [{ name: "Access Nest Team" }],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },

  openGraph: {
    title: "Access Nest | Premium Digital Products & Assets Marketplace",
    description: "Discover the best digital products for your next project. Software, UI kits, and more.",
    url: "https://accessnest.tech",
    siteName: "Access Nest",
    locale: "en_US",
    type: "website",
  },
};


import Providers from "@/components/Providers";
import { Analytics } from "@vercel/analytics/react";
import FacebookPixel from "@/components/FacebookPixel";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${banglaFont.variable} font-sans antialiased min-h-screen flex flex-col bg-slate-50`}
      >
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>
        )}
        <Providers>

          <FacebookPixel />
          <div className="relative flex-1 flex flex-col">
            <WrapperLayout>
              {children}
            </WrapperLayout>
          </div>
        </Providers>

        <Analytics />
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
              `,
            }}
          />
        )}
      </body>

    </html>
  );
}
