"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
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
import { Button } from "@/components/ui/button"

interface ProductData {
  id: number
  name: string
  category: string
  description: string
  size: string
  color: string
  image1: string
  image2: string
  image3: string
  image4: string
  image5: string
  image6: string
  brand: string
  link?: string
  recomended_products: Array<{
    id: number
    name: string
    image1: string
    brand: string
  }>
}

interface ApiResponse {
  success: boolean
  message: string
  data: {
    general: ProductData
  }
  status: number
}

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id
  
  const [product, setProduct] = useState<ProductData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [relatedProducts, setRelatedProducts] = useState<ProductData["recomended_products"]>([])

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customers/product/${productId}`)
        const json: ApiResponse = await response.json()

        console.log("[v0] Product API Response:", json)

        if (json.success && json.data?.general) {
          setProduct(json.data.general)
          setRelatedProducts(json.data.general.recomended_products)
          setError(null)
        } else {
          setError(json.message || "Failed to load product details")
          setProduct(null)
        }
      } catch (err) {
        console.log("[v0] Product API Error:", err)
        setError("Failed to connect to server")
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }

    if (productId) {
      fetchProduct()
    }
  }, [productId])

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-50 to-stone-100">
        <SiteHeader />
        <div className="text-center px-6">
          <p className="text-gray-600 text-lg">Loading product...</p>
        </div>
        <WhatsAppButton />
      </main>
    )
  }

  if (error || !product) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-50 to-stone-100">
        <SiteHeader />
        <div className="text-center px-6">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-red-500 text-lg mb-4">{error || "The product you're looking for doesn't exist or has been removed."}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/products" 
              className="px-6 py-3 bg-amber-900 text-white rounded hover:bg-amber-800 transition-colors"
            >
              Back to Products
            </Link>
            <Link 
              href="/" 
              className="px-6 py-3 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
        <WhatsAppButton />
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
      <div className="px-6 md:px-12 lg:px-20 py-6 pt-24 md:pt-28 bg-stone-200/80 backdrop-blur-sm">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/" className="text-gray-600 hover:text-gray-900">
                  Home
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/products" className="text-gray-600 hover:text-gray-900">
                  Products
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-gray-900">{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Product Detail Section */}
      <section className="px-6 md:px-12 lg:px-20 py-16 bg-stone-200/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          {/* Split Layout: Image Left, Info Card Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
            {/* Left: Product Image */}
            <div className="flex flex-col gap-6">
              {/* Main Image */}
              <div className="bg-stone-300/50 rounded-lg overflow-hidden shadow-lg aspect-[4/3]">
                <img
                  src={
                    selectedImageIndex === 0
                      ? product.image1
                      : selectedImageIndex === 1
                        ? product.image2
                        : selectedImageIndex === 2
                          ? product.image3
                          : selectedImageIndex === 3
                            ? product.image4
                            : selectedImageIndex === 4
                              ? product.image5
                              : product.image6
                  }
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg"
                  }}
                />
              </div>

              {/* Thumbnail Images */}
              <div className="flex gap-3 justify-center">
                {[product.image1, product.image2, product.image3, product.image4, product.image5, product.image6].map(
                  (image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative w-16 h-16 md:w-20 md:h-20 rounded overflow-hidden border-2 transition-all ${
                        selectedImageIndex === index
                          ? "border-gray-900 scale-105"
                          : "border-gray-300 hover:border-gray-500"
                      }`}
                    >
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg"
                        }}
                      />
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Right: Product Info Card */}
            <div className="bg-white rounded-lg shadow-xl p-8 md:p-12 lg:p-16">
              {/* Product Name */}
              <h1 className="font-serif text-5xl md:text-6xl text-gray-900 mb-2">{product.name}</h1>
              <p className="text-gray-600 text-lg mb-8">{product.brand}</p>

              {/* Product Description */}
              <p className="text-gray-700 text-sm leading-relaxed mb-12 text-justify">{product.description}</p>

              {/* Product Details */}
              <div className="mb-12">
                <h2 className="text-gray-900 font-medium text-sm tracking-wider mb-6">PRODUCT DETAILS</h2>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="text-gray-700 text-sm w-32">Category</span>
                    <span className="text-gray-700 text-sm">:</span>
                    <span className="text-gray-700 text-sm ml-4">{product.category}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-gray-700 text-sm w-32">Color</span>
                    <span className="text-gray-700 text-sm">:</span>
                    <span className="text-gray-700 text-sm ml-4">{product.color}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-gray-700 text-sm w-32">Size</span>
                    <span className="text-gray-700 text-sm">:</span>
                    <span className="text-gray-700 text-sm ml-4">{product.size}</span>
                  </div>
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex flex-col gap-3">
                <a
                  href={`https://wa.me/6285174189869?text=Saya%20tertarik%20dengan%20produk%3A%20${encodeURIComponent(product.name)}%0A%0ALink%20produk%3A%20${encodeURIComponent(`${typeof window !== 'undefined' ? window.location.origin : ''}/products/item/${productId}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 bg-white text-gray-900 border border-gray-900 hover:bg-gray-900 hover:text-white transition-colors rounded flex items-center justify-center font-medium"
                >
                  Get Contact
                </a>

                {product.link && (
                  <a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 bg-amber-900 text-white border border-amber-900 hover:bg-amber-800 hover:border-amber-800 transition-colors rounded flex items-center justify-center font-medium"
                  >
                    Visit Website
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* You May Also Like Section */}
          {product.recomended_products && product.recomended_products.length > 0 && (
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-12">You may also like</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {product.recomended_products.map((relatedProduct) => (
                  <Link
                    key={relatedProduct.id}
                    href={`/products/item/${relatedProduct.id}`}
                    className="group cursor-pointer"
                  >
                    <div className="bg-white rounded-lg overflow-hidden mb-3 shadow-md transition-transform duration-300 group-hover:scale-105">
                      <img
                        src={relatedProduct.image1 || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        className="w-full aspect-square object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg"
                        }}
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="text-gray-900 font-medium text-sm md:text-base">{relatedProduct.name}</h3>
                      <p className="text-gray-600 text-xs md:text-sm">{relatedProduct.brand}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <FooterSection />
      <WhatsAppButton />
    </main>
  )
}
