"use client"

import { useState } from "react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { FooterSection } from "@/components/footer-section"
import { CollectionSection } from "@/components/collection-section"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Input } from "@/components/ui/input"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { products, collections } from "@/lib/products"
import { ArrowRight } from "lucide-react"

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedColor, setSelectedColor] = useState("All")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage)

  return (
    <main className="min-h-screen relative">
      <SiteHeader />
      
      {/* Container utama untuk efek Magnetic/Snap */}
      <div className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth" style={{ scrollPaddingTop: '0', scrollBehavior: 'smooth' }}>
        
        {/* Breadcrumb dan Header Section */}
        <div className="snap-start min-h-screen" style={{
          backgroundImage: "url(/xdf.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}>
          <div className="px-6 md:px-12 lg:px-20 py-6 pt-24 md:pt-28">
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
                    <Link href="/products">Products</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <section className="min-h-screen px-6 md:px-12 lg:px-20 py-16">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-8 mb-12">
                <div className="lg:w-1/3">
                  <h1 className="font-light text-5xl md:text-6xl text-amber-900 font-serif mb-6">Product</h1>
                </div>

                <div className="lg:w-2/3 flex flex-col justify-start">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                    laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                    ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                  </p>
                </div>
              </div>

              <div className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <Input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="flex-1 md:max-w-sm border-gray-400 bg-white/90"
                />

                <div className="flex flex-wrap gap-4 md:gap-6">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
                        <span className="text-sm">Color : {selectedColor}</span>
                        <ChevronDown size={16} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setSelectedColor("All")}>All</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedColor("Brown")}>Brown</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedColor("Gray")}>Gray</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedColor("Black")}>Black</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
                        <span className="text-sm">Category : {selectedCategory}</span>
                        <ChevronDown size={16} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setSelectedCategory("All")}>All</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedCategory("2 Seater")}>2 Seater</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedCategory("3 Seater")}>3 Seater</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedCategory("L Shape")}>L Shape</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedCategory("U Shape")}>U Shape</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900">
                        <span className="text-sm">Sort by</span>
                        <ChevronDown size={16} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Newest</DropdownMenuItem>
                      <DropdownMenuItem>Price: Low to High</DropdownMenuItem>
                      <DropdownMenuItem>Price: High to Low</DropdownMenuItem>
                      <DropdownMenuItem>A - Z</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                {paginatedProducts.map((product) => (
                  <Link key={product.id} href={`/products/${product.id}`} className="cursor-pointer group">
                    <div className="bg-white rounded-lg overflow-hidden mb-3 transition-transform duration-300 group-hover:scale-105">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full aspect-square object-cover"
                      />
                    </div>

                    <div className="text-center">
                      <h3 className="text-gray-900 font-medium text-sm md:text-base">{product.name}</h3>
                      <p className="text-gray-600 text-xs md:text-sm">{product.type}</p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm text-gray-700 hover:text-gray-900 disabled:opacity-50"
                >
                  {"< Previous"}
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 text-sm rounded ${
                      currentPage === page ? "bg-gray-900 text-white" : "text-gray-700 hover:text-gray-900"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm text-gray-700 hover:text-gray-900 disabled:opacity-50"
                >
                  {"Next >"}
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Collections Section */}
        <div className="snap-start min-h-screen">
          <CollectionSection />
        </div>

        {/* Footer */}
        <div className="snap-start">
          <FooterSection />
        </div>

      </div>

      <WhatsAppButton />
    </main>
  )
}
