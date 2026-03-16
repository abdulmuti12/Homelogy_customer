"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { FooterSection } from "@/components/footer-section"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ProjectData {
  id: number
  name: string
  architect: string
  location: string
  project_time: string
  photo_created: string
  description: string
  file: string
  file2: string
  file3: string
  file4: string
  designer: string
  note: string
}

interface ApiResponse {
  success: boolean
  message: string
  data: {
    general: ProjectData
  }
}

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [project, setProject] = useState<ProjectData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customers/project/${projectId}`)
        const json: ApiResponse = await response.json()

        console.log("[v0] Project Detail API Response:", json)

        if (json.success && json.data?.general) {
          setProject(json.data.general)
          setError(null)
        } else {
          setError(json.message || "Failed to load project details")
          setProject(null)
        }
      } catch (err) {
        console.log("[v0] Project Detail API Error:", err)
        setError("Failed to connect to server")
        setProject(null)
      } finally {
        setLoading(false)
      }
    }

    if (projectId) {
      fetchProject()
    }
  }, [projectId])

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100">
        <SiteHeader />
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-600">Loading project...</p>
        </div>
      </main>
    )
  }

  if (error || !project) {
    return (
      <main className="min-h-screen bg-gray-100">
        <SiteHeader />
        <div className="flex items-center justify-center h-96">
          <p className="text-red-500">{error || "Project not found"}</p>
        </div>
      </main>
    )
  }

  const galleryImages = [project.file, project.file2, project.file3, project.file4].filter(Boolean)

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))
  }

  const currentImage = galleryImages[currentImageIndex] || "/placeholder.svg"

  return (
    <main className="min-h-screen bg-gray-100">
      <SiteHeader />

      {/* Project Detail Section */}
      <section className="px-6 md:px-12 lg:px-20 py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 mb-12 group"
          >
            <div className="w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </div>
            <span className="text-sm font-light tracking-wide uppercase">Back to Projects</span>
          </button>

          {/* Main Content: Left Info + Right Image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Left: Project Info */}
            <div className="flex flex-col justify-start">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-8 font-serif">
                {project.name}
              </h1>

              {/* Project Details */}
              <div className="mb-8 space-y-3 text-sm">
                <div className="flex gap-6">
                  <span className="text-gray-600 font-light">Architect</span>
                  <span className="text-gray-900">: {project.architect}</span>
                </div>
                <div className="flex gap-6">
                  <span className="text-gray-600 font-light">Location</span>
                  <span className="text-gray-900">: {project.location}</span>
                </div>
                <div className="flex gap-6">
                  <span className="text-gray-600 font-light">Year</span>
                  <span className="text-gray-900">: {project.project_time}</span>
                </div>
                <div className="flex gap-6">
                  <span className="text-gray-600 font-light">Photo</span>
                  <span className="text-gray-900">: {project.photo_created}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 text-sm leading-relaxed font-light">{project.description}</p>
            </div>

            {/* Right: Main Image with Navigation */}
            <div className="flex flex-col gap-4">
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg bg-gray-300">
                <img
                  src={currentImage || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Image Navigation Arrows */}
              <div className="flex justify-end gap-4">
                <button
                  onClick={handlePreviousImage}
                  className="p-2 rounded-full border border-gray-400 hover:bg-gray-200 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-700" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="p-2 rounded-full border border-gray-400 hover:bg-gray-200 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>
          </div>

          {/* Gallery Thumbnails */}
          {galleryImages.length > 0 && (
            <div className="grid grid-cols-3 gap-6">
              {galleryImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative w-full aspect-square rounded-lg overflow-hidden transition-all ${
                    index === currentImageIndex ? "ring-2 ring-amber-700" : "hover:opacity-80"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg"
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <FooterSection />
      <WhatsAppButton />
    </main>
  )
}
