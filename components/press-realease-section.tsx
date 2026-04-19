'use client'

import { ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"

// Sesuaikan interface dengan response API
interface PressRelease {
  id: number
  name: string
  description: string
  type: string
  file: string
  press_release_date: string | null
  created_at: string
}

// Fungsi untuk menghilangkan tag HTML dan memotong teks maksimal 100 karakter
const truncateText = (htmlString: string, maxLength: number = 100) => {
  if (!htmlString) return ""
  const plainText = htmlString.replace(/<[^>]+>/g, '').replace(/\n/g, ' ').trim()
  if (plainText.length <= maxLength) return plainText
  return plainText.substring(0, maxLength) + '...'
}

// FUNGSI BARU: Untuk mengubah path relative dari API menjadi URL absolute
const getImageUrl = (filePath: string) => {
  if (!filePath) return "/images/article.jpg" // Fallback jika tidak ada gambar
  
  // Jika URL sudah lengkap (dari eksternal/unsplash/dll), langsung gunakan
  if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
    return filePath
  }

  // Jika tidak ada leading slash, tambahkan
  const cleanPath = filePath.startsWith('/') ? filePath : `/${filePath}`
  
  // Gabungkan dengan domain backend (Asumsi menggunakan folder /storage Laravel)
  return `https://homelogystyle.com/storage${cleanPath}`
}

export function PressReleaseSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [pressReleases, setPressReleases] = useState<PressRelease[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  // Fetch Data API
  useEffect(() => {
    const fetchPressReleases = async () => {
      try {
        const response = await fetch("https://homelogystyle.com/api/press-release")
        const result = await response.json()
        
        if (result.success && result.data) {
          setPressReleases(result.data.slice(0, 3))
        }
      } catch (error) {
        console.error("Error fetching press releases:", error)
      }
    }

    fetchPressReleases()
  }, [])

  // Intersection Observer untuk animasi
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Fungsi untuk format tanggal (karena press_release_date dari API bisa null)
  const formatDate = (dateString: string | null, createdAt: string) => {
    const dateToFormat = dateString ? new Date(dateString) : new Date(createdAt)
    return dateToFormat.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full overflow-hidden bg-black flex items-center">
      {/* Background with overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/article.jpg" 
          alt="Press Release Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-500/30 via-gray-700/50 to-black" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full py-16">
        <div className="container mx-auto px-6 lg:px-12 xl:px-16">
          <div className="max-w-7xl mx-auto">
            
            {/* Header */}
            <div 
              className="mb-12 space-y-4 transform transition-all duration-1000 ease-out"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              <p className="text-lg md:text-xl font-light tracking-wider text-white" style={{ fontFamily: "Aeonik" }}>Press Center</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight text-white" style={{ fontFamily: "Aeonik" }}>
                Latest News & Press Releases
              </h2>
              <p className="text-base md:text-lg font-light text-gray-300 max-w-2xl pt-2" style={{ fontFamily: "Aeonik" }}>
                Stay updated with the latest announcements, product launches, and milestones from Homelogy.
              </p>
            </div>

            {/* Press Releases Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {pressReleases.map((release, index) => (
                <div
                  key={release.id}
                  className="group relative flex flex-col bg-white/5 backdrop-blur-sm border border-white/10 hover:border-amber-400/50 transition-all duration-300 overflow-hidden"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transitionDelay: `${200 + index * 100}ms`,
                    transitionProperty: 'opacity, transform, border-color, background-color',
                    transitionDuration: '1000ms, 1000ms, 300ms, 300ms',
                    transitionTimingFunction: 'ease-out',
                  }}
                >
                  {/* Image Section - DIUBAH MENGGUNAKAN getImageUrl() */}
                  <div className="relative w-full h-40 md:h-48 shrink-0 overflow-hidden">
                    <Image
                      src={getImageUrl(release.file)}
                      alt={release.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  </div>

                  {/* Text Content Section */}
                  <div className="flex flex-col flex-grow p-5 md:p-6">
                    {/* type & press_release_date */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block px-3 py-1 text-[10px] sm:text-xs font-light tracking-widest text-amber-400 border border-amber-400/30 rounded-full truncate max-w-[50%]">
                        {release.type || "Press Release"}
                      </span>
                      <span className="text-xs sm:text-sm font-light text-gray-400">
                        {formatDate(release.press_release_date, release.created_at)}
                      </span>
                    </div>

                    {/* name */}
                    <h3 className="text-base sm:text-lg font-normal leading-snug text-white mb-3 group-hover:text-amber-400 transition-colors duration-300 line-clamp-2" title={release.name}>
                      {release.name}
                    </h3>

                    {/* description */}
                    <p className="text-xs sm:text-sm font-light leading-relaxed text-gray-300 mb-5 flex-grow">
                      {truncateText(release.description, 100)}
                    </p>

                    {/* Read More Link */}
                    <Link href={`/press/${release.id}`} className="flex items-center gap-2 text-white hover:text-amber-400 transition-colors duration-300 cursor-pointer mt-auto w-max">
                      <span className="text-xs sm:text-sm font-light tracking-wider">READ MORE</span>
                      <ChevronRight className="w-4 h-4 stroke-[1.5] group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>

                  {/* Hover effect background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 to-amber-400/0 group-hover:from-amber-400/5 group-hover:to-transparent pointer-events-none transition-all duration-300" />
                </div>
              ))}
            </div>

            {/* View All Button */}
            <div 
              className="transform transition-all duration-1000 ease-out"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: '500ms',
              }}
            >
              <Link
                href="/press"
                className="group inline-flex items-center gap-3 text-white hover:text-amber-400 transition-colors duration-300"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white group-hover:border-amber-400 transition-colors duration-300">
                  <ChevronRight className="w-5 h-5 stroke-[1.5] group-hover:translate-x-1 transition-transform duration-300" />
                </div>
                <span className="font-normal tracking-wider text-sm uppercase" style={{ fontFamily: "Aeonik" }}>View All Press Releases</span>
              </Link>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  )
}