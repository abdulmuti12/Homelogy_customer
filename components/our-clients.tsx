"use client"

import { motion } from "framer-motion"

export function OurClients() {
  const clientCount = 11

  return (
    <section
      className="h-screen w-screen flex flex-col justify-center overflow-hidden"
      style={{
        backgroundImage: "url(/xdf.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto px-4 flex flex-col justify-center h-full">
        <motion.div
          className="text-center mb-16 mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-5xl font-serif text-amber-900 font-light">Our Clients</h2>
        </motion.div>

        <div className="flex justify-center">
          <motion.div
            className="flex flex-wrap justify-center gap-8 w-full max-w-7xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {Array.from({ length: clientCount }).map((_, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-center"
                style={{ width: "calc(25% - 24px)" }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.05 * index }}
                viewport={{ once: true, amount: 0.3 }}
              >
                {index === 0 ? (
                  <img
                    src="/images/Logo-Client-25.png"
                    alt="BCA Logo"
                    className="max-w-[85%] max-h-[85%] object-contain"
                  />
                ) : index === 1 ? (
                  <img
                    src="/images/Logo-Client-26.png"
                    alt="Mandiri Logo"
                    className="max-w-[85%] max-h-[85%] object-contain"
                  />
                ) : index === 2 ? (
                  <img
                    src="/images/Logo-Client-27.png"
                    alt="Lippo Group Logo"
                    className="max-w-[85%] max-h-[85%] object-contain"
                  />
                ) : index === 3 ? (
                  <img
                    src="/images/Logo-Client-38.png"
                    alt="Raws Entertainment Logo"
                    className="max-w-[85%] max-h-[85%] object-contain"
                  />
                ) : index === 4 ? (
                  <img
                    src="/images/Logo-Client-29.png"
                    alt="Skelevator Logo"
                    className="max-w-[85%] max-h-[85%] object-contain"
                  />
                ) : index === 5 ? (
                  <img
                    src="/images/Logo-Client-30.png"
                    alt="K Thengono Logo"
                    className="max-w-[85%] max-h-[85%] object-contain"
                  />
                ) : index === 6 ? (
                  <img
                    src="/images/Logo-Client-28.png"
                    alt="Garuda Indonesia Logo"
                    className="max-w-[85%] max-h-[85%] object-contain"
                  />
                ) : index === 7 ? (
                  <img
                    src="/images/Logo-Client-37.png"
                    alt="MM Logo"
                    className="max-w-[85%] max-h-[85%] object-contain"
                  />
                ) : index === 8 ? (
                  <img
                    src="/images/Logo-Client-36.png"
                    alt="Tiger Logo"
                    className="max-w-[85%] max-h-[85%] object-contain"
                  />
                ) : index === 9 ? (
                  <img
                    src="/images/Logo-Client-35.png"
                    alt="HNI Halal Network International Logo"
                    className="max-w-[85%] max-h-[85%] object-contain"
                  />
                ) : index === 10 ? (
                  <img
                    src="/images/Logo-Client-34.png"
                    alt="Mirror Torsi M Logo"
                    className="max-w-[85%] max-h-[85%] object-contain"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">Logo {index + 1}</span>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
