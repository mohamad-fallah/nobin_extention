export default function ProfileWidget() {
  return (
    <div className="rounded-2xl bg-white/80 shadow p-6 flex flex-col min-w-[220px]">
      <div className="flex items-center mb-2">
        <span className="text-lg font-bold ml-2">سلام 👋</span>
      </div>
      <div className="text-gray-500 text-sm mb-2">اعلانی برای نمایش وجود ندارد.</div>
      <div className="text-xs text-gray-400">اعلان های ایمیل و رژیم کودکان و ... را می‌بینی.</div>
      <div className="mt-2 text-xs text-gray-500">🍔 غذا! بده</div>
      <div className="mt-2 text-2xl">🐱</div>
    </div>
  );
}
