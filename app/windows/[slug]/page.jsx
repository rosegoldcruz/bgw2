"use client";

import Link from "next/link";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import categories from "@/data/windowsCategories.json";

export default function WindowCategoryPage() {
  const params = useParams();
  const slug = String(params?.slug || "");
  const category = categories.find((c) => c.slug === slug);

  if (!category) notFound();

  return (
    <main className="min-h-screen bg-neutral-950">
      <Header />

      <section className="relative pt-32 pb-10 bg-neutral-950 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80" />
        <div className="absolute inset-0 [background:radial-gradient(1000px_circle_at_65%_10%,rgba(251,191,36,0.10),transparent_60%)]" />

        <div className="relative max-w-7xl mx-auto px-6">
          <nav className="flex items-center gap-2 text-sm text-neutral-500">
            <Link href="/windows" className="hover:text-amber-400 transition-colors">
              Windows
            </Link>
            <span>/</span>
            <span className="text-neutral-300">{category.name}</span>
          </nav>

          <h1 className="mt-6 text-4xl md:text-6xl font-light text-white">
            {category.name}
          </h1>
          <p className="mt-4 text-lg text-neutral-300 max-w-3xl">
            {category.description}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <Link
              href="/visualizer"
              className="inline-flex items-center justify-center px-7 py-3 rounded-sm
                         bg-white text-neutral-950 font-medium hover:bg-white/90 transition-colors"
            >
              Visualize On Your Home
            </Link>
            <a
              href="tel:+19097891818"
              className="inline-flex items-center justify-center px-7 py-3 rounded-sm
                         border border-white/20 text-white hover:border-white/30 hover:bg-white/[0.06]
                         transition-colors"
            >
              Get Free Quote
            </a>
          </div>
        </div>
      </section>

      <section className="pb-20 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {category.images.map((src) => (
              <div
                key={src}
                className="relative aspect-[16/11] rounded-sm overflow-hidden border border-white/10 bg-neutral-900
                           shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_28px_80px_rgba(0,0,0,0.65)]"
              >
                <Image
                  src={src}
                  alt={category.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

