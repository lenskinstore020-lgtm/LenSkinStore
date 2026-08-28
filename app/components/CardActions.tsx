"use client";

import { useFavorites } from "../../lib/useFavorites";
import { useCart } from "../../lib/useCart";

export default function CardActions({ docId }: { docId: string }) {
  const favorites = useFavorites();
  const cart = useCart();

  if (!favorites.loaded || !cart.loaded) return null;

  const isFavorite = favorites.has(docId);
  const isInCart = cart.inCart(docId);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        marginTop: "0.5rem",
      }}
    >
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          favorites.toggle(docId);
        }}
        style={{
          padding: "0.4rem 0.7rem",
          borderRadius: "6px",
          border: "1px solid #ccc",
          background: isFavorite ? "#ffe0e0" : "transparent",
          cursor: "pointer",
          fontSize: "15px",
        }}
      >
        {isFavorite ? "♥" : "♡"}
      </button>

      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          cart.addToCart(docId);
        }}
        style={{
          padding: "0.4rem 0.7rem",
          borderRadius: "6px",
          border: "1px solid #ccc",
          background: isInCart ? "#e0f0ff" : "transparent",
          cursor: "pointer",
          fontSize: "0.85rem",
        }}
      >
        {isInCart ? "✓ 🛒" : "🛒"}
      </button>
    </div>
  );
}
