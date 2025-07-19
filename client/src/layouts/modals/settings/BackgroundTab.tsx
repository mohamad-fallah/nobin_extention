import { Button } from "@heroui/react";
import clsx from "clsx";
import { useState, useEffect, useRef } from "react";

const DEFAULT_BACKGROUNDS = [
  {
    name: "گرادیان پیش‌فرض",
    value: "linear-gradient(180deg, #be185d 0%, #818cf8 100%)",
    type: "gradient",
  },
  {
    name: "عکس گیک",
    value: "url('/images/background/Geek.png')",
    type: "image",
  },
  {
    name: "عکس دوم",
    value: "url('/images/background/img2.jpeg')",
    type: "image",
  },
];

export default function BackgroundTab() {
  const [selectedBackground, setSelectedBackground] = useState<string>("");
  const [uploadedBackgrounds, setUploadedBackgrounds] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load from localStorage
    const savedBackground = localStorage.getItem("selectedBackground");
    const savedUploadedBackgrounds = localStorage.getItem("uploadedBackgrounds");

    if (savedBackground) {
      setSelectedBackground(savedBackground);
    } else {
      setSelectedBackground(DEFAULT_BACKGROUNDS[0].value);
    }

    if (savedUploadedBackgrounds) {
      setUploadedBackgrounds(JSON.parse(savedUploadedBackgrounds));
    }
  }, []);

  const handleBackgroundSelect = (background: string) => {
    setSelectedBackground(background);
    localStorage.setItem("selectedBackground", background);

    // Dispatch custom event to trigger immediate background change
    const event = new CustomEvent("backgroundChanged", {
      detail: { background },
    });
    window.dispatchEvent(event);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          const newUploadedBackgrounds = [...uploadedBackgrounds, result];
          setUploadedBackgrounds(newUploadedBackgrounds);
          localStorage.setItem("uploadedBackgrounds", JSON.stringify(newUploadedBackgrounds));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeUploadedBackground = (background: string) => {
    const newUploadedBackgrounds = uploadedBackgrounds.filter((bg) => bg !== background);
    setUploadedBackgrounds(newUploadedBackgrounds);
    localStorage.setItem("uploadedBackgrounds", JSON.stringify(newUploadedBackgrounds));
  };

  const BackgroundPreview = ({
    background,
    isSelected,
    onClick,
    name,
    canRemove = false,
    onRemove,
  }: {
    background: string;
    isSelected: boolean;
    onClick: () => void;
    name: string;
    canRemove?: boolean;
    onRemove?: () => void;
  }) => (
    <div className="relative group">
      <div
        className={`w-24 h-16 rounded-lg cursor-pointer border-2 ${
          isSelected ? "border-blue-500" : "border-gray-300"
        } overflow-hidden flex items-center justify-center transition-all duration-200 hover:scale-105`}
        onClick={onClick}
        style={{
          background: background.startsWith("url(") ? undefined : background,
          backgroundImage: background.startsWith("url(") ? background : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {!background.startsWith("url(") && !background.startsWith("data:") && (
          <span className="text-xs text-white font-bold drop-shadow-lg">{name}</span>
        )}
      </div>
      {canRemove && onRemove && (
        <Button
          isIconOnly
          size="sm"
          color="danger"
          variant="solid"
          onPress={() => {
            onRemove();
          }}
          className={clsx(
            // Layout
            "absolute -top-2 -right-2",
            // Colors & Effects
            "opacity-0 group-hover:opacity-100",
            "transition-opacity",
            // Layout
            "rounded-full",
          )}
        >
          ×
        </Button>
      )}
    </div>
  );

  return (
    <div className="space-y-6 text-right">
      <h2 className="text-lg font-bold mb-2">انتخاب تصویر زمینه</h2>

      <div className="space-y-4">
        <h3 className="text-md font-semibold">تصاویر پیش‌فرض</h3>
        <div className="flex gap-4 flex-wrap">
          {DEFAULT_BACKGROUNDS.map((bg, index) => (
            <BackgroundPreview
              key={index}
              background={bg.value}
              isSelected={selectedBackground === bg.value}
              onClick={() => handleBackgroundSelect(bg.value)}
              name={bg.name}
            />
          ))}
        </div>
      </div>

      {uploadedBackgrounds.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-md font-semibold">تصاویر آپلود شده</h3>
          <div className="flex gap-4 flex-wrap">
            {uploadedBackgrounds.map((bg, index) => (
              <BackgroundPreview
                key={index}
                background={`url(${bg})`}
                isSelected={selectedBackground === `url(${bg})`}
                onClick={() => handleBackgroundSelect(`url(${bg})`)}
                name={`آپلود ${index + 1}`}
                canRemove={true}
                onRemove={() => removeUploadedBackground(bg)}
              />
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <Button color="primary" className="font-bold" onPress={() => fileInputRef.current?.click()}>
          آپلود تصویر جدید
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>
    </div>
  );
}
