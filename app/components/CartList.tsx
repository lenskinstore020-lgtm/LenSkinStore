"use client";

import Link from "next/link";
import { useCart } from "@/lib/useCart";
import { buildWhatsAppOrderLink } from "@/lib/whatsapp";
import type { Product } from "@/lib/products";
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
      <div style={{ padding: "2rem" }}>
        <Link href="/">← На головну</Link>
        <h1>Кошик ({cart.totalCount})</h1>

        {cartProducts.length === 0 && <p>Кошик порожній.</p>}

        {cartProducts.map((item) => (
          <div
            key={item.docId}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
              marginBottom: "1rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <Link
                href={`/product/${item.docId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <h3>{item.Name}</h3>
              </Link>
              {item.Cost && item.Cost[0] && (
                <p>{Object.entries(item.Cost[0])[0].join(" — ")}</p>
              )}
            </div>

            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <button
                onClick={() =>
                  cart.updateQuantity(item.docId, item.quantity - 1)
                }
              >
                −
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() =>
                  cart.updateQuantity(item.docId, item.quantity + 1)
                }
              >
                +
              </button>
              <button
                onClick={() => cart.removeFromCart(item.docId)}
                style={{ marginLeft: "1rem" }}
              >
                Видалити
              </button>
            </div>
          </div>
        ))}

        {whatsappLink && (
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              marginTop: "1.5rem",
              padding: "0.9rem 1.6rem",
              background: "#25D366",
              color: "white",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
          >
            📱 Оформити замовлення через WhatsApp
          </a>
        )}
      </div>
      <Footer />
    </>
  );
}
