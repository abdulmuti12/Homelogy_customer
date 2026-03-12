"use client"

import { motion } from "framer-motion"

export function WhoWeAre() {
  return (
    <section
      className="w-screen h-screen flex items-center overflow-hidden"
      style={{
        backgroundImage: "url(/xdf.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full h-full flex items-center px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center w-full max-w-6xl mx-auto">
          {/* Left side - Text content */}
          <motion.div
            className="space-y-6 ml-0 md:ml-8 lg:ml-12"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-serif text-amber-900"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              Who We Are
            </motion.h2>

            <motion.div
              className="space-y-4 text-gray-700 font-serif text-base md:text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <p>
                Homelogy Style is defined by the vision of Claudia Apriliana, Creative Director, and Ayleen Apriliana, Managing Director.
        
                Claudia Apriliana shapes the creative direction of the brand, expressing a design language centered on refined forms, 
                balanced proportions, and a deep sensitivity to materials.
              </p>

              <p>
                Ayleen Apriliana oversees the strategic development of Homelogy Style, guiding the brand’s growth, partnerships, and operations with 
                clarity and precision.
                Together, they shape Homelogy Style through a shared commitment to craftsmanship, design integrity, and a cultivated perspective
                on contemporary living.
              </p>
            </motion.div>
          </motion.div>

          {/* Right side - Image */}
          <motion.div
            className="flex justify-center md:justify-end"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <img src="/Image-Who-We-Us.jpg" alt="Who We Are team" className="w-full max-w-md rounded-lg object-cover" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
