"use client";

import { useEffect } from "react";
import { addToRecentlyViewed } from "./recently-viewed";

interface Props {
  slug: string;
  name: string;
  image: string;
  price: number;
}

export function RecentlyViewedTracker({ slug, name, image, price }: Props) {
  useEffect(() => {
    addToRecentlyViewed({ slug, name, image, price });
  }, [slug, name, image, price]);

  return null;
}
