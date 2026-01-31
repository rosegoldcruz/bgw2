// components/header.tsx
"use client"

import { motion } from "framer-motion"
import { StickerPeel } from "@/components/ui/sticker-peel"

export function Header() {
  return (
    <motion.div
      className="fixed top-6 left-0 right-0 z-50 flex justify-center"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <motion.a
        href="#"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        aria-label="BGW Doors Home"
        className="relative block rounded-3xl bg-black/40 px-8 py-6 shadow-[0_10px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl"
      >
        <div className="relative h-32 w-40">
          <StickerPeel
            imageSrc="/bgw.png"
            alt="BGW Doors logo"
            width={180}
            rotate={-6}
            peelDirection={18}
            peelBackHoverPct={26}
            peelBackActivePct={38}
            shadowIntensity={0.75}
            lightingIntensity={0.18}
            initialPosition={{ x: -12, y: -4 }}
            className="left-0 top-0"
          />
        </div>
      </motion.a>
    </motion.div>
  )
}
