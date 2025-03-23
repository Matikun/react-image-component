import React, { useState, useEffect, useRef } from "react";

interface ImageProps {
  src: string; // Fallback (e.g., JPEG)
  alt: string;
  width: number;
  height: number;
  className?: string;
  quality?: number;
  webpSrc?: string; // Optional WebP version
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  className = "",
  quality = 75,
  webpSrc,
}) => {
  const [isInView, setIsInView] = useState(false);
  const pictureRef = useRef<HTMLPictureElement | null>(null);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px" }
    );

    if (pictureRef.current) {
      observer.observe(pictureRef.current);
    }

    return () => {
      if (pictureRef.current) {
        observer.unobserve(pictureRef.current);
      }
    };
  }, []);

  const optimizedSrc = isInView
    ? `${src}${src.includes("?") ? "&" : "?"}quality=${quality}`
    : "";
  const optimizedWebpSrc =
    webpSrc && isInView
      ? `${webpSrc}${webpSrc.includes("?") ? "&" : "?"}quality=${quality}`
      : "";

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <picture ref={pictureRef}>
        {webpSrc && (
          <source
            srcSet={optimizedWebpSrc}
            type="image/webp"
            width={width}
            height={height}
          />
        )}
        <img
          src={optimizedSrc}
          alt={alt}
          width={width}
          height={height}
          className="object-cover max-w-full h-auto"
          loading="lazy"
        />
      </picture>
    </div>
  );
};

export default Image;
