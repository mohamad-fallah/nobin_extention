import { Button, Box, Typography, Paper, Chip } from "@mui/material";

export default function MinersTab() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 3, fontWeight: "bold" }}>
        لیست ماینرها
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Paper
          sx={{
            p: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "grey.50",
            borderRadius: 2,
          }}
        >
          <Typography variant="body2">ماینر #1</Typography>
          <Chip label="فعال" color="success" size="small" />
        </Paper>

        <Paper
          sx={{
            p: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "grey.50",
            borderRadius: 2,
          }}
        >
          <Typography variant="body2">ماینر #2</Typography>
          <Chip label="غیرفعال" color="error" size="small" />
        </Paper>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            fontWeight: "bold",
            textTransform: "none",
            fontFamily: "Vazirmatn",
          }}
        >
          اضافه کردن ماینر جدید
        </Button>
      </Box>
    </Box>
  );
}
