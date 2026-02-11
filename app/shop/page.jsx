"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MaterialsSection } from "@/components/materials-section";
import { categories } from "@/data/products";

const categoryImages = {
  iron: "/iron.png",
  wood: "/wood.png",
  fiberglass: "/fiberglass.png",
  slab: "/slab_doors/Aurelia Crest Slab M580C_1.jpg",
  hardware: "/hardware/ADAMS_1.jpg",
  windows: "/doze.png",
  cabinets: "/cabinet.png",
};

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-neutral-950">
      <Header />

      {/* Materials Section - Slab Collection Hero */}
      <MaterialsSection />

      {/* Shop Categories Grid */}
      <section className="py-20 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.3em] text-amber-400 mb-4">Browse Collections</p>
            <h2 className="text-4xl md:text-5xl font-light text-white mb-4">Shop by Category</h2>
            <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
              Select a collection to explore our full range of products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  href={`/shop/${category.id}`}
                  className="group block relative aspect-[4/5] rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800/80"
                >
                  <Image
                    src={categoryImages[category.id] || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-light text-white mb-2 group-hover:text-amber-400 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-neutral-300 line-clamp-2">{category.description}</p>
                    <div className="mt-4 flex items-center gap-2 text-amber-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>View Collection</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
