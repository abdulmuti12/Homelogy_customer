"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, X } from "lucide-react"
import { motion } from "framer-motion"

const sectionFade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
}

const contentReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const gridReveal = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

type Project = {
  file: string
  name: string
  project_time?: string
  designer?: string
}

const API_URL = "https://homelogystyle.com/api/customers/project/list"
const IMAGE_ORIGIN = "https://homelogystyle.com"

export function OurProjectSection() {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [enlargedProject, setEnlargedProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadProjects() {
      try {
        const response = await fetch(API_URL)
        if (!response.ok) {
          throw new Error(`Failed to load projects: ${response.status}`)
        }

        const payload = await response.json()
        if (!payload?.success || !Array.isArray(payload.data)) {
          throw new Error("Invalid project API response")
        }

        const loadedProjects: Project[] = payload.data
        if (!cancelled) {
          setProjects(loadedProjects)
          setSelectedProject(loadedProjects[0] ?? null)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : String(err))
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadProjects()
    return () => {
      cancelled = true
    }
  }, [])

  function resolveImageUrl(file: string) {
    if (!file) return "/placeholder.svg"

    if (file.startsWith("http://") || file.startsWith("https://")) {
      return file
    }

    const cleanPath = file.startsWith("/") ? file : `/${file}`
    return `https://homelogystyle.com/storage${cleanPath}`
  }

  return (
    <section
      className="flex flex-col justify-center min-h-screen bg-cover bg-top relative"
      style={{ backgroundImage: "url(/images/xdf.jpg)" }}
    >
      <motion.div
        className="w-full relative z-10 px-6 md:px-12 lg:px-20"
        initial="hidden"
        whileInView="visible"
        variants={sectionFade}
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Title and Description */}
        <motion.div
          className="mb-12 max-w-3xl"
          variants={contentReveal}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2
            className="text-3xl md:text-4xl lg:text-5xl text-amber-900 mb-6"
            style={{ marginTop: "1cm", fontFamily: "\"Adobe Garamond Pro\", Garamond", fontWeight: 400 }}
          >
            Our Project
          </h2>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed text-justify" style={{ fontFamily: "\"Din Pro\", \"Din_Pro\"", fontWeight: 400 }}>
            <span className="block">
              Homelogy Style furniture is featured in a range of residential environments where design and lifestyle come together.
            {/* </span>
            <span className="block"> */}
              Each project highlights the presence of carefully designed furniture pieces that shape the atmosphere of a space.
            </span>
                        <br />

            <span className="block">
              Through thoughtful placement, refined materials, and elegant forms, Homelogy Style contributes to interiors that express sophistication and contemporary living.
            {/* </span>
            <span className="block"> */}
              Our projects reflect the versatility of the collection and the ability of each piece to integrate seamlessly within curated interiors.
            </span>
          </p>
        </motion.div>

        {/* Gallery Container */}
        <div className="w-full">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="aspect-square rounded-sm bg-slate-200/80 animate-pulse" />
              ))}
            </div>
          ) : error ? (
            <div className="rounded-sm bg-red-50 border border-red-200 p-4 text-red-700">
              Gagal memuat proyek: {error}
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
              initial="hidden"
              whileInView="visible"
              variants={gridReveal}
              viewport={{ once: true, amount: 0.2 }}
            >
              {projects.map((project, index) => {
                const imageUrl = resolveImageUrl(project.file)
                return (
                  <motion.button
                    key={`${project.file}-${index}`}
                    onClick={() => {
                      setSelectedProject(project)
                      setEnlargedProject(project)
                    }}
                    className="group cursor-pointer"
                    variants={cardReveal}
                  >
                    <motion.div
                      className="bg-white rounded-lg overflow-hidden mb-4 transition-transform duration-300 group-hover:scale-105 relative"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        src={imageUrl}
                        alt={project.name}
                        className="w-full aspect-square object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg"
                        }}
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 md:p-3">
                        <p className="text-white text-xs font-light">{project.name}</p>
                      </div>
                    </motion.div>
                  </motion.button>
                )
              })}
            </motion.div>
          )}
        </div>

        {/* {selectedProject && (
          <motion.div
            className="mt-8 rounded-sm bg-white/90 p-4 text-sm text-gray-700 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <p className="font-semibold text-amber-900">{selectedProject.name}</p>
            {selectedProject.designer ? (
              <p className="mt-1 text-xs">Designer: {selectedProject.designer}</p>
            ) : null}
            {selectedProject.project_time ? (
              <p className="mt-1 text-xs text-gray-600">{selectedProject.project_time}</p>
            ) : null}
          </motion.div>
        )} */}

        {/* Featured Project Title and Load More */}
        <motion.div
          className="flex justify-end mt-8 md:mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-amber-700 text-xs md:text-sm tracking-wider uppercase hover:text-amber-800 transition-colors"
            style={{ fontFamily: '"Din Pro", "Din_Pro"', fontWeight: 400 }}
          >
            LOAD MORE
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-amber-700/30 transition-all group-hover:border-amber-700/50 group-hover:translate-x-1">
              <ArrowRight className="h-4 w-4 text-amber-700" />
            </span>
          </Link>
        </motion.div>
      </motion.div>

      {enlargedProject && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setEnlargedProject(null)}
        >
          <div className="relative w-full max-w-4xl">
            <div className="w-full aspect-[4/3] overflow-hidden rounded-sm bg-black">
              <img
                src={resolveImageUrl(enlargedProject.file)}
                alt={enlargedProject.name}
                className="h-full w-full object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
            <button
              onClick={() => setEnlargedProject(null)}
              className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-700"
              aria-label="Close"
            >
              <X className="h-6 w-6 text-amber-900" />
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
