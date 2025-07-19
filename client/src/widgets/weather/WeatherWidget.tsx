import { Card, Button, Box, Typography } from "@mui/material";

export default function WeatherWidget() {
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
            شنبه
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
              mb: 0.5,
            }}
          >
            28 تیر ۱۴۰۴
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
            }}
          >
            امروز
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h2"
            sx={{
              fontWeight: "300",
              lineHeight: 0.9,
              color: "primary.main",
              fontSize: "3rem",
            }}
          >
            19
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: "300",
              lineHeight: 0.9,
              color: "primary.main",
              fontSize: "3rem",
            }}
          >
            19
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              mt: 0.5,
              display: "block",
            }}
          >
            میلادی
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
          <Button
            size="small"
            variant="contained"
            sx={{
              textTransform: "none",
              fontFamily: "Vazirmatn",
              borderRadius: 2,
              fontSize: "0.75rem",
              bgcolor: "orange.main",
              "&:hover": {
                bgcolor: "orange.dark",
              },
            }}
          >
            یادها 📝
          </Button>
          <Button
            size="small"
            variant="contained"
            sx={{
              textTransform: "none",
              fontFamily: "Vazirmatn",
              borderRadius: 2,
              fontSize: "0.75rem",
              bgcolor: "success.main",
              "&:hover": {
                bgcolor: "success.dark",
              },
            }}
          >
            گوگل کلندر 📅
          </Button>
          <Button
            size="small"
            variant="contained"
            sx={{
              textTransform: "none",
              fontFamily: "Vazirmatn",
              borderRadius: 2,
              fontSize: "0.75rem",
              bgcolor: "info.main",
              "&:hover": {
                bgcolor: "info.dark",
              },
            }}
          >
            پی درپی 🔄
          </Button>
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
          <Typography variant="h6">🔔</Typography>
          <Box>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 500,
                display: "block",
              }}
            >
              قیدت برای ما همیشه
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Typography
                variant="caption"
                sx={{
                  color: "warning.main",
                }}
              >
                ⭐ همیشگی
              </Typography>
            </Box>
          </Box>
        </Box>
        <Button
          size="small"
          variant="contained"
          color="primary"
          sx={{
            textTransform: "none",
            fontFamily: "Vazirmatn",
            borderRadius: 2,
          }}
        >
          فیدبک 🔔
        </Button>
      </Box>
    </Card>
  );
}
