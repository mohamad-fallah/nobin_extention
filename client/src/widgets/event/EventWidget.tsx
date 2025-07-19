import clsx from "clsx";

export default function EventWidget() {
  return (
    <div
      className={clsx(
        // Layout
        "flex flex-col",
        // Size
        "min-w-[220px]",
        // Background
        "bg-white/80",
        // Styling
        "rounded-2xl shadow",
        // Spacing
        "p-6",
      )}
    >
      <div
        className={clsx(
          // Layout
          "flex items-center",
          // Spacing
          "mb-4",
        )}
      >
        <span
          className={clsx(
            // Typography
            "text-lg font-bold",
            // Spacing
            "ml-2",
          )}
        >
          مناسبت روز
        </span>
      </div>
      <div
        className={clsx(
          // Typography
          "text-gray-700 text-sm",
        )}
      >
        روز بهزیستی و تامین اجتماعی
      </div>
    </div>
  );
}
