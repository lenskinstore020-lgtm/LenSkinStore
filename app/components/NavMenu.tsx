"use client";

import Link from "next/link";
import { useCart } from "@/lib/useCart";
import { useFavorites } from "@/lib/useFavorites";

export const NavMenu = () => {
  const cart = useCart();
  const favorites = useFavorites();

  const favoritesCount = favorites.loaded ? favorites.items.length : 0;
  const cartCount = cart.loaded ? cart.totalCount : 0;
  const isFavoriteActive = favorites.loaded && favorites.items.length > 0;

  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center bg-[#2C2C2C] shadow-sm w-full min-h-16 sm:min-h-20 md:min-h-28 px-2 sm:px-4 md:px-6">
      {/* Ліва колонка — гамбургер-меню */}
      <div>
        <div className="drawer w-auto">
          <input id="my-drawer-1" type="checkbox" className="drawer-toggle" />

          <div className="drawer-content">
            <label
              htmlFor="my-drawer-1"
              className="btn btn-circle btn-sm sm:btn-md md:btn-lg bg-transparent border-none hover:bg-white/10 hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h7"
                  className="transition-all duration-300 ease-in-out"
                />
              </svg>
            </label>
          </div>

          <div className="drawer-side z-50">
            <label
              htmlFor="my-drawer-1"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-[#2C2C2C] text-lg sm:text-xl md:text-2xl text-white min-h-full w-64 sm:w-72 md:w-80 p-4 gap-2">
              <li>
                <label htmlFor="my-drawer-1">
                  <Link
                    href="/"
                    className="hover:text-amber-400 transition-colors duration-200"
                  >
                    Home
                  </Link>
                </label>
              </li>

              <li>
                <label htmlFor="my-drawer-1">
                  <Link
                    href="/contact"
                    className="hover:text-amber-400 transition-colors duration-200"
                  >
                    Contact
                  </Link>
                </label>
              </li>
              <li>
                <label htmlFor="my-drawer-1">
                  <Link
                    href="/favorites"
                    className="hover:text-amber-400 transition-colors duration-200"
                  >
                    Customer
                  </Link>
                </label>
              </li>
              <li>
                <label htmlFor="my-drawer-1">
                  <Link
                    href="/sale"
                    className="hover:text-amber-400 transition-colors duration-200"
                  >
                    Sale
                  </Link>
                </label>
              </li>
              <li>
                <label htmlFor="my-drawer-1">
                  <Link
                    href="/sale"
                    className="hover:text-amber-400 transition-colors duration-200"
                  >
                    Best Seller
                  </Link>
                </label>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Центральна колонка — назва магазину */}
      <div className="flex justify-center overflow-hidden">
        <Link
          href="/"
          className="yesteryearFont text-2xl sm:text-4xl md:text-7xl text-white truncate"
        >
          Lén skin store
        </Link>
      </div>

      {/* Права колонка — улюблені й кошик */}
      <div className="flex items-center gap-1 sm:gap-2 justify-self-end">
        <Link
          href="/favorites"
          className="btn btn-ghost btn-sm sm:btn-md relative"
        >
          <svg
            viewBox="0 0 1024 1024"
            width="18"
            height="18"
            xmlns="http://www.w3.org/2000/svg"
            fill={isFavoriteActive ? "#F44336" : "white"}
            stroke="white"
            strokeWidth="60"
          >
            <path d="M725.333333 192c-89.6 0-168.533333 44.8-213.333333 115.2C467.2 236.8 388.266667 192 298.666667 192 157.866667 192 42.666667 307.2 42.666667 448c0 253.866667 469.333333 512 469.333333 512s469.333333-256 469.333333-512c0-140.8-115.2-256-256-256z" />
          </svg>
          {favoritesCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-amber-400 text-black text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
              {favoritesCount}
            </span>
          )}
        </Link>
        <Link href="/cart" className="btn btn-ghost btn-sm sm:btn-md relative">
          <svg
            viewBox="0 0 32 32"
            width="18"
            height="18"
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
          >
            <path d="M10,25 C11.104,25 12,25.896 12,27 C12,28.104 11.104,29 10,29 C8.896,29 8,28.104 8,27 C8,25.896 8.896,25 10,25 L10,25 Z M6,27 C6,29.209 7.791,31 10,31 C12.209,31 14,29.209 14,27 C14,24.791 12.209,23 10,23 C7.791,23 6,24.791 6,27 L6,27 Z M8,21 C6.896,21 6,20.104 6,19 C6,19 29,17 28.972,17.097 C29.482,15.2 31.979,4.223 32,4 C32.054,3.45 31.553,3 31,3 L6,3 L6,1 L7,1 C7.553,1 8,0.553 8,0 C8,-0.552 7.553,-1 7,-1 L1,-1 C0.447,-1 0,-0.552 0,0 C0,0.553 0.447,1 1,1 L4,1 L4,19 C4,21.209 5.791,23 8,23 L31,23 C31.031,23 31,22.009 31,21 L8,21 L8,21 Z M22,25 C23.104,25 24,25.896 24,27 C24,28.104 23.104,29 22,29 C20.896,29 20,28.104 20,27 C20,25.896 20.896,25 22,25 L22,25 Z M18,27 C18,29.209 19.791,31 22,31 C24.209,31 26,29.209 26,27 C26,24.791 24.209,23 22,23 C19.791,23 18,24.791 18,27 L18,27 Z" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-amber-400 text-black text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
};
