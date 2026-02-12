"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2, Sparkles, AlertCircle, ArrowLeft } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ImageUploader } from "@/components/visualizer/ImageUploader";
import { BeforeAfterSlider } from "@/components/visualizer/BeforeAfterSlider";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { LeadCaptureForm } from "@/components/leads/LeadCaptureForm";
import { useCart } from "@/components/cart/cart-context";

function UploadContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const doorSlug = searchParams.get("door");

  const [selectedDoor, setSelectedDoor] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [jobId, setJobId] = useState(null);
  const [jobStatus, setJobStatus] = useState(null);
  const pollRef = useRef(null);
  const { addItem } = useCart();
  const [cartAdded, setCartAdded] = useState(false);

  const selectedProduct = selectedDoor
    ? products.find((product) => product.slug === selectedDoor.slug)
    : null;

  // Load door from URL param
  useEffect(() => {
    if (doorSlug) {
      const product = products.find((p) => p.slug === doorSlug);
      if (product) {
        setSelectedDoor({
          slug: product.slug,
          name: product.name,
          image: product.image,
          price: product.price,
        });
      } else {
        // Invalid door slug, send back to step 1
        router.replace("/visualizer");
      }
    } else {
      // No door selected, send back to step 1
      router.replace("/visualizer");
    }
  }, [doorSlug, router]);

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
      const response = await fetch(
        `/api/visualizer/status?jobId=${activeJobId}`,
        {
          cache: "no-store",
        }
      );

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
    const origin =
      typeof window !== "undefined" ? window.location.origin : "";
    const doorImageUrl = new URL(selectedDoor.image, origin).toString();

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
          doorName: selectedDoor?.name || "",
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
      setError(data?.error || "Unable to start visualization. Please try again.");
      return;
    }

    // Start polling - the status endpoint checks Replicate directly
    setJobId(data.jobId);
    setJobStatus(data.status || "processing");
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

  const handleAddToCart = () => {
    if (!selectedProduct) return;
    addItem(selectedProduct, 1);
    setCartAdded(true);
    setTimeout(() => setCartAdded(false), 2000);
  };

  // Don't render until door is loaded
  if (!selectedDoor) {
    return (
      <main className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-950">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-8 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6">
          <Link
            href="/visualizer"
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Door Selection
          </Link>

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
              Upload a photo of your doorway and generate a preview with your
              selected door.
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
              className="mb-8 p-4 bg-red-900/30 border border-red-700 rounded-xl flex items-center gap-3"
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
                  Try Another Photo
                </Button>
                <Link href="/visualizer">
                  <Button
                    variant="outline"
                    className="border-neutral-600 text-white hover:bg-neutral-800"
                  >
                    Try Another Door
                  </Button>
                </Link>
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

              <div className="border border-neutral-800 bg-neutral-900/60 rounded-xl p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-amber-400 mb-2">
                      Next Step
                    </p>
                    <h3 className="text-2xl font-light text-white mb-2">
                      Love it? Start your project.
                    </h3>
                    <p className="text-sm text-neutral-400 max-w-xl">
                      Get pricing, availability, and project guidance for this
                      exact door.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {selectedDoor?.slug && (
                      <Link href={`/product/${selectedDoor.slug}`}>
                        <Button
                          variant="outline"
                          className="border-neutral-700 text-white hover:bg-neutral-800"
                        >
                          View Door Details
                        </Button>
                      </Link>
                    )}
                    <Button
                      onClick={handleAddToCart}
                      disabled={!selectedProduct}
                      className="bg-white text-neutral-950 hover:bg-neutral-100"
                    >
                      {cartAdded ? "Added to Cart" : "Add to Cart"}
                    </Button>
                  </div>
                </div>
              </div>

              <LeadCaptureForm
                title="Request pricing for this door"
                description="Share your details and we'll send pricing, availability, and install guidance."
                source="visualizer"
                context={{
                  door: selectedDoor?.name,
                  doorSlug: selectedDoor?.slug,
                  generatedImage,
                }}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Step 2 - Upload Photo */}
              <div className="lg:col-span-7">
                <p className="text-xs uppercase tracking-[0.3em] text-amber-400 mb-3">
                  Step 2 of 2
                </p>
                <h2 className="text-2xl md:text-3xl font-light text-white mb-4">
                  Upload your doorway
                </h2>
                <ImageUploader
                  onImageCapture={setUploadedImage}
                  uploadedImage={uploadedImage}
                  onClear={() => setUploadedImage(null)}
                />
              </div>

              {/* Generate Panel */}
              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-28 space-y-6">
                  <div className="p-6 bg-neutral-900 rounded-xl border border-neutral-800">
                    <p className="text-xs uppercase tracking-[0.3em] text-amber-400 mb-3">
                      Generate Preview
                    </p>
                    <h2 className="text-2xl font-light text-white mb-3">
                      See your new door
                    </h2>
                    <p className="text-sm text-neutral-400 mb-6">
                      We'll blend your selected door into your photo with
                      matched lighting and scale.
                    </p>

                    {/* Selected Door Preview */}
                    <div className="mb-6 flex items-center gap-4">
                      <img
                        src={selectedDoor.image}
                        alt={selectedDoor.name}
                        className="w-16 h-20 object-cover rounded-lg border border-neutral-700"
                      />
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                          Selected Door
                        </p>
                        <p className="text-white font-medium">
                          {selectedDoor.name}
                        </p>
                        {selectedDoor?.slug && (
                          <Link
                            href={`/product/${selectedDoor.slug}`}
                            className="text-xs text-amber-400 hover:text-amber-300 transition-colors"
                          >
                            View product details
                          </Link>
                        )}
                      </div>
                    </div>

                    <Button
                      onClick={handleGenerate}
                      disabled={isLoading || !uploadedImage || !selectedDoor}
                      className="w-full py-6 text-lg bg-amber-500 text-neutral-900 
                               hover:bg-amber-400 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          {jobStatus === "queued" && "Preparing image"}
                          {jobStatus === "processing" &&
                            "Generating visualization"}
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
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default function VisualizerUploadPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-neutral-950 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
        </main>
      }
    >
      <UploadContent />
    </Suspense>
  );
}
