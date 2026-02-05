// components/collection-strip.tsx
"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"
import { doorCollections } from "@/data/door-collections"
import { Reveal } from "./reveal"

export function CollectionStrip() {
  return (
    <section className="pt-12 pb-20 lg:py-28 overflow-hidden relative bg-neutral-950" id="collections">
      <div className="mb-12">
        <Reveal>
          <div className="container-custom text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-400 mb-4">Collections</p>
            <h2 className="text-white mb-3 text-4xl md:text-5xl font-light">Curated by Architecture</h2>
            <p className="text-sm md:text-lg text-neutral-400 max-w-2xl mx-auto">
              Fewer choices. Better decisions. Each collection is a complete design language.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="container-custom">
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3">
          {doorCollections.map((collection) => (
            <motion.div
              key={collection.id}
              className="flex-shrink-0 min-w-[240px] snap-start md:min-w-0"
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={collection.href}
                className="group block rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900/60 card-elevation-1"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={collection.image || "/placeholder.svg"}
                    alt={collection.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    sizes="(max-width: 768px) 80vw, (max-width: 1280px) 40vw, 320px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-medium text-white mb-2">{collection.name}</h3>
                  <p className="text-sm text-neutral-400">{collection.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
