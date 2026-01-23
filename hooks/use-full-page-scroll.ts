"use client"

import { useEffect, useRef } from "react"

interface UseFullPageScrollOptions {
  enabled?: boolean
  speed?: number
}

export function useFullPageScroll(options: UseFullPageScrollOptions = {}) {
  const { enabled = true, speed = 0.5 } = options
  const isScrolling = useRef(false)
  const lastScrollTime = useRef(0)
  const currentSectionIndex = useRef(0)

  useEffect(() => {
    if (!enabled) return

    const sections = document.querySelectorAll("[data-scroll-section]")
    if (sections.length === 0) return

    const initializeCurrentSection = () => {
      const initialScroll = window.scrollY + window.innerHeight / 2
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i] as HTMLElement
        const sectionTop = section.offsetTop
        const sectionBottom = sectionTop + section.offsetHeight

        if (initialScroll >= sectionTop && initialScroll < sectionBottom) {
          currentSectionIndex.current = i
          break
        }
      }
    }

    // Initialize on mount
    initializeCurrentSection()

    const handleWheel = (event: WheelEvent) => {
      const now = Date.now()
      const timeSinceLastScroll = now - lastScrollTime.current

      if (isScrolling.current || timeSinceLastScroll < 300) {
        event.preventDefault()
        return
      }

      const direction = event.deltaY > 0 ? 1 : -1
      let nextSectionIndex = currentSectionIndex.current

      // Check if we're at the bottom of current section
      const currentSection = sections[currentSectionIndex.current] as HTMLElement
      const scrollPosition = window.scrollY
      const sectionBottom = currentSection.offsetTop + currentSection.offsetHeight

      // Allow normal scroll if not at section boundary
      if (direction > 0 && scrollPosition < sectionBottom - window.innerHeight / 2) {
        return // Allow normal scroll behavior
      }

      if (direction > 0 && currentSectionIndex.current < sections.length - 1) {
        nextSectionIndex = currentSectionIndex.current + 1
      } else if (direction < 0 && currentSectionIndex.current > 0) {
        nextSectionIndex = currentSectionIndex.current - 1
      }

      currentSectionIndex.current = nextSectionIndex
      const nextSection = sections[nextSectionIndex] as HTMLElement

      if (nextSection) {
        event.preventDefault()
        isScrolling.current = true
        lastScrollTime.current = now

        nextSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })

        setTimeout(() => {
          isScrolling.current = false
        }, 300)
      }
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i] as HTMLElement
        const sectionTop = section.offsetTop
        const sectionBottom = sectionTop + section.offsetHeight

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          currentSectionIndex.current = i
          break
        }
      }
    }

    window.addEventListener("wheel", handleWheel, { passive: false })
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [enabled, speed])
}
