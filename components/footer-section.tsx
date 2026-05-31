"use client"

import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, Instagram, MessageCircle, Facebook, Linkedin } from "lucide-react"

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/homelogystyle/", label: "Instagram" },
  { icon: MessageCircle, href: "#", label: "WhatsApp" },
  { icon: Facebook, href: "https://www.facebook.com/homelogystyle/", label: "Facebook" },
  { icon: Linkedin, href: "https://www.linkedin.com/showcase/homelogy-style/", label: "LinkedIn" },
]

export function FooterSection() {
  return (
    <footer className="w-full">
      {/* Showroom + Map Section */}
      <section className="relative w-full md:h-96 bg-black overflow-hidden" style={{ fontFamily: '"Din Pro", "Din_Pro", sans-serif' }}>
        <div className="flex flex-col md:flex-row h-full">
          <div className="w-full md:w-1/2 aspect-[4/3] md:aspect-auto relative group overflow-hidden">
            <Image
              src="/images/footer-showroom-hm.jpg"
              alt="Homelogy Showroom"
              fill
              sizes="100vw"
              className="object-cover"
              quality={70}
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all" />
          </div>

          <div className="w-full md:w-1/2 aspect-[4/3] md:aspect-auto relative group overflow-hidden">
            <Image
              src="/images/screenshot-202025-12-23-20at-2017.png"
              alt="Homelogy Location Map"
              fill
              sizes="100vw"
              className="object-cover"
              quality={60}
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all" />

            <div className="relative h-full flex flex-col items-center justify-center text-white gap-4 md:gap-8 px-4" style={{ fontFamily: '"Din Pro", "Din_Pro", sans-serif' }}>
              <h3 className="text-2xl md:text-4xl font-serif text-center">Experience Luxury</h3>
              <a
                href="https://www.google.com/maps/place/Jakarta+Design+Center/@-6.2017185,106.7982548,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f6bc1715d631:0xac5785593356cd5d!8m2!3d-6.2017185!4d106.8008297!16s%2Fg%2F1trs_9wl?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white px-6 py-1.5 md:px-8 md:py-2 text-xs md:text-sm hover:bg-white hover:text-black transition-all duration-300"
              >
                Our Location
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section
        className="relative w-full overflow-hidden py-8 md:py-0"
        style={{ backgroundImage: "url(/images/xdf.jpg)", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="flex flex-col md:flex-row h-full relative z-10">
          <div className="flex items-center justify-center md:justify-start p-6 md:p-8">
            <Image
              src="/images/logo-hm-cokelat.png"
              alt="Homelogy"
              width={180}
              height={52}
              className="max-h-14 w-auto md:ml-4"
              quality={80}
            />
          </div>

          <div className="flex flex-col md:flex-row px-6 md:px-12 pb-6 md:pb-8 gap-6 md:gap-16" style={{ fontFamily: '"Din Pro", "Din_Pro", sans-serif' }}>
            <div className="space-y-2 flex-shrink-0">
              <p className="text-xs md:text-sm text-gray-800 font-medium leading-relaxed">
                JAKARTA DESIGN CENTER 3RD FLOOR,
                <br />
                GATOT SUBROTO KAV.53, CENTRAL JAKARTA
              </p>
              <div className="flex items-center gap-2">
                <Phone className="w-3 h-3 md:w-4 md:h-4 text-amber-600 flex-shrink-0" />
                <p className="text-xs md:text-sm text-gray-800">Phone : (021) 572 0392</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3 h-3 md:w-4 md:h-4 text-amber-600 flex-shrink-0" />
                <p className="text-xs md:text-sm text-gray-800">Email : INFO@HOMEOLOGYSTYLE.COM</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:gap-8 md:ml-auto">
              <div className="space-y-1.5 md:space-y-2">
                <a href="#" className="text-xs md:text-sm text-gray-800 hover:text-amber-600 transition-colors block">Products</a>
                <a href="#" className="text-xs md:text-sm text-gray-800 hover:text-amber-600 transition-colors block">Legacy</a>
                <a href="#" className="text-xs md:text-sm text-gray-800 hover:text-amber-600 transition-colors block">Blogs</a>
              </div>
              <div className="space-y-1.5 md:space-y-2">
                <a href="#" className="text-xs md:text-sm text-gray-800 hover:text-amber-600 transition-colors block">Brands</a>
                <a href="#" className="text-xs md:text-sm text-gray-800 hover:text-amber-600 transition-colors block">Privilege</a>
                <a href="#" className="text-xs md:text-sm text-gray-800 hover:text-amber-600 transition-colors block">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Copyright */}
      <section
        className="relative py-6 md:py-8 px-4 md:px-8 border-t border-amber-700"
        style={{
          backgroundImage: "url(/images/xdf.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          fontFamily: '"Din Pro", "Din_Pro", sans-serif',
        }}
      >
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="text-xs md:text-sm text-amber-800 font-medium text-center md:text-left">Copyright © 2025 HOMELOGY, ALL RIGHTS RESERVED</p>
            <div className="flex items-center gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-4 h-4 md:w-5 md:h-5 text-amber-800 hover:text-amber-700 transition-colors"
                >
                  <Icon className="w-full h-full" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </footer>
  )
}