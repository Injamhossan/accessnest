"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode, useEffect } from "react";
import { useLangStore } from "@/store/langStore";

export default function Providers({ children }: { children: ReactNode }) {
  const { lang } = useLangStore();

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return <SessionProvider>{children}</SessionProvider>;
}
