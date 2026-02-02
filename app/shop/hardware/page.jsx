"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ShopProductGrid } from "@/components/shop";
import { categories } from "@/data/products";

export default function HardwarePage() {
  const category = categories.find((c) => c.id === "hardware");

  return (
    <main className="min-h-screen bg-neutral-950">
      <Header />
      
      {/* Category Hero */}
      <section className="relative pt-32 pb-16 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-400 mb-4">Shop Collection</p>
          <h1 className="text-5xl md:text-7xl font-light text-white mb-4">{category?.name}</h1>
          <p className="text-xl text-neutral-400 max-w-2xl">{category?.description}</p>
        </div>
      </section>
      
      {/* Product Grid */}
      <ShopProductGrid categoryId="hardware" />
      
      <Footer />
    </main>
  );
}
