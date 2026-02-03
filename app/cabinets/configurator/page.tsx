"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CabinetConfigurator } from "@/components/cabinet-configurator"

export default function ConfiguratorPage() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <Header />
      <CabinetConfigurator />
      <Footer />
    </main>
  )
}
