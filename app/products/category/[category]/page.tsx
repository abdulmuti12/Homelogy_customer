"use client"

import { useMemo } from "react"
import { useState, useEffect } from "react"
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
import { CollectionSection } from "@/components/collection-section"

const COLOR_OPTIONS = [
  "Red",
  "Green",
  "Blue",
  "Yellow",
  "Cyan",
  "Magenta",
  "Black",
  "White",
  "Gray",
  "Orange",
  "Purple",
  "Pink",
  "Brown",
  "Lime",
  "Olive",
  "Teal",
  "Navy",
  "Maroon",
  "Silver",
  "Gold",
  "Beige",
]

interface Product {
  id: number
  name: string
  category: string
  product_type: string | null
  brand: string
  image1: string
}

interface Category {
  id: number
  name: string
}

interface ApiResponse {
  success: boolean
  message: string
  data: {
    data: Product[]
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
  status: number
}

interface CategoryResponse {
  success: boolean
  message: string
  data: Category[]
  status: number
}

// Map category URL to product_type API parameter
const categoryToProductType: Record<string, string> = {
  "new-arrival": "New Arrival",
  "ready-stock": "Ready Stock",
  "sales-stock": "Stock Sales",
}

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

const collections = [
  { title: "Collection 1", image: "/collection1.jpg" },
  { title: "Collection 2", image: "/collection2.jpg" },
  { title: "Collection 3", image: "/collection3.jpg" },
  { title: "Collection 4", image: "/collection4.jpg" },
]

export default function CategoryPage() {
  const params = useParams()
  const category = (params?.category as string)?.toLowerCase() || "all"

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedColor, setSelectedColor] = useState("All")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalPages, setTotalPages] = useState(1)
  const [categories, setCategories] = useState<Category[]>([])
  const [categoriesLoading, setCategoriesLoading] = useState(true)

  const categoryInfo = categoryDescriptions[category] || { title: "Products", description: "" }
  const isValidCategory = Object.keys(categoryDescriptions).includes(category)

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true)
        const response = await fetch("http://127.0.0.1:8000/api/part-category")
        const json: CategoryResponse = await response.json()

        if (json.success && json.data && Array.isArray(json.data)) {
          setCategories(json.data)
        } else {
          console.log("[v0] Failed to load categories:", json.message)
          setCategories([])
        }
      } catch (err) {
        console.log("[v0] Category API Error:", err)
        setCategories([])
      } finally {
        setCategoriesLoading(false)
      }
    }

    fetchCategories()
  }, [])

  // Fetch products from API with product_type, category, color, and search filters
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)

        let url = `http://31.97.67.48:8000/api/customers/product?page=${currentPage}`

        // Add product_type filter based on category
        const productType = categoryToProductType[category]
        if (productType) {
          url += `&product_type=${encodeURIComponent(productType)}`
        }

        // Add search parameter if entered
        if (searchTerm) {
          url += `&name=${encodeURIComponent(searchTerm)}`
        }

        // Add category filter if selected
        if (selectedCategory !== "All") {
          url += `&category=${encodeURIComponent(selectedCategory)}`
        }

        // Add color filter if selected
        if (selectedColor !== "All") {
          url += `&color=${encodeURIComponent(selectedColor)}`
        }

        console.log("[v0] Fetching category products with URL:", url)
        const response = await fetch(url)
        const json: ApiResponse = await response.json()

        if (json.success && json.data && json.data.data) {
          setProducts(json.data.data)
          setTotalPages(json.data.last_page)
          setError(null)
        } else {
          setError(json.message || "Failed to load products")
          setProducts([])
        }
      } catch (err) {
        console.log("[v0] API Error:", err)
        setError("Failed to connect to server")
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [currentPage, category, selectedColor, selectedCategory, searchTerm])

  // Reset to page 1 when color, category, or search changes
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedColor, selectedCategory, searchTerm])

  // API already returns filtered data, use it directly
  const paginatedProducts = products
  const filteredProducts = products // Declare filteredProducts variable

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
                <DropdownMenuContent className="max-h-64 overflow-y-auto">
                  <DropdownMenuItem onClick={() => setSelectedColor("All")}>All</DropdownMenuItem>
                  {COLOR_OPTIONS.map((color) => (
                    <DropdownMenuItem
                      key={color}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </DropdownMenuItem>
                  ))}
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
                {categoriesLoading ? (
                  <DropdownMenuItem disabled>Loading...</DropdownMenuItem>
                ) : categories.length > 0 ? (
                  categories.map((cat) => (
                    <DropdownMenuItem
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.name)}
                    >
                      {cat.name}
                    </DropdownMenuItem>
                  ))
                ) : (
                  <DropdownMenuItem disabled>No categories available</DropdownMenuItem>
                )}
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
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <p className="text-gray-500">Loading products...</p>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-16">
              <div className="text-center">
                <p className="text-red-500 mb-2">{error}</p>
                <p className="text-gray-500 text-sm">Please try again later</p>
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex justify-center items-center py-16">
              <p className="text-gray-500">No products found</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
              {paginatedProducts.map((product) => (
                <div key={product.id} className="cursor-pointer group">
                  <div className="bg-white rounded-lg overflow-hidden mb-3 transition-transform duration-300 group-hover:scale-105">
                    <img
                      src={product.image1 || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full aspect-square object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder.svg"
                      }}
                    />
                  </div>

                  <div className="text-center">
                    <h3 className="text-gray-900 font-medium text-sm md:text-base">{product.name}</h3>
                    <p className="text-gray-600 text-xs md:text-sm">{product.product_type || product.category}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && !error && products.length > 0 && totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <button
                onClick={() => {
                  setCurrentPage(Math.max(1, currentPage - 1))
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {"< Previous"}
              </button>

              {(() => {
                const pages: (number | string)[] = []

                pages.push(1)

                if (currentPage <= 5) {
                  for (let i = 2; i <= Math.min(5, totalPages); i++) {
                    pages.push(i)
                  }
                  if (totalPages > 5) {
                    pages.push('...')
                    pages.push(totalPages)
                  }
                } else if (currentPage > totalPages - 4) {
                  pages.push('...')
                  for (let i = Math.max(2, totalPages - 4); i <= totalPages; i++) {
                    pages.push(i)
                  }
                } else {
                  pages.push('...')
                  pages.push(currentPage - 1)
                  pages.push(currentPage)
                  pages.push(currentPage + 1)
                  pages.push('...')
                  pages.push(totalPages)
                }

                return pages.map((page, idx) => {
                  if (page === '...') {
                    return (
                      <span key={`ellipsis-${idx}`} className="text-gray-500">
                        ...
                      </span>
                    )
                  }
                  return (
                    <button
                      key={page}
                      onClick={() => {
                        setCurrentPage(page as number)
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }}
                      className={`px-3 py-2 text-sm rounded ${
                        currentPage === page
                          ? "bg-gray-900 text-white"
                          : "text-gray-700 hover:text-gray-900"
                      }`}
                    >
                      {page}
                    </button>
                  )
                })
              })()}

              <button
                onClick={() => {
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {"Next >"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Collection Section */}
      <CollectionSection />

      <div>
        <FooterSection />
      </div>
      <WhatsAppButton />
    </main>
  )
}
