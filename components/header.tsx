// components/header.tsx
"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-neutral-950/80 backdrop-blur-md"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <div className="container-custom flex items-center justify-between py-4">
        <Link href="/" aria-label="BGW Doors Home" className="flex items-center">
          <Image
            src="/bgw.png"
            alt="BGW Doors logo"
            width={160}
            height={60}
            className="h-8 w-auto sm:h-9"
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-neutral-300">
          <Link href="/visualizer" className="hover:text-white transition-colors">
            Visualizer
          </Link>
          <Link href="/shop" className="hover:text-white transition-colors">
            Shop
          </Link>
          <Link href="/#collections" className="hover:text-white transition-colors">
            Collections
          </Link>
          <Link href="/#about" className="hover:text-white transition-colors">
            About
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/visualizer">
            <Button className="bg-white text-neutral-950 hover:bg-neutral-100">
              Start Your Project
            </Button>
          </Link>
        </div>
      </div>
    </motion.header>
  )
}
