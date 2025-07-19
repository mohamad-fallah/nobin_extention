import { Typography } from "@mui/material";

export default function Footer() {
  return (
    <Typography
      mb={2}
      variant="body2"
      align="center"
      sx={{
        color: "white",
        opacity: 0.8,
        userSelect: "none",
      }}
    >
      © ۱۴۰۳ نوبین - تمامی حقوق محفوظ است
    </Typography>
  );
}
