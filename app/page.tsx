import Link from "next/link";
import { getAllProducts, getProductImages } from "@/lib/products";
import { getBrandLogo } from "@/lib/brandLogos";
import CardActions from "./components/CardActions";
import { NavMenu } from "./components/NavMenu";
import { HeroSection } from "./components/HeroSection";
import { Footer } from "./components/Footer";
import CategoryCircles from "./components/CategoryCircles";

export const revalidate = 300; // кеш на 5 хвилин

export default async function Home() {
  const products = await getAllProducts();

  // нормалізація — прибирає зайві пробіли, щоб уникнути дублікатів брендів
  const brands = [
    ...new Set(
      products
        .map((p) => p.Brand?.trim())
        .filter(Boolean)
        .map((b) => b as string),
    ),
  ];

  const typesSet = new Set<string>();
  products.forEach((p) => {
    if (Array.isArray(p.Type)) p.Type.forEach((t) => typesSet.add(t));
    else if (typeof p.Type === "string") typesSet.add(p.Type);
  });
  const types = [...typesSet];

  return (
    <div>
      <NavMenu />

      {brands.length > 0 && (
        <section style={{ margin: "2rem" }}>
          <div className="carousel carousel-start gap-4 sm:gap-6 md:gap-8 w-full py-2 md:justify-center">
            {brands.map((brand) => {
              const logo = getBrandLogo(brand);
              return (
                <Link
                  key={brand}
                  href={`/brand/${encodeURIComponent(brand)}`}
                  className="carousel-item h-20 w-20 sm:h-28 sm:w-28 md:h-40 md:w-40 flex-shrink-0"
                  style={{
                    position: "relative",
                    border: "1px solid #ccc",
                    background: logo ? `#424242 url(${logo})` : "#424242",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    borderRadius: "80px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    textDecoration: "none",
                    overflow: "hidden",
                  }}
                >
                  <span
                    className="text-[11px] sm:text-[15px] md:text-[19px]"
                    style={{
                      background: "rgba(0, 0, 0, 0.45)",
                      color: "white",
                      width: "100%",
                      padding: "10px",
                      borderRadius: "6px",
                      fontWeight: 600,
                    }}
                  >
                    {brand}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      )}
      <HeroSection />
      <CategoryCircles types={types} products={products} />
      <section>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "2.5rem",
            margin: "55px",
          }}
        >
          {products.map((item) => {
            const images = getProductImages(item);
            return (
              <div
                key={item.docId}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  background: "#222222",
                  padding: "1rem",
                }}
              >
                <Link
                  href={`/product/${item.docId}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {images[0] && (
                    <img
                      src={images[0]}
                      alt={item.Name || ""}
                      style={{
                        width: "100%",
                        height: "300px",
                        objectFit: "cover",
                        borderRadius: "6px",
                        marginBottom: "0.5rem",
                      }}
                    />
                  )}
                  <h3 className="text-white robotoCondensedFont text-[18px] text-center">
                    {item.Name}
                  </h3>
                  {item.Cost && item.Cost.length > 0 && (
                    <div
                      className="text-[#F0BB78] text-[17px] text-center"
                      style={{ margin: "0.5rem 0" }}
                    >
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
      <Footer />
    </div>
  );
}
