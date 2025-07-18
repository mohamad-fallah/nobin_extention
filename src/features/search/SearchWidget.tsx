export default function SearchWidget() {
  return (
    <div className="rounded-2xl bg-white/80 shadow p-6 flex flex-col min-w-[220px]">
      <input
        className="w-full rounded bg-gray-100 px-3 py-2 mb-4 text-sm focus:outline-none"
        placeholder="جستجو..."
        dir="rtl"
      />
      <div className="grid grid-cols-4 gap-2">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="h-10 bg-gray-200 rounded flex items-center justify-center text-gray-400"
          >
            <span className="text-lg">🔖</span>
          </div>
        ))}
      </div>
    </div>
  );
}
