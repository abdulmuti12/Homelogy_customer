"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
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

const filterOptions = ["All", "Residential", "Office", "Others"]

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedFilter, setSelectedFilter] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customers/project`)
        const json: ApiResponse = await response.json()

        console.log("[v0] Projects API Response:", json)

        if (json.success && json.data?.data) {
          setProjects(json.data.data)
          setError(null)
        } else {
          setError(json.message || "Failed to load projects")
          setProjects([])
        }
      } catch (err) {
        console.log("[v0] Projects API Error:", err)
        setError("Failed to connect to server")
        setProjects([])
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const filteredProjects = selectedFilter === "All" ? projects : projects.filter((p) => p.category === selectedFilter)

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + itemsPerPage)

  return (
    <main className="min-h-screen relative">
      <SiteHeader />

      {/* Container utama untuk efek Magnetic/Snap */}
      <div
        className="h-screen overflow-y-auto no-scrollbar snap-y snap-mandatory scroll-smooth"
        style={{
          backgroundImage: "url(/xdf.jpg)",
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
                <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-8 mb-12 md:mb-16">
                  <motion.div
                    className="w-full xl:w-3/5"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <motion.h1
                      className="font-light text-[clamp(2.25rem,4.8vw,5rem)] text-amber-900 font-serif mb-5 md:mb-6 leading-tight"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7 }}
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      Our Project
                    </motion.h1>
                    <motion.p
                      className="text-gray-700 text-sm md:text-base 2xl:text-lg leading-relaxed max-w-4xl"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.2 }}
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      <span className="block">
                        Homelogy Style furniture is featured in a range of residential environments where design and lifestyle come together.
                      </span>
                      <span className="block">
                        Each project highlights the presence of carefully designed furniture pieces that shape the atmosphere of a space.
                      </span>
                      {/* <span className="block lg:whitespace-nowrap text-justify [text-align-last:justify]">
                        Through thoughtful placement, refined materials, and elegant forms, Homelogy Style contributes to interiors that express sophistication and contemporary living.
                      </span> */}
                    </motion.p>
                  </motion.div>

                  <motion.div
                    className="w-full xl:w-2/5 flex flex-wrap gap-3 md:gap-4 xl:justify-end items-start"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    {filterOptions.map((filter) => (
                      <motion.button
                        key={filter}
                        onClick={() => {
                          setSelectedFilter(filter)
                          setCurrentPage(1)
                        }}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all 2xl:px-7 2xl:py-2.5 2xl:text-base ${
                          selectedFilter === filter ? "bg-amber-900 text-white" : "bg-gray-800 text-white hover:bg-gray-700"
                        }`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true, amount: 0.3 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {filter}
                      </motion.button>
                    ))}
                  </motion.div>
                </div>

                {loading ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600">Loading projects...</p>
                  </div>
                ) : error ? (
                  <div className="text-center py-12">
                    <p className="text-red-500 font-medium">{error}</p>
                  </div>
                ) : projects.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-600">No projects found</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 md:gap-8 2xl:gap-10 mb-12 md:mb-16">
                    {paginatedProjects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true, amount: 0.2 }}
                      >
                        <Link href={`/projects/${project.id}`} className="cursor-pointer group">
                          <motion.div
                            className="bg-white rounded-lg overflow-hidden mb-4 transition-transform duration-300 group-hover:scale-105"
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.3 }}
                          >
                            <img
                              src={project.file || "/placeholder.svg"}
                              alt={project.name}
                              className="w-full aspect-square object-cover"
                              onError={(e) => {
                                e.currentTarget.src = "/placeholder.svg"
                              }}
                            />
                          </motion.div>

                          <motion.div
                            className="flex flex-col gap-1"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                            viewport={{ once: true, amount: 0.2 }}
                          >
                            <h3 className="text-gray-900 font-medium text-base md:text-lg 2xl:text-xl">{project.name}</h3>
                            <p className="text-gray-600 text-sm 2xl:text-base">{project.architect}</p>
                          </motion.div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                )}

                {!loading && projects.length > 0 && (
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
