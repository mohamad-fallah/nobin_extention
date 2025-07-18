import Card from "../../components/Card";

export default function ProfileWidget() {
  return (
    <Card height="200px">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">👋</span>
          <span className="text-base font-semibold">سلام</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
          <span className="text-sm">🔔</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center px-2">
        <div className="text-sm text-gray-600 mb-2">اعلانی برای نمایش وجود ندارد.</div>
        <div className="text-xs text-gray-400 px-2">
          اعلان های ایمیل و تقویم کاری و... را می‌بینی.
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">🐱</span>
          <div>
            <span className="text-xs font-medium block">غذا بده!</span>
            <div className="flex text-xs text-yellow-400">
              <span>★★★★☆</span>
            </div>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
          <span className="text-lg">🎯</span>
        </div>
      </div>
    </Card>
  );
}
