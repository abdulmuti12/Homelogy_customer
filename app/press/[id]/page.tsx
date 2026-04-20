'use client'

import { ChevronLeft, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"

// Sesuaikan interface dengan response dari API
interface PressRelease {
  id: number
  press_release_date: string
  name: string
  description: string
  type: string
  file: string
}

// Fungsi helper untuk membersihkan tag HTML untuk bagian excerpt (cuplikan)
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

// Fungsi helper untuk memotong teks
const truncateText = (text: string, maxLength: number = 150) => {
  if (!text) return ""
  const plainText = stripHtml(text)
  if (plainText.length <= maxLength) return plainText
  return plainText.substring(0, maxLength).trim() + '...'
}

// --- FUNGSI DIPERBAIKI: Menangani Google Drive, Link Eksternal, & Storage Lokal ---
const getImageUrl = (url: string) => {
  if (!url) return "/images/article.jpg" // Fallback jika kosong
  
  // 1. Deteksi jika link adalah Google Drive
  if (url.includes('drive.google.com/file/d/')) {
    const fileIdMatch = url.match(/\/d\/(.+?)\//)
    if (fileIdMatch && fileIdMatch[1]) {
      const fileId = fileIdMatch[1]
      return `https://drive.google.com/uc?export=view&id=${fileId}`
    }
  }
  
  // 2. Jika URL sudah lengkap (dari eksternal/unsplash/dll), langsung gunakan
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }

  // 3. Jika berupa relative path dari storage lokal API (misal: "press_releases/xxx.png")
  const cleanPath = url.startsWith('/') ? url : `/${url}`
  return `https://homelogystyle.com/storage${cleanPath}`
}

export default function PressDetailPage() {
  const params = useParams()
  const id = params?.id as string

  const [release, setRelease] = useState<PressRelease | null>(null)
  const [relatedReleases, setRelatedReleases] = useState<PressRelease[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPressReleaseData = async () => {
      if (!id) return
      
      setLoading(true)
      try {
        // Ambil data dari API
        const response = await fetch('https://homelogystyle.com/api/press')
        const result = await response.json()

        if (result.success && result.data && result.data.data) {
          const allReleases = result.data.data
          
          // Cari artikel yang sedang dibuka berdasarkan ID dari URL parameter
          const currentRelease = allReleases.find((r: PressRelease) => r.id.toString() === id)
          
          if (currentRelease) {
            setRelease(currentRelease)
          } else {
            // Fallback: Jika tidak ditemukan di list halaman pertama, coba hit endpoint detail langsung
            try {
              const detailRes = await fetch(`https://homelogystyle.com/api/press/${id}`)
              const detailResult = await detailRes.json()
              if (detailResult.success && detailResult.data) {
                setRelease(detailResult.data)
              }
            } catch (e) {
              console.error("Fallback detail fetch failed", e)
            }
          }

          // Ambil sisa data untuk bagian "More Press Releases"
          setRelatedReleases(allReleases.filter((r: PressRelease) => r.id.toString() !== id))
        }
      } catch (error) {
        console.error("Error fetching press release detail:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPressReleaseData()
  }, [id])

  // Tampilan Loading
  if (loading) {
    return (
      <main className="min-h-screen w-full bg-black flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="w-10 h-10 text-amber-400 animate-spin mb-4" />
          <p className="text-gray-400 font-light tracking-wider">Loading article...</p>
        </div>
      </main>
    )
  }

  // Tampilan jika data tidak ditemukan
  if (!release) {
    return (
      <main className="min-h-screen w-full bg-black">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24 py-20">
          <Link
            href="/press"
            className="group inline-flex items-center gap-2 text-white hover:text-amber-400 transition-colors duration-300 mb-8"
          >
            <ChevronLeft className="w-4 h-4 stroke-[1.5] group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="text-sm font-light tracking-wider">BACK TO PRESS</span>
          </Link>
          <div className="text-center">
            <h1 className="text-3xl font-light text-white mb-4">Article Not Found</h1>
            <p className="text-gray-300">The press release you are looking for does not exist.</p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen w-full bg-black">
      {/* Header */}
      <section className="relative min-h-[50vh] w-full overflow-hidden">
        {/* Background - Menggunakan gambar dinamis dengan fungsi getImageUrl */}
        <div className="absolute inset-0">
          <Image
            src={getImageUrl(release.file)} 
            alt="Press Release Background"
            fill
            className="object-cover opacity-50 blur-sm" 
          />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-black/60 to-black" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex min-h-[50vh] flex-col justify-center">
          <div className="container mx-auto px-6 lg:px-16 xl:px-24 py-16">
            <div className="max-w-4xl">
              <Link
                href="/press"
                className="group inline-flex items-center gap-2 text-white hover:text-amber-400 transition-colors duration-300 mb-8"
              >
                <ChevronLeft className="w-4 h-4 stroke-[1.5] group-hover:-translate-x-1 transition-transform duration-300" />
                <span className="text-sm font-light tracking-wider">BACK TO PRESS</span>
              </Link>

              {/* Category Badge */}
              <div className="mb-6">
                <span className="inline-block px-4 py-2 text-xs font-light tracking-widest text-amber-400 border border-amber-400/50 rounded-full">
                  {release.type || "Press Release"}
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight text-white mb-6">
                {release.name}
              </h2>

              <p className="text-base font-light text-gray-400">{formatDate(release.press_release_date)}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="relative bg-black py-20">
        <div className="container mx-auto px-6 lg:px-16 xl:px-24">
          <div className="max-w-4xl mx-auto">
            {/* Featured Image - Menggunakan gambar dinamis dengan fungsi getImageUrl */}
            <div className="mb-8 aspect-video relative overflow-hidden rounded-lg border border-white/10">
              <Image
                src={getImageUrl(release.file)}
                alt={release.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Main Content (HTML dari API) */}
            {/* <div 
              className="prose prose-invert max-w-none text-gray-300 font-light leading-relaxed [&>p]:mb-6 [&>h2]:text-2xl [&>h2]:text-white [&>h2]:font-normal [&>h2]:mb-4 [&>b]:text-white"
              dangerouslySetInnerHTML={{ __html: release.description }}
            /> */}
<div 
  style={{ fontFamily: "Aeonik" }}
  className="prose prose-invert max-w-none text-gray-300 font-light leading-relaxed 
             [&_p]:mb-5 
             [&_h2]:text-2xl [&_h2]:text-white [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4 
             [&_h3]:text-xl [&_h3]:text-white [&_h3]:font-bold [&_h3]:mt-8 [&_h3]:mb-4 
             [&_b]:text-white [&_b]:font-semibold 
             [&_strong]:text-white [&_strong]:font-semibold 
             [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-6 [&_ul]:space-y-2 
             [&_li]:text-gray-300

             /* 🔥 TAMBAHAN UNTUK IMAGE */
             [&_img]:w-full 
             [&_img]:h-auto 
             [&_img]:rounded-lg 
             [&_img]:my-6 
             [&_img]:object-cover
             [&_img]:mx-auto
  "
  dangerouslySetInnerHTML={{ __html: release.description }}
/>

            {/* Divider */}
            <div className="my-12 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Related Articles */}
            <div className="mt-20">
              <h2 className="text-2xl font-light text-white mb-12">More Press Releases</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedReleases.slice(0, 2).map((relatedRelease) => (
                  <Link
                    key={relatedRelease.id}
                    href={`/press/${relatedRelease.id}`}
                    className="group"
                  >
                    <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 hover:border-amber-400/50 transition-all duration-300 p-6 overflow-hidden h-full flex flex-col">
                      <div className="mb-3">
                        <span className="inline-block px-3 py-1 text-xs font-light tracking-widest text-amber-400 border border-amber-400/30 rounded-full group-hover:border-amber-400/60 transition-colors duration-300">
                          {relatedRelease.type || "Press Release"}
                        </span>
                      </div>
                      <p className="text-sm font-light text-gray-400 mb-3">{formatDate(relatedRelease.press_release_date)}</p>
                      <h3 className="text-lg font-light leading-tight text-white mb-4 group-hover:text-amber-400 transition-colors duration-300 line-clamp-2">
                        {relatedRelease.name}
                      </h3>
                      <p className="text-sm font-light text-gray-300 line-clamp-3 mt-auto">
                        {truncateText(relatedRelease.description, 120)}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* View All Button */}
            <div className="mt-12">
              <Link
                href="/press"
                className="group inline-flex items-center gap-3 text-white hover:text-amber-400 transition-colors duration-300"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white group-hover:border-amber-400 transition-colors duration-300">
                  <ChevronLeft className="w-5 h-5 stroke-[1.5] group-hover:-translate-x-1 transition-transform duration-300" />
                </div>
                <span className="font-normal tracking-wider text-sm uppercase">Back to All Press Releases</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}