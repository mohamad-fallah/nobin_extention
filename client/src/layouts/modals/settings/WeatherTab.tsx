import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import { useState } from "react";

export default function WeatherTab() {
  const [city, setCity] = useState("تهران");
  const [unit, setUnit] = useState("celsius");
  const [showHumidity, setShowHumidity] = useState(true);
  const [showWind, setShowWind] = useState(true);
  const [showForecast, setShowForecast] = useState(true);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold" }}>
        تنظیمات آب‌وهوا
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: "medium" }}>
          شهر پیش‌فرض
        </Typography>
        <TextField
          fullWidth
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="نام شهر را وارد کنید"
          sx={{ mb: 2 }}
        />
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: "medium" }}>
          واحد دما
        </Typography>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>انتخاب واحد</InputLabel>
          <Select value={unit} onChange={(e) => setUnit(e.target.value)} label="انتخاب واحد">
            <MenuItem value="celsius">سلسیوس (°C)</MenuItem>
            <MenuItem value="fahrenheit">فارنهایت (°F)</MenuItem>
            <MenuItem value="kelvin">کلوین (K)</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: "medium" }}>
          اطلاعات نمایشی
        </Typography>

        <FormControlLabel
          control={
            <Checkbox checked={showHumidity} onChange={(e) => setShowHumidity(e.target.checked)} />
          }
          label="نمایش رطوبت"
          sx={{ mb: 2 }}
        />

        <FormControlLabel
          control={<Checkbox checked={showWind} onChange={(e) => setShowWind(e.target.checked)} />}
          label="نمایش سرعت باد"
          sx={{ mb: 2 }}
        />

        <FormControlLabel
          control={
            <Checkbox checked={showForecast} onChange={(e) => setShowForecast(e.target.checked)} />
          }
          label="نمایش پیش‌بینی"
          sx={{ mb: 2 }}
        />
      </Box>
    </Box>
  );
}
