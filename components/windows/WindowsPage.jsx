"use client";

import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import categories from "@/data/windowsCategories.json";
import { WindowCategoryCard } from "./WindowCategoryCard";
import { EnergyPerformanceStrip } from "./EnergyPerformanceStrip";

export function WindowsPage() {
  return (
    <main className="min-h-screen bg-neutral-950">
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-14 bg-neutral-950 overflow-hidden">
        <div className="absolute inset-0 [background:radial-gradient(1100px_circle_at_20%_10%,rgba(255,255,255,0.06),transparent_55%)]" />
        <div className="absolute inset-0 [background:radial-gradient(900px_circle_at_70%_20%,rgba(251,191,36,0.10),transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70" />

        <div className="relative max-w-7xl mx-auto px-6">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-400 mb-4">
            Windows Collection
          </p>
          <h1 className="text-4xl md:text-6xl font-light text-white mb-4">
            Windows Collection
          </h1>
          <p className="text-lg text-neutral-300 max-w-3xl">
            Premium window systems engineered for performance, beauty, and efficiency
          </p>
          <p className="mt-3 text-sm md:text-base text-neutral-400 max-w-3xl">
            Customizable window solutions for residential and architectural applications.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Link
              href="/visualizer"
              className="inline-flex items-center justify-center px-7 py-3 rounded-sm
                         bg-white text-neutral-950 font-medium hover:bg-white/90 transition-colors"
            >
              Visualize On Your Home
            </Link>
            <a
              href="tel:+19097891818"
              className="inline-flex items-center justify-center px-7 py-3 rounded-sm
                         border border-white/20 text-white hover:border-white/30 hover:bg-white/[0.06]
                         transition-colors"
            >
              Get Free Quote
            </a>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="pb-20 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {categories.map((c, idx) => (
              <WindowCategoryCard key={c.slug} category={c} index={idx} />
            ))}
          </div>

          <div className="mt-12">
            <EnergyPerformanceStrip />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

