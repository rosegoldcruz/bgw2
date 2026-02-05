"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const categoryData = {
  iron: {
    title: "Iron Doors",
    description: "Hand-forged iron craftsmanship. Timeless security meets architectural art.",
    image: "/iron.png",
    anchor: "#iron",
  },
  wood: {
    title: "Wood Doors",
    description: "Solid mahogany and knotty alder. Natural warmth, lasting beauty.",
    image: "/wood.png",
    anchor: "#wood",
  },
  fiberglass: {
    title: "Fiberglass Doors",
    description: "Energy efficiency meets elegance. Low maintenance, high impact.",
    image: "/fiberglass.png",
    anchor: "#fiberglass",
  },
};

export function CategoryHero({ category }) {
  const data = categoryData[category];
  if (!data) return null;

  const scrollToAnchor = (e) => {
    e.preventDefault();
    const target = document.querySelector(data.anchor);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src={data.image}
          alt={data.title}
          fill
          className="object-cover"
          priority={category === "iron"}
          sizes="100vw"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/90 via-neutral-950/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-xl"
        >
          <h2 className="text-4xl md:text-6xl font-light tracking-tight text-white mb-4">
            {data.title}
          </h2>
          <p className="text-lg md:text-xl text-neutral-300 mb-8 font-light leading-relaxed">
            {data.description}
          </p>
          <button
            onClick={scrollToAnchor}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-amber-500 text-neutral-950 
                     font-medium rounded-md hover:bg-amber-400 transition-all duration-300
                     hover:shadow-[0_0_30px_rgba(251,191,36,0.3)]"
          >
            Browse Collection
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
