import { useEffect, useState } from "react";

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
    <div className="rounded-2xl bg-white/80 shadow p-6 flex flex-col items-center justify-center text-center">
      <div className="text-4xl font-bold text-blue-600">{time}</div>
      <div className="mt-2 text-lg text-gray-700">{date}</div>
      <div className="mt-1 text-sm text-gray-500">تهران</div>
    </div>
  );
}
