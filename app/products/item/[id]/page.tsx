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
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/customers/product/${productId}`
        )
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
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">
            Product Not Found
          </h1>
          <p className="text-red-500 text-lg mb-4">
            {error || "The product you're looking for doesn't exist or has been removed."}
          </p>
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
      <div className="px-4 md:px-8 lg:px-16 py-2 pt-20 md:pt-24 bg-stone-200/80 backdrop-blur-sm">
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
      {/* Product Detail Section */}
<section className="px-4 md:px-8 lg:px-14 pt-2 pb-10 bg-stone-200/50 backdrop-blur-sm">
  <div className="max-w-5xl mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-6">
      
      {/* Left */}
      <div>
        <div className="bg-stone-300/50 rounded-lg overflow-hidden min-h-[460px]">
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
          />
        </div>
      </div>

      {/* Right Card */}
      <div className="bg-white rounded-lg p-6 lg:p-8 flex flex-col min-h-[460px]">
        
        <div className="text-center mb-4">
          <h1 className="font-serif text-3xl md:text-4xl text-gray-900 mb-1 leading-none">
            {product.name}
          </h1>
          <p className="text-gray-700 text-sm font-light">
            {product.brand}
          </p>
        </div>

        <div className="border-t border-gray-400 mb-3" />

        <p className="text-gray-700 text-sm leading-6 mb-3 text-justify">
          {product.description}
        </p>

        <div className="border-t border-gray-400 mb-4" />

        <div className="mb-4">
          <h2 className="text-gray-900 font-medium text-[10px] tracking-widest text-center mb-2">
            PRODUCT DETAILS
          </h2>

          <div className="space-y-2 text-left max-w-sm mx-auto">
            <div className="flex gap-2">
              <span className="text-gray-700 text-sm min-w-[65px]">Category</span>
              <span className="text-gray-700 text-sm">:</span>
              <span className="text-gray-700 text-sm">{product.category}</span>
            </div>

            <div className="flex gap-2">
              <span className="text-gray-700 text-sm min-w-[65px]">Material</span>
              <span className="text-gray-700 text-sm">:</span>
              <span className="text-gray-700 text-sm">{product.color}</span>
            </div>

            <div className="flex gap-2">
              <span className="text-gray-700 text-sm min-w-[65px]">Size</span>
              <span className="text-gray-700 text-sm">:</span>
              <span className="text-gray-700 text-sm">{product.size}</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-400 mb-3" />

        <div className="flex items-center justify-center gap-3 mt-10">
          {/* <Button className="h-8 px-4 bg-white text-gray-900 border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition-colors text-sm">
            +
          </Button>
          <Button className="h-8 px-6 bg-white text-gray-900 border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition-colors text-sm">
            ADD TO CART
          </Button> */}

         <a 
  href={`https://wa.me/6285174189869?text=Saya%20tertarik%20dengan%20produk%3A%20${encodeURIComponent(product.name)}%0A%0ALink%20produk%3A%20${encodeURIComponent(`${typeof window !== 'undefined' ? window.location.origin : ''}/products/item/${productId}`)}`}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-block" // Tambahkan ini agar layout kliknya sesuai ukuran button
>
  <Button className="h-8 px-6 bg-white text-gray-900 border-2 border-gray-900 hover:bg-gray-900 hover:text-white transition-colors text-sm w-full">
    ADD TO CART
  </Button>
</a>
        </div>
      </div>
    </div>

    {/* Thumbnails */}
   {/* Thumbnails */}
<div className="flex gap-2 justify-center mb-8">
  {[
    product.image1,
    product.image2,
    product.image3,
    product.image4,
    product.image5,
    product.image6,
  ]
    .filter((image) => image && image.trim() !== "")
    .map((image, index) => (
      <button
        key={index}
        onClick={() => setSelectedImageIndex(index)}
        className={`relative w-14 h-14 md:w-16 md:h-16 rounded overflow-hidden border transition-all ${
          selectedImageIndex === index
            ? "border-gray-900 scale-105"
            : "border-gray-400 hover:border-gray-600"
        }`}
      >
        <img
          src={image}
          alt={`${product.name} view ${index + 1}`}
          className="w-full h-full object-cover"
        />
      </button>
    ))}
</div>
  </div>
</section>

      <FooterSection />
      <WhatsAppButton />
    </main>
  )
}