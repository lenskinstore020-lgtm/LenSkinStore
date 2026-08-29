import Link from "next/link";
import { NavMenu } from "@/app/components/NavMenu";
import { Footer } from "@/app/components/Footer";
import { getProductsByType } from "@/lib/products";

export const revalidate = 300;

interface TypePageProps {
  params: Promise<{ type: string }>;
}

export default async function TypePage({ params }: TypePageProps) {
  const { type: rawType } = await params;
  const type = decodeURIComponent(rawType);
  const products = await getProductsByType(type);

  return (
    <>
      <NavMenu />
      <h1 className="w-full p-2.5 bg-[#2C2C2C]  text-center yesteryearFont text-[18px] sm:text-4xl md:text-7xl   text-white">
        {type}
      </h1>

      <div style={{ padding: "2rem" }}>
        <Link className="text-[20px]" href="/">
          ← Home
        </Link>

        {products.length === 0 && <p>Товарів у цій категорії поки немає.</p>}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "1rem",
          }}
        >
          {products.map((item) => (
            <Link
              key={item.docId}
              href={`/product/${item.docId}`}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "1rem",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <h3>{item.Name}</h3>
              {item.Cost && item.Cost.length > 0 && (
                <div style={{ margin: "0.5rem 0", fontSize: "0.9rem" }}>
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
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
