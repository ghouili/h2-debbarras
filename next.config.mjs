/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [320, 480, 640, 800, 1024, 1280, 1600],
    imageSizes: [16, 20, 24, 32, 40, 48, 64],
  },

  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/optimized/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/image",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, immutable",
          },
        ],
      },
    ]
  },

  async redirects() {
    return [
      {
        source: "/services/debarras-maison-appartement",
        destination: "/services/debarras-maison-vide-maison",
        permanent: true,
      },
      {
        source: "/services/nettoyage-apres-travaux",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/services/nettoyage-bureaux-commerces",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/services/nettoyage-syndrome-diogene",
        destination: "/services",
        permanent: true,
      },
    ]
  },
}

export default nextConfig