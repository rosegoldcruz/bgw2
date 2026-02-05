"use client";

import { CartProvider } from "@/components/cart/cart-context";

export function Providers({ children }) {
  return <CartProvider>{children}</CartProvider>;
}
