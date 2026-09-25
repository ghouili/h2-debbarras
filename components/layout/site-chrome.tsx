"use client";

import type React from "react";
import { usePathname } from "next/navigation";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileBar } from "@/components/layout/mobile-bar";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { CookieBanner } from "@/components/seo/cookie-banner.client";

/**
 * Renders the standard site chrome (header, footer, mobile bar, cookie banner)
 * for the main site, but hides it on the Google Ads landing pages (/lp/*) and
 * the /merci confirmation page, which provide their own simplified chrome.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdsRoute =
    pathname?.startsWith("/lp") || pathname === "/merci";

  if (isAdsRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="min-h-screen w-full pt-16 md:pt-20 pb-20 md:pb-0">
        {children}
      </main>
      <Footer />
      <MobileBar />
      <CookieBanner />
    </>
  );
}
