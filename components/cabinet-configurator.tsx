"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ChevronRight } from "lucide-react"

// Door style options with kitchen preview images
const doorStyles = [
  { 
    id: "shaker_slide", 
    name: "Shaker Slide", 
    description: "Classic shaker profile with modern slide overlay",
    colors: [
      { name: "Flour", image: "/cabs_clean/kitchens/Flour-Slide_Kitchen.jpg" },
      { name: "Storm", image: "/cabs_clean/kitchens/Storm-Slide_Kitchen.jpg" },
      { name: "Espresso Walnut", image: "/cabs_clean/kitchens/Espresso-Walnut-Slide_Kitchen.jpg" },
      { name: "Graphite", image: "/cabs_clean/kitchens/Graphite-Slide_Kitchen.jpg" }
    ]
  },
  { 
    id: "fusion_shaker", 
    name: "Fusion Shaker", 
    description: "Best of both worlds - fusion meets shaker",
    colors: [
      { name: "Flour", image: "/cabs_clean/kitchens/Flour-Fusion-Shaker_Kitchen.jpg" },
      { name: "Storm", image: "/cabs_clean/kitchens/Storm-Fusion-Shaker_Kitchen (1).jpg" },
      { name: "Espresso Walnut", image: "/cabs_clean/kitchens/Espresso-Walnut-Fusion-Shaker.jpg" },
      { name: "Graphite", image: "/cabs_clean/kitchens/Graphite-Fusion-Shaker_Kitchen.jpg" },
      { name: "Slate", image: "/cabs_clean/kitchens/Slate-Fusion-Shaker_Kitchen.jpg" },
      { name: "Mist", image: "/cabs_clean/kitchens/Mist-Fusion-Shaker_Kitchen.jpg" },
      { name: "Latte Walnut", image: "/cabs_clean/kitchens/Latte-Walnut-Fusion-Shaker_Kitchen.jpg" }
    ]
  },
  { 
    id: "fusion_slide", 
    name: "Fusion Slide", 
    description: "Contemporary fusion design with smooth lines",
    colors: [
      { name: "Flour", image: "/cabs_clean/kitchens/Flour-Fusion-Slide_Kitchen.jpg" },
      { name: "Storm", image: "/cabs_clean/kitchens/Storm-Fusion-Slide_Kitchen (1).jpg" },
      { name: "Espresso Walnut", image: "/cabs_clean/kitchens/Espresso-Walnut-Fusion-Slide.jpg" },
      { name: "Graphite", image: "/cabs_clean/kitchens/Graphite-Fusion-Slide_Kitchen.jpg" }
    ]
  },
  { 
    id: "slab", 
    name: "Slab", 
    description: "Clean, minimal flat panel design",
    colors: [
      { name: "Flour", image: "/cabs_clean/kitchens/Flour-Slab_Kitchen.jpg" },
      { name: "Storm", image: "/cabs_clean/kitchens/Storm-Slab_Kitchen.jpg" },
      { name: "Espresso Walnut", image: "/cabs_clean/kitchens/Espresso-Walnut-Slab.jpg" },
      { name: "Graphite", image: "/cabs_clean/kitchens/Graphite-Slab_Kitchen.jpg" },
      { name: "Slate", image: "/cabs_clean/kitchens/Slate-Slab_Kitchen.jpg" },
      { name: "Mist", image: "/cabs_clean/kitchens/Mist-Slab_Kitchen.jpg" },
      { name: "Latte Walnut", image: "/cabs_clean/kitchens/Latte-Walnut-Slab_Kitchen.jpg" },
      { name: "Urban Teak", image: "/cabs_clean/kitchens/Urban-Teak-Slab_Kitchen.jpg" },
      { name: "Platinum Teak", image: "/cabs_clean/kitchens/Platinum-Teak-Slab_Kitchen.jpg" },
      { name: "Snow Gloss", image: "/cabs_clean/kitchens/Snow-Gloss-Slab_Kitchen.jpg" },
      { name: "Wheat Oak", image: "/cabs_clean/kitchens/Wheat-Oak-Slab.jpg" }
    ]
  }
]

// Hardware options
const hardwareStyles = [
  { id: "loft", name: "Loft", description: "Modern industrial style", image: "/cabs_clean/hardware/loft/Loft_MatteBlack.png" },
  { id: "cottage", name: "Cottage", description: "Warm cottage aesthetic", image: "/cabs_clean/hardware/cottage/Cottage__Chrome.png" },
  { id: "arch", name: "Arch", description: "Elegant curved design", image: "/cabs_clean/hardware/arch/arch_chrome.png" },
  { id: "artisan", name: "Artisan", description: "Handcrafted artisan look", image: "/cabs_clean/hardware/artisan/Artisan_Chrome.png" },
  { id: "bar", name: "Bar", description: "Sleek bar pull design", image: "/cabs_clean/hardware/bar/Bar-pulls-black .png" },
  { id: "square", name: "Square", description: "Clean square profile", image: "/cabs_clean/hardware/square/Square_chrome.png" }
]

