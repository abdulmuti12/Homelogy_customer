import { HeroSlider } from "@/components/hero-slider"
import { SiteHeader } from "@/components/site-header"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { AboutSection } from "@/components/about-section"
import { CollectionSection } from "@/components/collection-section"
import { OurProjectSection } from "@/components/our-project-section"
import { CatalogSection } from "@/components/catalog-section"
import { PressReleaseSection } from "@/components/press-realease-section"
import { FooterSection } from "@/components/footer-section"

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <SiteHeader />
      
      {/* Container utama untuk efek Magnetic/Snap */}
      <div className="h-screen overflow-y-auto no-scrollbar snap-y snap-mandatory scroll-smooth" style={{ scrollPaddingTop: '0', scrollBehavior: 'smooth' }}>
        
        <div className="snap-start min-h-screen">
          <HeroSlider />
        </div>

        <div className="snap-start min-h-screen">
          <AboutSection />
        </div>

        <div className="snap-start min-h-screen">
          <CollectionSection />
        </div>

        <div className="snap-start min-h-screen">
          <OurProjectSection />
        </div>

        <div className="snap-start min-h-screen">
          <CatalogSection />
        </div>
         <div className="snap-start min-h-screen">
            <PressReleaseSection />        
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
