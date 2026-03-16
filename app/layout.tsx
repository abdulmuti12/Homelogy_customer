import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Homeology - Luxury Furniture Collection",
  description:
    "Discover premium furniture with living philosophy. Explore our exclusive collections of modern and elegant home furnishings.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/homelogy_fav.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/homelogy_fav.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
         url: "/homelogy_fav.png",
        type: "image/svg+xml",
      },
    ],
    apple: "/homelogy_fav.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body className={`${playfair.variable} font-sans antialiased bg-black min-h-screen flex flex-col`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
