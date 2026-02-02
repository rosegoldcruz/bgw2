"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, Sparkles, AlertCircle } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ImageUploader } from "@/components/visualizer/ImageUploader";
import { DoorGallery } from "@/components/visualizer/DoorGallery";
import { BeforeAfterSlider } from "@/components/visualizer/BeforeAfterSlider";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";

function VisualizerContent() {
  const searchParams = useSearchParams();
  const doorSlug = searchParams.get("door");

  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedDoor, setSelectedDoor] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Preselect door if slug is provided in URL
  useEffect(() => {
    if (doorSlug) {
      const product = products.find(p => p.slug === doorSlug);
      if (product) {
        setSelectedDoor({
          slug: product.slug,
          name: product.name,
          image: product.image,
          price: product.price
        });
      }
    }
  }, [doorSlug]);

  const handleGenerate = async () => {
    setError(null);
    
    if (!uploadedImage) {
      setError("Please upload a photo of your home first.");
      return;
    }

    if (!selectedDoor) {
      setError("Please select a door before using the visualizer.");
      return;
    }

    setIsLoading(true);

    try {
      // Construct absolute URL for door image
      const origin = typeof window !== "undefined" ? window.location.origin : "";
      const doorImageUrl = `${origin}${selectedDoor.image}`;

      const response = await fetch("/api/visualize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          homeImageUrl: uploadedImage,
          doorImageUrl: doorImageUrl
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate visualization");
      }

      if (data.imageUrl) {
        setGeneratedImage(data.imageUrl);
      } else if (data.predictionId) {
        // Poll for result if prediction is processing
        await pollForResult(data.predictionId);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const pollForResult = async (predictionId) => {
    const maxAttempts = 60;
    let attempts = 0;

    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      try {
        const response = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
          headers: {
            "Authorization": `Bearer ${process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN}`
          }
        });

        const prediction = await response.json();

        if (prediction.status === "succeeded") {
          setGeneratedImage(
            Array.isArray(prediction.output) ? prediction.output[0] : prediction.output
          );
          return;
        } else if (prediction.status === "failed") {
          throw new Error("Generation failed. Please try again.");
        }
      } catch (err) {
        throw new Error("Error checking generation status.");
      }

      attempts++;
    }

    throw new Error("Generation timed out. Please try again.");
  };

  const handleReset = () => {
    setGeneratedImage(null);
    setError(null);
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
              Upload a photo of your doorway, select a door, and see how it looks before you buy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6">
          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-4 bg-red-900/30 border border-red-700 rounded-lg flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-red-300">{error}</p>
            </motion.div>
          )}

          {/* Results View */}
          {generatedImage ? (
            <div className="space-y-8">
              <BeforeAfterSlider
                beforeImage={uploadedImage}
                afterImage={generatedImage}
              />
              
              <div className="flex justify-center gap-4">
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="border-neutral-600 text-white hover:bg-neutral-800"
                >
                  Try Another Door
                </Button>
                <Button
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = generatedImage;
                    link.download = "bgw-door-visualization.jpg";
                    link.click();
                  }}
                  className="bg-amber-500 text-neutral-900 hover:bg-amber-400"
                >
                  Download Result
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column - Upload */}
              <div>
                <ImageUploader
                  onImageCapture={setUploadedImage}
                  uploadedImage={uploadedImage}
                  onClear={() => setUploadedImage(null)}
                />

                {/* Selected Door Preview */}
                {selectedDoor && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 bg-neutral-800 rounded-lg flex items-center gap-4"
                  >
                    <img
                      src={selectedDoor.image}
                      alt={selectedDoor.name}
                      className="w-16 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="text-sm text-neutral-400">Selected Door</p>
                      <p className="text-white font-medium">{selectedDoor.name}</p>
                    </div>
                  </motion.div>
                )}

                {/* Generate Button */}
                <Button
                  onClick={handleGenerate}
                  disabled={isLoading || !uploadedImage || !selectedDoor}
                  className="w-full mt-6 py-6 text-lg bg-amber-500 text-neutral-900 
                           hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Visualize Door
                    </>
                  )}
                </Button>
              </div>

              {/* Right Column - Door Gallery */}
              <div>
                <DoorGallery
                  selectedDoor={selectedDoor}
                  onSelectDoor={setSelectedDoor}
                />
              </div>
            </div>
          )}
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
