import Link from "next/link";
import { getAllProducts, getProductImages } from "@/lib/products";
import { getBrandLogo } from "@/lib/brandLogos";
import CardActions from "./components/CardActions";
import { NavMenu } from "./components/NavMenu";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import CategoryCircles from "./components/CategoryCircles";

export const revalidate = 300; // кеш на 5 хвилин

// Нормалізація: об'єднує схожі за змістом, але по-різному написані назви категорій
const TYPE_ALIASES: Record<string, string> = {
  "Eye creams": "Eye cream",
  // за потреби додайте ще подібні дублікати сюди, наприклад:
  // "Cleanser": "Cleansers",
};

function normalizeType(type: string): string {
  const trimmed = type.trim();
  return TYPE_ALIASES[trimmed] ?? trimmed;
}

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
    if (Array.isArray(p.Type)) {
      p.Type.forEach((t) => typesSet.add(normalizeType(t)));
    } else if (typeof p.Type === "string") {
      typesSet.add(normalizeType(p.Type));
    }
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
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10 px-4 sm:px-6 md:px-10 lg:px-14 py-8 sm:py-10 md:py-12 lg:py-14 max-w-7xl mx-auto">
          {products.map((item) => {
            const images = getProductImages(item);
            return (
              <div
                key={item.docId}
                className="border border-[#ccc] rounded-lg bg-[#222222] p-3 sm:p-4 flex flex-col"
              >
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
      <Footer />
    </div>
  );
}
