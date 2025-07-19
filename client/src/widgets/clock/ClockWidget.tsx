import { useEffect, useState } from "react";
import clsx from "clsx";

function getTime() {
  const now = new Date();
  return now.toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" });
}

function getDate() {
  const now = new Date();
  return now.toLocaleDateString("fa-IR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ClockWidget() {
  const [time, setTime] = useState(getTime());
  const [date, setDate] = useState(getDate());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getTime());
      setDate(getDate());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={clsx(
        // Layout
        "flex flex-col items-center justify-center text-center",
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
          // Typography
          "text-4xl font-bold text-blue-600",
        )}
      >
        {time}
      </div>
      <div
        className={clsx(
          // Typography
          "text-lg text-gray-700",
          // Spacing
          "mt-2",
        )}
      >
        {date}
      </div>
      <div
        className={clsx(
          // Typography
          "text-sm text-gray-500",
          // Spacing
          "mt-1",
        )}
      >
        تهران
      </div>
    </div>
  );
}
