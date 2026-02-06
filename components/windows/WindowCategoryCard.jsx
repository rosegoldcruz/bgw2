import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export function WindowCategoryCard({ category, index = 0 }) {
  const isFeatured = category.slug === "energy-efficient";
  const cover = category.images?.[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: Math.min(index, 8) * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/windows/${category.slug}`}
        aria-label={`Browse ${category.name}`}
        className={`group block rounded-xl overflow-hidden border bg-neutral-950/40 backdrop-blur
          shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_24px_70px_rgba(0,0,0,0.65)]
          transition-all duration-500
          hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_34px_90px_rgba(0,0,0,0.75)]
          ${isFeatured ? "border-amber-400/35" : "border-white/10"}`}
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={cover}
            alt={category.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            priority={isFeatured}
          />

          {/* Contrast + gradient overlays */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />

          {isFeatured && (
            <div className="absolute top-4 left-4">
              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-1
                           text-xs uppercase tracking-[0.22em] text-amber-300
                           bg-black/55 border border-amber-400/30 backdrop-blur"
              >
                Featured
              </span>
            </div>
          )}
        </div>

        <div className="px-5 py-5">
          <h3 className="text-xl md:text-2xl font-light text-white tracking-tight">
            {category.name}
          </h3>
          <p className="mt-2 text-sm md:text-base text-neutral-400 leading-relaxed">
            {category.description}
          </p>
          <div className="mt-4 flex items-center gap-2 text-amber-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            <span>Explore</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
