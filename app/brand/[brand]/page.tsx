import Link from "next/link";
import { NavMenu } from "@/app/components/NavMenu";
import { Footer } from "@/app/components/Footer";
import CardActions from "@/app/components/CardActions";
import { getProductsByBrand, getProductImages } from "@/lib/products";

export const revalidate = 300;

interface BrandPageProps {
  params: Promise<{ brand: string }>;
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { brand: rawBrand } = await params;
  const brand = decodeURIComponent(rawBrand);
  const products = await getProductsByBrand(brand);

  return (
    <>
      <NavMenu />
      <h1 className="w-full p-3 bg-[#2C2C2C] text-center yesteryearFont text-[18px] sm:text-4xl md:text-7xl text-white">
        {brand}
      </h1>
      <div style={{ padding: "2rem" }}>
        <Link href="/">← Home</Link>

        {products.length === 0 && (
          <p>There are currently no products from this brand.</p>
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
