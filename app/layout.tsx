import type React from "react";
import type { Metadata } from "next";
import { Noto_Sans_Georgian } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileBar } from "@/components/layout/mobile-bar";
import { CookieBanner } from "@/components/seo/cookie-banner";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/config";

const notoSansGeorgian = Noto_Sans_Georgian({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-noto-georgian",
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
      { url: "/favicon.ico" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian:wght@100..900&display=swap"
          rel="stylesheet"
        />
        
        <JsonLd type="organization" />
      </head>
      <body
        className={`${notoSansGeorgian.variable} font-body antialiased text-foreground bg-background relative`}
        suppressHydrationWarning
      >
        <Header />
        <main className="min-h-screen w-full pt-16 md:pt-20 pb-20 md:pb-0">
          {children}
        </main>
        <Footer />
        <MobileBar />
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}
