export default function CalendarWidget() {
  // داده فیک برای نمایش تقویم ساده
  const days = [
    ["ش", "ی", "د", "س", "چ", "پ", "ج"],
    ["۱", "۲", "۳", "۴", "۵", "۶", "۷"],
    ["۸", "۹", "۱۰", "۱۱", "۱۲", "۱۳", "۱۴"],
    ["۱۵", "۱۶", "۱۷", "۱۸", "۱۹", "۲۰", "۲۱"],
    ["۲۲", "۲۳", "۲۴", "۲۵", "۲۶", "۲۷", "۲۸"],
    ["۲۹", "۳۰", "۳۱", "", "", "", ""],
  ];

  return (
    <div className="rounded-2xl bg-white/80 shadow p-6 flex flex-col min-w-[220px]">
      <div className="flex items-center mb-4">
        <span className="text-lg font-bold ml-2">تیر ۱۴۰۴</span>
        <span className="ml-auto text-xs text-gray-400">چهارشنبه ۲۵</span>
      </div>
      <table className="w-full text-center">
        <thead>
          <tr>
            {days[0].map((d) => (
              <th key={d} className="text-xs text-gray-500 font-normal">
                {d}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.slice(1).map((week, i) => (
            <tr key={i}>
              {week.map((d, j) => (
                <td key={j} className={d === "۲۵" ? "bg-blue-100 rounded-full text-blue-600" : ""}>
                  {d}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between text-xs text-gray-500">
        <span>رویداد</span>
        <span>وظیفه</span>
      </div>
    </div>
  );
}
