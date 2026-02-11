"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { formatPrice } from "@/data/products";
import { Eye } from "lucide-react";

export function ShopProductCard({ product, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: Math.min(index * 0.05, 0.3),
        ease: [0.16, 1, 0.3, 1] 
      }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="group block bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800/80
                 hover:border-neutral-700 transition-all duration-500">
        {/* Image container */}
        <Link href={`/product/${product.slug}`}>
          <div className="relative aspect-[3/4] overflow-hidden bg-neutral-800">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-neutral-950/0 group-hover:bg-neutral-950/60 
                          transition-all duration-500 flex items-center justify-center">
              <span className="px-6 py-3 bg-amber-500 text-neutral-950 font-medium rounded-md
                            opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0
                            transition-all duration-500 shadow-lg">
                View Door
              </span>
            </div>
          </div>
        </Link>

        {/* Product info */}
        <div className="p-4">
          <Link href={`/product/${product.slug}`}>
            <h3 className="text-base font-medium text-white truncate group-hover:text-amber-400 
                         transition-colors duration-300">
              {product.name}
            </h3>
          </Link>
          {product.price && (
            <p className="text-sm text-neutral-400 mt-1">
              Starting at {formatPrice(product.price)}
            </p>
          )}
          
          {/* Visualize Button */}
          <Link 
            href={`/visualizer/upload?door=${product.slug}`}
            className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 px-4 
                     bg-neutral-800 hover:bg-neutral-700 text-amber-400 text-sm font-medium 
                     rounded-md transition-colors duration-300"
          >
            <Eye className="w-4 h-4" />
            Visualize on your home
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
