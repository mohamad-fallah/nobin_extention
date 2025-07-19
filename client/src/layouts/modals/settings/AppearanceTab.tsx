import { Box, Typography, Paper } from "@mui/material";
import { useTheme } from "../../../hooks";

const themes = [
  { name: "روشن", value: "light", preview: "☀️" },
  { name: "تیره", value: "dark", preview: "🌙" },
  { name: "سیستم", value: "system", preview: "🖥️" },
];

const colors = [
  { name: "آبی", value: "blue", color: "#1976d2" },
  { name: "بنفش", value: "purple", color: "#9c27b0" },
  { name: "سبز", value: "green", color: "#2e7d32" },
  { name: "قرمز", value: "red", color: "#d32f2f" },
  { name: "نارنجی", value: "orange", color: "#ed6c02" },
  { name: "صورتی", value: "pink", color: "#c2185b" },
];

const borderRadiuses = [
  { name: "بدون گردی", value: "none", preview: "⬜" },
  { name: "کوچک", value: "small", preview: "▢" },
  { name: "متوسط", value: "medium", preview: "▣" },
  { name: "بزرگ", value: "large", preview: "▤" },
];

export default function AppearanceTab() {
  const { theme, setTheme, primaryColor, setPrimaryColor, borderRadius, setBorderRadius } =
    useTheme();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold" }}>
        ظاهر
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="subtitle1"
          sx={{ mb: 2, fontWeight: "medium", display: "flex", alignItems: "center", gap: 1 }}
        >
          🎨 تم
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          {themes.map((t) => (
            <Paper
              key={t.value}
              elevation={theme === t.value ? 3 : 1}
              sx={{
                flex: 1,
                p: 2,
                textAlign: "center",
                cursor: "pointer",
                border: theme === t.value ? "2px solid #1976d2" : "2px solid transparent",
                "&:hover": {
                  elevation: 2,
                },
              }}
              onClick={() => setTheme(t.value as "light" | "dark" | "system")}
            >
              <Typography variant="h4" sx={{ mb: 1 }}>
                {t.preview}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {t.name}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="subtitle1"
          sx={{ mb: 2, fontWeight: "medium", display: "flex", alignItems: "center", gap: 1 }}
        >
          🎨 رنگ اصلی
        </Typography>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          {colors.map((c) => (
            <Paper
              key={c.value}
              elevation={primaryColor === c.value ? 3 : 1}
              sx={{
                width: 60,
                height: 60,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                border: primaryColor === c.value ? "3px solid #1976d2" : "2px solid transparent",
                backgroundColor: c.color,
                "&:hover": {
                  elevation: 2,
                },
              }}
              onClick={() => setPrimaryColor(c.value)}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  textShadow: "0 1px 2px rgba(0,0,0,0.5)",
                }}
              >
                {c.name}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="subtitle1"
          sx={{ mb: 2, fontWeight: "medium", display: "flex", alignItems: "center", gap: 1 }}
        >
          🔲 گردی گوشه‌ها
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          {borderRadiuses.map((br) => (
            <Paper
              key={br.value}
              elevation={borderRadius === br.value ? 3 : 1}
              sx={{
                flex: 1,
                p: 2,
                textAlign: "center",
                cursor: "pointer",
                border: borderRadius === br.value ? "2px solid #1976d2" : "2px solid transparent",
                "&:hover": {
                  elevation: 2,
                },
              }}
              onClick={() => setBorderRadius(br.value as "none" | "small" | "medium" | "large")}
            >
              <Typography variant="h4" sx={{ mb: 1 }}>
                {br.preview}
              </Typography>
              <Typography variant="caption" sx={{ fontWeight: 500 }}>
                {br.name}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: "medium" }}>
          پیش‌نمایش
        </Typography>
        <Paper
          elevation={1}
          sx={{
            p: 3,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 2,
            backgroundColor: "background.paper",
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            کارت نمونه
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            این یک نمونه از ظاهر کارت‌ها است
          </Typography>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            p: 2,
            mt: 2,
            border: "1px solid",
            borderColor: "divider",
            backgroundColor: "background.default",
          }}
        >
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            کارت با پس‌زمینه متفاوت
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}
