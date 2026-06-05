'use client'

import { ChevronRight } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_CASAITALIA_API_URL}/customer-promotion`)
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
    ? `${process.env.NEXT_PUBLIC_CASAITALIA_STORAGE_URL}/${promotionData.file}` // Ubah '/storage/' sesuai konfigurasi backend jika diperlukan
    : null

  // Menentukan teks deskripsi dari API atau menggunakan teks lama sebagai fallback
  const descriptionText = promotionData?.description 

  return (
    <main ref={pageRef} className="min-h-screen w-full" style={{ backgroundImage: "url(/xdf.jpg)", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}>
      <SiteHeader />

      {/* Header Section with Title */}
      <section className="relative z-10 -mt-10 pt-[134px] pb-2 px-6 lg:px-16 xl:px-24 pointer-events-none">
        {/* Breadcrumb - matched products/page.tsx */}
        <div className="mb-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/promotion">Promotion</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Title */}
        <div className="mb-4">
          <h1 className="font-light text-5xl md:text-6xl text-amber-900 font-serif mb-6">Our<br />Promotion</h1>
        </div>
      </section>

      {/* Promotional Banner */}
   {/* Promotional Banner */}
<section className="relative w-full -mt-12">
  <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden">
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
        className="relative -mt-16 pt-10 pb-16 md:pt-12 md:pb-20 lg:pt-12 lg:pb-24 px-6 lg:px-16 xl:px-24"
        style={getRevealStyle(isVisible, "200ms")}
      >
        <div className="max-w-4xl">
          <p className="text-sm md:text-base font-light text-gray-700 leading-relaxed" style={{ fontFamily: '"Din Pro", "Din_Pro", sans-serif', fontWeight: 400 }}>
            {descriptionText}
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="relative pb-20 md:pb-24 lg:pb-32 px-6 lg:px-16 xl:px-24"
        style={getRevealStyle(isVisible, "400ms")}
      >
        <div className="flex justify-center">
          <Link
            href="https://wa.me/6285174189869?text=Our%20Promotion%20Casa%20Italia"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-4 transition-colors duration-300"
          >
            <span className="font-light text-base md:text-lg font-serif text-amber-900 group-hover:text-amber-400">
              <span className="inline-flex items-center gap-2">
                      <Image src="/images/wa-icon.png" alt="WhatsApp" width={28} height={28} className="object-contain" />

                Get your Special Offers here!
              </span>
            </span>
          </Link>
        </div>
      </section>
    </main>
  )
}