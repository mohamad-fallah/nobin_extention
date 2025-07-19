import { Button, Box, Typography, Paper } from "@mui/material";
import { useState, useRef } from "react";

const defaultBackgrounds = [
  { name: "گرادیان آبی", value: "linear-gradient(180deg, #3b82f6 0%, #1e40af 100%)" },
  { name: "گرادیان بنفش", value: "linear-gradient(180deg, #8b5cf6 0%, #5b21b6 100%)" },
  { name: "گرادیان صورتی", value: "linear-gradient(180deg, #ec4899 0%, #be185d 100%)" },
  { name: "گرادیان سبز", value: "linear-gradient(180deg, #10b981 0%, #047857 100%)" },
  { name: "گرادیان نارنجی", value: "linear-gradient(180deg, #f59e0b 0%, #d97706 100%)" },
  { name: "گرادیان قرمز", value: "linear-gradient(180deg, #ef4444 0%, #dc2626 100%)" },
];

const uploadedBackgrounds = [
  { name: "تصویر 1", value: "url('/images/background/img1.jpg')" },
  { name: "تصویر 2", value: "url('/images/background/img2.jpg')" },
];

export default function BackgroundTab() {
  const [selectedBackground, setSelectedBackground] = useState(
    "linear-gradient(180deg, #be185d 0%, #818cf8 100%)",
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBackgroundSelect = (background: string) => {
    setSelectedBackground(background);
    localStorage.setItem("selectedBackground", background);

    // Dispatch custom event for background change
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
        const background = `url('${e.target?.result}')`;
        handleBackgroundSelect(background);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold" }}>
        انتخاب تصویر زمینه
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: "medium" }}>
          تصاویر پیش‌فرض
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {defaultBackgrounds.map((bg, index) => (
            <Paper
              key={index}
              sx={{
                position: "relative",
                width: 96,
                height: 64,
                borderRadius: 2,
                cursor: "pointer",
                border:
                  selectedBackground === bg.value ? "3px solid #1976d2" : "2px solid transparent",
                background: bg.value,
                "&:hover": {
                  border: "3px solid #1976d2",
                },
              }}
              onClick={() => handleBackgroundSelect(bg.value)}
            >
              <Box
                sx={{
                  position: "absolute",
                  bottom: 4,
                  left: 4,
                  right: 4,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    textShadow: "0 1px 2px rgba(0,0,0,0.8)",
                  }}
                >
                  {bg.name}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: "medium" }}>
          تصاویر آپلود شده
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
          {uploadedBackgrounds.map((bg, index) => (
            <Paper
              key={index}
              sx={{
                position: "relative",
                width: 96,
                height: 64,
                borderRadius: 2,
                cursor: "pointer",
                border:
                  selectedBackground === bg.value ? "3px solid #1976d2" : "2px solid transparent",
                background: bg.value,
                backgroundSize: "cover",
                backgroundPosition: "center",
                "&:hover": {
                  border: "3px solid #1976d2",
                },
              }}
              onClick={() => handleBackgroundSelect(bg.value)}
            >
              <Box
                sx={{
                  position: "absolute",
                  bottom: 4,
                  left: 4,
                  right: 4,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    textShadow: "0 1px 2px rgba(0,0,0,0.8)",
                  }}
                >
                  {bg.name}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => fileInputRef.current?.click()}
          sx={{
            fontWeight: "bold",
            textTransform: "none",
            fontFamily: "Vazirmatn",
          }}
        >
          آپلود تصویر جدید
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          style={{ display: "none" }}
        />
      </Box>
    </Box>
  );
}
