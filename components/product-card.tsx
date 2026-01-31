"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: {
    id: string
    name: string
    description: string
    image: string
    badge?: "New" | "Back in stock" | "Limited"
    materials: string[]
    swatches: { name: string; color: string }[]
    quickLookImages: string[]
    dimensions: string
  }
  onQuickLook: (product: any) => void
}

export function ProductCard({ product, onQuickLook }: ProductCardProps) {
  return (
    <>
      {/* SVG Filter for metallic effect */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id={`turbulent-displace-${product.id}`} colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="1" />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
              <animate attributeName="dy" values="700; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="1" />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
              <animate attributeName="dy" values="0; -700" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="2" />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise3">
              <animate attributeName="dx" values="490; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="2" />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise4">
              <animate attributeName="dx" values="0; -490" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
            <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
            <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />

            <feDisplacementMap
              in="SourceGraphic"
              in2="combinedNoise"
              scale="30"
              xChannelSelector="R"
              yChannelSelector="B"
            />
          </filter>
        </defs>
      </svg>

      {/* Metallic Card Container */}
      <div className="card-container">
        <div className="inner-container">
          <div className="border-outer">
            <motion.div
              className="main-card relative overflow-hidden"
              layout
              style={{
                filter: `url(#turbulent-displace-${product.id})`,
              }}
            >
              {/* Badge */}
              {product.badge && (
                <div className="absolute top-4 left-4 z-20">
                  <span
                    className={cn(
                      "px-3 py-1 text-xs font-medium rounded-full backdrop-blur-sm",
                      product.badge === "New" && "bg-green-500/90 text-white",
                      product.badge === "Back in stock" && "bg-blue-500/90 text-white",
                      product.badge === "Limited" && "bg-amber-500/90 text-white",
                    )}
                  >
                    {product.badge}
                  </span>
                </div>
              )}

              {/* Product Image */}
              <div className="relative w-full h-full">
                <motion.div
                  className="w-full h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </motion.div>
              </div>

              {/* Product Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 pb-8">
                <div
                  className="absolute inset-0 backdrop-blur-sm bg-black/40"
                  style={{
                    maskImage: "linear-gradient(to top, black 0%, black 70%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to top, black 0%, black 70%, transparent 100%)",
                  }}
                />
                <div
                  className="absolute inset-0 backdrop-blur-md bg-black/30"
                  style={{
                    maskImage: "linear-gradient(to top, black 0%, black 50%, transparent 90%)",
                    WebkitMaskImage: "linear-gradient(to top, black 0%, black 50%, transparent 90%)",
                  }}
                />
                <div
                  className="absolute inset-0 backdrop-blur-lg bg-black/20"
                  style={{
                    maskImage: "linear-gradient(to top, black 0%, black 30%, transparent 70%)",
                    WebkitMaskImage: "linear-gradient(to top, black 0%, black 30%, transparent 70%)",
                  }}
                />
                <div className="relative z-10">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3 drop-shadow-sm">{product.name}</h3>
                    <p className="text-sm text-white/95 leading-relaxed drop-shadow-sm">{product.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="glow-layer-1"></div>
          <div className="glow-layer-2"></div>
        </div>

        <div className="overlay-1"></div>
        <div className="overlay-2"></div>
        <div className="background-glow"></div>
      </div>
    </>
  )
}
