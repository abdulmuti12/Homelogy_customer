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
    icon: "/homelogy_fav.png",
    shortcut: "/homelogy_fav.png",
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <head>
        <style>{`
          @font-face {
            font-family: "Din Pro";
            src: url("/fonts/dinpro.otf") format("opentype");
            font-weight: 400;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: "Din_Pro";
            src: url("/fonts/dinpro.otf") format("opentype");
            font-weight: 400;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: "Din Pro";
            src: url("/fonts/dinpro.otf") format("opentype");
            font-weight: 500;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: "Din_Pro";
            src: url("/fonts/dinpro.otf") format("opentype");
            font-weight: 500;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: "Din Pro";
            src: url("/fonts/dinpro.otf") format("opentype");
            font-weight: 700;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: "Din_Pro";
            src: url("/fonts/dinpro.otf") format("opentype");
            font-weight: 700;
            font-style: normal;
            font-display: swap;
          }
        `}</style>
      </head>
      <body className={`${playfair.variable} font-sans antialiased bg-black min-h-screen flex flex-col`} suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
