import { Card, Button, Box, Typography, Paper } from "@mui/material";

export default function EventWidget() {
  const events = [
    { title: "جلسه تیم", time: "۱۴:۰۰", date: "امروز" },
    { title: "مصاحبه کاری", time: "۱۶:۳۰", date: "فردا" },
    { title: "جلسه مشتری", time: "۱۰:۰۰", date: "پس‌فردا" },
  ];

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
            رویدادها
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
              mb: 0.5,
            }}
          >
            برنامه‌های آینده
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
            }}
          >
            امروز • 18 دی 1403
          </Typography>
        </Box>
        <Typography variant="h3">📅</Typography>
      </Box>

      <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1 }}>
        {events.map((event, index) => (
          <Paper
            key={index}
            sx={{
              p: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "grey.50",
              borderRadius: 1,
            }}
          >
            <Box>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 500,
                }}
              >
                {event.title}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                }}
              >
                {event.date}
              </Typography>
            </Box>
            <Typography
              variant="caption"
              sx={{
                color: "primary.main",
                fontWeight: "bold",
              }}
            >
              {event.time}
            </Typography>
          </Paper>
        ))}
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
              تقویم رویدادها
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Typography
                variant="caption"
                sx={{
                  color: "success.main",
                }}
              >
                📅 {events.length} رویداد آینده
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
          اضافه کردن
        </Button>
      </Box>
    </Card>
  );
}
