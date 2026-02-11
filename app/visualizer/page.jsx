"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, ArrowRight } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { DoorGallery } from "@/components/visualizer/DoorGallery";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { DoorQuizModal } from "@/components/quiz/DoorQuizModal";

function VisualizerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const doorSlug = searchParams.get("door");

  const [selectedDoor, setSelectedDoor] = useState(null);

  // If a door slug is in the URL, skip straight to upload page
  useEffect(() => {
    if (doorSlug) {
      const product = products.find(p => p.slug === doorSlug);
      if (product) {
        router.replace(`/visualizer/upload?door=${doorSlug}`);
      }
    }
  }, [doorSlug, router]);

  const handleContinue = () => {
    if (selectedDoor) {
      router.push(`/visualizer/upload?door=${selectedDoor.slug}`);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-amber-400 mb-4">
              Door Visualizer
            </p>
            <h1 className="text-4xl md:text-6xl font-light text-white mb-4">
              See It On <span className="italic">Your Home</span>
            </h1>
            <p className="text-lg text-neutral-400 max-w-2xl">
              Choose a door style, then upload a photo to see how it looks on your home.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Step 1 - Door Selection */}
      <section className="py-12 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-amber-400 mb-3">Step 1 of 2</p>
              <h2 className="text-2xl md:text-3xl font-light text-white">Choose a door style</h2>
            </div>
            <DoorQuizModal onSelectDoor={setSelectedDoor} />
          </div>

          <DoorGallery
            selectedDoor={selectedDoor}
            onSelectDoor={setSelectedDoor}
          />

          {/* Continue Button - Fixed at bottom */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: selectedDoor ? 1 : 0.5, y: 0 }}
            className="mt-12 flex flex-col items-center gap-4"
          >
            {selectedDoor && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4 p-4 bg-neutral-900 rounded-xl border border-neutral-800"
              >
                <img
                  src={selectedDoor.image}
                  alt={selectedDoor.name}
                  className="w-14 h-18 object-cover rounded-lg border border-neutral-700"
                />
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Selected</p>
                  <p className="text-white font-medium">{selectedDoor.name}</p>
                </div>
              </motion.div>
            )}

            <Button
              onClick={handleContinue}
              disabled={!selectedDoor}
              className="px-10 py-6 text-lg bg-amber-500 text-neutral-900 
                       hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue to Upload Photo
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            {!selectedDoor && (
              <p className="text-sm text-neutral-500">Select a door above to continue</p>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function VisualizerPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
      </main>
    }>
      <VisualizerContent />
    </Suspense>
  );
}
