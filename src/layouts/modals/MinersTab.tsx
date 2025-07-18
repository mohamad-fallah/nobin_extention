import { Button } from "@heroui/react";

export default function MinersTab() {
  return (
    <div className="space-y-8 text-right">
      <h2 className="text-lg font-bold mb-2">لیست ماینرها</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
          <span>ماینر ۱</span>
          <span className="text-green-500 font-bold">فعال</span>
        </div>
        <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
          <span>ماینر ۲</span>
          <span className="text-red-500 font-bold">غیرفعال</span>
        </div>
      </div>
      <Button color="primary" className="font-bold">
        افزودن ماینر جدید
      </Button>
    </div>
  );
}
