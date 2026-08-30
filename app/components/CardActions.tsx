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
        color: "white",
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
          background: "#000000",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          viewBox="0 0 1024 1024"
          width="18"
          height="18"
          xmlns="http://www.w3.org/2000/svg"
          fill={isFavorite ? "#F44336" : "white"}
          stroke="white"
          strokeWidth="60"
        >
          <path d="M725.333333 192c-89.6 0-168.533333 44.8-213.333333 115.2C467.2 236.8 388.266667 192 298.666667 192 157.866667 192 42.666667 307.2 42.666667 448c0 253.866667 469.333333 512 469.333333 512s469.333333-256 469.333333-512c0-140.8-115.2-256-256-256z" />
        </svg>
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
          background: isInCart ? "#ffffff" : "#000000",
          color: isInCart ? "#000000" : "#ffffff",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "4px",
          transition: "background 0.2s ease, color 0.2s ease",
        }}
      >
        <svg
          viewBox="0 0 32 32"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <path d="M10,25 C11.104,25 12,25.896 12,27 C12,28.104 11.104,29 10,29 C8.896,29 8,28.104 8,27 C8,25.896 8.896,25 10,25 L10,25 Z M6,27 C6,29.209 7.791,31 10,31 C12.209,31 14,29.209 14,27 C14,24.791 12.209,23 10,23 C7.791,23 6,24.791 6,27 L6,27 Z M8,21 C6.896,21 6,20.104 6,19 C6,19 29,17 28.972,17.097 C29.482,15.2 31.979,4.223 32,4 C32.054,3.45 31.553,3 31,3 L6,3 L6,1 L7,1 C7.553,1 8,0.553 8,0 C8,-0.552 7.553,-1 7,-1 L1,-1 C0.447,-1 0,-0.552 0,0 C0,0.553 0.447,1 1,1 L4,1 L4,19 C4,21.209 5.791,23 8,23 L31,23 C31.031,23 31,22.009 31,21 L8,21 L8,21 Z M22,25 C23.104,25 24,25.896 24,27 C24,28.104 23.104,29 22,29 C20.896,29 20,28.104 20,27 C20,25.896 20.896,25 22,25 L22,25 Z M18,27 C18,29.209 19.791,31 22,31 C24.209,31 26,29.209 26,27 C26,24.791 24.209,23 22,23 C19.791,23 18,24.791 18,27 L18,27 Z" />
        </svg>
        {isInCart && <span style={{ fontSize: "12px" }}>✓</span>}
      </button>
    </div>
  );
}
