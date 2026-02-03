"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ChevronRight } from "lucide-react"

// Door style options
const doorStyles = [
  { id: "shaker_slide", name: "Shaker Slide", description: "Classic shaker profile with modern slide overlay" },
  { id: "fusion_slide", name: "Fusion Slide", description: "Contemporary fusion design with smooth lines" },
  { id: "fusion_shaker", name: "Fusion Shaker", description: "Best of both worlds - fusion meets shaker" },
  { id: "slab", name: "Slab", description: "Clean, minimal flat panel design" }
]

// Hardware options
const hardwareStyles = [
  { id: "loft", name: "Loft", description: "Modern industrial style" },
  { id: "cottage", name: "Cottage", description: "Warm cottage aesthetic" },
  { id: "arch", name: "Arch", description: "Elegant curved design" },
  { id: "artisan", name: "Artisan", description: "Handcrafted artisan look" },
  { id: "bar", name: "Bar", description: "Sleek bar pull design" },
  { id: "square", name: "Square", description: "Clean square profile" }
]

// Finish options
const finishes = [
  { id: "matte_black", name: "Matte Black", color: "#1a1a1a" },
  { id: "satin_nickel", name: "Satin Nickel", color: "#b8b8b8" },
  { id: "chrome", name: "Chrome", color: "#e8e8e8" },
  { id: "rose_gold", name: "Rose Gold", color: "#b76e79" }
]

type ConfigStep = "door" | "hardware" | "finish" | "preview"

export function CabinetConfigurator() {
  const [step, setStep] = useState<ConfigStep>("door")
  const [selectedDoor, setSelectedDoor] = useState<string | null>(null)
  const [selectedHardware, setSelectedHardware] = useState<string | null>(null)
  const [selectedFinish, setSelectedFinish] = useState<string | null>(null)
  const [dataset, setDataset] = useState<any>(null)
  const [previewImage, setPreviewImage] = useState<string>("/cabs_clean/kitchens/modern-kitchen-interior-design.jpg")

  // Load dataset
  useEffect(() => {
    fetch("/cabs_clean/dataset.json")
      .then(res => res.json())
      .then(setDataset)
      .catch(console.error)
  }, [])

  // Update preview when selections change
  useEffect(() => {
    if (dataset && selectedDoor) {
      const doorImages = dataset.doors[selectedDoor]
      if (doorImages && doorImages.length > 0) {
        setPreviewImage(`/cabs_clean/${doorImages[0]}`)
      }
    }
  }, [dataset, selectedDoor])

  const canProceed = () => {
    switch (step) {
      case "door": return !!selectedDoor
      case "hardware": return !!selectedHardware
      case "finish": return !!selectedFinish
      default: return true
    }
  }

  const nextStep = () => {
    switch (step) {
      case "door": setStep("hardware"); break
      case "hardware": setStep("finish"); break
      case "finish": setStep("preview"); break
    }
  }

  const prevStep = () => {
    switch (step) {
      case "hardware": setStep("door"); break
      case "finish": setStep("hardware"); break
      case "preview": setStep("finish"); break
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-16">
          {["door", "hardware", "finish", "preview"].map((s, i) => (
            <div key={s} className="flex items-center">
              <div 
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                  transition-all duration-300
                  ${step === s 
                    ? "bg-red-600 text-white" 
                    : (["door", "hardware", "finish", "preview"].indexOf(step) > i 
                        ? "bg-red-600/20 text-red-400" 
                        : "bg-neutral-800 text-neutral-500"
                      )
                  }
                `}
              >
                {["door", "hardware", "finish", "preview"].indexOf(step) > i ? (
                  <Check className="w-5 h-5" />
                ) : (
                  i + 1
                )}
              </div>
              {i < 3 && (
                <div className={`w-16 h-0.5 mx-2 transition-colors ${
                  ["door", "hardware", "finish", "preview"].indexOf(step) > i 
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
                {selectedDoor && doorStyles.find(d => d.id === selectedDoor)?.name}
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
                  
                  <div className="grid grid-cols-2 gap-4">
                    {doorStyles.map(door => (
                      <button
                        key={door.id}
                        onClick={() => setSelectedDoor(door.id)}
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
                  
                  <div className="grid grid-cols-2 gap-4">
                    {hardwareStyles.map(hw => (
                      <button
                        key={hw.id}
                        onClick={() => setSelectedHardware(hw.id)}
                        className={`
                          p-6 rounded-lg text-left transition-all duration-300 border
                          ${selectedHardware === hw.id 
                            ? "bg-red-600/10 border-red-600 text-white" 
                            : "bg-neutral-900 border-neutral-800 text-neutral-300 hover:border-neutral-700"
                          }
                        `}
                      >
                        <h3 className="font-medium mb-1">{hw.name}</h3>
                        <p className="text-sm text-neutral-500">{hw.description}</p>
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
                          className="w-8 h-8 rounded-full border border-neutral-700"
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
                      <p className="text-white font-medium">{doorStyles.find(d => d.id === selectedDoor)?.name}</p>
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
