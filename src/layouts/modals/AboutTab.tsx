export default function AboutTab() {
  return (
    <div className="space-y-6 text-right">
      <h2 className="text-lg font-bold mb-2">درباره ما</h2>
      <p className="text-gray-700">
        این برنامه توسط تیم نوین‌اکس توسعه داده شده است. هدف ما ارائه بهترین تجربه کاربری و ابزارهای
        کاربردی برای شماست.
      </p>
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="font-bold">نسخه: ۱.۰.۰</div>
        <div className="text-xs text-gray-500 mt-1">تمام حقوق محفوظ است © 2024</div>
      </div>
    </div>
  );
}
