"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
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

interface Project {
  id: number
  name: string
  architect: string
  file: string
  category?: string
}

interface ApiResponse {
  success: boolean
  message: string
  data: {
    data: Project[]
  }
}

const filterOptions = ["All", "Residentials", "Office", "Others"]

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://homelogystyle.com/api"

function resolveImageUrl(file: string) {
  if (!file) return "/placeholder.svg"
  if (file.startsWith("http://") || file.startsWith("https://")) return file
  const cleanPath = file.startsWith("/") ? file : `/${file}`
  return `https://homelogystyle.com/storage${cleanPath}`
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedFilter, setSelectedFilter] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  useEffect(() => {
    let cancelled = false

    async function fetchProjects() {
      try {
        const response = await fetch(`${API_URL}/customers/project`, {
          next: { revalidate: 300 },
        })
        const json: ApiResponse = await response.json()

        if (json.success && json.data?.data && !cancelled) {
          setProjects(json.data.data)
          setError(null)
        } else if (!cancelled) {
          setError(json.message || "Failed to load projects")
        }
      } catch {
        if (!cancelled) setError("Failed to connect to server")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchProjects()
    return () => { cancelled = true }
  }, [])

  const filteredProjects =
    selectedFilter === "All"
      ? projects
      : projects.filter((p) => p.category === selectedFilter)

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + itemsPerPage)

  return (
    <main className="min-h-screen relative">
      <SiteHeader />

      <div
        className="h-screen overflow-y-auto no-scrollbar snap-y snap-mandatory scroll-smooth"
        style={{
          backgroundImage: "url(/images/xdf.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          scrollPaddingTop: "0",
          scrollBehavior: "smooth",
        }}
      >
        <div className="snap-start">
          <section className="px-6 md:px-12 lg:px-20 2xl:px-24 py-6 pt-24 md:pt-28 lg:pt-32 min-h-screen flex flex-col">
            <div className="w-full max-w-[1800px] mx-auto">
              {/* Breadcrumb */}
              <div className="mb-12">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link href="/">Home</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Projects</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              <div className="w-full">
                {/* Header Row */}
                <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-8 mb-12 md:mb-16">
                  <div className="w-full xl:w-3/5">
                    <h1
                      className="text-[clamp(2.25rem,4.8vw,5rem)] text-amber-900 mb-5 md:mb-6 leading-tight"
                      style={{ fontFamily: '"Adobe Garamond Pro", Garamond, serif', fontWeight: 400 }}
                    >
                      Our Project
                    </h1>
                    <p className="text-gray-700 text-sm md:text-base 2xl:text-lg leading-relaxed max-w-4xl">
                      <span className="block">
                        Homelogy Style furniture is featured in a range of residential environments where
                        design and lifestyle come together. Each project highlights the presence of carefully
                        designed furniture pieces that shape the atmosphere of a space.
                      </span>
                    </p>
                  </div>

                  {/* Filter Buttons */}
                  <div className="w-full xl:w-2/5 flex flex-wrap gap-3 md:gap-4 xl:justify-end items-start">
                    {filterOptions.map((filter) => (
                      <button
                        key={filter}
                        onClick={() => {
                          setSelectedFilter(filter)
                          setCurrentPage(1)
                        }}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all 2xl:px-7 2xl:py-2.5 2xl:text-base ${
                          selectedFilter === filter
                            ? "bg-amber-900 text-white"
                            : "bg-gray-800 text-white hover:bg-gray-700"
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Loading State */}
                {loading ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 md:gap-8 2xl:gap-10">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="space-y-3">
                        <div className="aspect-square rounded-lg bg-gray-200 animate-pulse" />
                        <div className="h-4 w-3/4 rounded bg-gray-200 animate-pulse" />
                        <div className="h-3 w-1/2 rounded bg-gray-200 animate-pulse" />
                      </div>
                    ))}
                  </div>
                ) : error ? (
                  <div className="text-center py-12">
                    <p className="text-red-500 font-medium">{error}</p>
                  </div>
                ) : paginatedProjects.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600">No projects found</p>
                  </div>
                ) : (
                  <>
                    {/* Project Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 md:gap-8 2xl:gap-10 mb-12 md:mb-16">
                      {paginatedProjects.map((project) => (
                        <Link
                          key={project.id}
                          href={`/projects/${project.id}`}
                          className="group"
                        >
                          <div className="bg-white rounded-lg overflow-hidden mb-4 transition-transform duration-300 group-hover:scale-105">
                            <div className="relative w-full aspect-square">
                              <Image
                                src={resolveImageUrl(project.file)}
                                alt={project.name}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, (max-width: 1536px) 33vw, 25vw"
                                className="object-cover"
                                quality={70}
                              />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <h3
                              className="text-gray-900 text-base md:text-lg 2xl:text-xl"
                              style={{ fontFamily: '"Din Pro", "Din_Pro"', fontWeight: 400 }}
                            >
                              {project.name}
                            </h3>
                            <p
                              className="text-gray-600 text-sm 2xl:text-base"
                              style={{ fontFamily: '"Din Pro", "Din_Pro"', fontWeight: 400 }}
                            >
                              {project.architect}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex items-center justify-center gap-2 flex-wrap">
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
                              currentPage === page
                                ? "bg-gray-900 text-white"
                                : "text-gray-700 hover:text-gray-900"
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
                )}
              </div>
            </div>
          </section>
        </div>

        <div className="snap-start">
          <FooterSection />
        </div>
      </div>

      <WhatsAppButton />
    </main>
  )
}
