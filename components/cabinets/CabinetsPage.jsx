"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import cabinetCatalog from "@/data/cabinetCatalog.json";
import { CabinetSelector } from "./CabinetSelector";
import { ImagePreview } from "./ImagePreview";
import { Button } from "@/components/ui/button";

const PREFERRED_STYLE_ORDER = [
  "shaker-classic",
  "shaker-slide",
  "fusion-shaker",
  "fusion-slide",
  "slab",
];

function buildOrderedStyles(catalog) {
  const all = Object.entries(catalog).map(([style_slug, value]) => ({
    style_slug,
    display_name: value.display_name,
    colors: value.colors,
  }));

  const bySlug = new Map(all.map((s) => [s.style_slug, s]));
  const ordered = [];

  for (const slug of PREFERRED_STYLE_ORDER) {
    if (bySlug.has(slug)) ordered.push(bySlug.get(slug));
  }

  const remaining = all
    .filter((s) => !PREFERRED_STYLE_ORDER.includes(s.style_slug))
    .sort((a, b) => a.display_name.localeCompare(b.display_name));

  return [...ordered, ...remaining];
}

function firstKey(obj) {
  const keys = Object.keys(obj || {});
  return keys.length ? keys[0] : null;
}

function buildDescription(styleName, colorSlug) {
  const safeStyleName = styleName || "Cabinet";
  const isShaker = /shaker/i.test(safeStyleName);
  const isSlab = /^slab$/i.test(safeStyleName);
  const isFusion = /fusion/i.test(safeStyleName);

  const profile = isSlab
    ? "Slab flat-panel profile"
    : isShaker
      ? `${safeStyleName} profile`
      : isFusion
        ? `${safeStyleName} profile`
        : "Cabinet door profile";

  const slug = String(colorSlug || "").toLowerCase();
  const hasWalnut = slug.includes("walnut");
  const hasOak = slug.includes("oak");
  const hasTeak = slug.includes("teak");
  const hasGloss = slug.includes("gloss");

  const finish = hasWalnut
    ? "Walnut grain finish"
    : hasOak
      ? "Oak grain finish"
      : hasTeak
        ? "Teak grain finish"
        : hasGloss
          ? "Gloss finish"
          : "Solid tone finish";

  return `${profile} with a ${finish.toLowerCase()} previewed in a modern kitchen scene.`;
}

const ORDERED_STYLES = buildOrderedStyles(cabinetCatalog);
const DEFAULT_STYLE_SLUG = ORDERED_STYLES[0]?.style_slug || null;
const DEFAULT_COLOR_SLUG = DEFAULT_STYLE_SLUG
  ? firstKey(cabinetCatalog[DEFAULT_STYLE_SLUG]?.colors)
  : null;

const STYLE_ICONS = {
  "shaker-classic": "/cabinets-kitchens/Shaker Classic door.png",
  "shaker-slide": "/cabinets-kitchens/Shaker slide door..png",
  "fusion-shaker": "/cabinets-kitchens/Fusion shaker door..png",
  "fusion-slide": "/cabinets-kitchens/Fusion Slide Door..png",
  "slab": "/cabinets-kitchens/Slab door.png",
};

const STYLE_DESCRIPTIONS = {
  "shaker-classic": "The classic Shaker style features clean lines and a recessed center panel.",
  "shaker-slide": "A slimmer Shaker profile with modern proportions and a crisp edge.",
  "fusion-shaker": "A contemporary take on Shaker with softened edges and refined depth.",
  "fusion-slide": "A sleek, stepped profile built for transitional kitchens.",
  slab: "A flat, minimal door with uninterrupted surfaces and modern presence.",
};

