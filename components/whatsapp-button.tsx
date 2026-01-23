"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"

export function WhatsAppButton() {
  return (
    <Button
      size="icon"
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-transparent hover:bg-transparent shadow-lg"
      onClick={() => window.open("https://wa.me/1234567890", "_blank")}
    >
      <Image src="/images/wa-icon.png" alt="WhatsApp" width={28} height={28} className="object-contain" />
    </Button>
  )
}
