// components/materials-section.tsx
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

const riseVariants = {
  hidden: { y: 120, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.05,
    },
  },
}

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
  const activeCollection = activeMaterial

  const activeMaterialData = materials.find((m) => m.id === activeCollection) || materials[0]

  const doorImages: Record<string, string> = {
    eclipse: "/bg-finals-4x/94.webp",
    drift: "/bg-finals-4x/12.webp",
    forge: "/bg-finals-4x/2.webp",
  }

  const backgroundImages: Record<string, string> = {
    eclipse: "/pistachio.png",
    drift: "/lunar.png",
    forge: "/martian.png",
  }
  const activeDoorImage = doorImages[activeCollection]

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-neutral-900" 
      id="materials"
    >
      {/* 
        CRITICAL: The environment background image must NEVER be replaced by door images.
        The door images must ALWAYS be rendered as foreground elements layered on top of this background.
        Do not change this architecture.
      */}
      
      {/* Layer 1: Static Environment Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImages[activeCollection]}
          alt={`${activeCollection} environment background`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Layer 2: Door Foreground */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <div className="relative w-full h-full max-w-[1400px] mx-auto">
          {/*
             Door image is positioned to align with the rug in the background image.
             Adjust 'top' or 'transform' if the background image perspective changes.
          */}
          <div className="absolute inset-0 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCollection}
                variants={riseVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="door-wrapper"
              >
                <Image
                  src={activeDoorImage}
                  alt={`${activeCollection} door variant`}
                  width={800}
                  height={1200}
                  className="object-contain h-[85vh] w-auto"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="absolute top-[120px] left-0 right-0 z-20 pointer-events-none">
        <div className="container-custom text-white">
          <div>
            {/* Master Title */}
            <p className="text-sm uppercase tracking-[0.3em] text-white/70 mb-4">Minimal by nature. Bold by choice.</p>
            <h1 className="font-bold mb-2 text-5xl md:text-6xl">Slab Collection</h1>
            <p className="text-lg text-white/80 mb-12 max-w-xl">Pure form. Sculpted surfaces. Uninterrupted design.</p>
            
            {/* Active Material Headline */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCollection}
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
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 z-20">
        <div className="container-custom">
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
        </div>
      </div>
    </section>
  )
}
