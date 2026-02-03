"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CabinetConfigurator } from "@/components/cabinet-configurator"
import Image from "next/image"

export default function CabinetsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Hero - Cabinet Refacing */}
      <section className="relative min-h-[100vh] lg:min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <Image 
            src="/luxury-modern-kitchen-with-white-marble-countertop.jpg"
            alt="Cabinet Refacing"
            fill
            className="object-cover brightness-[0.2]"
            priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
        
        <div className="relative z-10 text-center text-white px-6 max-w-5xl py-24">
            <p className="text-xs md:text-sm uppercase tracking-[0.5em] text-red-600 font-semibold mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                The Smarter Kitchen Upgrade
            </p>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 leading-[0.85] uppercase italic">
                Reface.<br /> Refresh.<br /> Refine.
            </h1>
            <p className="text-xl md:text-2xl font-light text-white/90 max-w-3xl mx-auto mb-12 tracking-wide">
                Why gut your kitchen when the foundation is solid?
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left">
                <div className="group relative bg-zinc-950/50 backdrop-blur-xl border-l-[3px] border-red-600 p-8 transition-all hover:bg-zinc-900/80">
                    <p className="text-5xl font-light text-white mb-2">50%</p>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 group-hover:text-red-600/60 transition-colors">Less than full replacement</p>
                </div>
                <div className="group relative bg-zinc-950/50 backdrop-blur-xl border-l-[3px] border-red-600 p-8 transition-all hover:bg-zinc-900/80">
                    <p className="text-5xl font-light text-white mb-2">3-5 Days</p>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 group-hover:text-red-600/60 transition-colors">Average completion time</p>
                </div>
                <div className="group relative bg-zinc-950/50 backdrop-blur-xl border-l-[3px] border-red-600 p-8 transition-all hover:bg-zinc-900/80">
                    <p className="text-5xl font-light text-white mb-2">Zero</p>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 group-hover:text-red-600/60 transition-colors">Demo dust & downtime</p>
                </div>
            </div>
        </div>
      </section>

      {/* Product Configurator */}
      <section>
        <CabinetConfigurator />
      </section>

      <Footer />
    </main>
  )
}
