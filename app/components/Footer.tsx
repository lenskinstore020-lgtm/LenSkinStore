import Link from "next/link";

const INSTAGRAM_URL =
  "https://www.instagram.com/len_skin_studio?utm_source=ig_web_button_share_sheet&igsi=ZDNlZDc0MzIxNw=="; // замініть на реальний нік
const WHATSAPP_URL = "https://wa.me/380000000000"; // той самий номер, що й у lib/whatsapp.ts

export const Footer = () => {
  return (
    <footer className="bg-[#000000] text-white mt-12">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col items-center gap-8">
        {/* Назва бренду */}
        <div className="text-center">
          <p className="yesteryearFont text-3xl sm:text-5xl text-white">
            Lén skin store
          </p>
          <p className="text-xs sm:text-lg text-white/50 mt-1 tracking-wide">
            Skincare you can feel
          </p>
        </div>

        {/* Навігація */}
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm sm:text-[20px]">
          <Link
            href="/"
            className="link link-hover text-white/80 hover:text-amber-400 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/favorites"
            className="link link-hover text-white/80 hover:text-amber-400 transition-colors"
          >
            Favourites
          </Link>
          <Link
            href="/cart"
            className="link link-hover text-white/80 hover:text-amber-400 transition-colors"
          >
            About us
          </Link>

          <a>Contact us</a>
        </nav>

        {/* Роздільник */}
        <div className="w-16 h-px bg-white/20" />

        {/* Соцмережі */}
        <div className="flex gap-5">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="p-2 rounded-full border border-white/20
          hover:border-amber-400 hover:bg-white/5 transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="fill-current text-white"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="p-2 rounded-full border border-white/20
          hover:border-amber-400 hover:bg-white/5 transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="fill-current text-white"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.36.101 11.943c0 2.105.549 4.16 1.595 5.976L0 24l6.335-1.652a11.882 11.882 0 005.71 1.454h.005c6.585 0 11.946-5.362 11.949-11.945a11.877 11.877 0 00-3.479-8.408" />
            </svg>
          </a>
        </div>

        {/* Копірайт */}
        <p className="text-xs text-white/40 text-center">
          © {new Date().getFullYear()} Lén skin store. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
