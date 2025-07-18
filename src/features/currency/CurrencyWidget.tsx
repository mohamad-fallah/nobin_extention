import { Card } from "@heroui/react";
import { Button } from "@heroui/react";

const currencies = [
  { name: "US Dollar", code: "USD", value: "۸۸,۸۰۰", icon: "🇺🇸", trend: "up" },
  { name: "Euro", code: "EUR", value: "۱۰۲,۹۰۰", icon: "🇪🇺", trend: "up" },
  { name: "Gram", code: "GRAM", value: "۷۱,۰۷۲,۰۰۰", icon: "🟡", trend: "up" },
];

export default function CurrencyWidget() {
  return (
    <Card className="bg-white rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">📊</span>
          <span className="text-sm font-medium text-gray-700">اخبار</span>
        </div>
        <Button
          className="bg-blue-500 text-white px-2 py-1 rounded-md text-xs hover:bg-blue-600 transition flex items-center gap-1"
          variant="solid"
        >
          <span>🔄</span>
          <span>نرخ ارز</span>
        </Button>
      </div>

      <div className="space-y-2 flex-1 overflow-y-auto">
        {currencies.map((item) => (
          <div key={item.code} className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="text-lg">{item.icon}</span>
              <div className="min-w-0 flex-1">
                <span className="text-sm font-medium block truncate">{item.name}</span>
                <span className="text-xs text-gray-500">{item.code}</span>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="font-bold text-xs block">{item.value}</span>
              <span
                className={`text-xs ${item.trend === "up" ? "text-green-500" : "text-red-500"}`}
              >
                {item.trend === "up" ? "↑" : "↓"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
