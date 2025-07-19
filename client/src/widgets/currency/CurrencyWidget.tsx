import { Card, Button, Box, Typography, Paper } from "@mui/material";

export default function CurrencyWidget() {
  const currencies = [
    { name: "دلار آمریکا", code: "USD", rate: "۵۸,۰۰۰", change: "+۲.۵%", trend: "up" },
    { name: "یورو", code: "EUR", rate: "۶۲,۵۰۰", change: "-۱.۲%", trend: "down" },
    { name: "پوند انگلیس", code: "GBP", rate: "۷۲,۸۰۰", change: "+۰.۸%", trend: "up" },
    { name: "ین ژاپن", code: "JPY", rate: "۳۸۵", change: "-۰.۵%", trend: "down" },
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
            نرخ ارز
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
              mb: 0.5,
            }}
          >
            بازار ارز
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
        <Typography variant="h3">💱</Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}>
        {currencies.slice(0, 3).map((currency, index) => (
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
                {currency.name}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "text.secondary",
                }}
              >
                {currency.code}
              </Typography>
            </Box>
            <Box sx={{ textAlign: "right" }}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: "bold",
                }}
              >
                {currency.rate}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: currency.trend === "up" ? "success.main" : "error.main",
                }}
              >
                {currency.change}
              </Typography>
            </Box>
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
          <Typography variant="h6">📈</Typography>
          <Box>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 500,
                display: "block",
              }}
            >
              بازار ارز
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Typography
                variant="caption"
                sx={{
                  color: "success.main",
                }}
              >
                📈 +۲.۱%
              </Typography>
            </Box>
          </Box>
        </Box>
        <Button
          size="small"
          variant="contained"
          sx={{
            textTransform: "none",
            fontFamily: "Vazirmatn",
          }}
        >
          <Typography variant="body2" sx={{ mr: 0.5 }}>
            🔄
          </Typography>
          <Typography variant="body2">نرخ ارز</Typography>
        </Button>
      </Box>
    </Card>
  );
}
