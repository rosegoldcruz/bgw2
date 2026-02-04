import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ZoomIn } from "lucide-react";

export function ImagePreview({
  heroSrc,
  zoomSrc,
  styleName,
  colorName,
  description,
}) {
  return (
    <section
      className="relative overflow-hidden rounded-sm border border-white/10 bg-neutral-950
                 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_30px_90px_rgba(0,0,0,0.7)]"
    >
      <div className="relative min-h-[520px] lg:min-h-[860px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={heroSrc}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={heroSrc}
              alt={`${styleName} — ${colorName}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 70vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/80" />
        <div className="absolute inset-0 [background:radial-gradient(1200px_circle_at_70%_20%,rgba(251,191,36,0.12),transparent_60%)]" />

        {/* Top-left preview badge */}
        <div className="absolute top-6 left-6">
          <div className="rounded-sm border border-white/10 bg-black/55 backdrop-blur px-4 py-3 shadow-[0_20px_60px_rgba(0,0,0,0.55)]">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-400">
              Live Preview
            </p>
            <p className="mt-2 text-sm text-white">
              {styleName} — {colorName}
            </p>
          </div>
        </div>

        {/* Floating zoom badge */}
        <div className="absolute top-6 right-6">
          <div className="rounded-sm border border-white/10 bg-black/55 backdrop-blur px-4 py-4 w-[160px] shadow-[0_20px_60px_rgba(0,0,0,0.55)]">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.25em] text-neutral-200">
                Detail
              </p>
              <ZoomIn className="w-4 h-4 text-amber-300" />
            </div>
            <div className="mt-3 relative aspect-square rounded-sm overflow-hidden border border-white/10">
              <Image
                src={zoomSrc}
                alt={`${colorName} close-up`}
                fill
                sizes="160px"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Bottom product block */}
        <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 pt-16 bg-gradient-to-t from-black via-black/85 to-transparent">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start lg:items-end justify-between">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-400">
                {styleName}
              </p>
              <h2 className="mt-2 text-2xl md:text-3xl font-light text-white">
                {colorName}
              </h2>
              <p className="mt-3 text-sm md:text-base text-neutral-300 leading-relaxed">
                {description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Link
                href="/visualizer?door=cabinet-refacing-configurator"
                className="inline-flex items-center justify-center px-6 py-3 rounded-sm
                           bg-white text-neutral-950 font-medium hover:bg-white/90 transition-colors"
              >
                Visualize On Your Home
              </Link>
              <a
                href="tel:+19097891818"
                className="inline-flex items-center justify-center px-6 py-3 rounded-sm
                           border border-white/20 text-white hover:border-white/30 hover:bg-white/[0.06]
                           transition-colors"
              >
                Get Free Quote
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
