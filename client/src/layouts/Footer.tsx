import clsx from "clsx";

export default function Footer() {
  return (
    <footer
      className={clsx(
        // Position & Layout
        "relative z-10 w-full",
        "flex items-center justify-center",
        // Spacing
        "py-4 px-8",
        // Typography
        "text-xs text-white",
      )}
    >
      © 2025 نوبین. همه حقوق محفوظ است.
    </footer>
  );
}
