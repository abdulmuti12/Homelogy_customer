"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, Instagram, MessageCircle, Facebook, Linkedin } from "lucide-react"

export function FooterSection() {
  const [activeVideo] = useState(0)

  const videos = [
    {
      title: "Empty Slide",
      image: "",
    },
    {
      title: "Experience User",
      image: "/homelogy-design-center-interior.jpg",
    },
  ]

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/homelogystyle/", label: "Instagram" },
    { icon: MessageCircle, href: "#", label: "WhatsApp" },
    { icon: Facebook, href: "https://www.facebook.com/homelogystyle/", label: "Facebook" },
    { icon: Linkedin, href: "https://www.linkedin.com/showcase/homelogy-style/", label: "LinkedIn" },
  ]

  const footerSlides = [
    { title: "Homelogy", position: "left" as const },
    { title: "Address", position: "right" as const },
  ]

  void activeVideo
  void videos
  void footerSlides

  return (
    <footer className="w-full">
      {/* Video Carousel Section */}
      <section className="relative w-full h-96 bg-black overflow-hidden"  style={{
                fontFamily: '"Adobe Garamond Pro", Garamond',
                // fontWeight: 400,
                fontStyle: "normal",
              }}>
        <div className="flex h-full">
          {/* Left Side - Showroom Image */}
          <div className="w-1/2 relative group overflow-hidden">
            <Image
              src="/images/footer-showroom-hm.jpg"
              alt="Homelogy Showroom"
              fill
              sizes="50vw"
              className="object-cover"
              quality={70}
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all" />
          </div>

          {/* Right Side - Map */}
          <div className="w-1/2 relative group overflow-hidden">
            <Image
              src="/images/screenshot-202025-12-23-20at-2017.png"
              alt="Homelogy Location Map"
              fill
              sizes="50vw"
              className="object-cover"
              quality={60}
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all" />

            <div className="relative h-full flex flex-col items-center justify-center text-white gap-8" style={{
                fontFamily: '"Adobe Garamond Pro", Garamond',
                // fontWeight: 400,
                fontStyle: "normal",
              }}>
              <h3 className="text-4xl font-serif text-center">Experience Luxury</h3>
              <a
                href="https://www.google.com/maps/place/Jakarta+Design+Center/@-6.2017185,106.7982548,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f6bc1715d631:0xac5785593356cd5d!8m2!3d-6.2017185!4d106.8008297!16s%2Fg%2F1trs_9wl?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-white px-8 py-2 text-sm hover:bg-white hover:text-black transition-all duration-300"
              >
                Our Location
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Content Section */}
      <section
        className="relative w-full h-64 overflow-hidden"
        style={{ backgroundImage: "url(/images/xdf.jpg)", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="flex h-full relative z-10">
          {/* Left Slide - Homelogy Branding */}
          <div className="w-1/2 flex items-center justify-start p-8 relative group">
            <Image
              src="/images/logo-hm-cokelat.png"
              alt="Homelogy"
              width={220}
              height={64}
              className="max-h-16 w-auto ml-4"
              quality={80}
            />
          </div>

          {/* Right Slide - Address and Navigation Links */}
          <div className="w-1/2 flex items-center px-12 py-8 gap-16"  style={{
                fontFamily: '"Adobe Garamond Pro", Garamond',
                fontWeight: 400,
                fontStyle: "normal",
              }}>
            <div className="space-y-3 flex-shrink-0">
              <p className="text-sm text-gray-800 font-medium leading-relaxed">
                JAKARTA DESIGN CENTER 3RD FLOOR,
                <br />
                GATOT SUBROTO KAV.53, CENTRAL JAKARTA
              </p>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <p className="text-sm text-gray-800">Phone : (021) 572 0392</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <p className="text-sm text-gray-800">Email : INFO@HOMEOLOGYSTYLE.COM</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 ml-auto">
              <div className="space-y-2">
                <a href="#" className="text-sm text-gray-800 hover:text-amber-600 transition-colors">Products</a>
                <a href="#" className="text-sm text-gray-800 hover:text-amber-600 transition-colors block">Legacy</a>
                <a href="#" className="text-sm text-gray-800 hover:text-amber-600 transition-colors block">Blogs</a>
              </div>
              <div className="space-y-2">
                <a href="#" className="text-sm text-gray-800 hover:text-amber-600 transition-colors">Brands</a>
                <a href="#" className="text-sm text-gray-800 hover:text-amber-600 transition-colors block">Privilege</a>
                <a href="#" className="text-sm text-gray-800 hover:text-amber-600 transition-colors block">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Footer */}
      <section
        className="relative py-8 px-8 border-t border-amber-700"
        style={{
          backgroundImage: "url(/images/xdf.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          fontFamily: '"Adobe Garamond Pro", Garamond',
          fontWeight: 400,
          fontStyle: "normal",

        }}
      >
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center justify-between">
            <p className="text-sm text-amber-800 font-medium">Copyright © 2025 HOMELOGY, ALL RIGHTS RESERVED</p>
            <div className="flex items-center gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-5 h-5 text-amber-800 hover:text-amber-700 transition-colors"
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
