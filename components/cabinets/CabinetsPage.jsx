"use client";

import { useMemo, useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import cabinetCatalog from "@/data/cabinetCatalog.json";
import { CabinetSelector } from "./CabinetSelector";
import { ImagePreview } from "./ImagePreview";

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

      <section className="pt-32 pb-10 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-400 mb-4">
            Cabinet Refacing
          </p>
          <h1 className="text-4xl md:text-6xl font-light text-white mb-4">
            Cabinet Refacing
          </h1>
          <p className="text-lg text-neutral-400 max-w-2xl">
            Premium cabinet doors engineered for modern kitchens
          </p>
        </div>
      </section>

      <section className="pb-20 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6 lg:gap-8 items-start">
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
