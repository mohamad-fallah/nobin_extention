import { RadioGroup, Radio, Button } from "@heroui/react";
import clsx from "clsx";
import { useState } from "react";

const themes = [
  { name: "روشن", value: "light" },
  { name: "تاریک", value: "dark" },
  { name: "سیستم", value: "system" },
];

const colors = [
  { name: "آبی", value: "blue", class: "bg-blue-500" },
  { name: "سبز", value: "green", class: "bg-green-500" },
  { name: "قرمز", value: "red", class: "bg-red-500" },
  { name: "بنفش", value: "purple", class: "bg-purple-500" },
];

export default function AppearanceTab() {
  const [theme, setTheme] = useState("system");
  const [color, setColor] = useState("blue");
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-bold mb-2">انتخاب تم</h2>
        <RadioGroup value={theme} onValueChange={setTheme}>
          {themes.map((t) => (
            <Radio key={t.value} value={t.value}>
              {t.name}
            </Radio>
          ))}
        </RadioGroup>
      </div>
      <div>
        <h2 className="text-lg font-bold mb-2">رنگ اصلی</h2>
        <div className="flex gap-4">
          {colors.map((c) => (
            <Button
              key={c.value}
              isIconOnly
              size="lg"
              variant="light"
              onPress={() => setColor(c.value)}
              className={clsx(
                // Layout
                "w-10 h-10",
                // Colors & Effects
                c.class,
                color === c.value ? "ring-2 ring-blue-500 border-blue-500" : "border-white",
                // Layout
                "rounded-full border-2",
              )}
            >
              <span className="sr-only">{c.name}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
