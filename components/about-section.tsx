// components/about-section.tsx
"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Reveal } from "./reveal"

export function AboutSection() {
  return (
    <section className="py-24 lg:py-32 bg-neutral-950" id="about">
      <div className="container-custom">
        {/* Main About Block */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <Reveal>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-amber-400 mb-4">About BGW Doors</p>
              <h2 className="text-4xl md:text-5xl font-light text-white mb-6 leading-tight">
                Crafting Excellence<br />
                <span className="italic">Since Day One</span>
              </h2>
              <p className="text-lg text-neutral-400 leading-relaxed mb-6">
                BGW Doors is a premier manufacturer and distributor of luxury entry doors, 
                serving contractors, builders, and homeowners nationwide. Every door we 
                create represents our commitment to exceptional craftsmanship, premium 
                materials, and designs that elevate any space.
              </p>
              <p className="text-lg text-neutral-400 leading-relaxed">
                From hand-forged iron to precision-milled fiberglass, our collections 
                are built to perform and designed to impress. We don't just make doors — 
                we create entrances that make statements.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                src="/Glass Luxury.png"
                alt="BGW Doors craftsmanship"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </Reveal>
        </div>

        {/* Why BGW - 3 Pillars */}
        <div className="text-center mb-16">
          <Reveal>
            <p className="text-sm uppercase tracking-[0.3em] text-amber-400 mb-4">Why BGW</p>
            <h3 className="text-3xl md:text-4xl font-light text-white">
              Built Different. Built Better.
            </h3>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 - Craftsmanship */}
          <Reveal delay={0.1}>
            <motion.div
              className="bg-neutral-900 border border-neutral-800 p-8 rounded-xl h-full"
              whileHover={{ y: -5, borderColor: "rgba(251, 191, 36, 0.3)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h4 className="text-xl font-medium text-white mb-3">Craftsmanship</h4>
              <p className="text-neutral-400 leading-relaxed">
                Every door is built with precision engineering and meticulous attention to detail. 
                We combine traditional techniques with modern manufacturing for unmatched quality.
              </p>
            </motion.div>
          </Reveal>

          {/* Pillar 2 - Materials */}
          <Reveal delay={0.2}>
            <motion.div
              className="bg-neutral-900 border border-neutral-800 p-8 rounded-xl h-full"
              whileHover={{ y: -5, borderColor: "rgba(251, 191, 36, 0.3)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h4 className="text-xl font-medium text-white mb-3">Premium Materials</h4>
              <p className="text-neutral-400 leading-relaxed">
                From heavy-gauge steel to premium hardwoods and high-density fiberglass cores, 
                we source only the finest materials for lasting performance.
              </p>
            </motion.div>
          </Reveal>

          {/* Pillar 3 - Service */}
          <Reveal delay={0.3}>
            <motion.div
              className="bg-neutral-900 border border-neutral-800 p-8 rounded-xl h-full"
              whileHover={{ y: -5, borderColor: "rgba(251, 191, 36, 0.3)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-medium text-white mb-3">Dedicated Support</h4>
              <p className="text-neutral-400 leading-relaxed">
                From consultation to installation, our team provides expert guidance. 
                Nationwide shipping, 5-year warranty, and 24/7 support come standard.
              </p>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
