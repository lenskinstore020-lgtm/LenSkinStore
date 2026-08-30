"use client";

import Link from "next/link";
import { useCart } from "@/lib/useCart";
import { useFavorites } from "@/lib/useFavorites";

export const NavMenu = () => {
  const cart = useCart();
  const favorites = useFavorites();

  return (
    <div className=" flex justify-between place-content-center bg-[#2C2C2C] shadow-sm w-full min-h-16 sm:min-h-20 md:min-h-28 px-2 sm:px-4 md:px-6 flex-wrap">
      <div className="">
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

      <div className=" flex justify-center overflow-hidden">
        <Link
          href="/"
          className="yesteryearFont text-2xl sm:text-4xl md:text-7xl  ml-2 text-white "
        >
          Lén skin store
        </Link>
      </div>

      <div className="navbar-end gap-1 sm:gap-2 w-auto">
        <Link
          href="/favorites"
          className="btn btn-ghost btn-sm sm:btn-md text-white text-[13px] sm:text-[15px] md:text-[17px] px-1 sm:px-3 relative"
        >
          <span>♥</span>
          {favorites.loaded && favorites.items.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-amber-400 text-black text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
              {favorites.items.length}
            </span>
          )}
        </Link>
        <Link
          href="/cart"
          className="btn btn-ghost btn-sm sm:btn-md text-white text-[13px] sm:text-[15px] md:text-[17px] px-1 sm:px-3 relative"
        >
          <span>🛒</span>
          {cart.loaded && cart.totalCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-amber-400 text-black text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
              {cart.totalCount}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
};
