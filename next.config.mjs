/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Bypass Next.js image optimizer — serve external images directly from source.
    // Production server (nginx) blocks /_next/image upstream to itself, causing 504 timeouts.
    unoptimized: true,
    minimumCacheTTL: 86400,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "homelogystyle.com",
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "casaitalia-living.com",
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=300, stale-while-revalidate=600",
          },
        ],
      },
    ]
  },
}

export default nextConfig
