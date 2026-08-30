"use client";

import { useEffect, useState, useCallback } from "react";

function readFromStorage(key: string): string[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeToStorage(key: string, items: string[]) {
  localStorage.setItem(key, JSON.stringify(items));
  window.dispatchEvent(
    new CustomEvent("local-storage-list-change", { detail: { key } }),
  );
}

export function useLocalStorageList(key: string) {
  const [items, setItems] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setItems(readFromStorage(key));
    setLoaded(true);

    const handleChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ key: string }>;
      if (customEvent.detail?.key === key) {
        setItems(readFromStorage(key));
      }
    };

    window.addEventListener("local-storage-list-change", handleChange);
    return () => {
      window.removeEventListener("local-storage-list-change", handleChange);
    };
  }, [key]);

  const add = useCallback(
    (docId: string) => {
      setItems((prev) => {
        if (prev.includes(docId)) return prev;
        const next = [...prev, docId];
        writeToStorage(key, next);
        return next;
      });
    },
    [key],
  );

  const remove = useCallback(
    (docId: string) => {
      setItems((prev) => {
        const next = prev.filter((id) => id !== docId);
        writeToStorage(key, next);
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
        writeToStorage(key, next);
        return next;
      });
    },
    [key],
  );

  const has = useCallback((docId: string) => items.includes(docId), [items]);

  return { items, loaded, add, remove, toggle, has };
}
