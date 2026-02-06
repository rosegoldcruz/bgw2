import {
  Layers,
  ThermometerSnowflake,
  ShieldCheck,
  Ruler,
  Volume2,
  Wind,
} from "lucide-react";

const FEATURES = [
  { icon: ThermometerSnowflake, title: "Advanced thermal insulation" },
  { icon: Layers, title: "Multi-pane glazing options" },
  { icon: ShieldCheck, title: "Low‑E glass coatings" },
  { icon: Wind, title: "Weather‑tight sealing" },
  { icon: Volume2, title: "Noise reduction" },
  { icon: Ruler, title: "Custom sizing" },
];

export function EnergyPerformanceStrip() {
  return (
    <section
      className="relative overflow-hidden rounded-xl border border-white/10 bg-neutral-950/60 backdrop-blur
                 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_30px_90px_rgba(0,0,0,0.65)]"
    >
      <div className="absolute inset-0 [background:radial-gradient(900px_circle_at_30%_20%,rgba(251,191,36,0.10),transparent_60%)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

      <div className="relative px-6 py-10">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-400">
              Energy Performance
            </p>
            <h2 className="mt-3 text-2xl md:text-3xl font-light text-white">
              Built for comfort in every season
            </h2>
          </div>
          <p className="text-sm text-neutral-400 max-w-xl">
            High-performance window options designed for efficiency, durability, and quiet interiors.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="rounded-md border border-white/10 bg-white/[0.03] px-4 py-4
                           hover:bg-white/[0.05] transition-colors"
              >
                <Icon className="w-5 h-5 text-amber-300" />
                <p className="mt-3 text-sm text-white/90 leading-snug">
                  {f.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
