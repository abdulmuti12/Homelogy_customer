"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Slide {
  image: string
  title: string
  subtitle?: string
  description: string
  tag?: string
}

const API_URL = process.env.NEXT_PUBLIC_HOME_BANNER_API_URL || "https://homelogystyle.com/api/home-banner"

export function HeroSlider() {
  const [slides, setSlides] = useState<Slide[]>([])
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Fetch slides from API
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch(API_URL)
        const json = await res.json()
        if (json.success && json.data) {
          const mappedSlides: Slide[] = json.data.map((item: { src: string; title: string; description: string; subtitle?: string; alt?: string; tag?: string }) => ({
            image: item.src,
            title: item.title || "",
            subtitle: item.subtitle || "",
            description: item.description || "",
            tag: item.tag || "",
          }))
          setSlides(mappedSlides)
        }
      } catch (err) {
        console.error("Failed to fetch slides:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchSlides()
  }, [])

  const startTimer = () => {
    if (slides.length === 0) return
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
  }

  const pauseTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
  }

  const resumeTimer = () => {
    pauseTimer()
    startTimer()
  }

  useEffect(() => {
    if (slides.length > 0) {
      startTimer()
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [slides])

  const nextSlide = () => {
    if (isTransitioning || slides.length === 0) return
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    resumeTimer()
    setTimeout(() => setIsTransitioning(false), 700)
  }

  const prevSlide = () => {
    if (isTransitioning || slides.length === 0) return
    setIsTransitioning(true)
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    resumeTimer()
    setTimeout(() => setIsTransitioning(false), 700)
  }

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return
    setIsTransitioning(true)
    setCurrentSlide(index)
    resumeTimer()
    setTimeout(() => setIsTransitioning(false), 700)
  }

  if (loading || slides.length === 0) {
    return (
      <div className="relative h-screen w-full bg-neutral-200 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-neutral-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const activeSlide = slides[currentSlide]
  const nextIndex = (currentSlide + 1) % slides.length

  return (
    <div
      className="relative h-screen w-full overflow-hidden"
      data-scroll-section
      onMouseEnter={pauseTimer}
      onMouseLeave={resumeTimer}
    >
      {/* ═══ ACTIVE SLIDE IMAGE ONLY (prevents 4× image load) ═══ */}
      <div className="absolute inset-0">
        <Image
          src={activeSlide.image || "/placeholder.svg"}
          alt={activeSlide.title || `Home slide ${currentSlide + 1}`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          quality={80}
          key={`active-${currentSlide}`}
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* ═══ CONTENT ═══ */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="text-center px-4">
          {activeSlide.tag && (
            <p className="text-white/90 text-sm md:text-base mb-4 tracking-wider">
              {activeSlide.tag}
            </p>
          )}
          <h1
            className={`font-light text-white mb-2 tracking-tight ${
              activeSlide.title === "Furniture with Living Philosophy"
                ? "text-3xl md:text-5xl lg:text-6xl"
                : "text-4xl md:text-6xl lg:text-7xl"
            }`}
          >
            <span
              style={{
                fontFamily: '"Adobe Garamond Pro", Garamond',
                fontWeight: 400,
                fontStyle: "normal",
              }}
            >
              {activeSlide.title}
            </span>{" "}
            {activeSlide.subtitle}
          </h1>
          <p className="text-white/80 text-base md:text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
            {activeSlide.description}
          </p>
        </div>
      </div>

      {/* ═══ PRELOAD NEXT SLIDE (hidden, loads in background) ═══ */}
      <div className="hidden" aria-hidden="true">
        <Image
          src={slides[nextIndex].image}
          alt=""
          fill
          sizes="0px"
          quality={60}
          priority={false}
        />
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-20">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-white/70 rounded-full" />
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 text-white hover:bg-white/20 h-16 w-16 md:h-20 md:w-20 rounded-full"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-10 w-10 md:h-12 md:w-12" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 text-white hover:bg-white/20 h-16 w-16 md:h-20 md:w-20 rounded-full"
        onClick={nextSlide}
      >
        <ChevronRight className="h-10 w-10 md:h-12 md:w-12" />
      </Button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1 w-8 rounded-full transition-all ${
              index === currentSlide ? "bg-white" : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
