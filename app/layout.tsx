import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { MobileBar } from "@/components/layout/mobile-bar"
import { CookieBanner } from "@/components/seo/cookie-banner"
import { JsonLd } from "@/components/seo/json-ld"
import { siteConfig } from "@/lib/config"

const geistSans = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

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
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <JsonLd type="organization" />
      </head>
      <body className={`${geistSans.className} ${geistMono.className} font-sans antialiased relative`} suppressHydrationWarning>
        <Header />
        <main className="min-h-screen w-full pt-16 md:pt-20 pb-20 md:pb-0">{children}</main>
        <Footer />
        <MobileBar />
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  )
}
