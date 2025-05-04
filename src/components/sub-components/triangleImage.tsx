"use client";

import Image from "next/image";

interface TriangleImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export default function TriangleImage({
  src,
  alt,
  className = "",
  priority = false,
}: TriangleImageProps) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Main Image */}
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        fill
        className={`object-cover ${className}`}
        priority={priority}
      />

      {/* White Triangle Overlay - Pointing Down */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          className="w-full"
          height="80"
          preserveAspectRatio="none"
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0L520 80L1440 0V80H0V0Z" fill="white" />
        </svg>
      </div>
    </div>
  );
}
