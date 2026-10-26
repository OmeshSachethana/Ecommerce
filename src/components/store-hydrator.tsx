"use client";

import { useEffect } from "react";
import { useShop } from "@/store/shop";

export function StoreHydrator() {
  useEffect(() => {
    void useShop.persist.rehydrate();
  }, []);
  return null;
}
