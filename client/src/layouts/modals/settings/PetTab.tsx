import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import { useState } from "react";

export default function PetTab() {
  const [petType, setPetType] = useState("cat");
  const [petName, setPetName] = useState("پیش‌فرض");

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold" }}>
        تنظیمات حیوان خانگی
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: "medium" }}>
          نوع حیوان
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup value={petType} onChange={(e) => setPetType(e.target.value)}>
            <FormControlLabel value="cat" control={<Radio />} label="گربه 🐱" />
            <FormControlLabel value="dog" control={<Radio />} label="سگ 🐕" />
            <FormControlLabel value="bird" control={<Radio />} label="پرنده 🐦" />
            <FormControlLabel value="fish" control={<Radio />} label="ماهی 🐠" />
            <FormControlLabel value="rabbit" control={<Radio />} label="خرگوش 🐰" />
          </RadioGroup>
        </FormControl>
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: "medium" }}>
          نام حیوان
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup value={petName} onChange={(e) => setPetName(e.target.value)}>
            <FormControlLabel value="پیش‌فرض" control={<Radio />} label="پیش‌فرض" />
            <FormControlLabel value="شیرین" control={<Radio />} label="شیرین" />
            <FormControlLabel value="پشمالو" control={<Radio />} label="پشمالو" />
            <FormControlLabel value="ناز" control={<Radio />} label="ناز" />
          </RadioGroup>
        </FormControl>
      </Box>
    </Box>
  );
}
