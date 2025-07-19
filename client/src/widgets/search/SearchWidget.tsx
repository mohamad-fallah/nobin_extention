import { Card, Button, Box, Typography, TextField, IconButton } from "@mui/material";
import { FiSearch, FiMic, FiCamera } from "react-icons/fi";

export default function SearchWidget() {
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
            جستجو
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
              mb: 0.5,
            }}
          >
            موتور جستجو
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
            }}
          >
            جستجوی سریع و آسان
          </Typography>
        </Box>
        <Typography variant="h3">🔍</Typography>
      </Box>

      <Box sx={{ mt: 2 }}>
        <Box sx={{ position: "relative", mb: 2 }}>
          <TextField
            fullWidth
            placeholder="جستجو کنید..."
            variant="outlined"
            size="small"
            InputProps={{
              endAdornment: (
                <Box sx={{ display: "flex", gap: 0.5 }}>
                  <IconButton size="small">
                    <FiMic size={16} />
                  </IconButton>
                  <IconButton size="small">
                    <FiCamera size={16} />
                  </IconButton>
                </Box>
              ),
            }}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {["اخبار", "تصاویر", "ویدیو", "نقشه"].map((item, index) => (
            <Button
              key={index}
              size="small"
              variant="outlined"
              sx={{
                textTransform: "none",
                fontFamily: "Vazirmatn",
                borderRadius: 2,
              }}
            >
              {item}
            </Button>
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
          <Typography variant="h6">🔍</Typography>
          <Box>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 500,
                display: "block",
              }}
            >
              جستجوی پیشرفته
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Typography
                variant="caption"
                sx={{
                  color: "success.main",
                }}
              >
                ⚡ سریع و دقیق
              </Typography>
            </Box>
          </Box>
        </Box>
        <Button
          size="small"
          variant="contained"
          startIcon={<FiSearch size={16} />}
          sx={{
            textTransform: "none",
            fontFamily: "Vazirmatn",
          }}
        >
          جستجو
        </Button>
      </Box>
    </Card>
  );
}
