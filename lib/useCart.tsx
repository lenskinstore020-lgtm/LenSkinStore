"use client";

import { useEffect, useState, useCallback } from "react";

export interface CartItem {
  docId: string;
  quantity: number;
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("cart");
      setItems(raw ? JSON.parse(raw) : []);
    } catch {
      setItems([]);
    }
    setLoaded(true);
  }, []);

  const addToCart = useCallback((docId: string) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.docId === docId);
      const next = existing
        ? prev.map((i) =>
            i.docId === docId ? { ...i, quantity: i.quantity + 1 } : i,
          )
        : [...prev, { docId, quantity: 1 }];
      localStorage.setItem("cart", JSON.stringify(next));
      return next;
    });
  }, []);

  const removeFromCart = useCallback((docId: string) => {
    setItems((prev) => {
      const next = prev.filter((i) => i.docId !== docId);
      localStorage.setItem("cart", JSON.stringify(next));
      return next;
    });
  }, []);

  const updateQuantity = useCallback((docId: string, quantity: number) => {
    setItems((prev) => {
      const next =
        quantity <= 0
          ? prev.filter((i) => i.docId !== docId)
          : prev.map((i) => (i.docId === docId ? { ...i, quantity } : i));
      localStorage.setItem("cart", JSON.stringify(next));
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
