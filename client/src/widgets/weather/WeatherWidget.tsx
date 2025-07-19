import { Card } from "@heroui/react";
import { Button } from "@heroui/react";
import clsx from "clsx";

export default function WeatherWidget() {
  return (
    <Card
      className={clsx(
        // Background & Layout
        "bg-white justify-between",
        // Styling
        "rounded-xl",
        // Spacing
        "p-4",
      )}
      style={{ height: "200px" }}
    >
      <div
        className={clsx(
          // Layout
          "flex items-center justify-between",
        )}
      >
        <div>
          <div
            className={clsx(
              // Typography
              "text-xs text-gray-500",
              // Spacing
              "mb-1",
            )}
          >
            چهارشنبه
          </div>
          <div
            className={clsx(
              // Layout
              "flex items-baseline",
              // Spacing
              "gap-2",
            )}
          >
            <span
              className={clsx(
                // Typography
                "text-4xl font-bold text-blue-600",
              )}
            >
              20
            </span>
            <span
              className={clsx(
                // Typography
                "text-lg text-gray-400",
              )}
            >
              10
            </span>
          </div>
          <div
            className={clsx(
              // Typography
              "text-sm text-gray-600",
              // Spacing
              "mt-1",
            )}
          >
            تهران
          </div>
        </div>

        <div
          className={clsx(
            // Layout
            "text-center",
          )}
        >
          <div
            className={clsx(
              // Typography
              "text-3xl font-bold text-blue-600",
              // Spacing
              "mb-1",
            )}
          >
            25
          </div>
          <div
            className={clsx(
              // Typography
              "text-xs text-gray-500",
            )}
          >
            تیر ۱۴۰۴
          </div>
        </div>
      </div>

      <div
        className={clsx(
          // Layout
          "flex items-center justify-between",
        )}
      >
        <div
          className={clsx(
            // Typography
            "text-xs text-gray-400",
          )}
        >
          <span>☁️ کوک کندز</span>
        </div>
        <Button
          className={clsx(
            // Background & Colors
            "bg-blue-500 text-white",
            // Spacing
            "px-2 py-1",
            // Styling
            "rounded-md",
            // Typography
            "text-xs",
            // Layout
            "flex items-center",
            // Spacing
            "gap-1",
            // Interactions
            "hover:bg-blue-600",
            // Effects
            "transition",
          )}
          variant="solid"
        >
          <span>🌤️</span>
          <span>پیش بینی</span>
        </Button>
      </div>

      <div
        className={clsx(
          // Layout
          "text-center",
        )}
      >
        <a
          href="#"
          className={clsx(
            // Typography
            "text-xs text-blue-500",
            // Layout
            "inline-flex items-center",
            // Spacing
            "gap-1",
            // Interactions
            "hover:underline",
          )}
        >
          <span>📡</span>
          <span>فیدبک برای ما مهمه!</span>
        </a>
      </div>
    </Card>
  );
}
