'use client'

import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"

interface PressRelease {
  id: number
  press_release_date: string
  name: string
  description: string 
  type: string
  file: string
}

// Fungsi helper untuk membersihkan tag HTML dari teks
const stripHtml = (html: string) => {
  if (!html) return ""
  return html.replace(/<[^>]+>/g, '')
}

// Fungsi helper untuk memformat tanggal
const formatDate = (dateString: string) => {
  if (!dateString) return ""
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

// FUNGSI BARU: Mengubah path relative dari API menjadi URL absolute
const getImageUrl = (filePath: string) => {
  if (!filePath) return "/images/placeholder.jpg" // Fallback jika null
  
  if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
    return filePath
  }

  const cleanPath = filePath.startsWith('/') ? filePath : `/${filePath}`
  return `https://homelogystyle.com/storage${cleanPath}`
}

export default function PressPage() {
  const [isVisible, setIsVisible] = useState(false)
  const pageRef = useRef<HTMLDivElement>(null)

  // State untuk Data API & Pagination
  const [pressReleases, setPressReleases] = useState<PressRelease[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)

  // Observer untuk efek animasi (fade in)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (pageRef.current) {
      observer.observe(pageRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Fetch Data dari API saat komponen mount atau currentPage berubah
  useEffect(() => {
    const fetchPressReleases = async () => {
      setLoading(true)
      try {
        const response = await fetch(`https://homelogystyle.com/api/press?page=${currentPage}`)
        const result = await response.json()

        if (result.success && result.data) {
          setPressReleases(result.data.data)
          setTotalPages(result.data.last_page)
        }
      } catch (error) {
        console.error("Error fetching press releases:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPressReleases()
    
    if (currentPage > 1 && pageRef.current) {
      pageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [currentPage])

  return (
    <main ref={pageRef} className="min-h-screen w-full bg-black">
      {/* Header Section */}
      <section className="relative min-h-[60vh] w-full overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/images/article.jpg"
            alt="Press Release Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-500/30 via-gray-700/50 to-black" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex min-h-[60vh] flex-col justify-center">
          <div className="container mx-auto px-6 lg:px-12 xl:px-16 py-16">
            <div className="max-w-7xl mx-auto">
              <Link
                href="/"
                className="group inline-flex items-center gap-2 text-white hover:text-amber-400 transition-colors duration-300 mb-8"
              >
                <ChevronLeft className="w-4 h-4 stroke-[1.5] group-hover:-translate-x-1 transition-transform duration-300" />
                <span className="text-sm font-light tracking-wider" style={{ fontFamily: '"GaramondPro-Bold", "Adobe Garamond Pro", Garamond' }}>BACK HOME</span>
              </Link>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-white mb-6" style={{ fontFamily: '"GaramondPro-Bold", "Adobe Garamond Pro", Garamond' }}>
                Press Releases
              </h1>
              <p className="text-base md:text-lg font-light text-gray-300 max-w-2xl" style={{ fontFamily: '"GaramondPro-Bold", "Adobe Garamond Pro", Garamond' }}>
                Stay informed with the latest news, announcements, and milestones from Homelogy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="relative bg-black py-20 min-h-[50vh]">
        <div className="container mx-auto px-6 lg:px-12 xl:px-16">
          <div className="max-w-7xl mx-auto">
            
            {/* Loading State */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-10 h-10 text-amber-400 animate-spin mb-4" />
                <p className="text-gray-400 font-light tracking-wider">Loading articles...</p>
              </div>
            ) : pressReleases.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <p className="text-gray-400 font-light tracking-wider">No press releases found.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {pressReleases.map((release, index) => (
                    <Link
                      key={release.id}
                      href={`/press/${release.id}`}
                      className="group block h-full"
                    >
                      <div
                        className="relative flex flex-col bg-white/5 backdrop-blur-sm border border-white/10 hover:border-amber-400/50 transition-all duration-300 h-full overflow-hidden cursor-pointer"
                        style={{
                          opacity: isVisible ? 1 : 0,
                          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                          transitionDelay: `${100 + (index % 12) * 50}ms`,
                          transitionProperty: 'opacity, transform, border-color, background-color',
                          transitionDuration: '800ms, 800ms, 300ms, 300ms',
                          transitionTimingFunction: 'ease-out',
                        }}
                      >
                        {/* Image Section - SUDAH DIPERBAIKI */}
                        <div className="relative w-full h-40 md:h-48 shrink-0 overflow-hidden bg-gray-900">
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
                            <span className="inline-block px-3 py-1 text-[10px] sm:text-xs font-light tracking-widest text-amber-400 border border-amber-400/30 rounded-full">
                              {release.type || "News"}
                            </span>
                            <span className="text-xs sm:text-sm font-light text-gray-400">
                              {formatDate(release.press_release_date)}
                            </span>
                          </div>

                          {/* name - Line Clamp 2 */}
                          <h3 className="text-base sm:text-lg font-normal leading-snug text-white mb-3 group-hover:text-amber-400 transition-colors duration-300 line-clamp-2" style={{ fontFamily: '"GaramondPro-Bold", "Adobe Garamond Pro", Garamond' }}>
                            {release.name}
                          </h3>

                          {/* description - Line Clamp 3 */}
                          <p className="text-xs sm:text-sm font-light leading-relaxed text-gray-300 mb-5 flex-grow line-clamp-3" style={{ fontFamily: '"Din Pro", "Din_Pro", sans-serif' }}>
                            {stripHtml(release.description)}
                          </p>

                          {/* Read More Link */}
                          <div className="flex items-center gap-2 text-white group-hover:text-amber-400 transition-colors duration-300 mt-auto">
                            <span className="text-xs sm:text-sm font-light tracking-wider">READ MORE</span>
                            <ChevronRight className="w-4 h-4 stroke-[1.5] group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </div>

                        {/* Hover effect background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 to-amber-400/0 group-hover:from-amber-400/5 group-hover:to-transparent pointer-events-none transition-all duration-300" />
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-4 mt-16">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-light text-white border border-white/20 hover:border-amber-400 hover:text-amber-400 disabled:opacity-30 disabled:hover:border-white/20 disabled:hover:text-white transition-colors duration-300"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </button>
                    
                    <span className="text-sm font-light text-gray-400">
                      Page <span className="text-white font-medium">{currentPage}</span> of {totalPages}
                    </span>

                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-light text-white border border-white/20 hover:border-amber-400 hover:text-amber-400 disabled:opacity-30 disabled:hover:border-white/20 disabled:hover:text-white transition-colors duration-300"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            )}

          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="relative bg-gradient-to-b from-black to-gray-900 py-20 border-t border-white/5">
        <div className="container mx-auto px-6 lg:px-12 xl:px-16">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
              Stay Updated with Homelogy
            </h2>
            <p className="text-base font-light text-gray-300 mb-8 max-w-2xl">
              Subscribe to our newsletter to receive the latest news and updates directly to your inbox.
            </p>
            <Link
              href="/"
              className="group inline-flex items-center gap-3 text-white hover:text-amber-400 transition-colors duration-300"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white group-hover:border-amber-400 transition-colors duration-300">
                <ChevronRight className="w-5 h-5 stroke-[1.5] group-hover:translate-x-1 transition-transform duration-300" />
              </div>
              <span className="font-normal tracking-wider text-sm uppercase">Subscribe Now</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}