import { NavMenu } from "@/app/components/NavMenu";
import { Footer } from "@/app/components/Footer";
import { FadeIn } from "@/app/components/FadeIn";

export const revalidate = 300;

const WHATSAPP_URL = "https://wa.me/16478904645";
const INSTAGRAM_URL =
  "https://www.instagram.com/len_skin_studio?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw==";
const THREADS_URL = "https://www.threads.com/@len_skin_studio";

export default function ContactPage() {
  return (
    <>
      <NavMenu />

      <h1 className="w-full p-2.5 bg-[#2C2C2C] text-center yesteryearFont text-[18px] sm:text-4xl md:text-7xl text-white animate-fade-in">
        Contact Us
      </h1>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10 py-10 sm:py-16 flex flex-col gap-8 sm:gap-10">
        <FadeIn>
          <p className="text-black/80 text-sm sm:text-base text-center max-w-2xl mx-auto leading-relaxed">
            Have a question about a product, an order, or just want some
            skincare advice? Reach out — we're happy to help.
          </p>
        </FadeIn>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-stretch">
          {/* Контактна інформація */}
          <FadeIn delay={100} className="w-full lg:w-1/2">
            <div className="flex flex-col gap-3 sm:gap-4 h-full">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-[#222222] border border-[#333] rounded-lg px-4 sm:px-5 py-3.5 sm:py-4 transition-all duration-300 hover:border-[#25D366] hover:-translate-y-0.5"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-[#25D366] flex-shrink-0">
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.36.101 11.943c0 2.105.549 4.16 1.595 5.976L0 24l6.335-1.652a11.882 11.882 0 005.71 1.454h.005c6.585 0 11.946-5.362 11.949-11.945a11.877 11.877 0 00-3.479-8.408" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-white text-sm sm:text-base font-medium">
                    WhatsApp
                  </p>
                  <p className="text-white/50 text-xs sm:text-sm mt-0.5">
                    Message us for quick answers
                  </p>
                </div>
              </a>

              <a
                href={THREADS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-[#222222] border border-[#333] rounded-lg px-4 sm:px-5 py-3.5 sm:py-4 transition-all duration-300 hover:border-white/60 hover:-translate-y-0.5"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="black"
                    viewBox="0 0 16 16"
                  >
                    <path d="M6.321 6.016c-.27-.18-1.166-.802-1.166-.802.756-1.081 1.753-1.502 3.132-1.502.975 0 1.803.327 2.394.948s.928 1.509 1.005 2.644q.492.207.905.484c1.109.745 1.719 1.86 1.719 3.137 0 2.716-2.226 5.075-6.256 5.075C4.594 16 1 13.987 1 7.994 1 2.034 4.482 0 8.044 0 9.69 0 13.55.243 15 5.036l-1.36.353C12.516 1.974 10.163 1.43 8.006 1.43c-3.565 0-5.582 2.171-5.582 6.79 0 4.143 2.254 6.343 5.63 6.343 2.777 0 4.847-1.443 4.847-3.556 0-1.438-1.208-2.127-1.27-2.127-.236 1.234-.868 3.31-3.644 3.31-1.618 0-3.013-1.118-3.013-2.582 0-2.09 1.984-2.847 3.55-2.847.586 0 1.294.04 1.663.114 0-.637-.54-1.728-1.9-1.728-1.25 0-1.566.405-1.967.868ZM8.716 8.19c-2.04 0-2.304.87-2.304 1.416 0 .878 1.043 1.168 1.6 1.168 1.02 0 2.067-.282 2.232-2.423a6.2 6.2 0 0 0-1.528-.161" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-white text-sm sm:text-base font-medium">
                    Threads
                  </p>
                  <p className="text-white/50 text-xs sm:text-sm mt-0.5">
                    Follow us for tips and new arrivals
                  </p>
                </div>
              </a>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-[#222222] border border-[#333] rounded-lg px-4 sm:px-5 py-3.5 sm:py-4 transition-all duration-300 hover:border-pink-400 hover:-translate-y-0.5"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-[#333] flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="white"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <p className="text-white text-sm sm:text-base font-medium">
                    Instagram
                  </p>
                  <p className="text-white/50 text-xs sm:text-sm mt-0.5">
                    Follow us for tips and new arrivals
                  </p>
                </div>
              </a>
            </div>
          </FadeIn>

          {/* Карта */}
          <FadeIn delay={150} className="w-full lg:w-1/2">
            <div className="rounded-lg overflow-hidden border border-[#333] h-full min-h-[280px] sm:min-h-[350px] lg:min-h-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54965.30983952662!2d-79.55081496576595!3d43.611574917186275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b3623ef38319b%3A0xcece5329ba393ccc!2zTWltaWNvLVF1ZWVuc3dheSwg0JXRgtC-0LHRltC60L4sINCe0L3RgtCw0YDRltC-LCDQmtCw0L3QsNC00LA!5e0!3m2!1suk!2sua!4v1788629355061!5m2!1suk!2sua"
                className="w-full h-full min-h-[280px] sm:min-h-[350px] lg:min-h-full"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </FadeIn>
        </div>
      </div>

      <Footer />
    </>
  );
}
