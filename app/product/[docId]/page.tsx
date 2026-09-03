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

      <div className="px-4 sm:px-6 md:px-10 pt-4">
        <Link
          href="/"
          className="inline-block text-base sm:text-lg text-black/70 hover:text-amber-400 transition-colors"
        >
          ← Home
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">
          {/* Галерея */}
          <div className="flex justify-center lg:justify-start">
            <ProductGallery images={images} alt={product.Name || ""} />
          </div>

          {/* Інформація про товар */}
          <div className="flex flex-col gap-4">
            <h1 className="yesteryearFont text-2xl sm:text-3xl md:text-4xl text-black leading-tight">
              {product.Name}
            </h1>

            {product.Brand && (
              <div className="bg-[#222222] border border-[#333] rounded-lg px-4 py-3">
                <span className="text-white/50 text-xs uppercase tracking-wide">
                  Brand
                </span>
                <p className="text-white text-base sm:text-lg font-medium mt-1">
                  {product.Brand}
                </p>
              </div>
            )}

            {typeList.length > 0 && (
              <div className="bg-[#222222] border border-[#333] rounded-lg px-4 py-3">
                <span className="text-white/50 text-xs uppercase tracking-wide">
                  Category
                </span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {typeList.map((type, index) => (
                    <span
                      key={index}
                      className="bg-[#333] text-white text-xs sm:text-sm px-3 py-1 rounded-full"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {benefitsList.length > 0 && (
              <div className="bg-[#222222] border border-[#333] rounded-lg px-4 py-3">
                <span className="text-white/50 text-xs uppercase tracking-wide">
                  Benefits
                </span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {benefitsList.map((benefit, index) => (
                    <Link
                      key={index}
                      href={`/benefit/${encodeURIComponent(benefit)}`}
                      className="bg-[#333] text-white text-xs sm:text-sm px-3 py-1 rounded-full hover:bg-amber-400 hover:text-black transition-colors"
                    >
                      {benefit}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {product.Cost && product.Cost.length > 0 && (
              <div className="bg-[#222222] border border-[#333] rounded-lg px-4 py-3">
                <span className="text-white/50 text-xs uppercase tracking-wide">
                  Price
                </span>
                <div className="flex flex-col gap-1 mt-2">
                  {product.Cost.map((variant, index) =>
                    Object.entries(variant).map(([size, price]) => (
                      <div
                        key={`${index}-${size}`}
                        className="flex justify-between text-white text-sm sm:text-base"
                      >
                        <span className="text-white/70">{size}</span>
                        <span className="text-[#F0BB78] font-semibold">
                          {price}
                        </span>
                      </div>
                    )),
                  )}
                </div>
              </div>
            )}

            <ProductActions docId={product.docId} />
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-6 sm:py-10">
        {product.Description && (
          <div className="bg-[#222222] border border-[#333] rounded-lg px-4 py-3">
            <span className="text-white/50 text-xs uppercase tracking-wide">
              Description
            </span>
            <p className="text-white/90 text-sm sm:text-base mt-2 leading-relaxed">
              {product.Description}
            </p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
