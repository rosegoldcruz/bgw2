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
    <motion.div
      className="group relative bg-white overflow-hidden"
      style={{
        borderRadius: "24px",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px",
      }}
      layout
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
      <div className="relative overflow-hidden" style={{ aspectRatio: "25/36" }}>
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
  )
}
