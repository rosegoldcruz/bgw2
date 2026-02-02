"use client";

import { useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MaterialsSection } from "@/components/materials-section";
import { ShopHero, CategoryHero, ShopProductGrid } from "@/components/shop";

export default function ShopPage() {
  // Handle anchor scrolling on page load
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const target = document.querySelector(hash);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  }, []);

  return (
    <main className="min-h-screen bg-neutral-950">
      <Header />
      
      {/* Materials Section - Pistachio/Lunar/Martian */}
      <MaterialsSection />
      
      {/* Shop Hero */}
      <ShopHero />
      
      {/* Cinematic Entry Sections */}
      <div className="space-y-0">
        <CategoryHero category="iron" />
        <CategoryHero category="wood" />
        <CategoryHero category="fiberglass" />
      </div>
      
      {/* Category Product Grids */}
      <div className="divide-y divide-neutral-800">
        <ShopProductGrid categoryId="iron" />
        <ShopProductGrid categoryId="wood" />
        <ShopProductGrid categoryId="fiberglass" />
        <ShopProductGrid categoryId="slab" />
        <ShopProductGrid categoryId="hardware" />
        <ShopProductGrid categoryId="windows" />
        <ShopProductGrid categoryId="cabinets" />
      </div>
      
      <Footer />
    </main>
  );
}
