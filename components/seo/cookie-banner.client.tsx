"use client";

import dynamic from "next/dynamic";

const CookieBanner = dynamic(
  () => import("@/components/seo/cookie-banner").then((m) => m.CookieBanner),
  { ssr: false },
);

export { CookieBanner };
