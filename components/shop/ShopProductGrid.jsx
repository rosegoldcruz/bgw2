"use client";

import { ShopProductCard } from "./ShopProductCard";
import { getProductsByCategory, categories } from "@/data/products";

export function ShopProductGrid({ categoryId }) {
  const category = categories.find((c) => c.id === categoryId);
  const products = getProductsByCategory(categoryId);

  if (!category || products.length === 0) {
    // Placeholder for empty categories (windows, cabinets)
    return (
      <section id={categoryId} className="py-16 md:py-24 bg-neutral-950 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-white mb-3">
              {category?.name || categoryId}
            </h2>
            <p className="text-neutral-400 text-lg">
              {category?.description}
            </p>
          </div>
          
          {/* Coming soon placeholder */}
          <div className="flex flex-col items-center justify-center py-20 border border-dashed border-neutral-700 rounded-sm">
            <div className="text-6xl mb-4">🏗️</div>
            <p className="text-xl text-neutral-400 mb-2">Coming Soon</p>
            <p className="text-neutral-500 text-center max-w-md">
              {categoryId === "cabinets" 
                ? "Custom cabinet refacing configurator launching soon. Contact us for consultations."
                : "Our window collection is being curated. Contact us for custom window solutions."}
            </p>
            <a 
              href="/support"
              className="mt-8 px-6 py-3 border border-amber-500 text-amber-500 rounded-sm
                       hover:bg-amber-500 hover:text-neutral-950 transition-all duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id={categoryId} className="py-16 md:py-24 bg-neutral-950 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-3">
            {category.name}
          </h2>
          <p className="text-neutral-400 text-lg">
            {category.description}
          </p>
          <p className="text-neutral-500 text-sm mt-2">
            {products.length} {products.length === 1 ? "product" : "products"}
          </p>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ShopProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
