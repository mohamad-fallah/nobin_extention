import { Input, Select, SelectItem, Checkbox } from "@heroui/react";
import { useState } from "react";

export default function WeatherTab() {
  const [timezone, setTimezone] = useState("asia-tehran");
  const [googleAnalytics, setGoogleAnalytics] = useState(true);

  return (
    <div className="space-y-8 text-right" dir="rtl">
      {/* انتخاب شهر */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-800">انتخاب شهر</h3>
        <div className="space-y-4">
          <Input
            placeholder="نام شهر را جستجو کنید..."
            className="max-w-full"
            classNames={{
              input: "text-right",
              inputWrapper: "bg-gray-50 border-gray-200",
            }}
          />
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">🌍</span>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-blue-900">Tehran</div>
                <div className="text-sm text-blue-600 flex items-center gap-4">
                  <span>طول: ۵۱.۳۸۹۶°</span>
                  <span>عرض: ۳۵.۶۸۹۲°</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* منطقه زمانی */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-800">منطقه زمانی</h3>
        <p className="text-sm text-gray-600 mb-4">منطقه زمانی مورد نظر خود را انتخاب کنید.</p>
        <Select
          selectedKeys={[timezone]}
          onSelectionChange={(keys) => setTimezone(Array.from(keys)[0] as string)}
          placeholder="انتخاب منطقه زمانی"
          className="max-w-full"
          classNames={{
            trigger: "bg-gray-50 border-gray-200",
            value: "text-right",
          }}
        >
          <SelectItem key="asia-tehran">آسیا / تهران (+۰۳:۳۰)</SelectItem>
          <SelectItem key="asia-dubai">آسیا / دبی (+۰۴:۰۰)</SelectItem>
          <SelectItem key="europe-london">اروپا / لندن (+۰۰:۰۰)</SelectItem>
        </Select>
      </div>

      {/* حریم خصوصی */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-800">حریم خصوصی</h3>
        <div className="space-y-4">
          <Checkbox
            isSelected={googleAnalytics}
            onValueChange={setGoogleAnalytics}
            classNames={{
              wrapper: "before:border-gray-300",
              label: "text-gray-700",
            }}
          >
            گوگل آنالیتیکس
          </Checkbox>
          <p className="text-sm text-gray-500 pr-6">
            با فعال کردن این گزینه، آمار استفاده از برنامه برای بهبود عملکرد جمع‌آوری می‌شود. هیچ
            اطلاعات حساس جمع‌آوری نمی‌شود.
          </p>
        </div>
      </div>
    </div>
  );
}
