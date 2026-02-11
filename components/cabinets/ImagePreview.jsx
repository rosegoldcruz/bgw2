import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function ImagePreview({
  heroSrc,
  zoomSrc,
  styleName,
  colorName,
  description,
}) {
  return (
    <section
      className="relative overflow-hidden rounded-xl border border-white/10 bg-neutral-950
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
        <div className="relative min-h-[520px] lg:min-h-[820px] bg-black flex items-center justify-center border border-white/10 rounded-xl overflow-hidden">
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

          <div className="absolute bottom-6 left-6 w-36 h-36 rounded-full border-4 border-white/80 bg-neutral-100 shadow-xl overflow-hidden">
            <Image
              src={zoomSrc}
              alt={`${colorName} detail`}
              fill
              sizes="144px"
              className="object-cover"
            />
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
              <span className="text-amber-400 font-medium">{colorName}:</span> {description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <Link href="/visualizer/upload?door=cabinet-refacing-configurator">
              <Button className="w-full bg-white text-neutral-950 hover:bg-white/90">
                Visualize On Your Home
              </Button>
            </Link>
            <a href="tel:+19097891818" className="w-full">
              <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/[0.06]">
                Get Free Quote
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
