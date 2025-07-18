interface AvatarProps {
  src?: string;
  text?: string;
  size?: "sm" | "md" | "lg";
  alt?: string;
  className?: string;
}

const sizeMap = {
  sm: "w-8 h-8 text-base",
  md: "w-12 h-12 text-xl",
  lg: "w-16 h-16 text-2xl",
};

export default function Avatar({ src, text, size = "md", alt = "", className = "" }: AvatarProps) {
  const sizeClass = sizeMap[size] || sizeMap.md;
  const fallback = text ? text[0].toUpperCase() : "?";

  return (
    <div
      className={`rounded-full bg-gray-200 flex items-center justify-center overflow-hidden aspect-square ${sizeClass} ${className}`}
    >
      {src ? (
        <img src={src} alt={alt || fallback} className="object-cover w-full h-full" />
      ) : (
        <span className="font-bold text-blue-600 select-none">{fallback}</span>
      )}
    </div>
  );
}
