import { RadioGroup, Radio } from "@heroui/react";
import { useState } from "react";

const pets = [
  { name: "سگ", value: "dog", emoji: "🐶" },
  { name: "گربه", value: "cat", emoji: "🐱" },
  { name: "پرنده", value: "bird", emoji: "🐦" },
];

export default function PetTab() {
  const [pet, setPet] = useState("dog");
  return (
    <div className="space-y-8 text-right">
      <h2 className="text-lg font-bold mb-2">انتخاب حیوان خانگی</h2>
      <RadioGroup value={pet} onValueChange={setPet}>
        {pets.map((p) => (
          <Radio key={p.value} value={p.value}>
            <div className="flex items-center gap-2">
              <span className="text-xl">{p.emoji}</span>
              {p.name}
            </div>
          </Radio>
        ))}
      </RadioGroup>
      <div className="flex items-center justify-center mt-8">
        <span className="text-7xl">{pets.find((p) => p.value === pet)?.emoji}</span>
      </div>
    </div>
  );
}
