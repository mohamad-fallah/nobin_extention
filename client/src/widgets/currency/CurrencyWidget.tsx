import { Card } from "@heroui/react";
import { Button } from "@heroui/react";
import clsx from "clsx";

const currencies = [
  { name: "US Dollar", code: "USD", value: "۸۸,۸۰۰", icon: "🇺🇸", trend: "up" },
  { name: "Euro", code: "EUR", value: "۱۰۲,۹۰۰", icon: "🇪🇺", trend: "up" },
  { name: "Gram", code: "GRAM", value: "۷۱,۰۷۲,۰۰۰", icon: "🟡", trend: "up" },
];

export default function CurrencyWidget() {
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
            📊
          </span>
          <span
            className={clsx(
              // Typography
              "text-sm font-medium text-gray-700",
            )}
          >
            اخبار
          </span>
        </div>
        <Button
          className={clsx(
            // Background & Colors
            "bg-blue-500 text-white",
            // Spacing
            "px-2 py-1 gap-1",
            // Styling
            "rounded-md",
            // Typography
            "text-xs",
            // Layout
            "flex items-center",
            // Interactions
            "hover:bg-blue-600",
            // Effects
            "transition",
          )}
          variant="solid"
        >
          <span>🔄</span>
          <span>نرخ ارز</span>
        </Button>
      </div>

      <div
        className={clsx(
          // Layout
          "flex-1 overflow-y-auto",
          // Spacing
          "space-y-2",
        )}
      >
        {currencies.map((item) => (
          <div
            key={item.code}
            className={clsx(
              // Layout
              "flex items-center justify-between",
              // Spacing
              "px-1",
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
                {item.icon}
              </span>
              <div
                className={clsx(
                  // Layout
                  "min-w-0 flex-1",
                )}
              >
                <span
                  className={clsx(
                    // Typography
                    "text-sm font-medium",
                    // Display
                    "block truncate",
                  )}
                >
                  {item.name}
                </span>
                <span
                  className={clsx(
                    // Typography
                    "text-xs text-gray-500",
                  )}
                >
                  {item.code}
                </span>
              </div>
            </div>
            <div
              className={clsx(
                // Layout
                "text-right flex-shrink-0",
              )}
            >
              <span
                className={clsx(
                  // Typography
                  "font-bold text-xs",
                  // Display
                  "block",
                )}
              >
                {item.value}
              </span>
              <span
                className={clsx(
                  // Typography
                  "text-xs",
                  // Conditional Colors
                  {
                    "text-green-500": item.trend === "up",
                    "text-red-500": item.trend === "down",
                  },
                )}
              >
                {item.trend === "up" ? "↑" : "↓"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
