"use client";

import { useLocalStorageList } from "./useLocalStorageList";

export function useFavorites() {
  return useLocalStorageList("favorites");
}
