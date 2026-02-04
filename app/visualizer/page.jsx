"use client";

import { useState, useEffect, Suspense, useRef } from "react";
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
  const [jobId, setJobId] = useState(null);
  const [jobStatus, setJobStatus] = useState(null);
  const pollRef = useRef(null);

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

  const clearPolling = () => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  };

  useEffect(() => {
    return () => clearPolling();
  }, []);

  const safeFetchStatus = async (activeJobId) => {
    try {
      const response = await fetch(`/api/visualizer/status?jobId=${activeJobId}`, {
        cache: "no-store",
      });

      let data = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok || !data?.status) {
        return { status: "processing" };
      }

      return data;
    } catch {
      return { status: "processing" };
    }
  };

  const startPolling = (activeJobId) => {
    clearPolling();

    const poll = async () => {
      const data = await safeFetchStatus(activeJobId);
      const status = data?.status || "processing";

      setJobStatus(status);

      if (status === "completed" && data?.imageUrl) {
        setGeneratedImage(data.imageUrl);
        setIsLoading(false);
        clearPolling();
        return;
      }

      if (status === "failed") {
        setIsLoading(false);
        setError("Generation failed. Please try again.");
        clearPolling();
      }
    };

    poll();
    pollRef.current = setInterval(poll, 2000);
  };

  const handleGenerate = async () => {
    setError(null);
    setGeneratedImage(null);
    setJobId(null);
    setJobStatus(null);
    clearPolling();
    
    if (!uploadedImage) {
      setError("Please upload a photo of your home first.");
      return;
    }

    if (!selectedDoor) {
      setError("Please select a door before using the visualizer.");
      return;
    }

    setIsLoading(true);
    setJobStatus("queued");

    // Construct absolute URL for door image
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const doorImageUrl = `${origin}${selectedDoor.image}`;

    let data = null;
    try {
      const response = await fetch("/api/visualizer/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          homeImageUrl: uploadedImage,
          doorImageUrl,
        }),
      });

      try {
        data = await response.json();
      } catch {
        data = null;
      }
    } catch {
      data = null;
    }

    if (!data?.jobId) {
      setIsLoading(false);
      setError("Unable to start visualization. Please try again.");
      return;
    }

    setJobId(data.jobId);
    setJobStatus(data.status || "queued");
    startPolling(data.jobId);
  };

  const handleReset = () => {
    setGeneratedImage(null);
    setError(null);
    setJobId(null);
    setJobStatus(null);
    setIsLoading(false);
    clearPolling();
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
              <div className="flex-1">
                <p className="text-red-300">{error}</p>
              </div>
              {jobStatus === "failed" && (
                <Button
                  onClick={handleGenerate}
                  variant="outline"
                  className="border-red-400/60 text-red-200 hover:bg-red-500/10"
                >
                  Retry
                </Button>
              )}
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
                      {jobStatus === "queued" && "Preparing image"}
                      {jobStatus === "processing" && "Generating visualization"}
                      {!jobStatus && "Generating preview…"}
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
