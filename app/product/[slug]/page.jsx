"use client";

import { useState } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { BadgeCheck, ShieldCheck, Truck } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getProductBySlug, formatPrice, categories, getProductsByCategory } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/cart-context";

function HeartIcon({ filled }) {
  return (
    <svg
      className={`w-5 h-5 transition-colors duration-300 ${filled ? "fill-red-500 text-red-500" : "fill-none text-current"}`}
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  );
}

export default function ProductDetailPage() {
  const params = useParams();
  const product = getProductBySlug(params.slug);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addItem } = useCart();

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addItem(product, 1);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const category = categories.find((c) => c.id === product.category);
  const relatedProducts = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-neutral-950">
      <Header />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-4">
        <nav className="flex items-center gap-2 text-sm text-neutral-500">
          <Link href="/shop" className="hover:text-amber-400 transition-colors">
            Shop
          </Link>
          <span>/</span>
          <Link
            href={`/shop#${product.category}`}
            className="hover:text-amber-400 transition-colors"
          >
            {category?.name}
          </Link>
          <span>/</span>
          <span className="text-neutral-300">{product.name}</span>
        </nav>
      </div>

      {/* Product Detail */}
      <section className="max-w-7xl mx-auto px-6 py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Images */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Main image */}
            <div className="relative aspect-[3/4] bg-neutral-900 rounded-xl overflow-hidden mb-4">
              <Image
                src={product.gallery[selectedImage] || product.image}
                alt={product.name}
                fill
                className="object-contain"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Thumbnail strip */}
            {product.gallery.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.gallery.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === index
                        ? "border-amber-500"
                        : "border-neutral-700 hover:border-neutral-500"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-contain"
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right: Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:sticky lg:top-24 lg:self-start"
          >
            {/* Category badge */}
            <Link
              href={`/shop#${product.category}`}
              className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider 
                       text-amber-400 border border-amber-400/30 rounded-full mb-4
                       hover:bg-amber-400/10 transition-colors"
            >
              {category?.name}
            </Link>

            {/* Product name */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4 leading-tight">
              {product.name}
            </h1>

            {/* Price */}
            {product.price && (
              <p className="text-2xl text-amber-400 font-light mb-6">
                Starting at {formatPrice(product.price)}
              </p>
            )}

            {/* Description */}
            <p className="text-lg text-neutral-300 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Specs */}
            {product.specs && product.specs.length > 0 && (
              <div className="mb-10">
                <h3 className="text-sm font-medium uppercase tracking-wider text-neutral-500 mb-4">
                  Specifications
                </h3>
                <ul className="space-y-3">
                  {product.specs.map((spec, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-neutral-300"
                    >
                      <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0" />
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTAs */}
            <div className="space-y-4">
              <Button
                onClick={handleAddToCart}
                className="w-full bg-white text-neutral-950 hover:bg-neutral-100"
              >
                {addedToCart ? "Added to Cart" : "Add to Cart"}
              </Button>
              {addedToCart && (
                <Link href="/cart" className="text-sm text-amber-400 hover:text-amber-300 transition-colors">
                  View cart →
                </Link>
              )}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/support"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 
                           bg-amber-500 text-neutral-950 font-medium rounded-md
                           hover:bg-amber-400 transition-all duration-300
                           hover:shadow-[0_0_30px_rgba(251,191,36,0.3)]"
                >
                  Request Quote
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`inline-flex items-center justify-center gap-2 px-6 py-4 
                           border rounded-md font-medium transition-all duration-300
                           ${isFavorite 
                             ? "border-red-500/50 text-red-400 bg-red-500/10" 
                             : "border-neutral-700 text-neutral-300 hover:border-neutral-500 hover:text-white"
                           }`}
                >
                  <HeartIcon filled={isFavorite} />
                  {isFavorite ? "Saved" : "Add to Favorites"}
                </button>
              </div>
            </div>

            {/* Trust badges */}
            <div className="mt-10 pt-8 border-t border-neutral-800">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center gap-2">
                  <BadgeCheck className="w-5 h-5 text-amber-400" />
                  <p className="text-xs text-neutral-500">Made in USA</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Truck className="w-5 h-5 text-amber-400" />
                  <p className="text-xs text-neutral-500">Free Shipping</p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  <p className="text-xs text-neutral-500">5 Year Warranty</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-16 border-t border-neutral-800">
          <h2 className="text-2xl font-light text-white mb-8">
            More {category?.name}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                href={`/product/${relatedProduct.slug}`}
                className="group block"
              >
                <div className="relative aspect-[3/4] bg-neutral-900 rounded-lg overflow-hidden mb-3">
                  <Image
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <h3 className="text-sm text-neutral-300 group-hover:text-amber-400 transition-colors truncate">
                  {relatedProduct.name}
                </h3>
                {relatedProduct.price && (
                  <p className="text-xs text-neutral-500 mt-1">
                    {formatPrice(relatedProduct.price)}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
