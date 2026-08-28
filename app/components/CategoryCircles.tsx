import Link from "next/link";
import { getProductImages, type Product } from "@/lib/products";

interface CategoryCirclesProps {
  types: string[];
  products: Product[];
}

export default function CategoryCircles({
  types,
  products,
}: CategoryCirclesProps) {
  if (types.length === 0) return null;

  // для кожного типу знаходимо перший товар цієї категорії, у якого є фото
  const getCategoryImage = (type: string): string | null => {
    for (const product of products) {
      const productTypes = Array.isArray(product.Type)
        ? product.Type
        : product.Type
          ? [product.Type]
          : [];

      if (productTypes.includes(type)) {
        const images = getProductImages(product);
        if (images[0]) return images[0];
      }
    }
    return null;
  };

  return (
    <section style={{ marginBottom: "2rem" }}>
      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          flexWrap: "wrap",
          margin: "30px",
        }}
      >
        {types.map((type) => {
          const image = getCategoryImage(type);
          return (
            <Link
              key={type}
              href={`/type/${encodeURIComponent(type)}`}
              style={{
                position: "relative",
                border: "1px solid #ccc",
                background: image ? `#424242 url(${image})` : "#424242",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",

                borderRadius: "70px",
                height: "150px",
                width: "150px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                textDecoration: "none",
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  background: "rgba(0, 0, 0, 0.45)",
                  color: "white",
                  padding: "0.3rem 0.7rem",
                  width: "100%",
                  borderRadius: "6px",
                  fontSize: "17px",
                  fontWeight: 600,
                }}
              >
                {type}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
