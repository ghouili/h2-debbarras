/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
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