"use client";

import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import categories from "@/data/windowsCategories.json";
import { WindowCategoryCard } from "./WindowCategoryCard";
import { EnergyPerformanceStrip } from "./EnergyPerformanceStrip";
import { LeadCaptureForm } from "@/components/leads/LeadCaptureForm";
import { Button } from "@/components/ui/button";

export function WindowsPage() {
  const heroCategory = categories.find((c) => c.slug === "energy-efficient") || categories[0];
  const heroImage = heroCategory?.images?.[0];

  return (
    <main className="min-h-screen bg-neutral-950">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-neutral-950 overflow-hidden">
        <div className="absolute inset-0 [background:radial-gradient(1100px_circle_at_20%_10%,rgba(255,255,255,0.06),transparent_55%)]" />
        <div className="absolute inset-0 [background:radial-gradient(900px_circle_at_70%_20%,rgba(251,191,36,0.10),transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-amber-400 mb-4">
                Windows Collection
              </p>
              <h1 className="text-4xl md:text-6xl font-light text-white mb-4">
                Architectural Windows Built For Performance
              </h1>
              <p className="text-lg text-neutral-300 max-w-2xl">
                Premium window systems engineered for efficiency, quiet interiors, and modern design.
              </p>
              <p className="mt-3 text-sm md:text-base text-neutral-400 max-w-2xl">
                Choose the material system that fits your project and we’ll handle the rest.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link href="/visualizer">
                  <Button className="bg-white text-neutral-950 hover:bg-white/90">
                    Visualize On Your Home
                  </Button>
                </Link>
                <a href="tel:+19097891818">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/[0.06]">
                    Get Free Quote
                  </Button>
                </a>
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/10 bg-neutral-900">
              {heroImage && (
                <Image
                  src={heroImage}
                  alt={heroCategory?.name || "Window collection"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                  priority
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            </div>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="pb-20 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-400 mb-3">Systems</p>
            <h2 className="text-3xl md:text-4xl font-light text-white">
              Window Systems by Material
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {categories.map((c, idx) => (
              <WindowCategoryCard key={c.slug} category={c} index={idx} />
            ))}
          </div>

          <div className="mt-12">
            <EnergyPerformanceStrip />
          </div>

          <div className="mt-12 max-w-xl">
            <LeadCaptureForm
              title="Request window pricing"
              description="Tell us your project scope and we’ll respond with options and pricing."
              source="windows"
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
