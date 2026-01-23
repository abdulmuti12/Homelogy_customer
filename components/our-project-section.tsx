"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, X } from "lucide-react"
import { motion } from "framer-motion"

const projects = [
  {
    id: 1,
    title: "PI House",
    image: "/modern-living-room.png",
  },
  {
    id: 2,
    title: "PM House",
    image: "/luxury-bedroom.png",
  },
  {
    id: 3,
    title: "PIK Project",
    image: "/contemporary-office-space-design.jpg",
  },
  {
    id: 4,
    title: "Rimau Office",
    image: "/modern-office-interior.png",
  },
]

export function OurProjectSection() {
  const [selectedProject, setSelectedProject] = useState(projects[1])
  const [enlargedImage, setEnlargedImage] = useState<number | null>(null)

  return (
    <section
      className="flex flex-col justify-center min-h-screen bg-cover bg-top relative"
      style={{ backgroundImage: "url(/images/collection-bg.jpg)" }}
    >
      <motion.div
        className="w-full relative z-10 px-6 md:px-12 lg:px-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Title and Description */}
        <motion.div
          className="mb-12 max-w-2xl"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="font-light text-3xl md:text-4xl lg:text-5xl text-amber-900 mb-6">Our Project</h2>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
            dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
          </p>
        </motion.div>

        {/* Gallery Container */}
        <div className="w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {projects.map((project, index) => (
              <motion.button
                key={project.id}
                onClick={() => {
                  setSelectedProject(project)
                  setEnlargedImage(project.id)
                }}
                className="group relative aspect-square overflow-hidden rounded-sm cursor-pointer transition-all hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-amber-700 focus:ring-offset-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 md:p-3">
                  <p className="text-white text-xs font-light">{project.title}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Featured Project Title and Load More */}
        <motion.div
          className="flex justify-end mt-8 md:mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true, amount: 0.3 }}
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

      {enlargedImage !== null && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
          onClick={() => setEnlargedImage(null)}
        >
          <div className="relative w-full max-w-4xl">
            <img
              src={projects.find((p) => p.id === enlargedImage)?.image || "/placeholder.svg"}
              alt={projects.find((p) => p.id === enlargedImage)?.title}
              className="w-full h-auto rounded-sm"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setEnlargedImage(null)}
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
