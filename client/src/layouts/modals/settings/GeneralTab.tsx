import {
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import { useTheme } from "../../../providers/ThemeProvider";
import { useState } from "react";

export default function GeneralTab() {
  const { theme, setTheme, primaryColor, setPrimaryColor, borderRadius, setBorderRadius } =
    useTheme();
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [language, setLanguage] = useState("fa");

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold" }}>
        تنظیمات عمومی
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: "medium" }}>
          تم
        </Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>انتخاب تم</InputLabel>
          <Select
            value={theme}
            onChange={(e) => setTheme(e.target.value as "light" | "dark" | "system")}
            label="انتخاب تم"
          >
            <MenuItem value="light">روشن</MenuItem>
            <MenuItem value="dark">تیره</MenuItem>
            <MenuItem value="system">سیستم</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: "medium" }}>
          رنگ اصلی
        </Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>انتخاب رنگ</InputLabel>
          <Select
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
            label="انتخاب رنگ"
          >
            <MenuItem value="blue">آبی</MenuItem>
            <MenuItem value="purple">بنفش</MenuItem>
            <MenuItem value="green">سبز</MenuItem>
            <MenuItem value="red">قرمز</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: "medium" }}>
          گردی گوشه‌ها
        </Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>انتخاب گردی</InputLabel>
          <Select
            value={borderRadius}
            onChange={(e) =>
              setBorderRadius(e.target.value as "none" | "small" | "medium" | "large")
            }
            label="انتخاب گردی"
          >
            <MenuItem value="none">بدون گردی</MenuItem>
            <MenuItem value="small">کوچک</MenuItem>
            <MenuItem value="medium">متوسط</MenuItem>
            <MenuItem value="large">بزرگ</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: "medium" }}>
          زبان
        </Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>انتخاب زبان</InputLabel>
          <Select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            label="انتخاب زبان"
          >
            <MenuItem value="fa">فارسی</MenuItem>
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="ar">العربية</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: "medium" }}>
          تنظیمات سیستم
        </Typography>

        <FormControlLabel
          control={
            <Switch checked={notifications} onChange={(e) => setNotifications(e.target.checked)} />
          }
          label="اعلان‌ها"
          sx={{ mb: 2 }}
        />

        <FormControlLabel
          control={<Switch checked={autoSave} onChange={(e) => setAutoSave(e.target.checked)} />}
          label="ذخیره خودکار"
          sx={{ mb: 2 }}
        />
      </Box>
    </Box>
  );
}
