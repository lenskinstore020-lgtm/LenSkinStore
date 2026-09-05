"use client";

import Link from "next/link";
import { useCart } from "@/lib/useCart";
import { buildWhatsAppOrderLink } from "@/lib/whatsapp";
import type { Product } from "@/lib/products";
import { FadeIn } from "./FadeIn";
import { NavMenu } from "./NavMenu";
import { Footer } from "./Footer";

export default function CartList({ products }: { products: Product[] }) {
  const cart = useCart();

  if (!cart.loaded) return null;

  const cartProducts = cart.items
    .map((cartItem) => {
      const product = products.find((p) => p.docId === cartItem.docId);
      return product ? { ...product, quantity: cartItem.quantity } : null;
    })
    .filter(Boolean) as (Product & { quantity: number })[];

  const whatsappLink =
    cartProducts.length > 0 ? buildWhatsAppOrderLink(cartProducts) : null;

  return (
    <>
      <NavMenu />
      <h1 className="w-full p-2.5 bg-[#2C2C2C] text-center yesteryearFont text-[18px] sm:text-4xl md:text-7xl text-white">
        Cart ({cart.totalCount})
      </h1>

      <div style={{ padding: "2rem" }}>
        <Link href="/" className="text-2xl m-2">
          ← Home
        </Link>
        <FadeIn delay={150}>
          {cartProducts.length === 0 && (
            <p className="text-white/70 text-center mt-10">
              Your cart is empty.
            </p>
          )}

          <div className="max-w-3xl mx-auto flex flex-col gap-4 px-4 sm:px-6 py-8">
            {cartProducts.map((item) => (
              <div
                key={item.docId}
                className="bg-[#222222] border border-[#333] rounded-lg p-3 sm:p-4 flex items-center gap-4"
              >
                <Link
                  href={`/product/${item.docId}`}
                  className="flex-1 min-w-0"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <h3 className="text-white text-sm sm:text-base font-medium truncate">
                    {item.Name}
                  </h3>
                  {item.Cost && item.Cost[0] && (
                    <p className="text-[#F0BB78] text-sm mt-1">
                      {Object.entries(item.Cost[0])[0].join(" — ")}
                    </p>
                  )}
                </Link>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() =>
                      cart.updateQuantity(item.docId, item.quantity - 1)
                    }
                    className="w-7 h-7 flex items-center justify-center rounded-full border border-[#444] text-white hover:bg-[#333] transition-colors"
                  >
                    −
                  </button>
                  <span className="text-white text-sm w-5 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      cart.updateQuantity(item.docId, item.quantity + 1)
                    }
                    className="w-7 h-7 flex items-center justify-center rounded-full border border-[#444] text-white hover:bg-[#333] transition-colors"
                  >
                    +
                  </button>
                  <button
                    onClick={() => cart.removeFromCart(item.docId)}
                    className="ml-2 text-white/50 hover:text-red-400 text-xs sm:text-sm transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {whatsappLink && (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 mt-4 py-3 px-6 rounded-lg text-white font-semibold text-sm sm:text-base bg-[#25D366] hover:bg-[#1ebe5b] transition-colors"
              >
                📱 Order via WhatsApp
              </a>
            )}
          </div>
        </FadeIn>
      </div>

      <Footer />
    </>
  );
}
