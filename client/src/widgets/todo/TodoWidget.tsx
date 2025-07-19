import { Card } from "@heroui/react";
import { Button } from "@heroui/react";
import clsx from "clsx";

export default function TodoWidget() {
  return (
    <Card
      className={clsx(
        // Background
        "bg-white",
        // Styling
        "rounded-xl",
        // Spacing
        "p-4",
      )}
    >
      <div
        className={clsx(
          // Layout
          "flex items-center justify-between",
          // Spacing
          "mb-3",
        )}
      >
        <div
          className={clsx(
            // Layout
            "flex items-center",
            // Spacing
            "gap-2",
          )}
        >
          <span
            className={clsx(
              // Typography
              "text-lg",
            )}
          >
            📋
          </span>
          <span
            className={clsx(
              // Typography
              "text-sm font-medium text-gray-700",
            )}
          >
            وظایف امروز
          </span>
        </div>
        <div
          className={clsx(
            // Layout
            "flex items-center",
            // Spacing
            "gap-2",
            // Typography
            "text-xs",
          )}
        >
          <Button
            className={clsx(
              // Colors
              "text-gray-500",
              // Interactions
              "hover:text-blue-500",
              // Effects
              "transition",
            )}
            variant="light"
          >
            <span>📅 لیست امروز</span>
          </Button>
          <Button
            className={clsx(
              // Colors
              "text-gray-500",
              // Interactions
              "hover:text-blue-500",
              // Effects
              "transition",
            )}
            variant="light"
          >
            <span>⚙️</span>
          </Button>
        </div>
      </div>

      <div
        className={clsx(
          // Layout
          "flex-1 flex flex-col items-center justify-center text-center",
          // Spacing
          "px-4",
        )}
      >
        <div
          className={clsx(
            // Typography
            "text-sm text-gray-600",
            // Spacing
            "mb-2",
          )}
        >
          وظایف‌ای برای این روز وجود ندارد.
        </div>
        <div
          className={clsx(
            // Typography
            "text-xs text-gray-400",
          )}
        >
          یک وظیفه جدید اضافه کنید.
        </div>
      </div>

      <Button
        className={clsx(
          // Layout
          "w-full flex items-center justify-center",
          // Background
          "bg-gray-50",
          // Styling
          "rounded-lg",
          // Colors
          "text-gray-600",
          // Spacing
          "py-2 gap-2",
          // Typography
          "text-sm font-medium",
          // Interactions
          "hover:bg-gray-100",
          // Effects
          "transition-colors",
        )}
        variant="light"
      >
        <span
          className={clsx(
            // Typography
            "text-lg",
          )}
        >
          +
        </span>
        <span>...عنوان وظیفه جدید</span>
      </Button>
    </Card>
  );
}
