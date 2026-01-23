"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { SiteHeader } from "@/components/site-header"
import { FooterSection } from "@/components/footer-section"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    phone: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      console.log("Form submitted:", formData)
      setFormData({ nama: "", email: "", phone: "", message: "" })
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <main className="min-h-screen relative">
      <SiteHeader />

      {/* Container utama untuk efek Magnetic/Snap */}
      <div className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth" style={{ scrollPaddingTop: '0', scrollBehavior: 'smooth' }}>
        
        <div className="snap-start min-h-screen">
          <section
            className="flex-1 relative px-6 md:px-12 lg:px-20 py-24 md:py-32 lg:py-40 flex flex-col justify-end h-full"
            style={{
              backgroundImage: "url(/contact-us-bg.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center 25%",
              backgroundAttachment: "scroll",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="absolute inset-0 bg-black/20"></div>

            <div className="absolute bottom-6 left-6 z-20 text-white/80 text-sm font-light tracking-wide">
              © HOMELOGY, 2025
            </div>

            <div className="relative z-10 w-full">
              <div className="flex items-start gap-8">
                <motion.h1
                  className="font-light text-5xl md:text-6xl lg:text-7xl text-white font-serif leading-tight whitespace-nowrap flex-1 pt-0"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  Let's Get in Touch
                </motion.h1>

                <motion.div
                  className="bg-white/90 rounded-sm p-8 md:p-10 w-full max-w-md shadow-lg mt-0"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="nama" className="text-amber-800 text-sm tracking-wide block">
                        Nama
                      </label>
                      <input
                        type="text"
                        id="nama"
                        name="nama"
                        value={formData.nama}
                        onChange={handleChange}
                        required
                        className="w-full border-b border-amber-900/30 bg-transparent text-gray-800 focus:outline-none focus:border-amber-900 transition-colors pb-2"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-amber-800 text-sm tracking-wide block">
                        Email*
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full border-b border-amber-900/30 bg-transparent text-gray-800 focus:outline-none focus:border-amber-900 transition-colors pb-2"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-amber-800 text-sm tracking-wide block">
                        Phone*
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full border-b border-amber-900/30 bg-transparent text-gray-800 focus:outline-none focus:border-amber-900 transition-colors pb-2"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-amber-800 text-sm tracking-wide block">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full border-b border-amber-900/30 bg-transparent text-gray-800 focus:outline-none focus:border-amber-900 transition-colors pb-2 resize-none"
                      />
                    </div>

                    <div className="flex justify-end pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="text-amber-800 hover:text-amber-900 font-light tracking-widest text-sm transition-colors disabled:opacity-50"
                      >
                        {isSubmitting ? "SENDING..." : "SEND"}
                      </button>
                    </div>
                  </form>
                </motion.div>
          </div>
        </div>
          </section>
        </div>

        <div className="snap-start">
          <FooterSection />
        </div>

      </div>

      <WhatsAppButton />
    </main>
  )
}
