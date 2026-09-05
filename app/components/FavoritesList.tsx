"use client";

import Link from "next/link";
import { useFavorites } from "@/lib/useFavorites";
import type { Product } from "@/lib/products";
import { getProductImages } from "@/lib/products";
import CardActions from "@/app/components/CardActions";
import { NavMenu } from "./NavMenu";
import { Footer } from "./Footer";

export default function FavoritesList({ products }: { products: Product[] }) {
  const favorites = useFavorites();

  if (!favorites.loaded) return null;

  const favoriteProducts = products.filter((p) => favorites.has(p.docId));

  return (
    <>
      <NavMenu />
      <h1 className="w-full p-2.5 bg-[#2C2C2C] text-center yesteryearFont text-[18px] sm:text-4xl md:text-7xl text-white">
        Favorites
      </h1>

      <div style={{ padding: "2rem" }}>
        <Link href="/" className="text-2xl m-2">
          ← Home
        </Link>

        {favoriteProducts.length === 0 && (
          <p className="text-white/70 text-center mt-10">
            You don't have any favorite products yet.
          </p>
        )}

        <section>
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10 px-4 sm:px-6 md:px-10 lg:px-14 py-8 sm:py-10 md:py-12 lg:py-14 max-w-7xl mx-auto">
            {favoriteProducts.map((item) => {
              const images = getProductImages(item);
              return (
                <div
                  key={item.docId}
                  className="relative border border-[#ccc] rounded-lg bg-[#222222] p-3 sm:p-4 flex flex-col"
                >
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      favorites.remove(item.docId);
                    }}
                    aria-label="Remove from favorites"
                    className="absolute top-2 right-2 z-10 w-6 h-6 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-red-500 transition-colors text-sm"
                  >
                    ✕
                  </button>

                  <Link
                    href={`/product/${item.docId}`}
                    className="flex flex-col flex-1"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {images[0] && (
                      <img
                        src={images[0]}
                        alt={item.Name || ""}
                        className="w-full aspect-square sm:aspect-[3/4] object-cover rounded-md mb-2"
                      />
                    )}
                    <h3 className="text-white robotoCondensedFont text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px] text-center leading-tight line-clamp-2 min-h-[2.6em]">
                      {item.Name}
                    </h3>
                    {item.Cost && item.Cost.length > 0 && (
                      <div className="text-[#F0BB78] text-[13px] sm:text-[14px] md:text-[15px] lg:text-[17px] text-center my-2">
                        {item.Cost.map((variant, index) =>
                          Object.entries(variant).map(([size, price]) => (
                            <div key={`${index}-${size}`}>
                              {size}: {price}
                            </div>
                          )),
                        )}
                      </div>
                    )}
                  </Link>
                  <CardActions docId={item.docId} />
                </div>
              );
            })}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
