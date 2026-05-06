/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Enable built-in image optimization (WebP/AVIF, resize, lazy load)
    // Only disable for external image CDN that doesn't support Next.js format
    // unoptimized: true, // REMOVED - enables next/image optimization
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
