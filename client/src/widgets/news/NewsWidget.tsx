import { Card, Button, Box, Typography, Paper } from "@mui/material";

export default function NewsWidget() {
  const news = [
    { title: "اخبار فناوری", category: "تکنولوژی", time: "۲ ساعت پیش" },
    { title: "اخبار ورزشی", category: "ورزش", time: "۴ ساعت پیش" },
    { title: "اخبار اقتصادی", category: "اقتصاد", time: "۶ ساعت پیش" },
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
            اخبار
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
              mb: 0.5,
            }}
          >
            آخرین اخبار
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
        <Typography variant="h3">📰</Typography>
      </Box>

      <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 1 }}>
        {news.map((item, index) => (
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
                {item.title}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                }}
              >
                {item.category}
              </Typography>
            </Box>
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
              }}
            >
              {item.time}
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
          <Typography variant="h6">📰</Typography>
          <Box>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 500,
                display: "block",
              }}
            >
              اخبار کامل
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Typography
                variant="caption"
                sx={{
                  color: "success.main",
                }}
              >
                📰 به‌روزرسانی خودکار
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
          مشاهده همه
        </Button>
      </Box>
    </Card>
  );
}
