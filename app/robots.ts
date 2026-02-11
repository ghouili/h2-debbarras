import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = siteConfig.url.replace(/\/$/, "");

  return {
    sitemap: `${baseUrl}/sitemap.xml`,
    rules: [
      // Default: allow public site crawling
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/_next/", "/api/"],
      },

      // Block OpenAI training crawler
      {
        userAgent: "GPTBot",
        disallow: "/",
      },

      // Block Google's AI-training/grounding control token
      {
        userAgent: "Google-Extended",
        disallow: "/",
      },
    ],
  };
}
