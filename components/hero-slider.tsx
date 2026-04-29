"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const slides = [
  {
    image: "/images/slide-1.png",
    title: "Furniture with Living Philosophy",
    subtitle: "",
    description: "",
  },
  {
    image: "/images/Home_Slide_2.jpg",
    title: "",
    subtitle: " ",
    description: " ",
    tag: "",
  },
  {
    image: "/images/slide3.jpeg",
    title: "",
    subtitle: " ",
    description: " ",
    tag: "",
  },
  {
    image: "/images/Home_Slide_4.jpeg",
    title: "Modern",
    subtitle: " ",
    description: " ",
  },
]

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="relative h-screen w-full overflow-hidden" data-scroll-section>
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-700 will-change-[opacity] ${
            index === currentSlide ? "opacity-100 visible z-10" : "opacity-0 invisible z-0"
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0 transform-gpu">
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.title || `Home slide ${index + 1}`}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex h-full items-center justify-center">
            <div className="text-center px-4">
              {slide.tag && <p className="text-white/90 text-sm md:text-base mb-4 tracking-wider">{slide.tag}</p>}
              <h1
                className={`font-light text-white mb-2 tracking-tight ${
                  slide.title === "Furniture with Living Philosophy"
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
                  {slide.title}
                </span>{" "}
                {slide.subtitle}
              </h1>
              <p className="text-white/80 text-base md:text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
                {slide.description}
              </p>
            </div>
          </div>

          {/* Scroll Indicator - only on first slide */}
          {index === 0 && (
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
              <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
                <div className="w-1.5 h-1.5 bg-white/70 rounded-full" />
              </div>
            </div>
          )}
        </div>
      ))}

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
