import { useState, useCallback } from "react";
import clsx from "clsx";

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

  const baseClasses = clsx(
    // Size (dynamic based on prop)
    sizeClasses[size],
    // Shape & Layout
    "rounded-full flex items-center justify-center",
    // Overflow & Position
    "overflow-hidden relative",
    // Effects
    "transition-all duration-200",
    // Additional classes from props
    className,
  );

  const fallbackClasses = clsx(
    // Size & Layout
    "w-full h-full flex items-center justify-center",
    // Background
    "bg-gradient-to-br from-gray-400 to-gray-600",
    // Typography
    "text-white font-semibold",
    // Additional classes from props
    fallbackClassName,
  );

  const shouldShowFallback = !src || imageError || !imageLoaded;

  return (
    <div className={baseClasses}>
      {src && !imageError && (
        <img
          src={src}
          alt={alt}
          className={clsx(
            // Size & Shape
            "w-full h-full rounded-full",
            // Image styling
            "object-cover",
          )}
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
