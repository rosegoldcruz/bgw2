import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

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
      <div className="px-6 pt-6">
        <p className="text-xs uppercase tracking-[0.3em] text-amber-400">
          Live Preview
        </p>
        <p className="mt-2 text-sm text-neutral-300">
          {styleName} — {colorName}
        </p>
      </div>

      <div className="px-6 pb-6 pt-5">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_220px] gap-6 items-start">
          <div className="relative min-h-[520px] lg:min-h-[860px] bg-black flex items-center justify-center border border-white/10">
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
                  className="object-contain object-center w-full h-full max-w-full max-h-full"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="border border-white/10 bg-black/60 px-4 py-4">
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-200">
              Detail Preview
            </p>
            <div className="mt-4 relative aspect-square border border-white/10 bg-black">
              <Image
                src={zoomSrc}
                alt={`${colorName} full preview`}
                fill
                sizes="220px"
                className="object-contain object-center w-full h-full max-w-full max-h-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start lg:items-center justify-between">
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
    </section>
  );
}