export function CabinetsPage() {
  const [selectedStyleSlug, setSelectedStyleSlug] = useState(DEFAULT_STYLE_SLUG);
  const [selectedColorSlug, setSelectedColorSlug] = useState(DEFAULT_COLOR_SLUG);

  const selection = useMemo(() => {
    const style = cabinetCatalog[selectedStyleSlug] || null;
    const color = style?.colors?.[selectedColorSlug] || null;

    if (!style || !color) {
      const fallbackStyleSlug = DEFAULT_STYLE_SLUG;
      const fallbackColorSlug = DEFAULT_COLOR_SLUG;
      const fallbackStyle = cabinetCatalog[fallbackStyleSlug] || null;
      const fallbackColor = fallbackStyle?.colors?.[fallbackColorSlug] || null;
      return {
        styleSlug: fallbackStyleSlug,
        colorSlug: fallbackColorSlug,
        style: fallbackStyle,
        color: fallbackColor,
      };
    }

    return {
      styleSlug: selectedStyleSlug,
      colorSlug: selectedColorSlug,
      style,
      color,
    };
  }, [selectedStyleSlug, selectedColorSlug]);

  const handleSelectStyle = (nextStyleSlug) => {
    const nextStyle = cabinetCatalog[nextStyleSlug];
    if (!nextStyle) return;

    const keepColorSlug =
      selection.colorSlug && nextStyle.colors?.[selection.colorSlug]
        ? selection.colorSlug
        : firstKey(nextStyle.colors);

    setSelectedStyleSlug(nextStyleSlug);
    setSelectedColorSlug(keepColorSlug);
  };

  const handleSelectColor = (styleSlug, colorSlug) => {
    const style = cabinetCatalog[styleSlug];
    if (!style?.colors?.[colorSlug]) return;
    setSelectedStyleSlug(styleSlug);
    setSelectedColorSlug(colorSlug);
  };

  const description = buildDescription(
    selection.style?.display_name,
    selection.colorSlug
  );

  const styleDescription =
    STYLE_DESCRIPTIONS[selection.styleSlug] ||
    "Made-to-order cabinet doors engineered for modern kitchens.";

  if (!selection.style || !selection.color) {
    return (
      <main className="min-h-screen bg-neutral-950">
        <Header />
        <section className="pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-6">
            <h1 className="text-3xl md:text-4xl font-light text-white">
              Cabinet Refacing
            </h1>
            <p className="mt-4 text-neutral-400">
              Cabinet catalog assets could not be loaded.
            </p>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-950">
      <Header />

      <section className="relative pt-32 pb-16 bg-neutral-950 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/cabinets-kitchens/casbsd.png"
            alt="Cabinet refacing background"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/80 to-black/90" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-400 mb-4">
            Cabinet Refacing
          </p>
          <h1 className="text-4xl md:text-6xl font-light text-white mb-4 max-w-4xl">
            Made To Order Kitchen And Bathroom Cabinet Doors In The Most Popular Styles
          </h1>
          <p className="text-lg text-neutral-400 max-w-2xl">
            Select a door profile and finish to preview your space instantly.
          </p>

          <div className="mt-10 flex flex-wrap gap-6 justify-center md:justify-start">
            {ORDERED_STYLES.map((style) => {
              const isSelected = style.style_slug === selection.styleSlug;
              return (
                <button
                  key={style.style_slug}
                  type="button"
                  onClick={() => handleSelectStyle(style.style_slug)}
                  className="flex flex-col items-center gap-3 focus:outline-none"
                >
                  <div
                    className={`w-24 h-24 rounded-full border-2 flex items-center justify-center bg-white ${
                      isSelected ? "border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.35)]" : "border-white/30"
                    }`}
                  >
                    <Image
                      src={STYLE_ICONS[style.style_slug] || "/cabinets-kitchens/Slab door.png"}
                      alt={style.display_name}
                      width={60}
                      height={90}
                      className="object-contain"
                    />
                  </div>
                  <span className={`text-sm font-medium ${isSelected ? "text-amber-400" : "text-white"}`}>
                    {style.display_name}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-10 max-w-3xl rounded-2xl border border-white/10 bg-neutral-950/80 px-8 py-6">
            <h2 className="text-2xl font-light text-amber-400">
              {selection.style?.display_name}
            </h2>
            <p className="mt-2 text-sm text-neutral-300">
              {styleDescription}
            </p>
            <div className="mt-5">
              <a href="#cabinet-configurator">
                <Button className="bg-amber-500 text-neutral-950 hover:bg-amber-400">
                  View Color Options
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="cabinet-configurator" className="pb-24 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6 lg:gap-8 items-start">
            <div className="lg:sticky lg:top-24">
              <CabinetSelector
                styles={ORDERED_STYLES}
                selectedStyleSlug={selection.styleSlug}
                selectedColorSlug={selection.colorSlug}
                onSelectStyle={handleSelectStyle}
                onSelectColor={handleSelectColor}
              />
            </div>

            <ImagePreview
              heroSrc={selection.color?.hero_image}
              zoomSrc={selection.color?.zoom_image}
              styleName={selection.style?.display_name}
              colorName={selection.color?.display_name}
              description={description}
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
