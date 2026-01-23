"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

const collections = [
  {
    title: "New Arrival",
    image: "/Asset-28.jpg",
    slug: "new-arrival",
  },
  {
    title: "Ready Stock",
    image: "/Asset-29.jpg",
    slug: "ready-stock",
  },
  {
    title: "Sales Stock",
    image: "/Asset-30.jpg",
    slug: "sales-stock",
  },
  {
    title: "All Products",
    image: "/Asset-31.jpg",
    slug: "all",
  },
]

export function CollectionSection() {
  return (
    <section
      className="flex flex-col justify-center bg-cover bg-top relative py-20"
      style={{ backgroundImage: "url(/images/collection-bg.jpg)", minHeight: "105vh" }}
    >
      <div className="w-full relative z-10">
        {/* Grid of collections */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 mt-6">
          {collections.map((collection) => (
            <Link
              key={collection.title}
              href={`/products/category/${collection.slug}`}
              className="group relative aspect-[3/5] overflow-hidden"
            >
              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${collection.image})` }}
              />

              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                <h3 className="font-light text-white text-lg md:text-xl lg:text-2xl">{collection.title}</h3>
              </div>
            </Link>
          ))}
        </div>

        {/* View all button */}
        <div className="mt-8 md:mt-12 flex justify-center">
          <Link
            href="/products/category/all"
            className="group inline-flex items-center gap-3 text-amber-700 text-sm md:text-base tracking-wider uppercase hover:text-amber-800 transition-colors"
          >
            VIEW ALL COLLECTIONS
            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-700/30 transition-all group-hover:border-amber-700/50 group-hover:translate-x-1">
              <ArrowRight className="h-5 w-5 text-amber-700" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
