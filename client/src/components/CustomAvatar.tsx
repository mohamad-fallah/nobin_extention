import { useState, useCallback } from "react";

interface CustomAvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showFallback?: boolean;
  fallbackClassName?: string;
}

const sizeClasses = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-16 h-16 text-lg",
};

export default function CustomAvatar({
  src,
  alt = "",
  name = "",
  size = "md",
  className = "",
  showFallback = true,
  fallbackClassName = "",
}: CustomAvatarProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = useCallback(() => {
    setImageError(true);
    setImageLoaded(false);
  }, []);

  const handleImageLoad = useCallback(() => {
    setImageError(false);
    setImageLoaded(true);
  }, []);

  // Get initials from name
  const getInitials = (name: string) => {
    if (!name) return "?";
    const words = name.split(" ");
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }
    return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
  };

  const baseClasses = `
    ${sizeClasses[size]}
    rounded-full
    flex
    items-center
    justify-center
    overflow-hidden
    relative
    transition-all
    duration-200
    ${className}
  `
    .trim()
    .replace(/\s+/g, " ");

  const fallbackClasses = `
    w-full
    h-full
    flex
    items-center
    justify-center
    bg-gradient-to-br
    from-gray-400
    to-gray-600
    text-white
    font-semibold
    ${fallbackClassName}
  `
    .trim()
    .replace(/\s+/g, " ");

  const shouldShowFallback = !src || imageError || !imageLoaded;

  return (
    <div className={baseClasses}>
      {src && !imageError && (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover rounded-full"
          onError={handleImageError}
          onLoad={handleImageLoad}
          style={{
            opacity: imageLoaded ? 1 : 0,
            transition: "opacity 0.2s ease-in-out",
          }}
        />
      )}

      {shouldShowFallback && showFallback && (
        <div
          className={fallbackClasses}
          style={{
            position: src ? "absolute" : "static",
            top: src ? 0 : "auto",
            left: src ? 0 : "auto",
            opacity: shouldShowFallback ? 1 : 0,
          }}
        >
          {name ? getInitials(name) : alt ? getInitials(alt) : "?"}
        </div>
      )}
    </div>
  );
}
