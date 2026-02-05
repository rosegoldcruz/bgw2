"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { products, formatPrice } from "@/data/products";

// Only show door products (iron, wood, fiberglass, slab)
const doorCategories = ["iron", "wood", "fiberglass", "slab"];
const doorProducts = products.filter(p => doorCategories.includes(p.category));

export function DoorGallery({ selectedDoor, onSelectDoor }) {
  return (
    <div className="w-full">
      <h3 className="text-lg font-medium text-white mb-4">
        Select a Door
      </h3>
      <p className="text-sm text-neutral-400 mb-6">
        Choose the door you want to visualize on your home
      </p>

      <div className="flex gap-4 overflow-x-auto pb-4 pr-2 snap-x snap-mandatory lg:grid lg:grid-cols-3 xl:grid-cols-4 lg:overflow-visible lg:pb-0">
        {doorProducts.map((product, index) => {
          const isSelected = selectedDoor?.slug === product.slug;
          
          return (
            <motion.button
              key={product.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: Math.min(index * 0.02, 0.3) }}
              onClick={() => onSelectDoor({
                slug: product.slug,
                name: product.name,
                image: product.image,
                price: product.price
              })}
              className={`
                relative group text-left rounded-xl overflow-hidden transition-all duration-300 snap-start
                min-w-[160px] sm:min-w-[180px] lg:min-w-0
                ${isSelected 
                  ? "ring-2 ring-amber-400 ring-offset-2 ring-offset-neutral-900" 
                  : "hover:ring-1 hover:ring-neutral-600"
                }
              `}
            >
              {/* Image */}
              <div className="relative aspect-[3/4] bg-neutral-800">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                />
                
                {/* Selection indicator */}
                {isSelected && (
                  <div className="absolute top-2 right-2 p-1 bg-amber-400 rounded-full">
                    <Check className="w-4 h-4 text-neutral-900" />
                  </div>
                )}
                
                {/* Hover overlay */}
                <div className={`
                  absolute inset-0 transition-opacity duration-300
                  ${isSelected ? "bg-amber-400/10" : "bg-black/0 group-hover:bg-black/30"}
                `} />
              </div>
              
              {/* Info */}
              <div className="p-3 bg-neutral-800">
                <p className={`text-sm font-medium truncate transition-colors duration-300
                  ${isSelected ? "text-amber-400" : "text-white group-hover:text-amber-400"}
                `}>
                  {product.name}
                </p>
                {product.price && (
                  <p className="text-xs text-neutral-400 mt-1">
                    {formatPrice(product.price)}
                  </p>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
