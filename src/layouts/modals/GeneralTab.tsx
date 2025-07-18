import { Switch, Input, Select, SelectItem } from "@heroui/react";
import { useState } from "react";

export default function GeneralTab() {
  const [analytics, setAnalytics] = useState(true);
  return (
    <div className="space-y-8">
      {/* انتخاب شهر */}
      <div>
        <h2 className="text-lg font-bold mb-2">انتخاب شهر</h2>
        <Input type="text" placeholder="نام شهر را جستجو کنید..." className="mb-4" dir="rtl" />
        <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
          <div className="flex flex-col text-right">
            <span className="text-blue-600 font-bold text-lg">Tehran</span>
            <span className="text-xs text-gray-500 mt-1">عرض: ۳۵.۶۸۹۵۳۳° طول: ۵۱.۳۸۹۶۰۰°</span>
          </div>
          <span className="text-gray-400 text-2xl">📍</span>
        </div>
      </div>
      {/* منطقه زمانی */}
      <div>
        <h2 className="text-lg font-bold mb-2">منطقه‌ی زمانی</h2>
        <Select placeholder="منطقه زمانی را انتخاب کنید" defaultSelectedKeys={["tehran"]} dir="rtl">
          <SelectItem key="tehran">آسیا/تهران (GMT+03:30)</SelectItem>
          <SelectItem key="dubai">آسیا/دبی (GMT+04:00)</SelectItem>
          <SelectItem key="berlin">اروپا/برلین (GMT+01:00)</SelectItem>
        </Select>
      </div>
      {/* حریم خصوصی */}
      <div>
        <h2 className="text-lg font-bold mb-2">حریم خصوصی</h2>
        <div className="flex items-center gap-2">
          <Switch isSelected={analytics} onValueChange={setAnalytics} color="primary" />
          <span className="text-sm">گوگل آنالیتیکس</span>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          با فعال کردن این گزینه، آمار استفاده از برنامه برای بهبود عملکرد جمع‌آوری می‌شود. هیچ
          داده‌ی شخصی ذخیره نمی‌شود.
        </p>
      </div>
    </div>
  );
}
