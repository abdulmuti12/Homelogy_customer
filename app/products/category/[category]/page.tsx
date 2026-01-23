"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { FooterSection } from "@/components/footer-section"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Input } from "@/components/ui/input"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, ArrowRight } from "lucide-react"
import { products } from "@/lib/products"

const collections = [
  {
    title: "New Arrivals",
    image: "/Asset-28.jpg",
  },
  {
    title: "Ready Stock",
    image: "/Asset-29.jpg",
  },
  {
    title: "Sales Stock",
    image: "/Asset-30.jpg",
  },
  {
    title: "All Products",
    image: "/Asset-31.jpg",
  },
]

const categoryDescriptions: Record<string, { title: string; description: string }> = {
  "new-arrival": {
    title: "New Arrival",
    description:
      "Discover our latest collection of premium furniture pieces. Explore innovative designs and modern styles that have just arrived at Homelogy.",
  },
  "ready-stock": {
    title: "Ready Stock",
    description:
      "Browse our in-stock collection of quality furniture ready for immediate delivery. Premium pieces available now.",
  },
  "sales-stock": {
    title: "Sales Stock",
    description:
      "Take advantage of special offers and discounted furniture from our sales collection. Quality pieces at exceptional prices.",
  },
}

const getCategoryForProduct = (productId: number): string[] => {
  // Map product IDs to their categories
  const categoryMap: Record<number, string[]> = {
    1: ["new-arrival", "ready-stock"],
    2: ["ready-stock", "sales-stock"],
    3: ["ready-stock"],
    4: ["ready-stock", "sales-stock"],
    5: ["new-arrival"],
    6: ["ready-stock"],
    7: ["ready-stock", "sales-stock"],
    8: ["ready-stock"],
    9: ["new-arrival"],
    10: ["ready-stock"],
    11: ["ready-stock", "sales-stock"],
    12: ["ready-stock"],
  }

  return categoryMap[productId] || ["ready-stock"]
}

export default function CategoryPage() {
  const params = useParams()
  const category = (params?.category as string)?.toLowerCase() || "all"

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedColor, setSelectedColor] = useState("All")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  const categoryProducts = useMemo(() => {
    if (category === "all") return products
    return products.filter((product) => {
      const productCategories = getCategoryForProduct(product.id)
      return productCategories.includes(category)
    })
  }, [category])

  // Filter products based on search
  const filteredProducts = categoryProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage)

  const categoryInfo = categoryDescriptions[category] || { title: "Products", description: "" }
  const isValidCategory = Object.keys(categoryDescriptions).includes(category)

  if (!isValidCategory && category !== "all") {
    return (
      <main className="min-h-screen">
        <SiteHeader />
        <section className="min-h-screen px-6 md:px-12 lg:px-20 py-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-serif text-amber-900 mb-4">Category Not Found</h1>
            <p className="text-gray-700 mb-8">The category you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/products" className="text-amber-700 hover:text-amber-900 underline">
              Back to Products
            </Link>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main
      className="min-h-screen"
      style={{
        backgroundImage: "url(/xdf.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <SiteHeader />

      {/* Breadcrumb Navigation */}
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
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{categoryInfo.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Category Section */}
      <section className="min-h-screen px-6 md:px-12 lg:px-20 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 mb-12">
            {/* Left: Title and Description */}
            <div className="lg:w-1/3">
              <h1 className="font-light text-5xl md:text-6xl text-amber-900 font-serif mb-6">{categoryInfo.title}</h1>
            </div>

            {/* Right: Description */}
            <div className="lg:w-2/3 flex flex-col justify-start">
              <p className="text-gray-700 text-sm leading-relaxed">{categoryInfo.description}</p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              className="flex-1 md:max-w-sm border-gray-400 bg-white/90"
            />

            <div className="flex flex-wrap gap-4 md:gap-6">
              {/* Color Filter */}
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

              {/* Category Filter */}
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

              {/* Sort by Filter */}
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

          {/* Products Grid */}
          {paginatedProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                {paginatedProducts.map((product) => (
                  <Link key={product.id} href={`/products/item/${product.id}`} className="cursor-pointer group">
                    {/* Product Image */}
                    <div className="bg-white rounded-lg overflow-hidden mb-3 transition-transform duration-300 group-hover:scale-105">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full aspect-square object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="text-center">
                      <h3 className="text-gray-900 font-medium text-sm md:text-base">{product.name}</h3>
                      <p className="text-gray-600 text-xs md:text-sm">{product.type}</p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
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
              )}
            </>
          ) : (
            <div className="flex items-center justify-center py-20">
              <p className="text-gray-700 text-lg">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Collection Section */}
      <section className="py-20 border-t border-white/10">
        <div className="w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
            {collections.map((collection) => (
              <Link
                key={collection.title}
                href={`/products/category/${collection.title.toLowerCase().replace(/\s+/g, "-")}`}
                className="group relative aspect-[3/5] overflow-hidden"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${collection.image})` }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/60 to-transparent">
                  <h3 className="font-light text-white text-lg md:text-xl lg:text-2xl">{collection.title}</h3>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              href="/products"
              className="group inline-flex items-center gap-3 text-amber-700 text-sm md:text-base tracking-wider uppercase hover:text-amber-800 transition-colors"
            >
              VIEW ALL PRODUCTS
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-700/30 transition-all group-hover:border-amber-700/50 group-hover:translate-x-1">
                <ArrowRight className="h-5 w-5 text-amber-700" />
              </span>
            </Link>
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
