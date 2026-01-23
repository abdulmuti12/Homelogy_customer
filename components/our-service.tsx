"use client"

import { motion } from "framer-motion"

export function OurService() {
  // useFullPageScroll()

  const services = [
    { title: "Personalized Furniture Consultation" },
    { title: "Customization Options" },
    { title: "Home Delivery & Installation" },
    { title: "After-Sales Support" },
  ]

  return (
    <section
      className="relative w-screen h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "url(/BG-Our-Service.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-center justify-center px-4">
        <motion.div
          className="flex flex-col items-center justify-center space-y-8 md:space-y-12 w-full"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Title */}
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-white text-center text-balance"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Our Service
          </motion.h2>

          {/* Service Cards Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 w-full max-w-7xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-center p-6 md:p-8 rounded-lg backdrop-blur-sm bg-white/10 border border-white/20 hover:bg-white/15 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 * index }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <p className="text-lg md:text-xl text-white/90 font-serif text-center">{service.title}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
