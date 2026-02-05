"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/cart-context";
import { formatPrice } from "@/data/products";

function formatLinePrice(price) {
  if (!price) return "Quote";
  return formatPrice(price);
}

export function CartDrawer() {
  const { items, itemCount, subtotal, updateQuantity, removeItem, clearCart } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className="relative inline-flex items-center justify-center rounded-full border border-neutral-800 bg-neutral-900/80 p-2 text-white hover:bg-neutral-800 transition-colors"
          aria-label="Open cart"
        >
          <ShoppingBag className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 rounded-full bg-amber-400 text-neutral-950 text-xs font-semibold h-5 w-5 flex items-center justify-center">
              {itemCount}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent className="bg-neutral-950 text-white border-neutral-800">
        <SheetHeader>
          <SheetTitle className="text-white">Your Cart</SheetTitle>
          <SheetDescription className="text-neutral-400">
            {itemCount > 0 ? `${itemCount} item${itemCount === 1 ? "" : "s"} ready` : "Your cart is empty."}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
          {items.length === 0 ? (
            <div className="mt-10 text-center text-neutral-400">
              <p className="mb-4">Add a door to get started.</p>
              <Link href="/shop">
                <Button variant="outline" className="border-neutral-700 text-white hover:bg-neutral-800">
                  Browse Collections
                </Button>
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 border border-neutral-800 rounded-xl p-3 bg-neutral-900/60">
                <div className="relative h-20 w-16 rounded-lg overflow-hidden border border-neutral-800">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium text-white">{item.name}</p>
                      <p className="text-xs text-neutral-400">{formatLinePrice(item.price)}</p>
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
                      className="text-neutral-500 hover:text-neutral-300 transition-colors"
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <button
                      className="h-7 w-7 rounded-full border border-neutral-700 flex items-center justify-center hover:bg-neutral-800"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label={`Decrease ${item.name}`}
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="text-sm text-neutral-200 w-6 text-center">{item.quantity}</span>
                    <button
                      className="h-7 w-7 rounded-full border border-neutral-700 flex items-center justify-center hover:bg-neutral-800"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label={`Increase ${item.name}`}
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="border-t border-neutral-800">
            <div className="w-full space-y-3">
              <div className="flex items-center justify-between text-sm text-neutral-300">
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
                <Link href="/cart" className="flex-1">
                  <Button className="w-full bg-white text-neutral-950 hover:bg-neutral-100">
                    View Cart
                  </Button>
                </Link>
              </div>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
