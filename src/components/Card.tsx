import type { PropsWithChildren } from "react";

interface CardProps extends PropsWithChildren {
  className?: string;
  height?: string;
}

export default function Card({ children, className = "", height }: CardProps) {
  return (
    <div
      className={`rounded-xl bg-white shadow-lg p-4 h-[${height || "auto"}] flex flex-col overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}
