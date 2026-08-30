export const HeroSection = () => {
  return (
    <div
      className="hero min-h-[90vh]"
      style={{
        backgroundImage:
          "url(https://res.cloudinary.com/z88a2was/image/upload/v1787991708/photo_2026-08-29_10-21-05.jpg)",
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-3xl">
          <h1 className="mb-5 yesteryearFont text-2xl sm:text-4xl md:text-9xl text-white truncate">
            Lén skin store
          </h1>
          <p className="mb-5 yesteryearFont text-2xl sm:text-2xl md:text-3xl text-white truncate">
            Where professional skincare meets personalized care. <br />
          </p>

          <p className="mb-5 text-[20px]">
            Curated by a licensed skincare professional, LÉN Skin Store brings
            together professional-grade skincare selected with your skin’s needs
            in mind. Discover trusted products designed to nourish, protect,
            restore and enhance your skin — because beautiful skin starts with
            the right care.
          </p>
        </div>
      </div>
    </div>
  );
};
