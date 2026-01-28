"use client"

import { useState } from "react"
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
import { getProductById, getRelatedProducts } from "@/lib/products"

export default function ProductDetailPage() {
  const params = useParams()
  const productId = Number(params.id)
  const product = getProductById(productId)
  const relatedProducts = getRelatedProducts(productId)

  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-50 to-stone-100">
        <SiteHeader />
        <div className="text-center px-6">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 text-lg mb-8">The product you're looking for doesn't exist or has been removed.</p>
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
                  src={product.gallery?.[selectedImageIndex] || product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnail Images */}
              <div className="flex gap-3 justify-center">
                {(product.gallery || [product.image]).map((image, index) => (
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
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Product Info Card */}
            <div className="bg-white rounded-lg shadow-xl p-8 md:p-12 lg:p-16">
              {/* Product Name */}
              <h1 className="font-serif text-5xl md:text-6xl text-gray-900 mb-2">{product.name}</h1>
              <p className="text-gray-600 text-lg mb-8">{product.type}</p>

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
                    <span className="text-gray-700 text-sm w-32">Material</span>
                    <span className="text-gray-700 text-sm">:</span>
                    <span className="text-gray-700 text-sm ml-4">{product.material}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-gray-700 text-sm w-32">Size</span>
                    <span className="text-gray-700 text-sm">:</span>
                    <span className="text-gray-700 text-sm ml-4">{product.size}</span>
                  </div>
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex items-center gap-4">
                 <Button className="flex-1 h-10 bg-white text-gray-900 border border-gray-900 hover:bg-gray-900 hover:text-white transition-colors">
                  Get Contact
                </Button>

                <Button className="flex-1 h-10 bg-white text-gray-900 border border-gray-900 hover:bg-gray-900 hover:text-white transition-colors">
                  Visit Website
                </Button>
              </div>
            </div>
          </div>

          {/* You May Also Like Section */}
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-12">You may also like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/products/item/${relatedProduct.id}`} className="group cursor-pointer">
                  <div className="bg-white rounded-lg overflow-hidden mb-3 shadow-md transition-transform duration-300 group-hover:scale-105">
                    <img
                      src={relatedProduct.image || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      className="w-full aspect-square object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="text-gray-900 font-medium text-sm md:text-base">{relatedProduct.name}</h3>
                    <p className="text-gray-600 text-xs md:text-sm">{relatedProduct.type}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
      <WhatsAppButton />
    </main>
  )
}
