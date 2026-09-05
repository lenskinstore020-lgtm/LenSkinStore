export const HeroSection = () => {
  const mobileImageUrl =
    "https://res.cloudinary.com/z88a2was/image/upload/v1788619284/photo_2026-09-05_17-41-03.jpg";
  const desktopImageUrl =
    "https://res.cloudinary.com/z88a2was/image/upload/v1787991708/photo_2026-08-29_10-21-05.jpg";

  return (
    <div className="relative min-h-[90vh] sm:min-h-[85vh] md:min-h-screen overflow-hidden">
      {/* Фото для мобільних */}
      <div
        className="absolute inset-0 sm:hidden"
        style={{
          backgroundImage: `url(${mobileImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center 25%",
        }}
      />

      {/* Фото для планшетів і десктопу */}
      <div
        className="hidden sm:block absolute inset-0"
        style={{
          backgroundImage: `url(${desktopImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Градієнт для читабельності тексту */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center text-center z-10 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="mb-3 sm:mb-5 yesteryearFont text-3xl sm:text-5xl md:text-7xl lg:text-9xl text-white">
            Lén skin store
          </h1>
          <p className="mb-3 sm:mb-5 yesteryearFont text-lg sm:text-2xl md:text-3xl text-white leading-snug">
            Where professional skincare meets personalized care.
          </p>

          <p className="hidden sm:block mb-5 text-sm sm:text-base md:text-[20px] leading-relaxed text-white/90">
            Curated by a licensed skincare professional, LÉN Skin Store brings
            together professional-grade skincare selected with your skin's needs
            in mind. Discover trusted products designed to nourish, protect,
            restore and enhance your skin — because beautiful skin starts with
            the right care.
          </p>
        </div>
      </div>
    </div>
  );
};
