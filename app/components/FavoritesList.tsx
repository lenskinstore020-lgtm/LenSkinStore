"use client";

import Link from "next/link";
import { useFavorites } from "@/lib/useFavorites";
import type { Product } from "@/lib/products";
import { NavMenu } from "./NavMenu";
import { Footer } from "./Footer";

export default function FavoritesList({ products }: { products: Product[] }) {
  const favorites = useFavorites();

  if (!favorites.loaded) return null;

  const favoriteProducts = products.filter((p) => favorites.has(p.docId));

  return (
    <>
      <NavMenu />

      <div style={{ padding: "2rem" }}>
        <Link href="/">← На головну</Link>
        <h1>Улюблені товари</h1>

        {favoriteProducts.length === 0 && (
          <p>У вас поки немає улюблених товарів.</p>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "1rem",
          }}
        >
          {favoriteProducts.map((item) => (
            <div
              key={item.docId}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "1rem",
              }}
            >
              <Link
                href={`/product/${item.docId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <h3>{item.Name}</h3>
              </Link>
              <button
                onClick={() => favorites.remove(item.docId)}
                style={{
                  marginTop: "0.5rem",
                  padding: "0.4rem 0.8rem",
                  cursor: "pointer",
                }}
              >
                Видалити з улюблених
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
