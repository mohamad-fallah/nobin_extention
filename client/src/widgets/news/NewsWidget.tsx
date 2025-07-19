import clsx from "clsx";

export default function NewsWidget() {
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
          اخبار
        </span>
      </div>
      <ul
        className={clsx(
          // Typography
          "text-sm text-gray-700",
          // Spacing
          "space-y-1",
        )}
      >
        <li>قیمت دلار افزایش یافت.</li>
        <li>آب و هوای تهران آفتابی است.</li>
        <li>بورس امروز مثبت بود.</li>
      </ul>
    </div>
  );
}
