import Image from "next/image";

export function ColorSwatches({
  colors,
  selectedColorSlug,
  onSelectColor,
}) {
  const entries = Object.entries(colors);

  return (
    <div className="flex flex-wrap gap-3">
      {entries.map(([colorSlug, color]) => {
        const isSelected = selectedColorSlug === colorSlug;
        const borderClass = isSelected
          ? "border-amber-400 ring-2 ring-amber-400/30"
          : "border-white/10 hover:border-white/20";

        return (
          <button
            key={colorSlug}
            type="button"
            onClick={() => onSelectColor(colorSlug)}
            aria-pressed={isSelected}
            title={color.display_name}
            className={`relative border transition-all ${borderClass} bg-black/40`}
            style={{ width: 120, height: 80 }}
          >
            <Image
              src={color.hero_image}
              alt={`${color.display_name} kitchen preview`}
              fill
              sizes="120px"
              className="object-contain object-center w-full h-full max-w-full max-h-full"
            />
          </button>
        );
      })}
    </div>
  );
}
