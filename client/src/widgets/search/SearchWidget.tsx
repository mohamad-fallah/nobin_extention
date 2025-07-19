import { Button } from "@heroui/react";
import { FiSearch, FiBookmark } from "react-icons/fi";
import clsx from "clsx";

export default function SearchWidget() {
  return (
    <div
      className={clsx(
        // Layout & Position
        "relative",
        // Styling
        "rounded-2xl",
      )}
      style={{
        minHeight: "200px",
      }}
    >
      {/* Search Bar */}
      <div
        className={clsx(
          // Layout & Position
          "relative",
          // Spacing
          "mb-6",
        )}
      >
        <input
          className={clsx(
            // Layout
            "w-full",
            // Styling
            "rounded-full bg-white",
            // Spacing
            "px-6 py-3",
            // Typography
            "text-sm placeholder-gray-400",
            // Interactions
            "focus:outline-none focus:ring-2 focus:ring-white/50",
          )}
          placeholder="جستجو ..."
          dir="rtl"
        />
        <span
          className={clsx(
            // Position
            "absolute left-4 top-1/2",
            // Transform
            "transform -translate-y-1/2",
            // Colors
            "text-gray-400",
          )}
        >
          <FiSearch size={20} />
        </span>
      </div>

      {/* Bookmarks Grid - 2 rows of 6 */}
      <div
        className={clsx(
          // Layout
          "grid grid-cols-6",
          // Spacing
          "gap-3 mb-2",
        )}
      >
        {[...Array(12)].map((_, i) => (
          <Button
            key={i}
            className={clsx(
              // Size
              "w-16 h-16",
              // Background
              "bg-white/90",
              // Effects
              "backdrop-blur-sm shadow-lg",
              // Layout
              "flex items-center justify-center",
              // Styling
              "rounded-2xl",
              // Interactions
              "hover:bg-white hover:scale-105",
              // Transitions
              "transition-all duration-200",
            )}
            variant="light"
          >
            <span
              className={clsx(
                // Colors
                "text-gray-400",
              )}
            >
              <FiBookmark size={28} />
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
}
