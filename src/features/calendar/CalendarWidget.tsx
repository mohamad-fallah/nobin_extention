export default function CalendarWidget() {
  // تقویم تیرماه ۱۴۰۴
  const days = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
  const dates = [
    ["۳۰", "۳۱", "۱", "۲", "۳", "۴", "۵"],
    ["۶", "۷", "۸", "۹", "۱۰", "۱۱", "۱۲"],
    ["۱۳", "۱۴", "۱۵", "۱۶", "۱۷", "۱۸", "۱۹"],
    ["۲۰", "۲۱", "۲۲", "۲۳", "۲۴", "۲۵", "۲۶"],
    ["۲۷", "۲۸", "۲۹", "۳۰", "۳۱", "۱", "۲"],
  ];

  return (
    <div className="rounded-xl bg-white shadow-lg p-4 h-[auto] flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1">
          <button className="text-blue-500 text-sm p-1">
            <span>📅</span>
          </button>
          <button className="text-gray-400 text-sm p-1">
            <span>👥</span>
          </button>
          <button className="text-gray-400 text-sm p-1">
            <span>📊</span>
          </button>
        </div>
        <span className="text-xs font-medium text-gray-700">چهارشنبه، ۲۵ تیر ۱۴۰۴</span>
      </div>

      <div className="mb-2 text-center">
        <div className="flex items-center justify-between px-2 mb-1">
          <span className="text-xs text-gray-400 cursor-pointer">خرداد</span>
          <span className="text-sm font-medium">تیر</span>
          <span className="text-xs text-gray-400 cursor-pointer">مرداد</span>
        </div>
        <div className="text-xs text-gray-500">مناسبت روز امروز</div>
        <div className="text-xs text-gray-600">روز بهزیستی و تامین اجتماعی</div>
      </div>

      <div className="grid grid-cols-7 gap-0.5 text-center text-xs flex-1 px-1">
        {/* Header */}
        {days.map((day, i) => (
          <div key={i} className="text-gray-500 text-xs pb-1 font-medium">
            {day}
          </div>
        ))}

        {/* Dates */}
        {dates.map((week, weekIndex) =>
          week.map((day, dayIndex) => {
            const isToday = day === "۲۵";
            const isPrevMonth =
              (weekIndex === 0 && parseInt(day) > 20) || (weekIndex === 4 && parseInt(day) < 10);
            const isHoliday = day === "۱۳" || day === "۲۰" || day === "۲۷";

            return (
              <div
                key={`${weekIndex}-${dayIndex}`}
                className={`
                  py-1 px-1 cursor-pointer rounded text-xs min-h-[20px] flex items-center justify-center
                  ${
                    isToday
                      ? "bg-blue-500 text-white font-bold"
                      : isPrevMonth
                        ? "text-gray-300"
                        : isHoliday
                          ? "text-red-500"
                          : "hover:bg-gray-100"
                  }
                `}
              >
                {day}
              </div>
            );
          }),
        )}
      </div>

      <div className="mt-2 pt-2 border-t flex items-center justify-center gap-4 text-xs">
        <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition">
          <span>📋</span>
          <span>وظیفه</span>
        </button>
        <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition">
          <span>📅</span>
          <span>رویداد</span>
        </button>
      </div>
    </div>
  );
}
