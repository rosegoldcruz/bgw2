"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

// Kitchen styles with color options
const kitchenStyles = [
  {
    id: "shaker_classic",
    name: "SHAKER CLASSIC",
    colors: [
      { id: 1, name: "Flour", swatch: "/Cab Kitchen/Colors/flour-2023.png", image: "/Cab Kitchen/Shaker Classic/1.png" },
      { id: 2, name: "Storm", swatch: "/Cab Kitchen/Colors/storm-2023.png", image: "/Cab Kitchen/Shaker Classic/2.png" },
      { id: 3, name: "Graphite", swatch: "/Cab Kitchen/Colors/graphite-2023.png", image: "/Cab Kitchen/Shaker Classic/3.png" },
      { id: 4, name: "Espresso Walnut", swatch: "/Cab Kitchen/Colors/espresso-walnut-2023.png", image: "/Cab Kitchen/Shaker Classic/4.png" },
      { id: 5, name: "Slate", swatch: "/Cab Kitchen/Colors/slate-2023.png", image: "/Cab Kitchen/Shaker Classic/5.png" },
      { id: 6, name: "Mist", swatch: "/Cab Kitchen/Colors/mist-2023.png", image: "/Cab Kitchen/Shaker Classic/6.png" },
      { id: 7, name: "Latte Walnut", swatch: "/Cab Kitchen/Colors/latte-walnut-2023.png", image: "/Cab Kitchen/Shaker Classic/7.png" },
      { id: 8, name: "Sable Oak", swatch: "/Cab Kitchen/Colors/sable-oak-2023.png", image: "/Cab Kitchen/Shaker Classic/8.png" },
      { id: 9, name: "Nimbus Oak", swatch: "/Cab Kitchen/Colors/nimbus-oak-2023.png", image: "/Cab Kitchen/Shaker Classic/9.png" }
    ]
  },
  {
    id: "shaker_slide",
    name: "SHAKER SLIDE",
    colors: [
      { id: 1, name: "Flour", swatch: "/Cab Kitchen/Colors/flour-2023.png", image: "/Cab Kitchen/Shaker Slide/1.png" },
      { id: 2, name: "Storm", swatch: "/Cab Kitchen/Colors/storm-2023.png", image: "/Cab Kitchen/Shaker Slide/2.png" },
      { id: 3, name: "Espresso Walnut", swatch: "/Cab Kitchen/Colors/espresso-walnut-2023.png", image: "/Cab Kitchen/Shaker Slide/3.png" },
      { id: 4, name: "Graphite", swatch: "/Cab Kitchen/Colors/graphite-2023.png", image: "/Cab Kitchen/Shaker Slide/4.png" }
    ]
  },
  {
    id: "fusion_shaker",
    name: "FUSION SHAKER",
    colors: [
      { id: 1, name: "Flour", swatch: "/Cab Kitchen/Colors/flour-2023.png", image: "/Cab Kitchen/Fusion Shaker/1.png" },
      { id: 2, name: "Storm", swatch: "/Cab Kitchen/Colors/storm-2023.png", image: "/Cab Kitchen/Fusion Shaker/2.png" },
      { id: 3, name: "Espresso Walnut", swatch: "/Cab Kitchen/Colors/espresso-walnut-2023.png", image: "/Cab Kitchen/Fusion Shaker/3.png" },
      { id: 4, name: "Graphite", swatch: "/Cab Kitchen/Colors/graphite-2023.png", image: "/Cab Kitchen/Fusion Shaker/4.png" },
      { id: 5, name: "Slate", swatch: "/Cab Kitchen/Colors/slate-2023.png", image: "/Cab Kitchen/Fusion Shaker/5.png" },
      { id: 6, name: "Mist", swatch: "/Cab Kitchen/Colors/mist-2023.png", image: "/Cab Kitchen/Fusion Shaker/6.png" },
      { id: 7, name: "Latte Walnut", swatch: "/Cab Kitchen/Colors/latte-walnut-2023.png", image: "/Cab Kitchen/Fusion Shaker/7.png" }
    ]
  },
  {
    id: "fusion_slide",
    name: "FUSION SLIDE",
    colors: [
      { id: 1, name: "Flour", swatch: "/Cab Kitchen/Colors/flour-2023.png", image: "/Cab Kitchen/Fusion Slide/1.png" },
      { id: 2, name: "Storm", swatch: "/Cab Kitchen/Colors/storm-2023.png", image: "/Cab Kitchen/Fusion Slide/2.png" },
      { id: 3, name: "Espresso Walnut", swatch: "/Cab Kitchen/Colors/espresso-walnut-2023.png", image: "/Cab Kitchen/Fusion Slide/3.png" },
      { id: 4, name: "Graphite", swatch: "/Cab Kitchen/Colors/graphite-2023.png", image: "/Cab Kitchen/Fusion Slide/4.png" }
    ]
  },
  {
    id: "slab",
    name: "SLAB",
    colors: [
      { id: 1, name: "Flour", swatch: "/Cab Kitchen/Colors/flour-2023.png", image: "/Cab Kitchen/Slab/1.png" },
      { id: 2, name: "Storm", swatch: "/Cab Kitchen/Colors/storm-2023.png", image: "/Cab Kitchen/Slab/2.png" },
      { id: 3, name: "Graphite", swatch: "/Cab Kitchen/Colors/graphite-2023.png", image: "/Cab Kitchen/Slab/3.png" },
      { id: 4, name: "Espresso Walnut", swatch: "/Cab Kitchen/Colors/espresso-walnut-2023.png", image: "/Cab Kitchen/Slab/4.png" },
      { id: 5, name: "Slate", swatch: "/Cab Kitchen/Colors/slate-2023.png", image: "/Cab Kitchen/Slab/5.png" },
      { id: 6, name: "Mist", swatch: "/Cab Kitchen/Colors/mist-2023.png", image: "/Cab Kitchen/Slab/6.png" },
      { id: 7, name: "Latte Walnut", swatch: "/Cab Kitchen/Colors/latte-walnut-2023.png", image: "/Cab Kitchen/Slab/7.png" },
      { id: 8, name: "Urban Teak", swatch: "/Cab Kitchen/Colors/urban-teak-2023.jpg", image: "/Cab Kitchen/Slab/8.png" },
      { id: 9, name: "Platinum Teak", swatch: "/Cab Kitchen/Colors/platinum-teak-white-2023.png", image: "/Cab Kitchen/Slab/9.png" },
      { id: 10, name: "Snow Gloss", swatch: "/Cab Kitchen/Colors/snow-gloss-white-2023.png", image: "/Cab Kitchen/Slab/10.png" },
      { id: 11, name: "Wheat Oak", swatch: "/Cab Kitchen/Colors/wheat-oak.jpg", image: "/Cab Kitchen/Slab/11.png" }
    ]
  }
]

