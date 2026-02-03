"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { KitchenColorSelector } from "@/components/kitchen-color-selector"

export default function ConfiguratorPage() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <Header />
      <KitchenColorSelector />
      <Footer />
    </main>
  )
}
