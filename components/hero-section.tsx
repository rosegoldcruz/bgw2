"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { PackageCheck, Rocket, ShieldCheck } from "lucide-react" // Added PackageCheck, Rocket, and ShieldCheck icon imports
import { Reveal } from "./reveal"
import { BlurPanel } from "./blur-panel"
import { Button } from "./ui/button"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 0.95]) // Reduced hero image shrink from 15% to 5%
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -50])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

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
    <section ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* Background Image - Full Screen */}
      <motion.div
        className="absolute inset-0"
        style={{ scale: imageScale, y: imageY }}
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <Image
          src="/bgw-hero.png"
          alt="BGW Doors - Premium door installations and modern interior spaces"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/30" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 h-full min-h-screen flex items-center"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left text-white py-20 lg:py-0 max-w-2xl">
              <Reveal>
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight mb-6 drop-shadow-lg">
                  <span className="block whitespace-nowrap">
                    <AnimatedText text="Elevated Doors For" delay={0.5} />
                  </span>
                  <span className="italic font-light block">
                    <AnimatedText text="Modern Spaces" delay={1.1} />
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={0.2}>
                <motion.p
                  className="text-base md:text-lg text-white/95 mb-8 leading-relaxed drop-shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
                >
                  Design-driven. Project-ready. Built to last.
                </motion.p>
              </Reveal>

              <Reveal delay={0.3}>
                <motion.p
                  className="text-base md:text-lg text-white/95 leading-relaxed mb-8 drop-shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
                >
                  Call Us: <a href="tel:+19097891818" className="hover:text-white transition-colors underline">(909) 789-1818</a><br />
                  Open Mon – Fri<br />
                  <a 
                    href="https://www.google.com/maps/place/BGW+Doors/@34.0426308,-117.6423059,17z/data=!3m1!4b1!4m6!3m5!1s0x80c335611518531f:0x4d2d4646993855a9!8m2!3d34.0426264!4d-117.6397256!16s%2Fg%2F11r49qshsy?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors underline"
                  >
                    753 E Francis St, Ontario, CA
                  </a>
                </motion.p>
              </Reveal>

              <Reveal delay={0.4}>
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                >
                  <Button size="lg" className="bg-white text-neutral-900 hover:bg-white/90 shadow-lg">
                    Shop Doors
                  </Button>
                  <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 shadow-lg">
                    View on Your Home
                  </Button>
                </motion.div>
              </Reveal>
            </div>

            {/* Right Column - Empty (image is background) */}
            <div className="hidden lg:block" />
          </div>
        </div>
      </motion.div>

      {/* Info Strip */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-20 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <BlurPanel className="mx-6 mb-6 px-6 py-4 bg-black/24 backdrop-blur-md border-white/20">
          <div className="flex items-center justify-center gap-6 text-white/90">
            <div className="flex items-center gap-2">
              <PackageCheck className="w-4 h-4 text-green-400" />
              <span className="text-sm">Over 1M BGW Doors Sold</span>
            </div>
            <div className="flex items-center gap-2">
              <Rocket className="w-4 h-4 text-amber-400" />
              <span className="text-sm">Average Nationwide Shipping — 5–8 Business Days</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span className="text-sm">24/7 Support</span>
            </div>
          </div>
        </BlurPanel>
      </motion.div>
    </section>
  )
}
