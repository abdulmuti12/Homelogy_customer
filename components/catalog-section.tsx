"use client"

import { useEffect, useState, useRef } from "react"
import { ArrowRight, Download } from "lucide-react"
import Link from "next/link"

export function CatalogSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      {
        threshold: 0.2, // Trigger saat 20% section terlihat
      },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen flex items-center justify-center snap-start"
      style={{
        backgroundImage: "url(/xdf.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="w-full px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <h2
              className={`font-light text-4xl md:text-5xl lg:text-6xl text-amber-800 mb-6 text-balance transition-all duration-1000 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              Our Catalog
            </h2>

            <div className="space-y-6">
              <p 
                className={`text-amber-700 text-lg md:text-xl font-light transition-all duration-1000 ease-out delay-200 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                Discover the latest expression of Modern Living Unveiling Homelogy's Essential Collection
              </p>

              <p 
                className={`text-gray-700 text-base md:text-lg leading-relaxed transition-all duration-1000 ease-out delay-300 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                This edition is crafted to elevate your experience, guiding you effortlessly through our collections and
                showcasing the refined pieces that embody Homelogy's modern living philosophy.
              </p>
            </div>

            {/* Action Buttons */}
            <div 
              className={`flex flex-col sm:flex-row gap-6 sm:gap-8 mt-10 transition-all duration-1000 ease-out delay-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <Link
                href="#"
                className="group inline-flex items-center justify-center gap-3 text-amber-700 text-sm md:text-base tracking-widest uppercase transition-all hover:text-amber-900"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-amber-700/40 transition-all group-hover:border-amber-700 group-hover:bg-amber-700/5">
                  <Download className="h-5 w-5 text-amber-700" />
                </span>
                <span className="hidden sm:inline">DOWNLOAD NOW</span>
                <span className="sm:hidden">DOWNLOAD</span>
              </Link>

              <Link
                href="/catalogue"
                className="group inline-flex items-center justify-center gap-3 text-amber-700 text-sm md:text-base tracking-widest uppercase transition-all hover:text-amber-900"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-amber-700/40 transition-all group-hover:border-amber-700 group-hover:bg-amber-700/5">
                  <ArrowRight className="h-5 w-5 text-amber-700" />
                </span>
                <span className="hidden sm:inline">VIEW MORE CATALOGUE</span>
                <span className="sm:hidden">VIEW MORE</span>
              </Link>
            </div>
          </div>

          {/* Right Content - Stacked Images */}
          <div 
            className={`relative h-80 md:h-96 flex items-center justify-center lg:justify-end transition-all duration-1000 ease-out delay-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
            }`}
          >
            <div className="relative w-full max-w-md h-full">
              {/* Back image - 2023 (leftmost, back) */}
              <div className="absolute inset-0 rounded-lg overflow-hidden shadow-2xl transform -rotate-6 translate-x-0 translate-y-0 opacity-65 hover:opacity-85 transition-opacity z-0">
                <img
                  src="/images/HM-Cat-2023.png"
                  alt="HM Catalog 2023"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/25 via-transparent to-transparent" />
              </div>

              {/* Middle image - 2024 */}
              <div className="absolute inset-0 rounded-lg overflow-hidden shadow-2xl transform -rotate-2 translate-x-8 translate-y-6 opacity-80 hover:opacity-95 transition-opacity z-10">
                <img
                  src="/images/HM-Cat-2024.png"
                  alt="HM Catalog 2024"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/15 via-transparent to-transparent" />
              </div>

              {/* Front image - 2025 featured (rightmost, front) */}
              <div className="absolute inset-0 rounded-lg overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow transform rotate-1 translate-x-16 translate-y-12 z-20">
                <img
                  src="/images/hm-cat-2025.png"
                  alt="HM Catalog 2025"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-transparent" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
