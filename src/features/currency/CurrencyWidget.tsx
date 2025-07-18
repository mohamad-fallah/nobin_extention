const fakeRates = [
  { name: "US Dollar", code: "USD", value: "۸۸,۸۰۰", icon: "🇺🇸", trend: "up" },
  { name: "Euro", code: "EUR", value: "۱۰۲,۹۰۰", icon: "🇪🇺", trend: "down" },
  { name: "Gram", code: "GRAM", value: "۱,۰۷۲,۰۰۰", icon: "🟡", trend: "up" },
];

export default function CurrencyWidget() {
  return (
    <div className="rounded-2xl bg-white/80 shadow p-6 flex flex-col min-w-[220px]">
      <div className="flex items-center mb-4">
        <span className="text-lg font-bold ml-2">ارزها</span>
        <span className="ml-auto text-xs text-gray-400">اخبار</span>
      </div>
      <div className="space-y-2">
        {fakeRates.map((item) => (
          <div key={item.code} className="flex items-center justify-between">
            <span className="text-xl">{item.icon}</span>
            <span className="text-sm font-medium mx-2">{item.name}</span>
            <span className="text-xs text-gray-500">{item.code}</span>
            <span className="font-bold mx-2">{item.value}</span>
            <span className={item.trend === "up" ? "text-green-500" : "text-red-500"}>
              {item.trend === "up" ? "▲" : "▼"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
