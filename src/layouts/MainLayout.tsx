import type { PropsWithChildren } from "react";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url(/images/background/brand/ChatGPT Image Jul 18, 2025, 12_02_16 PM.png)",
      }}
    >
      <div className="w-full max-w-7xl p-4 grid grid-cols-4 gap-6">{children}</div>
    </div>
  );
}
