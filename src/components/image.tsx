import React from "react";

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
  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="object-cover"
      />
    </div>
  );
};

export default Image;
