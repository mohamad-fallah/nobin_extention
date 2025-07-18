import { Button, Input } from "@heroui/react";

export default function AccountTab() {
  return (
    <form className="space-y-6 max-w-md mx-auto text-right">
      <Input type="text" label="نام" placeholder="نام خود را وارد کنید" dir="rtl" />
      <Input type="email" label="ایمیل" placeholder="ایمیل خود را وارد کنید" dir="rtl" />
      <Input
        type="password"
        label="رمز عبور جدید"
        placeholder="رمز عبور جدید را وارد کنید"
        dir="rtl"
      />
      <Button type="submit" color="primary" className="w-full font-bold">
        ذخیره تغییرات
      </Button>
    </form>
  );
}
