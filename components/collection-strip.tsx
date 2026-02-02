// components/collection-strip.tsx
"use client"

import { useMemo, useState, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { doorCollections } from "@/data/door-collections"
import { Reveal } from "./reveal"
import { X } from "lucide-react"

export function CollectionStrip() {
  const [selectedDoor, setSelectedDoor] = useState<{ id: string; image: string; name: string } | null>(null)
  const dragStartXRef = useRef<number | null>(null)

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

  const handleClose = useCallback(() => {
    setSelectedDoor(null)
  }, [])

  return (
    <section className="py-20 lg:py-32 overflow-hidden relative">
      <div className="mb-12">
        <Reveal>
          <div className="container-custom text-center">
            <h2 className="text-neutral-900 mb-4 text-6xl font-normal">Next Gallery</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Drag through every finished BGW door render from the final drop. Nothing staged—just raw inventory.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="relative">
        <motion.div
          className="flex gap-8 px-6"
          drag="x"
          dragConstraints={{ left: -maxDrag, right: 0 }}
          dragElastic={0.1}
          onDragStart={(e, info) => {
            dragStartXRef.current = info.point.x
          }}
          onDragEnd={() => {
            setTimeout(() => {
              dragStartXRef.current = null
            }, 100)
          }}
        >
          {shuffledCollections.map((collection) => {
            const doorData = {
              id: collection.id,
              image: collection.image,
              name: collection.name
            }
            return (
              <motion.div
                key={collection.id}
                className="flex-shrink-0 cursor-pointer"
                style={{ width: 280 }}
                whileHover={{ scale: 1.06, zIndex: 10 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={(e) => {
                  const dragStartX = dragStartXRef.current
                  if (dragStartX === null || Math.abs(e.clientX - dragStartX) < 10) {
                    setSelectedDoor(doorData)
                  }
                }}
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
            )
          })}
        </motion.div>
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-neutral-500">← Drag to explore collections →</p>
      </div>

      <AnimatePresence>
        {selectedDoor && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={handleClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="relative z-10 max-w-2xl w-full mx-4"
              initial={{ scale: 0.8, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 40 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <button
                onClick={handleClose}
                className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors p-2"
                aria-label="Close"
              >
                <X className="w-8 h-8" />
              </button>

              <div
                className="relative w-full bg-neutral-900/50 rounded-2xl overflow-hidden"
                style={{ aspectRatio: "3/4" }}
              >
                <Image
                  src={selectedDoor.image || "/placeholder.svg"}
                  alt={selectedDoor.name}
                  fill
                  className="object-contain"
                  style={{ transform: "scaleX(-1)" }}
                  sizes="(max-width: 768px) 100vw, 640px"
                  priority
                />
              </div>

              <div className="mt-6 text-center">
                <h3 className="text-2xl font-semibold text-white mb-2">{selectedDoor.name}</h3>
                <p className="text-white/70">Click outside or press X to close</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
