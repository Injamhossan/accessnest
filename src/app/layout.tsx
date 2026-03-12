import type { Metadata } from "next";
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
  title: "Access Nest",
  description: "Access Nest",
};

import Providers from "@/components/Providers";
import { Analytics } from "@vercel/analytics/react";

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
        <Providers>
          <div className="relative flex-1 flex flex-col">
            <WrapperLayout>
              {children}
            </WrapperLayout>
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
