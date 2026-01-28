"use client"

import { Menu, ShoppingCart, User, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/40 via-black/20 to-transparent backdrop-blur-sm">
      <div className="w-full px-4 md:px-6 lg:px-8 py-4 md:py-6">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
          {/* Left: Mobile Menu - Moved closer to left edge */}
          <div className="flex justify-start">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 -ml-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-16 md:h-20 w-16 md:w-20" />
              ) : (
                <Menu className="h-16 md:h-20 w-16 md:w-20" />
              )}
            </Button>
          </div>

          {/* Center: Logo */}
          <Link href="/" className="flex justify-center hover:opacity-80 transition-opacity">
            <Image
              src="/images/logo-homeology.png"
              alt="Homeology"
              width={120}
              height={30}
              className="h-6 md:h-7 w-auto"
              priority
            />
          </Link>

          {/* Right: Icons - Moved closer to right edge and reduced gap */}
          <div className="flex items-center justify-end gap-1 -mr-2">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <ShoppingCart className="h-16 md:h-20 w-16 md:w-20" />
            </Button>
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
              >
                <User className="h-16 md:h-20 w-16 md:w-20" />
              </Button>
              {isUserDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsUserDropdownOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 w-48 bg-black rounded-lg shadow-lg z-50 overflow-hidden">
                    <Link
                      href="/maintenance"
                      className="block px-4 py-3 text-white hover:bg-gray-900 transition-colors text-center border-b border-gray-700"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/maintenance"
                      className="block px-4 py-3 text-white hover:bg-gray-900 transition-colors text-center"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      Register
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <>
          {/* Transparent backdrop for closing menu */}
          <div className="fixed inset-0 z-30" onClick={() => setIsMenuOpen(false)} />

          {/* Compact dropdown menu */}
          <div className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-sm z-40 shadow-lg">
            <nav className="flex flex-col px-8 py-6">
              <Link
                href="/about"
                className="text-white text-lg py-3 border-b border-white/10 hover:text-white/80 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About us
              </Link>
              <Link
                href="/projects"
                className="text-white text-lg py-3 border-b border-white/10 hover:text-white/80 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </Link>
              <Link
                href="/products"
                className="text-white text-lg py-3 hover:text-white/80 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Product
              </Link>
              <Link
                href="/catalogue"
                className="text-white text-lg py-3 border-b border-white/10 hover:text-white/80 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Catalogue
              </Link>
              <Link
                href="/contact"
                className="text-white text-lg py-3 hover:text-white/80 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
            </nav>
          </div>
        </>
      )}
    </header>
  )
}
