import Link from "next/link";
import { getProductsByBrand } from "@/lib/products";

export const revalidate = 300;

interface BrandPageProps {
  params: Promise<{ brand: string }>;
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { brand: rawBrand } = await params;
  const brand = decodeURIComponent(rawBrand);
  const products = await getProductsByBrand(brand);

  return (
    <div style={{ padding: "2rem" }}>
      <Link href="/">← На головну</Link>
      <h1>{brand}</h1>

      {products.length === 0 && <p>Товарів цього бренду поки немає.</p>}

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
  );
}
