import Image from "next/image";

export function ColorSwatches({
  colors,
  selectedColorSlug,
  onSelectColor,
  size = 44,
}) {
  const entries = Object.entries(colors);

  return (
    <div className="flex flex-wrap gap-2">
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
            className={`relative rounded-full overflow-hidden border transition-all ${borderClass}`}
            style={{ width: size, height: size }}
          >
            <Image
              src={color.zoom_image}
              alt={color.display_name}
              fill
              sizes={`${size}px`}
              className="object-cover"
            />
            <span className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors" />
          </button>
        );
      })}
    </div>
  );
}

