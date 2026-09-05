import Link from "next/link";
import { NavMenu } from "@/app/components/NavMenu";
import { Footer } from "@/app/components/Footer";
import { getBestSaleProducts, getProductImages } from "@/lib/products";
import CardActions from "@/app/components/CardActions";

export const revalidate = 300;

export default async function BestSalePage() {
  const products = await getBestSaleProducts();

  return (
    <>
      <NavMenu />
      <h1 className="w-full p-2.5 bg-[#2C2C2C] text-center yesteryearFont text-[16px] sm:text-3xl md:text-5xl text-white">
        Best Sellers
      </h1>

      <div className="p-3 sm:p-5 md:p-6">
        <Link href="/" className="text-base sm:text-xl inline-block m-2">
          ← Home
        </Link>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 max-w-7xl mx-auto items-start">
          <div className="w-full lg: w-1/2  ">
            <img
              src="https://res.cloudinary.com/z88a2was/image/upload/v1788614733/photo_2026-09-04_23-32-48.jpg"
              alt="Best sellers"
              className="w-full h-full sm:h-56 md:h-64 lg:h-auto lg:"
            />
          </div>

          {/* Товари */}
          <div className="w-full lg: w-1/2">
            {products.length === 0 && (
              <p className="text-white/70 text-center mt-10">
                No best sellers available right now.
              </p>
            )}

            <section>
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-2 gap-2 sm:gap-3">
                {products.map((item) => {
                  const images = getProductImages(item);
                  return (
                    <div
                      key={item.docId}
                      className="border border-[#ccc] rounded-lg bg-[#222222] p-2.5 flex flex-col"
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
                            className="w-full aspect-square object-cover rounded-md mb-1"
                          />
                        )}
                        <h3 className="text-white robotoCondensedFont text-[10px] sm:text-[11px] md:text-[15px] text-center leading-tight line-clamp-2 min-h-[2em]">
                          {item.Name}
                        </h3>
                        {item.Cost && item.Cost.length > 0 && (
                          <div className="text-[#F0BB78] text-[9px] sm:text-[10px] md:text-[14px] text-center my-1">
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
        </div>
      </div>
      <Footer />
    </>
  );
}
