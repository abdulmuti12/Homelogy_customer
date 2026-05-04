"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

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
      staggerChildren: 0.08,
    },
  },
}

const cardReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

type Project = {
  file: string
  name: string
  project_time?: string
  designer?: string
}

const API_URL = "https://homelogystyle.com/api/customers/project/list"

function resolveImageUrl(file: string) {
  if (!file) return "/placeholder.svg"
  if (file.startsWith("http://") || file.startsWith("https://")) return file
  const cleanPath = file.startsWith("/") ? file : `/${file}`
  return `https://homelogystyle.com/storage${cleanPath}`
}

export function OurProjectSection() {
  const [projects, setProjects] = useState<Project[]>([])
  const [enlargedProject, setEnlargedProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadProjects() {
      try {
        const response = await fetch(API_URL, {
          next: { revalidate: 300 }, // ISR: revalidate every 5 minutes
        })
        if (!response.ok) throw new Error(`Failed: ${response.status}`)
        const payload = await response.json()
        if (!payload?.success || !Array.isArray(payload.data)) throw new Error("Invalid response")

        const loadedProjects: Project[] = payload.data
        if (!cancelled) {
          setProjects(loadedProjects)
          setLoading(false)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : String(err))
          setLoading(false)
        }
      }
    }

    loadProjects()
    return () => { cancelled = true }
  }, [])

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
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.div
          className="mb-12 max-w-3xl"
          variants={contentReveal}
        >
          <h2
            className="font-light text-3xl md:text-4xl lg:text-5xl text-amber-900 mb-6"
            style={{ marginTop: "1cm" }}
          >
            Our Project
          </h2>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed text-justify">
            <span className="block">
              Homelogy Style furniture is featured in a range of residential environments where design and
              lifestyle come together. Each project highlights the presence of carefully designed furniture
              pieces that shape the atmosphere of a space.
            </span>
            <br />
            <span className="block">
              Through thoughtful placement, refined materials, and elegant forms, Homelogy Style contributes
              to interiors that express sophistication and contemporary living. Our projects reflect the
              versatility of the collection and the ability of each piece to integrate seamlessly within
              curated interiors.
            </span>
          </p>
        </motion.div>

        <div className="w-full">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-sm bg-slate-200/80 animate-pulse"
                />
              ))}
            </div>
          ) : error ? (
            <div className="rounded-sm bg-red-50 border border-red-200 p-4 text-red-700 text-sm">
              Gagal memuat proyek: {error}
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
              initial="hidden"
              whileInView="visible"
              variants={gridReveal}
              viewport={{ once: true, amount: 0.1 }}
            >
              {projects.map((project, index) => {
                const imageUrl = resolveImageUrl(project.file)
                return (
                  <motion.button
                    key={`${project.file}-${index}`}
                    onClick={() => setEnlargedProject(project)}
                    className="group cursor-pointer"
                    variants={cardReveal}
                  >
                    <motion.div
                      className="bg-white rounded-lg overflow-hidden mb-4 transition-transform duration-300 group-hover:scale-105 relative"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Replace raw img with Next.js Image */}
                      <Image
                        src={imageUrl}
                        alt={project.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover aspect-square"
                        quality={70}
                        onError={(e) => {
                          const target = e.currentTarget as HTMLImageElement
                          target.src = "/placeholder.svg"
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
          >
            LOAD MORE
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-amber-700/30 transition-all group-hover:border-amber-700/50 group-hover:translate-x-1">
              <ArrowRight className="h-4 w-4 text-amber-700" />
            </span>
          </Link>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {enlargedProject && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setEnlargedProject(null)}
          >
            <motion.div
              className="relative w-full max-w-4xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full aspect-[4/3] overflow-hidden rounded-sm bg-black flex items-center justify-center">
                <Image
                  src={resolveImageUrl(enlargedProject.file)}
                  alt={enlargedProject.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 896px"
                  className="object-contain"
                  quality={85}
                  priority
                />
              </div>
              <button
                onClick={() => setEnlargedProject(null)}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-700"
                aria-label="Close"
              >
                <X className="h-6 w-6 text-amber-900" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}