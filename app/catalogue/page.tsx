import Link from "next/link"
import Image from "next/image" // Import komponen Image untuk optimasi
import { SiteHeader } from "@/components/site-header"
import { FooterSection } from "@/components/footer-section"
import { WhatsAppButton } from "@/components/whatsapp-button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const catalogItems = [
  {
    id: 1,
    title: "Homelogy Catalog 2025",
    image: "/images/hm-cat-2025.png",
    year: "2025",
  },
  {
    id: 2,
    title: "Homelogy Catalog 2024",
    image: "/images/HM-Cat-2024-new.png",
    year: "2024",
  },
  {
    id: 3,
    title: "Homelogy Catalog 2023",
    image: "/images/HM-Cat-2023.png",
    year: "2023",
  },
]

export default function CataloguePage() {
  return (
    <main className="min-h-screen">
      <SiteHeader />

      <div
        className="bg-gray-100 px-6 md:px-12 lg:px-20 py-6 pt-24 md:pt-28"
        style={{
          backgroundImage: "url(/images/xdf.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Catalog</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <section
        className="min-h-screen px-6 md:px-12 lg:px-20 py-16"
        style={{
          backgroundImage: "url(/images/xdf.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <h1 className="font-light text-4xl md:text-5xl lg:text-6xl text-amber-900 mb-16 font-serif text-center md:text-left">
            Our Catalog
          </h1>

          {/* Catalogue Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {catalogItems.map((item) => (
              <div key={item.id} className="flex flex-col items-center">
                {/* Image Container with Fixed Aspect Ratio */}
                <div className="w-full mb-6 group cursor-pointer h-full">
                  <div className="relative aspect-[3/4] overflow-hidden transition-transform duration-500 group-hover:scale-[1.02] h-auto">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      priority={item.id === 1}
                    />
                  </div>
                </div>

                {/* Title Section */}
                <div className="text-center pt-2 w-full">
                  <h3 className="text-lg md:text-xl font-light text-gray-800 tracking-wide">{item.title}</h3>
                  <div className="mt-2 w-12 h-[1px] bg-amber-900/30 mx-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div>
        <FooterSection />
      </div>
      <WhatsAppButton />
    </main>
  )
}
