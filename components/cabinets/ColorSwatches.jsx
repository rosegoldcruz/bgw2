import Image from "next/image";

export function ColorSwatches({
  colors,
  selectedColorSlug,
  onSelectColor,
  isActive = true,
}) {
  const entries = Object.entries(colors);

  return (
    <div className={`flex flex-wrap gap-2 ${isActive ? "" : "opacity-60"}`}>
      {entries.map(([colorSlug, color]) => {
        const isSelected = selectedColorSlug === colorSlug;
        const borderClass = isSelected
          ? "border-amber-400 ring-2 ring-amber-400/30"
          : "border-white/20 hover:border-white/40";

        return (
          <button
            key={colorSlug}
            type="button"
            onClick={() => onSelectColor(colorSlug)}
            aria-pressed={isSelected}
            title={color.display_name}
            className={`relative rounded-full border transition-all ${borderClass} bg-black/40`}
            style={{ width: 36, height: 36 }}
          >
            <Image
              src={color.zoom_image || color.hero_image}
              alt={`${color.display_name} finish`}
              fill
              sizes="36px"
              className="object-cover rounded-full"
            />
          </button>
        );
      })}
    </div>
  );
}
