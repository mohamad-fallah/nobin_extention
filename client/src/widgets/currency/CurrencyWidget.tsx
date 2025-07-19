import {
  Card,
  Button,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import { FiSettings, FiFilter } from "react-icons/fi";

export default function CurrencyWidget() {
  const tasks = [
    {
      id: 1,
      text: "۳ محصول مورد انتظار ایل آ که سرانجام یا پیتز اتصال عرضه می‌شوند",
      completed: false,
    },
    {
      id: 2,
      text: "آپدیت ۴ Nothing OS به لیست دستگاه‌ها تاریخ انتشار",
      completed: false,
    },
    {
      id: 3,
      text: "Nothing OS F در لیست کاری ۱۶ و لینک کاری Nothing OS F منتشر",
      completed: true,
    },
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
            امروز
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
              mb: 0.5,
            }}
          >
            وظایف امروز
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
            }}
          >
            ۳ وظیفه برای امروز
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <IconButton size="small">
            <FiSettings size={14} />
          </IconButton>
          <IconButton size="small">
            <FiFilter size={14} />
          </IconButton>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
          mt: 1,
          maxHeight: 100,
          overflow: "auto",
        }}
      >
        {tasks.map((task, index) => (
          <FormControlLabel
            key={task.id}
            control={<Checkbox checked={task.completed} size="small" sx={{ py: 0 }} />}
            label={
              <Typography
                variant="caption"
                sx={{
                  textDecoration: task.completed ? "line-through" : "none",
                  color: task.completed ? "text.disabled" : "text.primary",
                  lineHeight: 1.2,
                  fontSize: "0.7rem",
                }}
              >
                {task.text}
              </Typography>
            }
            sx={{
              m: 0,
              alignItems: "flex-start",
              "& .MuiFormControlLabel-label": {
                fontSize: "0.7rem",
              },
            }}
          />
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
          <Typography variant="h6">✓</Typography>
          <Box>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 500,
                display: "block",
              }}
            >
              وظیفه جدید
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "success.main",
                display: "block",
              }}
            >
              + اضافه کنید
            </Typography>
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
          همه
        </Button>
      </Box>
    </Card>
  );
}
