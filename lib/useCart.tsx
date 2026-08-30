"use client";

import { useEffect, useState, useCallback } from "react";

export interface CartItem {
  docId: string;
  quantity: number;
}

function readCart(): CartItem[] {
  try {
    const raw = localStorage.getItem("cart");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeCart(items: CartItem[]) {
  localStorage.setItem("cart", JSON.stringify(items));
  window.dispatchEvent(
    new CustomEvent("local-storage-list-change", { detail: { key: "cart" } }),
  );
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setItems(readCart());
    setLoaded(true);

    const handleChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ key: string }>;
      if (customEvent.detail?.key === "cart") {
        setItems(readCart());
      }
    };

    window.addEventListener("local-storage-list-change", handleChange);
    return () => {
      window.removeEventListener("local-storage-list-change", handleChange);
    };
  }, []);

  const addToCart = useCallback((docId: string) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.docId === docId);
      const next = existing
        ? prev.map((i) =>
            i.docId === docId ? { ...i, quantity: i.quantity + 1 } : i,
          )
        : [...prev, { docId, quantity: 1 }];
      writeCart(next);
      return next;
    });
  }, []);

  const removeFromCart = useCallback((docId: string) => {
    setItems((prev) => {
      const next = prev.filter((i) => i.docId !== docId);
      writeCart(next);
      return next;
    });
  }, []);

  const updateQuantity = useCallback((docId: string, quantity: number) => {
    setItems((prev) => {
      const next =
        quantity <= 0
          ? prev.filter((i) => i.docId !== docId)
          : prev.map((i) => (i.docId === docId ? { ...i, quantity } : i));
      writeCart(next);
      return next;
    });
  }, []);

  const inCart = useCallback(
    (docId: string) => items.some((i) => i.docId === docId),
    [items],
  );

  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return {
    items,
    loaded,
    addToCart,
    removeFromCart,
    updateQuantity,
    inCart,
    totalCount,
  };
}