// Finish options
const finishes = [
  { id: "matte_black", name: "Matte Black", color: "#1a1a1a" },
  { id: "satin_nickel", name: "Satin Nickel", color: "#b8b8b8" },
  { id: "chrome", name: "Chrome", color: "#e8e8e8" },
  { id: "rose_gold", name: "Rose Gold", color: "#b76e79" }
]

type ConfigStep = "door" | "color" | "hardware" | "finish" | "preview"

export function CabinetConfigurator() {
  const [step, setStep] = useState<ConfigStep>("door")
  const [selectedDoor, setSelectedDoor] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<{name: string, image: string} | null>(null)
  const [selectedHardware, setSelectedHardware] = useState<string | null>(null)
  const [selectedFinish, setSelectedFinish] = useState<string | null>(null)

  const currentDoorStyle = doorStyles.find(d => d.id === selectedDoor)
  const previewImage = selectedColor?.image || "/cabs_clean/kitchens/Flour-Slab_Kitchen.jpg"

  const canProceed = () => {
    switch (step) {
      case "door": return !!selectedDoor
      case "color": return !!selectedColor
      case "hardware": return !!selectedHardware
      case "finish": return !!selectedFinish
      default: return true
    }
  }

  const nextStep = () => {
    switch (step) {
      case "door": setStep("color"); break
      case "color": setStep("hardware"); break
      case "hardware": setStep("finish"); break
      case "finish": setStep("preview"); break
    }
  }

  const prevStep = () => {
    switch (step) {
      case "color": setStep("door"); break
      case "hardware": setStep("color"); break
      case "finish": setStep("hardware"); break
      case "preview": setStep("finish"); break
    }
  }

  const steps = ["door", "color", "hardware", "finish", "preview"]

  return (
    <div className="min-h-screen bg-neutral-950 py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-16">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center">
              <div 
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                  transition-all duration-300
                  ${step === s 
                    ? "bg-red-600 text-white" 
                    : (steps.indexOf(step) > i 
                        ? "bg-red-600/20 text-red-400" 
                        : "bg-neutral-800 text-neutral-500"
                      )
                  }
                `}
              >
                {steps.indexOf(step) > i ? (
                  <Check className="w-5 h-5" />
                ) : (
                  i + 1
                )}
              </div>
              {i < steps.length - 1 && (
                <div className={`w-8 md:w-16 h-0.5 mx-1 md:mx-2 transition-colors ${
                  steps.indexOf(step) > i 
                    ? "bg-red-600/40" 
                    : "bg-neutral-800"
                }`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Preview */}
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-neutral-900">
            <Image
              src={previewImage}
              alt="Cabinet Preview"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute bottom-4 left-4 bg-black/70 px-4 py-2 rounded">
              <p className="text-white text-sm">
                {currentDoorStyle?.name || "Select a style"}
                {selectedColor && ` • ${selectedColor.name}`}
                {selectedHardware && ` • ${hardwareStyles.find(h => h.id === selectedHardware)?.name}`}
                {selectedFinish && ` • ${finishes.find(f => f.id === selectedFinish)?.name}`}
              </p>
            </div>
          </div>

          {/* Configuration Panel */}
          <div>
            <AnimatePresence mode="wait">
              {step === "door" && (
                <motion.div
                  key="door"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-3xl font-light text-white mb-2">Select Door Style</h2>
                  <p className="text-neutral-400 mb-8">Choose the door profile that matches your vision</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {doorStyles.map(door => (
                      <button
                        key={door.id}
                        onClick={() => {
                          setSelectedDoor(door.id)
                          setSelectedColor(null)
                        }}
                        className={`
                          p-6 rounded-lg text-left transition-all duration-300 border
                          ${selectedDoor === door.id 
                            ? "bg-red-600/10 border-red-600 text-white" 
                            : "bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700"
                          }
                        `}
                      >
                        <h3 className="font-medium mb-1">{door.name}</h3>
                        <p className="text-sm text-neutral-500">{door.description}</p>
                        <p className="text-xs text-neutral-600 mt-2">{door.colors.length} colors</p>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === "color" && currentDoorStyle && (
                <motion.div
                  key="color"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-3xl font-light text-white mb-2">Select Color</h2>
                  <p className="text-neutral-400 mb-8">Choose a color for your {currentDoorStyle.name} cabinets</p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto pr-2">
                    {currentDoorStyle.colors.map(color => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`
                          relative rounded-lg overflow-hidden transition-all duration-300 border-2
                          ${selectedColor?.name === color.name 
                            ? "border-red-600" 
                            : "border-transparent hover:border-neutral-700"
                          }
                        `}
                      >
                        <div className="relative aspect-[4/3]">
                          <Image
                            src={color.image}
                            alt={color.name}
                            fill
                            className="object-cover"
                            sizes="200px"
                          />
                        </div>
                        <div className="p-2 bg-neutral-900">
                          <p className="text-sm text-white truncate">{color.name}</p>
                        </div>
                        {selectedColor?.name === color.name && (
                          <div className="absolute top-2 right-2 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === "hardware" && (
                <motion.div
                  key="hardware"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-3xl font-light text-white mb-2">Select Hardware Style</h2>
                  <p className="text-neutral-400 mb-8">Choose your handle and pull design</p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {hardwareStyles.map(hw => (
                      <button
                        key={hw.id}
                        onClick={() => setSelectedHardware(hw.id)}
                        className={`
                          relative rounded-lg overflow-hidden transition-all duration-300 border-2
                          ${selectedHardware === hw.id 
                            ? "border-red-600" 
                            : "border-transparent hover:border-neutral-700"
                          }
                        `}
                      >
                        <div className="relative aspect-square bg-neutral-800 p-4">
                          <Image
                            src={hw.image}
                            alt={hw.name}
                            fill
                            className="object-contain p-2"
                            sizes="150px"
                          />
                        </div>
                        <div className="p-3 bg-neutral-900">
                          <p className="text-sm text-white font-medium">{hw.name}</p>
                          <p className="text-xs text-neutral-500">{hw.description}</p>
                        </div>
                        {selectedHardware === hw.id && (
                          <div className="absolute top-2 right-2 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === "finish" && (
                <motion.div
                  key="finish"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-3xl font-light text-white mb-2">Select Finish</h2>
                  <p className="text-neutral-400 mb-8">Choose your hardware finish</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {finishes.map(finish => (
                      <button
                        key={finish.id}
                        onClick={() => setSelectedFinish(finish.id)}
                        className={`
                          p-6 rounded-lg text-left transition-all duration-300 border flex items-center gap-4
                          ${selectedFinish === finish.id 
                            ? "bg-red-600/10 border-red-600 text-white" 
                            : "bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700"
                          }
                        `}
                      >
                        <div 
                          className="w-10 h-10 rounded-full border border-neutral-700"
                          style={{ backgroundColor: finish.color }}
                        />
                        <span className="font-medium">{finish.name}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === "preview" && (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-3xl font-light text-white mb-2">Your Configuration</h2>
                  <p className="text-neutral-400 mb-8">Review your selections and request a quote</p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="p-4 bg-neutral-900 rounded-lg border border-neutral-800">
                      <p className="text-sm text-neutral-500 mb-1">Door Style</p>
                      <p className="text-white font-medium">{currentDoorStyle?.name}</p>
                    </div>
                    <div className="p-4 bg-neutral-900 rounded-lg border border-neutral-800">
                      <p className="text-sm text-neutral-500 mb-1">Color</p>
                      <p className="text-white font-medium">{selectedColor?.name}</p>
                    </div>
                    <div className="p-4 bg-neutral-900 rounded-lg border border-neutral-800">
                      <p className="text-sm text-neutral-500 mb-1">Hardware</p>
                      <p className="text-white font-medium">{hardwareStyles.find(h => h.id === selectedHardware)?.name}</p>
                    </div>
                    <div className="p-4 bg-neutral-900 rounded-lg border border-neutral-800 flex items-center gap-4">
                      <div>
                        <p className="text-sm text-neutral-500 mb-1">Finish</p>
                        <p className="text-white font-medium">{finishes.find(f => f.id === selectedFinish)?.name}</p>
                      </div>
                      <div 
                        className="w-6 h-6 rounded-full border border-neutral-700 ml-auto"
                        style={{ backgroundColor: finishes.find(f => f.id === selectedFinish)?.color }}
                      />
                    </div>
                  </div>

                  <a
                    href="/support"
                    className="w-full block text-center py-4 bg-red-600 text-white font-medium rounded-lg
                             hover:bg-red-500 transition-colors"
                  >
                    Request a Quote
                  </a>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex gap-4 mt-8">
              {step !== "door" && (
                <button
                  onClick={prevStep}
                  className="flex-1 py-4 border border-neutral-700 text-white rounded-lg
                           hover:bg-neutral-800 transition-colors"
                >
                  Back
                </button>
              )}
              {step !== "preview" && (
                <button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className={`
                    flex-1 py-4 rounded-lg font-medium flex items-center justify-center gap-2
                    transition-all duration-300
                    ${canProceed() 
                      ? "bg-red-600 text-white hover:bg-red-500" 
                      : "bg-neutral-800 text-neutral-500 cursor-not-allowed"
                    }
                  `}
                >
                  Continue <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
