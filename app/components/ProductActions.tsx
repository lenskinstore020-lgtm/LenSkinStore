"use client";

import { useFavorites } from "../../lib/useFavorites";
import { useCart } from "../../lib/useCart";

export default function ProductActions({ docId }: { docId: string }) {
  const favorites = useFavorites();
  const cart = useCart();

  if (!favorites.loaded || !cart.loaded) return null;

  const isFavorite = favorites.has(docId);
  const isInCart = cart.inCart(docId);

  return (
    <div style={{ display: "flex", gap: "0.75rem", margin: "1rem 0" }}>
      <button
        onClick={() => favorites.toggle(docId)}
        style={{
          padding: "0.6rem 1.2rem",
          borderRadius: "6px",
          border: "1px solid #ccc",
          background: isFavorite ? "#ffe0e0" : "transparent",
          cursor: "pointer",
        }}
      >
        {isFavorite ? "♥ В улюблених" : "♡ Додати в улюблені"}
      </button>

      <button
        onClick={() => cart.addToCart(docId)}
        style={{
          padding: "0.6rem 1.2rem",
          borderRadius: "6px",
          border: "1px solid #ccc",
          background: isInCart ? "#e0f0ff" : "transparent",
          cursor: "pointer",
        }}
      >
        {isInCart ? "✓ У кошику (додати ще)" : "🛒 Додати в кошик"}
      </button>
    </div>
  );
}
