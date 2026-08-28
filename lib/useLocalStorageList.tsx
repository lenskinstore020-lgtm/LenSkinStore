"use client";

import { useEffect, useState, useCallback } from "react";

export function useLocalStorageList(key: string) {
  const [items, setItems] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      setItems(raw ? JSON.parse(raw) : []);
    } catch {
      setItems([]);
    }
    setLoaded(true);
  }, [key]);

  const add = useCallback(
    (docId: string) => {
      setItems((prev) => {
        if (prev.includes(docId)) return prev;
        const next = [...prev, docId];
        localStorage.setItem(key, JSON.stringify(next));
        return next;
      });
    },
    [key],
  );

  const remove = useCallback(
    (docId: string) => {
      setItems((prev) => {
        const next = prev.filter((id) => id !== docId);
        localStorage.setItem(key, JSON.stringify(next));
        return next;
      });
    },
    [key],
  );

  const toggle = useCallback(
    (docId: string) => {
      setItems((prev) => {
        const next = prev.includes(docId)
          ? prev.filter((id) => id !== docId)
          : [...prev, docId];
        localStorage.setItem(key, JSON.stringify(next));
        return next;
      });
    },
    [key],
  );

  const has = useCallback((docId: string) => items.includes(docId), [items]);

  return { items, loaded, add, remove, toggle, has };
}
