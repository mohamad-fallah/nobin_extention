import { Card, Button, Box, Typography, Paper, IconButton } from "@mui/material";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function CalendarWidget() {
  // تقویم تیرماه ۱۴۰۴
  const days = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
  const dates = [
    ["", "", "", "", "", "", "۱"],
    ["۲", "۳", "۴", "۵", "۶", "۷", "۸"],
    ["۹", "۱۰", "۱۱", "۱۲", "۱۳", "۱۴", "۱۵"],
    ["۱۶", "۱۷", "۱۸", "۱۹", "۲۰", "۲۱", "۲۲"],
    ["۲۳", "۲۴", "۲۵", "۲۶", "۲۷", "۲۸", "۲۹"],
    ["۳۰", "۳۱", "", "", "", "", ""],
  ];

  const today = "۲۸"; // امروز ۲۸ تیر

  return (
    <Card
      sx={{
        height: 200,
        p: 2,
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header with month navigation */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1.5,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontWeight: "bold",
            fontSize: "0.9rem",
          }}
        >
          شنبه، ۲۸ تیر ۱۴۰۴
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <IconButton size="small" sx={{ fontSize: "0.8rem" }}>
            <FiChevronLeft size={12} />
          </IconButton>
          <IconButton size="small" sx={{ fontSize: "0.8rem" }}>
            <FiChevronRight size={12} />
          </IconButton>
        </Box>
      </Box>

      {/* Calendar grid */}
      <Box sx={{ flex: 1 }}>
        {/* روزهای هفته */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 0.3,
            mb: 0.5,
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
                fontSize: "0.65rem",
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
            gap: 0.3,
          }}
        >
          {dates.flat().map((date, index) => (
            <Paper
              key={index}
              elevation={0}
              sx={{
                p: 0.2,
                textAlign: "center",
                borderRadius: 1,
                backgroundColor:
                  date === today ? "primary.main" : date ? "transparent" : "transparent",
                color: date === today ? "white" : date ? "text.primary" : "transparent",
                cursor: date ? "pointer" : "default",
                "&:hover": date
                  ? {
                      backgroundColor: date === today ? "primary.dark" : "grey.100",
                    }
                  : {},
                minHeight: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                visibility: date ? "visible" : "hidden",
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontWeight: date === today ? "bold" : "normal",
                  fontSize: "0.6rem",
                }}
              >
                {date}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Box>

      {/* Footer with task and event buttons */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          mt: 1.5,
          gap: 1,
        }}
      >
        <Button
          size="small"
          variant="outlined"
          sx={{
            textTransform: "none",
            fontFamily: "Vazirmatn",
            borderRadius: 1,
            fontSize: "0.65rem",
            py: 0.3,
            px: 0.8,
            minWidth: "auto",
          }}
        >
          • وظیفه
        </Button>
        <Button
          size="small"
          variant="outlined"
          sx={{
            textTransform: "none",
            fontFamily: "Vazirmatn",
            borderRadius: 1,
            fontSize: "0.65rem",
            py: 0.3,
            px: 0.8,
            minWidth: "auto",
          }}
        >
          + رویداد
        </Button>
      </Box>
    </Card>
  );
}
