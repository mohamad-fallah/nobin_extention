import type { PropsWithChildren } from "react";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div
      className="min-h-screen w-full relative overflow-hidden flex flex-col"
      style={{
        background: "linear-gradient(180deg, #5b63d3 0%, #9ca1f9 100%)",
      }}
    >
      {/* Background Tower Image */}
      <div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-0"
        style={{
          width: "300px",
          height: "400px",
          backgroundImage: "url('/images/background/tower.svg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center bottom",
          backgroundSize: "contain",
          opacity: 0.3,
        }}
      />

      {/* Header */}
      <header className="relative z-10 w-full flex items-center justify-between py-4 px-8">
        {/* دکمه‌های عملکرد */}
        <div className="flex items-center gap-2">
          <button className="w-9 h-9 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center text-gray-700 text-sm transition shadow-sm">
            <span>−</span>
          </button>
          <button className="w-9 h-9 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center text-gray-700 text-sm transition shadow-sm">
            <span>▢</span>
          </button>
          <button className="w-9 h-9 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center text-gray-700 text-sm transition shadow-sm">
            <span>⚙</span>
          </button>
          <button className="w-9 h-9 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center text-gray-700 text-sm transition shadow-sm">
            <span>🔍</span>
          </button>
          <button className="w-9 h-9 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center text-gray-700 text-sm transition shadow-sm">
            <span>👥</span>
          </button>
        </div>

        {/* لوگو و نام */}
        <div className="flex items-center gap-2">
          <span className="text-white text-lg font-semibold">ویجت‌گاه</span>
          <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm">
            <span className="text-blue-600 text-lg font-bold">W</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 w-full max-w-6xl mx-auto px-8 pb-8">{children}</main>
    </div>
  );
}
