"use client";

import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/cart-context";
import { formatPrice } from "@/data/products";
import { LeadCaptureForm } from "@/components/leads/LeadCaptureForm";

export default function CartPage() {
  const { items, itemCount, subtotal, updateQuantity, removeItem, clearCart } = useCart();

  return (
    <main className="min-h-screen bg-neutral-950">
      <Header />

      <section className="pt-28 pb-16">
        <div className="container-custom">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-400 mb-3">Cart</p>
            <h1 className="text-4xl md:text-5xl font-light text-white">Your selections</h1>
          </div>

          {itemCount === 0 ? (
            <div className="border border-neutral-800 rounded-xl p-10 text-center bg-neutral-900/60">
              <p className="text-lg text-neutral-300 mb-4">Your cart is empty.</p>
              <Link href="/shop">
                <Button className="bg-white text-neutral-950 hover:bg-neutral-100">
                  Browse collections
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 border border-neutral-800 rounded-xl p-4 bg-neutral-900/60">
                    <div className="relative h-24 w-20 rounded-lg overflow-hidden border border-neutral-800">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-medium text-white">{item.name}</p>
                          <p className="text-xs text-neutral-400">{item.price ? formatPrice(item.price) : "Quote"}</p>
                          {item.slug && (
                            <Link
                              href={`/product/${item.slug}`}
                              className="text-xs text-amber-400 hover:text-amber-300 transition-colors"
                            >
                              View details
                            </Link>
                          )}
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-neutral-500 hover:text-neutral-300 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <button
                          className="h-7 w-7 rounded-full border border-neutral-700 flex items-center justify-center hover:bg-neutral-800"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="text-sm text-neutral-200 w-6 text-center">{item.quantity}</span>
                        <button
                          className="h-7 w-7 rounded-full border border-neutral-700 flex items-center justify-center hover:bg-neutral-800"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                <div className="border border-neutral-800 rounded-xl p-6 bg-neutral-900/60">
                  <div className="flex items-center justify-between text-sm text-neutral-300 mb-4">
                    <span>Subtotal</span>
                    <span>{subtotal ? formatPrice(subtotal) : "Quote"}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 border-neutral-700 text-white hover:bg-neutral-800"
                      onClick={clearCart}
                    >
                      Clear
                    </Button>
                    <Link href="/visualizer" className="flex-1">
                      <Button className="w-full bg-white text-neutral-950 hover:bg-neutral-100">
                        Visualize More
                      </Button>
                    </Link>
                  </div>
                </div>

                <LeadCaptureForm
                  title="Request pricing & availability"
                  description="Provide your contact details and we’ll confirm pricing, lead times, and install options."
                  source="cart"
                  context={{ items }}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
