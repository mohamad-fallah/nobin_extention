import { Card, Box, Typography } from "@mui/material";

export default function ProfileWidget() {
  return (
    <Card
      sx={{
        height: 200,
        p: 2,
        borderRadius: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1.5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h5">🔔</Typography>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            سلام
          </Typography>
        </Box>
        <Typography variant="h5">👋</Typography>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 1,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontWeight: 500,
            mb: 2,
          }}
        >
          اعلانی برای نمایش وجود ندارد
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: "text.secondary",
            px: 1,
          }}
        >
          اعلان های ایمیل و پیغام گوگل و ... را اینجا مشاهده خواهید کرد
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: "2rem",
          }}
        >
          🐝
        </Typography>
      </Box>

      {/* Small character in corner */}
      <Box
        sx={{
          position: "absolute",
          bottom: 8,
          right: 8,
          fontSize: "0.8rem",
        }}
      >
        <Typography variant="caption" sx={{ color: "text.disabled" }}>
          🗂️ آقا الیله
        </Typography>
      </Box>
    </Card>
  );
}
