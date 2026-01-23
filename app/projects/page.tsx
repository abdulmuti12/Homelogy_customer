"use client"

import { useState } from "react"
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

const projects = [
  {
    id: 1,
    title: "PI House",
    category: "Residential",
    image: "/luxury-living-room.jpg",
  },
  {
    id: 2,
    title: "PM House",
    category: "Residential",
    image: "/modern-interior-design.jpg",
  },
  {
    id: 3,
    title: "PIK Project",
    category: "Residential",
    image: "/contemporary-living-space.jpg",
  },
  {
    id: 4,
    title: "Rimau Office",
    category: "Office",
    image: "/modern-office-space.jpg",
  },
  {
    id: 5,
    title: "HNI OFFICE",
    category: "Office",
    image: "/corporate-office-interior.jpg",
  },
  {
    id: 6,
    title: "MIRROR MIRROR",
    category: "Residential",
    image: "/elegant-dining-room.jpg",
  },
]

const filterOptions = ["All", "Residential", "Office", "Others"]

export default function ProjectsPage() {
  const [selectedFilter, setSelectedFilter] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const filteredProjects = selectedFilter === "All" ? projects : projects.filter((p) => p.category === selectedFilter)

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProjects = filteredProjects.slice(startIndex, startIndex + itemsPerPage)

  return (
    <main className="min-h-screen relative">
      <SiteHeader />

      {/* Container utama untuk efek Magnetic/Snap */}
      <div
        className="overflow-y-auto snap-y snap-mandatory scroll-smooth"
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
          <section className="px-6 md:px-12 lg:px-20 py-6 pt-24 md:pt-28 min-h-screen flex flex-col">
            <div className="max-w-7xl mx-auto">
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

              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-16">
                  <motion.div
                    className="lg:w-1/3"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <motion.h1
                      className="font-light text-5xl md:text-6xl text-amber-900 font-serif mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7 }}
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      Our Project
                    </motion.h1>
                    <motion.p
                      className="text-gray-700 text-sm leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.2 }}
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                      laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                    </motion.p>
                  </motion.div>

                  <motion.div
                    className="lg:w-2/3 flex flex-wrap gap-3 lg:justify-end items-start"
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
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
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
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            className="w-full aspect-square object-cover"
                          />
                        </motion.div>

                        <motion.h3
                          className="text-gray-900 font-medium text-base md:text-lg"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                          viewport={{ once: true, amount: 0.2 }}
                        >
                          {project.title}
                        </motion.h3>
                      </Link>
                    </motion.div>
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
