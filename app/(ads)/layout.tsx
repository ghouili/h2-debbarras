import type React from "react";
import type { Metadata } from "next";

import { LandingHeader } from "@/components/layout/landing-header";
import { LandingFooter } from "@/components/layout/landing-footer";

// All Ads landing pages are noindex by default (overridable per page).
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <LandingHeader />
      <main className="min-h-screen w-full">{children}</main>
      <LandingFooter />
    </>
  );
}
