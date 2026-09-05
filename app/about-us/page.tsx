import Image from "next/image";
import { NavMenu } from "@/app/components/NavMenu";
import { Footer } from "@/app/components/Footer";
import { FadeIn } from "@/app/components/FadeIn";

export const revalidate = 300;

export default function AboutPage() {
  return (
    <>
      <NavMenu />

      <h1 className="w-full p-2.5 bg-[#2C2C2C] text-center yesteryearFont text-[18px] sm:text-4xl md:text-7xl text-white animate-fade-in">
        About Lén Skin Store
      </h1>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10 py-10 sm:py-16 flex flex-col gap-12">
        {/* Секція 1: фото + вступний текст */}
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
            <div className="order-2 md:order-1">
              <p className="yesteryearFont text-2xl sm:text-3xl md:text-4xl text-black mb-4">
                Where professional skincare meets personalized care.
              </p>
              <p className="text-black/80 text-sm sm:text-base leading-relaxed">
                At Lén Skin Store, skincare is more than products — it’s
                professional expertise you can trust.
              </p>
            </div>
            <div className="order-1 md:order-2 rounded-lg overflow-hidden aspect-[4/5] relative">
              {/* Замініть src на реальне фото засновниці/студії */}
              <img
                src="https://res.cloudinary.com/z88a2was/image/upload/v1787991708/photo_2026-08-29_10-21-05.jpg"
                alt="Lén Skin Store founder"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </FadeIn>

        {/* Секція 2: наша історія */}
        <FadeIn delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
            <div className="rounded-lg overflow-hidden aspect-[4/5] relative">
              {/* Замініть на фото студії/продуктів */}
              <img
                src="https://res.cloudinary.com/z88a2was/image/upload/v1788619284/photo_2026-09-05_17-41-03.jpg"
                alt="Lén Skin Store studio"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-black/50 text-xs uppercase tracking-wide">
                Our Story
              </span>
              <p className="text-black/90 text-sm sm:text-base mt-2 leading-relaxed">
                LÉN Skin Store was founded with a simple belief: everyone
                deserves access to trustworthy, professional-grade skincare
                guided by real expertise. What started as a passion for helping
                clients achieve healthy, radiant skin grew into a curated
                collection of brands we truly believe in.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Секція 3: місія */}
        <FadeIn delay={150}>
          <div className="bg-[#222222] border border-[#333] rounded-lg px-6 py-8 text-center">
            <span className="text-white/50 text-xs uppercase tracking-wide">
              Our Mission
            </span>
            <p className="text-white/90 text-sm sm:text-base mt-3 leading-relaxed max-w-2xl mx-auto">
              I’m a licensed esthetician with a medical background, specializing
              in skin health and personalized skincare. Every product in my
              store is carefully selected based on quality, results, and the
              needs I see in real clients every day. Whether you’re dealing with
              acne, rosacea, pigmentation, or simply want healthier, glowing
              skin, I’m here to help you choose the right routine for your skin.
              Professional skincare. Personalized for you
            </p>
          </div>
        </FadeIn>
      </div>

      <Footer />
    </>
  );
}
