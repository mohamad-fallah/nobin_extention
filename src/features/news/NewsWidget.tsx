export default function NewsWidget() {
  return (
    <div className="rounded-2xl bg-white/80 shadow p-6 flex flex-col min-w-[220px]">
      <div className="flex items-center mb-4">
        <span className="text-lg font-bold ml-2">اخبار</span>
      </div>
      <ul className="text-sm text-gray-700 space-y-1">
        <li>قیمت دلار افزایش یافت.</li>
        <li>آب و هوای تهران آفتابی است.</li>
        <li>بورس امروز مثبت بود.</li>
      </ul>
    </div>
  );
}
