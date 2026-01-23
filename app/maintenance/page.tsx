import Image from "next/image"

export const metadata = {
  title: "Under Maintenance - Homeology",
  description: "Website under maintenance",
}

export default function MaintenancePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="flex flex-col items-center justify-center text-center max-w-md">
        <div className="mb-8 w-80 h-80 relative">
          <Image src="/images/maintenance-20icon.png" alt="Maintenance Icon" fill className="object-contain" priority />
        </div>

        <h1 className="font-serif text-4xl font-bold text-foreground mb-4">Website under maintenance</h1>

        <p className="text-muted-foreground text-base leading-relaxed">
          This website is currently undergoing scheduled maintenance.
          <br />
          We should be back shortly.
        </p>
      </div>
    </main>
  )
}
