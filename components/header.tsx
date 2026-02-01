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
        whileHover={{ scale: 1.04 }}
        transition={{ duration: 0.2 }}
        aria-label="BGW Doors Home"
        className="inline-block"
      >
        <StickerPeel
          imageSrc="/bgw.png"
          alt="BGW Doors logo"
          width={160}
          rotate={-4}
          peelDirection={14}
          peelBackHoverPct={24}
          peelBackActivePct={34}
          shadowIntensity={0.65}
          lightingIntensity={0.16}
          initialPosition="center"
        />
      </motion.a>
    </motion.div>
  )
}
