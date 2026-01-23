"use client"

import { motion } from "framer-motion"

export function AboutSection() {
  return (
    <section className="relative w-full min-h-screen">
      {/* Background Image */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <img src="/images/asset-1.jpg" alt="Modern interior" className="w-full h-full object-cover" />
      </motion.div>

      {/* Content Grid */}
      <div className="relative grid grid-cols-2 min-h-screen">
        {/* Left Column - Text Content */}
        <motion.div
          className="flex items-center justify-center p-6 sm:p-10 md:p-16 lg:p-20"
          style={{
            backgroundImage: "url(/xdf.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="max-w-xl w-full space-y-6">
            <motion.h2
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-[#A66B4F]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              About Us
            </motion.h2>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <p className="text-[#5A5A5A] text-sm sm:text-base md:text-lg leading-relaxed">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                laoreet dolore magna aliquam erat volutpat.
              </p>

              <p className="text-[#5A5A5A] text-sm sm:text-base md:text-lg leading-relaxed">
                Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex
              </p>
            </motion.div>

            <motion.a
              href="/about"
              className="inline-block text-[#2C2C2C] font-semibold text-base md:text-lg hover:text-[#A66B4F] transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              Learn More {">>"}
            </motion.a>
          </div>
        </motion.div>

        {/* Right Column - Image from background visible */}
        <div>{/* This column is transparent to show the background image */}</div>
      </div>
    </section>
  )
}
