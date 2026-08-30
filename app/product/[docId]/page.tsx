import Link from "next/link";
import { getProductByDocId, getProductImages } from "@/lib/products";
import ProductActions from "../../components/ProductActions";

export const revalidate = 300;

interface ProductPageProps {
  params: Promise<{ docId: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const docId = resolvedParams?.docId;

  if (!docId) {
    return (
      <div style={{ padding: "2rem" }}>
        <p>Помилка: docId відсутній у параметрах маршруту.</p>
        <Link href="/">← На головну</Link>
      </div>
    );
  }

  const product = await getProductByDocId(docId);

  if (!product) {
    return (
      <div style={{ padding: "2rem" }}>
        <p>Продукт не знайдено (docId: {docId}).</p>
        <Link href="/">← На головну</Link>
      </div>
    );
  }

  const images = getProductImages(product);

  const typeList = Array.isArray(product.Type)
    ? product.Type
    : product.Type
      ? [product.Type]
      : [];

  const benefitsList = Array.isArray(product.Benefits)
    ? product.Benefits
    : product.Benefits
      ? [product.Benefits]
      : [];

  return (
    <>
      <div style={{ padding: "2rem", maxWidth: "700px", margin: "0 auto" }}>
        <Link href="/">← На головну</Link>

        <h1 style={{ marginTop: "1rem" }}>{product.Name}</h1>

        {images.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: "0.5rem",
              flexWrap: "wrap",
              margin: "1rem 0",
            }}
          >
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={product.Name || ""}
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            ))}
          </div>
        )}

        {product.Brand && (
          <p>
            <strong>Бренд:</strong> {product.Brand}
          </p>
        )}

        {typeList.length > 0 && (
          <div>
            <strong>Тип:</strong>
            <ul style={{ margin: "0.25rem 0 0 1rem" }}>
              {typeList.map((type, index) => (
                <li key={index}>{type}</li>
              ))}
            </ul>
          </div>
        )}

        {benefitsList.length > 0 && (
          <div>
            <strong>Переваги:</strong>
            <ul style={{ margin: "0.25rem 0 0 1rem" }}>
              {benefitsList.map((benefit, index) => (
                <li key={index}>
                  <Link href={`/benefit/${encodeURIComponent(benefit)}`}>
                    {benefit}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {product.Cost && product.Cost.length > 0 && (
          <div style={{ margin: "0.75rem 0" }}>
            <strong>Ціна:</strong>
            <ul style={{ margin: "0.25rem 0 0 1rem" }}>
              {product.Cost.map((variant, index) =>
                Object.entries(variant).map(([size, price]) => (
                  <li key={`${index}-${size}`}>
                    {size} — {price}
                  </li>
                )),
              )}
            </ul>
          </div>
        )}

        <ProductActions docId={product.docId} />

        <p>
          <strong>Опис:</strong> {product.Describe}
        </p>
      </div>
    </>
  );
}
