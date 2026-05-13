"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { FooterSection } from "@/components/footer-section"
import { WhatsAppButton } from "@/components/whatsapp-button"

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

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://homelogystyle.com/api"

function resolveImageUrl(file: string) {
  if (!file) return "/placeholder.svg"
  if (file.startsWith("http://") || file.startsWith("https://")) return file
  const cleanPath = file.startsWith("/") ? file : `/${file}`
  return `https://homelogystyle.com/storage${cleanPath}`
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
    let cancelled = false

    async function fetchProject() {
      try {
        const response = await fetch(`${API_URL}/customers/project/${projectId}`, {
          next: { revalidate: 300 },
        })
        const json: ApiResponse = await response.json()

        if (json.success && json.data?.general && !cancelled) {
          setProject(json.data.general)
          setError(null)
        } else if (!cancelled) {
          setError(json.message || "Failed to load project details")
        }
      } catch {
        if (!cancelled) setError("Failed to connect to server")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    if (projectId) fetchProject()
    return () => { cancelled = true }
  }, [projectId])

  const galleryImages = useMemo(() => {
    if (!project) return []
    return [project.file, project.file2, project.file3, project.file4]
      .filter((img): img is string => typeof img === "string" && img.trim() !== "")
      .map((img) => img.trim())
  }, [project])

  const visibleThumbCount = 3

  const thumbnailStartIndex = useMemo(() => {
    if (galleryImages.length <= visibleThumbCount) return 0
    const maxStart = galleryImages.length - visibleThumbCount
    return Math.min(Math.max(currentImageIndex - visibleThumbCount + 1, 0), maxStart)
  }, [galleryImages.length, currentImageIndex])

  const visibleGalleryImages = useMemo(
    () =>
      galleryImages
        .slice(thumbnailStartIndex, thumbnailStartIndex + visibleThumbCount)
        .map((image, offset) => ({
          image,
          index: thumbnailStartIndex + offset,
        })),
    [galleryImages, thumbnailStartIndex],
  )

  useEffect(() => {
    if (galleryImages.length && currentImageIndex > galleryImages.length - 1) {
      setCurrentImageIndex(0)
    }
  }, [galleryImages, currentImageIndex])

  const handlePreviousImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))
  }

  const currentImage = galleryImages[currentImageIndex] || "/placeholder.svg"

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

  return (
    <main
      className="min-h-screen bg-gray-100"
      style={{ fontFamily: '"Din Pro", "Din_Pro", sans-serif', fontWeight: 400 }}
    >
      <SiteHeader />

      <section className="px-6 md:px-12 lg:px-20 py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 mt-4 mb-12 group"
          >
            <div className="w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </div>
            <span className="text-sm tracking-wide uppercase">Back to Projects</span>
          </button>

          {/* Main Content: Left Info + Right Image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Left: Project Info */}
            <div className="flex flex-col justify-start">
              <h1
                className="text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-8"
                style={{ fontFamily: '"Adobe Garamond Pro", Garamond, serif', fontWeight: 400 }}
              >
                {project.name}
              </h1>

              <div className="mb-8 space-y-3 text-sm">
                {[
                  { label: "Architect", value: project.architect },
                  { label: "Location", value: project.location },
                  { label: "Year", value: project.project_time },
                  { label: "Photo", value: project.photo_created },
                ].map(({ label, value }) => (
                  <div key={label} className="grid grid-cols-[110px_12px_1fr] items-start">
                    <span className="text-gray-600">{label}</span>
                    <span className="text-gray-900">:</span>
                    <span className="text-gray-900">{value}</span>
                  </div>
                ))}
              </div>

              <p
                className="text-gray-700 text-sm leading-relaxed"
                style={{ fontFamily: '"Din Pro", "Din_Pro", sans-serif', fontWeight: 400 }}
              >
                {project.description}
              </p>
            </div>

            {/* Right: Main Image with Navigation */}
            <div className="flex flex-col gap-4">
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg bg-gray-300">
                <Image
                  src={resolveImageUrl(currentImage)}
                  alt={project.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  quality={80}
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
              {visibleGalleryImages.map(({ image, index }) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative w-full aspect-square rounded-lg overflow-hidden transition-all ${
                    index === currentImageIndex ? "ring-2 ring-amber-700" : "hover:opacity-80"
                  }`}
                >
                  <Image
                    src={resolveImageUrl(image)}
                    alt={`Gallery ${index + 1}`}
                    fill
                    sizes="33vw"
                    className="object-cover"
                    quality={65}
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
