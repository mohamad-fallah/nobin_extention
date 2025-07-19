import { Card, Button, Box, Typography, Paper } from "@mui/material";

export default function CalendarWidget() {
  // تقویم تیرماه ۱۴۰۴
  const days = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
  const dates = [
    ["۳۰", "۳۱", "۱", "۲", "۳", "۴", "۵"],
    ["۶", "۷", "۸", "۹", "۱۰", "۱۱", "۱۲"],
    ["۱۳", "۱۴", "۱۵", "۱۶", "۱۷", "۱۸", "۱۹"],
    ["۲۰", "۲۱", "۲۲", "۲۳", "۲۴", "۲۵", "۲۶"],
    ["۲۷", "۲۸", "۲۹", "۳۰", "۱", "۲", "۳"],
  ];

  const today = "۱۵"; // امروز ۱۵ تیر

  return (
    <Card
      sx={{
        height: 200,
        p: 2,
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              mb: 0.5,
            }}
          >
            تقویم
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
              mb: 0.5,
            }}
          >
            تیر ۱۴۰۴
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
            }}
          >
            امروز • ۱۵ تیر
          </Typography>
        </Box>
        <Typography variant="h3">📅</Typography>
      </Box>

      <Box sx={{ mt: 2 }}>
        {/* روزهای هفته */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 0.5,
            mb: 1,
          }}
        >
          {days.map((day, index) => (
            <Typography
              key={index}
              variant="caption"
              sx={{
                textAlign: "center",
                color: "text.secondary",
                fontWeight: 500,
              }}
            >
              {day}
            </Typography>
          ))}
        </Box>

        {/* تاریخ‌ها */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 0.5,
          }}
        >
          {dates.flat().map((date, index) => (
            <Paper
              key={index}
              sx={{
                p: 0.5,
                textAlign: "center",
                borderRadius: 1,
                backgroundColor: date === today ? "primary.main" : "transparent",
                color: date === today ? "white" : "text.primary",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: date === today ? "primary.dark" : "grey.100",
                },
                minHeight: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontWeight: date === today ? "bold" : "normal",
                }}
              >
                {date}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mt: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h6">📅</Typography>
          <Box>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 500,
                display: "block",
              }}
            >
              تقویم کامل
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Typography
                variant="caption"
                sx={{
                  color: "success.main",
                }}
              >
                📅 ۱۵ تیر ۱۴۰۴
              </Typography>
            </Box>
          </Box>
        </Box>
        <Button
          size="small"
          variant="text"
          sx={{
            textTransform: "none",
            fontFamily: "Vazirmatn",
          }}
        >
          جزئیات
        </Button>
      </Box>
    </Card>
  );
}
