import React, { useState, useEffect, useRef } from "react";

interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  className = "",
}) => {
  const [isInView, setIsInView] = useState(false);
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

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <img
        ref={imgRef}
        src={isInView ? src : ""}
        alt={alt}
        width={width}
        height={height}
        className="object-cover"
        loading="lazy"
      />
    </div>
  );
};

export default Image;
