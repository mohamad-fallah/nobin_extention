import Card from "../../components/Card";

export default function TodoWidget() {
  return (
    <Card>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">📋</span>
          <span className="text-sm font-medium text-gray-700">وظایف امروز</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <button className="text-gray-500 hover:text-blue-500 transition">
            <span>📅 لیست امروز</span>
          </button>
          <button className="text-gray-500 hover:text-blue-500 transition">
            <span>⚙️</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <div className="text-sm text-gray-600 mb-2">وظایف‌ای برای این روز وجود ندارد.</div>
        <div className="text-xs text-gray-400">یک وظیفه جدید اضافه کنید.</div>
      </div>

      <button className="w-full rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600 py-2 text-sm font-medium transition-colors flex items-center justify-center gap-2">
        <span className="text-lg">+</span>
        <span>...عنوان وظیفه جدید</span>
      </button>
    </Card>
  );
}