export function KitchenColorSelector() {
  const [selectedStyle, setSelectedStyle] = useState(kitchenStyles[2]) // Default to Fusion Shaker
  const [selectedColor, setSelectedColor] = useState(selectedStyle.colors[3]) // Default to 4th color (Graphite)

  const handleColorSelect = (style: typeof kitchenStyles[0], color: typeof style.colors[0]) => {
    setSelectedStyle(style)
    setSelectedColor(color)
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="flex flex-col lg:flex-row h-screen">
        {/* Left Panel - Color Swatches */}
        <div className="w-full lg:w-80 bg-neutral-900 overflow-y-auto p-6 lg:p-8">
          <div className="space-y-8">
            {kitchenStyles.map((style) => (
              <div key={style.id}>
                <h3 className="text-white text-xs font-semibold tracking-wider mb-3">
                  {style.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {style.colors.map((color) => (
                    <button
                      key={`${style.id}-${color.id}`}
                      onClick={() => handleColorSelect(style, color)}
                      className={`
                        relative w-12 h-12 rounded-full overflow-hidden border-2 transition-all
                        ${selectedStyle.id === style.id && selectedColor.id === color.id
                          ? "border-orange-500 ring-2 ring-orange-500/50 scale-110"
                          : "border-neutral-700 hover:border-neutral-500"
                        }
                      `}
                      title={color.name}
                    >
                      <Image
                        src={color.swatch}
                        alt={color.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Kitchen Preview */}
        <div className="flex-1 relative bg-neutral-900">
          <motion.div
            key={selectedColor.image}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full"
          >
            <Image
              src={selectedColor.image}
              alt={`${selectedStyle.name} - ${selectedColor.name}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, calc(100vw - 320px)"
              priority
            />
          </motion.div>

          {/* Bottom Overlay - Door Detail */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent p-6 lg:p-8">
            <div className="flex items-end gap-6">
              {/* Door Closeup */}
              <div className="hidden lg:block relative w-32 h-32 rounded-lg overflow-hidden border-2 border-white/20">
                <Image
                  src={selectedColor.image}
                  alt="Door detail"
                  fill
                  className="object-cover scale-150"
                  sizes="128px"
                />
              </div>

              {/* Description */}
              <div className="flex-1">
                <h2 className="text-white text-2xl lg:text-3xl font-light mb-2">
                  {selectedStyle.name.charAt(0) + selectedStyle.name.slice(1).toLowerCase()}
                </h2>
                <p className="text-orange-500 text-lg font-medium mb-1">
                  {selectedColor.name}.
                </p>
                <p className="text-neutral-400 text-sm">
                  The classic dark finish walnut with wood grain texture. Available in all door styles.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
