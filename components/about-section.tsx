"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, when: "beforeChildren", staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export function AboutSection() {
  return (
    <section className="relative w-full min-h-screen">
      <div className="absolute inset-0">
        <Image
          src="/images/asset-1.jpg"
          alt="About background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          quality={75}
        />
      </div>
      <div className="relative grid grid-cols-1 md:grid-cols-2 min-h-screen">
        <motion.div
          className="flex items-center justify-center p-6 sm:p-10 md:p-16 lg:p-20 bg-white/80 md:bg-transparent"
          initial="hidden"
          whileInView="visible"
          variants={sectionVariants}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="max-w-xl w-full space-y-6">
            <motion.h2
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-[#A66B4F]"
              variants={itemVariants}
            >
              About Us
            </motion.h2>

            <motion.div className="space-y-4" variants={itemVariants}>
              <p className="text-[#5A5A5A] text-sm sm:text-base md:text-lg leading-relaxed text-justify">
                Homelogy Style is a furniture brand defined by refined design and material excellence. Each
                collection is developed with a focus on proportion, form, and craftsmanship, creating pieces
                that bring presence and elegance into contemporary interiors.
              </p>

              <p className="text-[#5A5A5A] text-sm sm:text-base md:text-lg leading-relaxed text-justify">
                Rooted in a design philosophy that values detail and material expression, Homelogy Style
                presents furniture that complements sophisticated living environments. Every piece reflects
                a commitment to quality, thoughtful design, and enduring aesthetics.
              </p>

              <p className="text-[#5A5A5A] text-sm sm:text-base md:text-lg leading-relaxed text-justify">
                Through its collections, Homelogy Style offers furniture that shapes spaces with character,
                refinement, and a distinctive design identity.
              </p>
            </motion.div>

            <motion.a
              href="/about"
              className="inline-block text-[#2C2C2C] font-semibold text-base md:text-lg hover:text-[#A66B4F] transition-colors"
              variants={itemVariants}
            >
              Learn More {">>"}
            </motion.a>
          </div>
        </motion.div>

        <div className="hidden md:block" />
      </div>
    </section>
  )
}
