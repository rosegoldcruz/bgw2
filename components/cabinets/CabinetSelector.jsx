import { ColorSwatches } from "./ColorSwatches";

export function CabinetSelector({
  styles,
  selectedStyleSlug,
  selectedColorSlug,
  onSelectStyle,
  onSelectColor,
}) {
  return (
    <aside
      className="rounded-xl border border-white/10 bg-neutral-950
                 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_30px_80px_rgba(0,0,0,0.55)]"
    >
      <div className="px-5 py-4 border-b border-white/10">
        <p className="text-xs uppercase tracking-[0.3em] text-amber-400">
          Cabinet Styles
        </p>
        <p className="mt-2 text-sm text-neutral-400">
          Choose a door style, then pick a finish.
        </p>
      </div>

      <div className="max-h-[70vh] lg:max-h-[860px] overflow-auto px-5 py-5 space-y-6">
        {styles.map((style) => {
          const isSelected = style.style_slug === selectedStyleSlug;
          return (
            <div key={style.style_slug} className="space-y-3">
              <button
                type="button"
                onClick={() => onSelectStyle(style.style_slug)}
                className={`w-full flex items-center justify-between text-left rounded-md px-3 py-2 border transition-colors ${
                  isSelected
                    ? "border-amber-400/40 bg-amber-400/10"
                    : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04]"
                }`}
              >
                <span className="text-white font-medium">
                  {style.display_name}
                </span>
                <span
                  className={`text-xs uppercase tracking-[0.2em] ${
                    isSelected ? "text-amber-300" : "text-neutral-500"
                  }`}
                >
                  {Object.keys(style.colors).length} colors
                </span>
              </button>

              <ColorSwatches
                colors={style.colors}
                selectedColorSlug={isSelected ? selectedColorSlug : null}
                onSelectColor={(colorSlug) =>
                  onSelectColor(style.style_slug, colorSlug)
                }
                isActive={isSelected}
              />
            </div>
          );
        })}
      </div>
    </aside>
  );
}
