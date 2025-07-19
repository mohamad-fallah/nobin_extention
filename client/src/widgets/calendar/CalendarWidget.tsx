import { Card } from "@heroui/react";
import { Button } from "@heroui/react";
import clsx from "clsx";

export default function CalendarWidget() {
  // تقویم تیرماه ۱۴۰۴
  const days = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
  const dates = [
    ["۳۰", "۳۱", "۱", "۲", "۳", "۴", "۵"],
    ["۶", "۷", "۸", "۹", "۱۰", "۱۱", "۱۲"],
    ["۱۳", "۱۴", "۱۵", "۱۶", "۱۷", "۱۸", "۱۹"],
    ["۲۰", "۲۱", "۲۲", "۲۳", "۲۴", "۲۵", "۲۶"],
    ["۲۷", "۲۸", "۲۹", "۳۰", "۳۱", "۱", "۲"],
  ];

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
          "mb-2",
        )}
      >
        <div
          className={clsx(
            // Layout
            "flex items-center",
            // Spacing
            "gap-1",
          )}
        >
          <Button
            className={clsx(
              // Colors
              "text-blue-500",
              // Typography
              "text-sm",
              // Spacing
              "p-1",
            )}
            variant="light"
          >
            <span>📅</span>
          </Button>
          <Button
            className={clsx(
              // Colors
              "text-gray-400",
              // Typography
              "text-sm",
              // Spacing
              "p-1",
            )}
            variant="light"
          >
            <span>👥</span>
          </Button>
          <Button
            className={clsx(
              // Colors
              "text-gray-400",
              // Typography
              "text-sm",
              // Spacing
              "p-1",
            )}
            variant="light"
          >
            <span>📊</span>
          </Button>
        </div>
        <span
          className={clsx(
            // Typography
            "text-xs font-medium text-gray-700",
          )}
        >
          چهارشنبه، ۲۵ تیر ۱۴۰۴
        </span>
      </div>

      <div
        className={clsx(
          // Layout
          "text-center",
          // Spacing
          "mb-2",
        )}
      >
        <div
          className={clsx(
            // Layout
            "flex items-center justify-between",
            // Spacing
            "px-2 mb-1",
          )}
        >
          <span
            className={clsx(
              // Typography
              "text-xs text-gray-400",
              // Interactions
              "cursor-pointer",
            )}
          >
            خرداد
          </span>
          <span
            className={clsx(
              // Typography
              "text-sm font-medium",
            )}
          >
            تیر
          </span>
          <span
            className={clsx(
              // Typography
              "text-xs text-gray-400",
              // Interactions
              "cursor-pointer",
            )}
          >
            مرداد
          </span>
        </div>
        <div
          className={clsx(
            // Typography
            "text-xs text-gray-500",
          )}
        >
          مناسبت روز امروز
        </div>
        <div
          className={clsx(
            // Typography
            "text-xs text-gray-600",
          )}
        >
          روز بهزیستی و تامین اجتماعی
        </div>
      </div>

      <div
        className={clsx(
          // Layout
          "grid grid-cols-7 flex-1 text-center",
          // Typography
          "text-xs",
          // Spacing
          "gap-0.5 px-1",
        )}
      >
        {/* Header */}
        {days.map((day, i) => (
          <div
            key={i}
            className={clsx(
              // Typography
              "text-gray-500 text-xs font-medium",
              // Spacing
              "pb-1",
            )}
          >
            {day}
          </div>
        ))}

        {/* Dates */}
        {dates.map((week, weekIndex) =>
          week.map((day, dayIndex) => {
            const isToday = day === "۲۵";
            const isPrevMonth =
              (weekIndex === 0 && parseInt(day) > 20) || (weekIndex === 4 && parseInt(day) < 10);
            const isHoliday = day === "۱۳" || day === "۲۰" || day === "۲۷";

            return (
              <div
                key={`${weekIndex}-${dayIndex}`}
                className={clsx(
                  // Base Layout & Size
                  "py-1 px-1 min-h-[20px]",
                  "flex items-center justify-center",
                  // Styling
                  "rounded cursor-pointer",
                  // Typography
                  "text-xs",
                  // Conditional Styling
                  {
                    // Today
                    "bg-blue-500 text-white font-bold": isToday,
                    // Previous month
                    "text-gray-300": isPrevMonth && !isToday,
                    // Holiday
                    "text-red-500": isHoliday && !isToday && !isPrevMonth,
                    // Normal hover
                    "hover:bg-gray-100": !isToday && !isPrevMonth,
                  },
                )}
              >
                {day}
              </div>
            );
          }),
        )}
      </div>

      <div
        className={clsx(
          // Layout
          "flex items-center justify-center",
          // Spacing
          "mt-2 pt-2 gap-4",
          // Styling
          "border-t",
          // Typography
          "text-xs",
        )}
      >
        <Button
          className={clsx(
            // Layout
            "flex items-center",
            // Spacing
            "gap-1",
            // Colors
            "text-gray-600",
            // Interactions
            "hover:text-blue-600",
            // Effects
            "transition",
          )}
          variant="light"
        >
          <span>📋</span>
          <span>وظیفه</span>
        </Button>
        <Button
          className={clsx(
            // Layout
            "flex items-center",
            // Spacing
            "gap-1",
            // Colors
            "text-gray-600",
            // Interactions
            "hover:text-blue-600",
            // Effects
            "transition",
          )}
          variant="light"
        >
          <span>📅</span>
          <span>رویداد</span>
        </Button>
      </div>
    </Card>
  );
}
