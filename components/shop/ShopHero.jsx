"use client";

import { motion } from "framer-motion";

export function ShopHero() {
  return (
    <section className="relative py-24 md:py-32 bg-neutral-950 overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/50 via-transparent to-neutral-950" />
      
      {/* Subtle background pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-light tracking-tight text-white mb-6">
            Shop <span className="text-amber-400">Doors</span>
          </h1>
          <p className="text-xl md:text-2xl text-neutral-400 max-w-2xl mx-auto font-light">
            Browse by category or filter by style
          </p>
          
          {/* Category quick links */}
          <div className="flex flex-wrap justify-center gap-3 mt-12">
            {[
              { label: "Iron", anchor: "#iron" },
              { label: "Wood", anchor: "#wood" },
              { label: "Fiberglass", anchor: "#fiberglass" },
              { label: "Slab", anchor: "#slab" },
              { label: "Hardware", anchor: "#hardware" },
              { label: "Windows", anchor: "#windows" },
              { label: "Cabinets", anchor: "#cabinets" },
            ].map((cat) => (
              <a
                key={cat.anchor}
                href={cat.anchor}
                className="px-4 py-2 text-sm font-medium text-neutral-400 border border-neutral-700 rounded-full
                         hover:text-amber-400 hover:border-amber-400/50 transition-all duration-300
                         hover:shadow-[0_0_20px_rgba(251,191,36,0.1)]"
              >
                {cat.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
