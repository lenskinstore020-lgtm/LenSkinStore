import Link from "next/link";
import { NavMenu } from "@/app/components/NavMenu";
import { Footer } from "@/app/components/Footer";
import { getProductsByType, getProductImages } from "@/lib/products";
import CardActions from "@/app/components/CardActions";

export const revalidate = 300;

// Нормалізація: об'єднує схожі за змістом, але по-різному написані назви категорій
const TYPE_ALIASES: Record<string, string> = {
  "Eye creams": "Eye cream",
};

function normalizeType(type: string): string {
  const trimmed = type.trim();
  return TYPE_ALIASES[trimmed] ?? trimmed;
}

interface TypePageProps {
  params: Promise<{ type: string }>;
}

export default async function TypePage({ params }: TypePageProps) {
  const { type: rawType } = await params;
  const type = decodeURIComponent(rawType);

  // шукаємо товари і під основною назвою, і під усіма її "синонімами" з TYPE_ALIASES
  const aliasSource = Object.entries(TYPE_ALIASES).find(
    ([, target]) => target === type,
  )?.[0];

  const [primaryProducts, aliasProducts] = await Promise.all([
    getProductsByType(type),
    aliasSource ? getProductsByType(aliasSource) : Promise.resolve([]),
  ]);

  const seen = new Set<string>();
  const products = [...primaryProducts, ...aliasProducts].filter((item) => {
    if (seen.has(item.docId)) return false;
    seen.add(item.docId);
    return true;
  });

  return (
    <>
      <NavMenu />
      <h1 className="w-full p-2.5 bg-[#2C2C2C] text-center yesteryearFont text-[18px] sm:text-4xl md:text-7xl text-white">
        {type}
      </h1>

      <div style={{ padding: "2rem" }}>
        <Link className="text-[20px]" href="/">
          ← Home
        </Link>

        {products.length === 0 && (
          <p>There are currently no products from this category.</p>
        )}

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
      </div>
      <Footer />
    </>
  );
}
