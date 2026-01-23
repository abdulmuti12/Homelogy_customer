import { SiteHeader } from "@/components/site-header"
import { AboutHero } from "@/components/about-hero"
import { FooterSection } from "@/components/footer-section"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { WhoWeAre } from "@/components/who-we-are"
import { OurService } from "@/components/our-service"
import { OurClients } from "@/components/our-clients"

export default function AboutPage() {
  return (
    <main className="min-h-screen relative">
      <SiteHeader />
      
      {/* Container utama untuk efek Magnetic/Snap */}
      <div className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth" style={{ scrollPaddingTop: '0', scrollBehavior: 'smooth' }}>
        
        <div className="snap-start min-h-screen">
          <AboutHero />
        </div>

        <div className="snap-start min-h-screen">
          <WhoWeAre />
        </div>

        <div className="snap-start min-h-screen">
          <OurService />
        </div>

        <div className="snap-start min-h-screen">
          <OurClients />
        </div>

        {/* Footer - use h-auto to fit content naturally */}
        <div className="snap-start">
          <FooterSection />
        </div>

      </div>

      <WhatsAppButton />
    </main>
  )
}
