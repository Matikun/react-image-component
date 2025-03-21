import React, { useState, useEffect, useRef } from "react";

interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  quality?: number;
  placeholder?: string; // Base64 blurred image
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  className = "",
  quality = 75,
  placeholder,
}) => {
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

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

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  const optimizedSrc = isInView
    ? `${src}${src.includes("?") ? "&" : "?"}quality=${quality}`
    : "";

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {placeholder && !isLoaded && (
        <div
          className="absolute inset-0 bg-cover bg-center blur-sm"
          style={{ backgroundImage: `url(${placeholder})` }}
        />
      )}
      <img
        ref={imgRef}
        src={optimizedSrc}
        alt={alt}
        width={width}
        height={height}
        className="object-cover max-w-full h-auto"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};

export default Image;
