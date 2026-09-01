import Link from "next/link";
import { NavMenu } from "@/app/components/NavMenu";
import { ProductGallery } from "@/app/components/ProductGallery";
import { Footer } from "@/app/components/Footer";
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
      <NavMenu />
      <h1 className="w-full p-2.5 bg-[#2C2C2C] text-center yesteryearFont text-[18px] sm:text-4xl md:text-7xl text-white">
        {product.Name}
      </h1>
      <Link href="/" className="text-2xl m-2">
        ←Home
      </Link>
      <div className="flex justify-center" style={{ margin: "10px 220px" }}>
        <div className="my-4">
          <ProductGallery images={images} alt={product.Name || ""} />
        </div>

        <div
          className="p-2.5 text-left  text-[18px] sm:text-4xl md:text-[18px] "
          style={{ padding: "2rem", width: "100%", margin: "0 auto" }}
        >
          <h1 className="p-2.5 text-left  text-[18px] sm:text-4xl md:text-[28px] ">
            {product.Name}
          </h1>
          {product.Brand && (
            <p>
              <strong>Brand:</strong> {product.Brand}
            </p>
          )}

          {typeList.length > 0 && (
            <div>
              <strong>Category:</strong>
              <ul style={{ margin: "0.25rem 0 0 1rem" }}>
                {typeList.map((type, index) => (
                  <li key={index}>{type}</li>
                ))}
              </ul>
            </div>
          )}

          {benefitsList.length > 0 && (
            <div>
              <strong>Benefits:</strong>
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
              <strong>Cost:</strong>
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

          <p>{product.Description}</p>
        </div>
      </div>
      <Footer />
    </>
  );
}
