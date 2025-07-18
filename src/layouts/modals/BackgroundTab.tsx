import { Button } from "@heroui/react";

export default function BackgroundTab() {
  return (
    <div className="space-y-6 text-right">
      <h2 className="text-lg font-bold mb-2">انتخاب تصویر زمینه</h2>
      <div className="flex gap-4 flex-wrap">
        <div className="w-24 h-16 rounded-lg bg-gray-200 flex items-center justify-center cursor-pointer border-2 border-blue-500">
          <span className="text-xs">تصویر ۱</span>
        </div>
        <div className="w-24 h-16 rounded-lg bg-gray-200 flex items-center justify-center cursor-pointer">
          <span className="text-xs">تصویر ۲</span>
        </div>
        <div className="w-24 h-16 rounded-lg bg-gray-200 flex items-center justify-center cursor-pointer">
          <span className="text-xs">تصویر ۳</span>
        </div>
      </div>
      <Button color="primary" className="font-bold">
        آپلود تصویر جدید
      </Button>
    </div>
  );
}
