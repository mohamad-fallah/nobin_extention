import { Card, Button, Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { formatTime, formatDate } from "../../utils";

export default function ClockWidget() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
            ساعت
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
              mb: 0.5,
            }}
          >
            ساعت دیجیتال
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
            }}
          >
            {formatDate(time)}
          </Typography>
        </Box>
        <Typography variant="h3">🕐</Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            fontFamily: "monospace",
            color: "primary.main",
          }}
        >
          {formatTime(time)}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            mt: 1,
          }}
        >
          تهران، ایران
        </Typography>
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
          <Typography variant="h6">⏰</Typography>
          <Box>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 500,
                display: "block",
              }}
            >
              ساعت جهانی
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Typography
                variant="caption"
                sx={{
                  color: "success.main",
                }}
              >
                🕐 دقیق و به‌روز
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
          تنظیمات
        </Button>
      </Box>
    </Card>
  );
}
