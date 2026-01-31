"use client"

import { motion } from "framer-motion"
import Image from "next/image"

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
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
        aria-label="BGW Doors Home"
      >
        <Image
          src="/bgw.png"
          alt="BGW Doors"
          width={160}
          height={40}
          className="h-10 md:h-12 w-auto drop-shadow-lg"
          priority
        />
      </motion.a>
    </motion.div>
  )
}
