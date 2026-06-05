'use client'

import { ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
// import { SiteHeader } from "@/components/navigation"
import { SiteHeader } from "@/components/site-header"

// Tipe data untuk response API
interface PromotionItem {
  id: number;
  name: string;
  description: string;
  file: string;
}

interface PromotionResponse {
  success: boolean;
  message: string;
  data: PromotionItem[];
  status: number;
}

const baseRevealStyle = {
  transition: "opacity 800ms ease-out, transform 800ms ease-out",
} as const

const getRevealStyle = (isVisible: boolean, delay: string) => ({
  ...baseRevealStyle,
  opacity: isVisible ? 1 : 0,
  transform: isVisible ? "translateY(0)" : "translateY(20px)",
  transitionDelay: delay,
})

export default function PromotionsPage() {
  const [isVisible, setIsVisible] = useState(false)
  const pageRef = useRef<HTMLDivElement>(null)
  
  // State untuk menyimpan data API
  const [promotionData, setPromotionData] = useState<PromotionItem | null>(null)

  useEffect(() => {
    // Fungsi untuk memanggil API
    const fetchPromotion = async () => {
      try {
        const response = await fetch("https://casaitalia-living.com/api/customer-promotion")
        if (!response.ok) throw new Error("Failed to fetch promotion data")
        
        const result: PromotionResponse = await response.json()
        
        if (result.success && result.data && result.data.length > 0) {
          setPromotionData(result.data[0])
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchPromotion()
  }, [])

  useEffect(() => {
    const pageElement = pageRef.current

    if (!pageElement) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(pageElement)

    return () => observer.disconnect()
  }, [])

  // Menentukan URL gambar dari API atau menggunakan gambar lokal sebagai fallback
  // Catatan: Pastikan path backend sesuai. Jika menggunakan Laravel public storage, biasanya ditambahkan prefix /storage/ atau /public/
  const imageUrl = promotionData?.file 
    ? `https://casaitalia-living.com/storage/${promotionData.file}` // Ubah '/storage/' sesuai konfigurasi backend jika diperlukan
    : null

  // Menentukan teks deskripsi dari API atau menggunakan teks lama sebagai fallback
  const descriptionText = promotionData?.description 

  return (
    <main ref={pageRef} className="min-h-screen w-full bg-black">
      <SiteHeader />

      {/* Header Section with Title */}
      {/* PERUBAHAN PENTING: Menambahkan z-10 agar teks berada di atas gambar yang ditarik ke atas */}
      <section className="relative z-10 -mt-10 pt-24 pb-2 px-6 lg:px-16 xl:px-24 pointer-events-none">
        {/* Breadcrumb - Tambahkan pointer-events-auto agar link tetap bisa diklik */}
        <div className="mb-8 pointer-events-auto inline-block" style={{ marginTop: '0.5cm' }}>
          <div className="flex items-center gap-2 text-sm font-light font-['Aeonik',sans-serif]">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-white">Promotion</span>
          </div>
        </div>

        {/* Title */}
        <div className="mb-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white leading-none font-['Aeonik',sans-serif]">
            <span className="block">Our</span>
            <span className="block ml-8 md:ml-16 lg:ml-24 mix-blend-difference">Promotion</span>
          </h1>
        </div>
      </section>

      {/* Promotional Banner */}
   {/* Promotional Banner */}
<section className="relative w-full -mt-12">
  <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden bg-black">
    {/* Komponen Image hanya akan di-render jika imageUrl tidak null */}
    {imageUrl && (
      <Image
        src={imageUrl}
        alt={promotionData?.name || "Luxury Living Room Promotion"}
        fill
        className="object-contain"
        priority
        unoptimized
      />
    )}
  </div>
</section>

      {/* Description Section */}
      <section
        // PERUBAHAN: Mengganti py-16... menjadi pt-10 (sekitar 1cm) dan memisahkan pb (padding-bottom)
        className="relative bg-black -mt-16 pt-10 pb-16 md:pt-12 md:pb-20 lg:pt-12 lg:pb-24 px-6 lg:px-16 xl:px-24"
        style={getRevealStyle(isVisible, "200ms")}
      >
        <div className="max-w-4xl">
          <p className="text-sm md:text-base font-light text-gray-300 leading-relaxed font-['Aeonik',sans-serif]">
            {descriptionText}
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="relative bg-black pb-20 md:pb-24 lg:pb-32 px-6 lg:px-16 xl:px-24"
        style={getRevealStyle(isVisible, "400ms")}
      >
        <div className="flex justify-center">
          <Link
            href="https://wa.me/6285174189869?text=Our%20Promotion%20Casa%20Italia"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-4 text-white hover:text-amber-400 transition-colors duration-300"
          >
            <span className="font-normal tracking-wider text-base md:text-lg font-['Aeonik',sans-serif]">
              <span className="inline-flex items-center gap-2">
                <Image
                  src="/wa-icon.png"
                  alt="WhatsApp"
                  width={28}
                  height={28}
                  className="w-6 h-6 md:w-7 md:h-7 object-contain"
                />
                Get your Special Offers here!
              </span>
            </span>
          </Link>
        </div>
      </section>
    </main>
  )
}