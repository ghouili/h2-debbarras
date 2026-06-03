import type React from "react";
import type { Metadata } from "next";
import { Noto_Serif, Source_Code_Pro } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileBar } from "@/components/layout/mobile-bar";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { CookieBanner } from "@/components/seo/cookie-banner.client";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/config";

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-source-code-pro",
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17933962840"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'AW-17933962840');
gtag('config', 'G-W68ZFT3E37');`}
        </Script>

        <JsonLd type="organization" />
      </head>
      <body
        className={`${sourceCodePro.variable} ${notoSerif.variable} font-body antialiased text-foreground bg-background relative`}
        suppressHydrationWarning
      >
        <ScrollToTop />
        <Header />
        <main className="min-h-screen w-full pt-16 md:pt-20 pb-20 md:pb-0">
          {children}
        </main>
        <Footer />
        <MobileBar />
        <CookieBanner />
        {process.env.NEXT_PUBLIC_VERCEL_ANALYTICS === "true" ? (
          <Analytics />
        ) : null}
      </body>
    </html>
  );
}
