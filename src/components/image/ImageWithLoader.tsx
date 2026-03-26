"use client";

import Image from "next/image";
import { useState } from "react";
import { Skeleton } from "../loading/Skeleton";

type Props = {
  src: string;
  alt: string;
  priority?: boolean;
};

export default function ImageWithLoader({ src, alt, priority = true }: Props) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative w-30 md:w-40 h-full overflow-hidden rounded-lg">
      {/* Loader */}
      {loading && (
        <Skeleton width="w-full" height="h-full" rounded="rounded-lg" />
      )}

      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className={`object-contain transition-opacity duration-300 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
  );
}
