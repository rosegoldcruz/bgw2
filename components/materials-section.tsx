// components/materials-section.tsx
"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion"
import Image from "next/image"
import { Reveal } from "./reveal"
import { cn } from "@/lib/utils"

const materials = [
  {
    id: "eclipse",
    name: "Eclipse",
    headline: "Quiet minimalism. Maximum impact.",
    description: "Flush slab doors designed for spaces where less becomes everything.",
    image: "/pistachio.png",
    backgroundImage: "/pistachio.png",
    tint: "bg-green-50",
  },
  {
    id: "drift",
    name: "Drift",
    headline: "Warm surfaces. Clean geometry.",
    description: "Natural tones and softened edges for modern, livable interiors.",
    image: "/lunar.png",
    backgroundImage: "/lunar.png",
    tint: "bg-gray-100",
  },
  {
    id: "forge",
    name: "Forge",
    headline: "Dark form. Heavy presence.",
    description: "Bold slab silhouettes with industrial character and depth.",
    image: "/martian.png",
    backgroundImage: "/martian.png",
    tint: "bg-red-50",
  },
]

export function MaterialsSection() {
  const [activeMaterial, setActiveMaterial] = useState("eclipse")
  const containerRef = useRef<HTMLDivElement>(null)

  const activeMaterialData = materials.find((m) => m.id === activeMaterial) || materials[0]

  const doorImages: Record<string, string> = {
    eclipse: "/bg-finals-4x/94.webp",
    drift: "/bg-finals-4x/12.webp",
    forge: "/bg-finals-4x/2.webp",
  }

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Scroll movements: Starts at 0, moves up to -40px, then eases back to 0
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [0, -40, 0])
  const springY = useSpring(y, { stiffness: 100, damping: 20 })

  const AnimatedText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
    return (
      <span>
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: delay + index * 0.03,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            style={{ display: char === " " ? "inline" : "inline-block" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>
    )
  }

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-neutral-900" 
      id="materials"
    >
      {/* Persistent Parallax Wrapper */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: springY }}
      >
        <Image
          src={doorImages[activeMaterial]}
          alt={`${activeMaterial} door variant`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      <div className="absolute top-[120px] left-0 right-0 z-10">
        <div className="container-custom text-white">
          <Reveal>
            <div>
              {/* Master Title */}
              <p className="text-sm uppercase tracking-[0.3em] text-white/70 mb-4">Minimal by nature. Bold by choice.</p>
              <h1 className="font-bold mb-2 text-5xl md:text-6xl">Slab Collection</h1>
              <p className="text-lg text-white/80 mb-12 max-w-xl">Pure form. Sculpted surfaces. Uninterrupted design.</p>
              
              {/* Active Material Headline */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMaterial}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <h2 className="font-bold mb-4 text-4xl md:text-7xl">
                    <AnimatedText text={activeMaterialData.name} delay={0.2} />
                  </h2>
                  <p className="text-xl text-white/90 font-medium mb-2">{activeMaterialData.headline}</p>
                  <p className="text-lg text-white/70 leading-relaxed max-w-2xl">{activeMaterialData.description}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 z-10">
        <div className="container-custom">
          <Reveal delay={0.1}>
            <div className="flex flex-wrap justify-center gap-3">
              {materials.map((material) => (
                <motion.button
                  key={material.id}
                  className={cn(
                    "px-6 py-3 rounded-full font-medium transition-all duration-300 backdrop-blur-md",
                    activeMaterial === material.id
                      ? "bg-white text-neutral-900"
                      : "bg-white/20 text-white hover:bg-white/30",
                  )}
                  onClick={() => setActiveMaterial(material.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {material.name}
                </motion.button>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
