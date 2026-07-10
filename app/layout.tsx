import type React from "react";
import type { Metadata } from "next";
import { Noto_Serif, Source_Code_Pro } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { SiteChrome } from "@/components/layout/site-chrome";
import { GoogleTags } from "@/components/analytics/google-tags";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/config";

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  // `optional` keeps the web font off the LCP critical path: text paints
  // immediately in next/font's metric-matched fallback (CLS stays 0) and the
  // real font applies once cached. The hero subtitle (the mobile LCP element)
  // uses this font, so this is the main LCP lever.
  display: "optional",
  variable: "--font-source-code-pro",
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "optional",
  variable: "--font-noto-serif",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "débarras",
    "débarras maison",
    "débarras appartement",
    "débarras Île-de-France",
    "débarras Paris",
    "vide maison",
    "succession",
    "déménagement",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  metadataBase: new URL(siteConfig.url),
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <meta
          name="google-site-verification"
          content="OsCAUbqCBXdTlYGiG324nqiW2UONStmLcIWdcg2N8xM"
        />
        {/* dataLayer + gtag stub — defined early so analytics events queue
            (instead of dropping) until the Google tags are loaded on first
            interaction by <GoogleTags />. Negligible cost, no main-thread work. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}`,
          }}
        />

        <JsonLd type="organization" />
      </head>
      <body
        className={`${sourceCodePro.variable} ${notoSerif.variable} font-body antialiased text-foreground bg-background relative`}
        suppressHydrationWarning
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <SiteChrome>{children}</SiteChrome>
        <GoogleTags />
        {process.env.NEXT_PUBLIC_VERCEL_ANALYTICS === "true" ? (
          <Analytics />
        ) : null}
      </body>
    </html>
  );
}
