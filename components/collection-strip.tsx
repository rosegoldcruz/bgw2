// components/collection-strip.tsx
"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { doorCollections } from "@/data/door-collections"
import { Reveal } from "./reveal"

export function CollectionStrip() {
  const shuffledCollections = useMemo(() => {
    const copy = [...doorCollections]
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[copy[i], copy[j]] = [copy[j], copy[i]]
    }
    return copy
  }, [])

  const itemWidth = 320
  const totalWidth = doorCollections.length * (itemWidth + 32) - 32
  const containerWidth = typeof window !== "undefined" ? window.innerWidth : 1200
  const maxDrag = Math.max(0, totalWidth - containerWidth + 48)

  return (
    <section className="py-20 lg:py-32 overflow-hidden relative">
      <div className="mb-12">
        <Reveal>
          <div className="container-custom text-center">
            <h2 className="text-neutral-900 mb-4 text-6xl font-normal">Next Gallery</h2>
          </div>
        </Reveal>
      </div>

      <div className="relative">
        <motion.div
          className="flex gap-8 px-6"
          drag="x"
          dragConstraints={{ left: -maxDrag, right: 0 }}
          dragElastic={0.1}
        >
          {shuffledCollections.map((collection) => (
            <motion.div
              key={collection.id}
              className="flex-shrink-0 cursor-pointer"
              style={{ width: 280 }}
              whileHover={{ scale: 1.06, zIndex: 10 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div
                className="relative w-full"
                style={{ aspectRatio: "3/4" }}
              >
                <Image
                  src={collection.image || "/placeholder.svg"}
                  alt={collection.name}
                  fill
                  className="object-contain"
                  style={{ transform: "scaleX(-1)" }}
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                  loading="lazy"
                  sizes="(max-width: 768px) 80vw, (max-width: 1280px) 40vw, 280px"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-neutral-500">← Drag to explore collections →</p>
      </div>
    </section>
  )
}
