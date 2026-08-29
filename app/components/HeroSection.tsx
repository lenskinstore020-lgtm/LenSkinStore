export const HeroSection = () => {
  return (
    <div
      className="hero min-h-[80vh]"
      style={{
        backgroundImage:
          "url(https://res.cloudinary.com/z88a2was/image/upload/v1787991708/photo_2026-08-29_10-21-05.jpg)",
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 yesteryearFont text-2xl sm:text-4xl md:text-8xl leading-tight text-white truncate">
            Lén skin store
          </h1>
          <p className="mb-5">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};
