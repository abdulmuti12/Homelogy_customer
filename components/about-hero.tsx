"use client"

import { motion } from "framer-motion"

export function AboutHero() {
  return (
    <section className="relative w-screen h-screen flex items-center justify-start overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('/BG-About-US.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-16 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Left Column: Text Content */}
          <div className="flex flex-col justify-start space-y-6 md:space-y-8">
            {/* Small Label */}
            <motion.div
              className="
                text-white/80
                text-3xl md:text-4xl lg:text-5xl xl:text-6xl
                font-light
                tracking-widest
              "
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              About Us
            </motion.div>
            <motion.div
              className="w-64 h-px bg-white/40 -mt-2"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            />

            {/* Main Heading */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight text-balance"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              We use modern design to connect people
            </motion.h1>

            {/* Description Text */}
            <motion.p
              className="text-base md:text-lg text-white/90 leading-relaxed max-w-md font-light"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              We have been recognized Internationally for creating workplace and residential furnishings that inspire,
              evolve, and endure. Today, our commitment to modern design, also our dedication to sustainable design have
              yielded a unique portfolio of thoughtful products that respond and adapt to changing needs
            </motion.p>
          </div>

          {/* Right Column: Empty on desktop, content flows on mobile */}
          <div className="hidden md:block" />
        </div>
      </div>
    </section>
  )
}
