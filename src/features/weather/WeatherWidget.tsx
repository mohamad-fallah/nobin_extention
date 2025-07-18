export default function WeatherWidget() {
  return (
    <div className="rounded-xl bg-white shadow-lg p-4 flex flex-col justify-between h-[200px] overflow-hidden">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-gray-500 mb-1">چهارشنبه</div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-blue-600">20</span>
            <span className="text-lg text-gray-400">10</span>
          </div>
          <div className="text-sm text-gray-600 mt-1">تهران</div>
        </div>

        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600 mb-1">25</div>
          <div className="text-xs text-gray-500">تیر ۱۴۰۴</div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-400">
          <span>☁️ کوک کندز</span>
        </div>
        <button className="bg-blue-500 text-white px-2 py-1 rounded-md text-xs hover:bg-blue-600 transition flex items-center gap-1">
          <span>🌤</span>
          <span>پیش بینی</span>
        </button>
      </div>

      <div className="text-center">
        <a
          href="#"
          className="text-xs text-blue-500 hover:underline inline-flex items-center gap-1"
        >
          <span>📡</span>
          <span>فیدبک برای ما مهمه!</span>
        </a>
      </div>
    </div>
  );
}
