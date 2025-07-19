import { Card, Button, CircularProgress, Box, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { CustomAvatar } from "../../components";
import { getRoleDisplay, getRoleEmoji } from "../../utils";

export default function ProfileWidget() {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <Card
        sx={{
          height: 200,
          p: 2,
          borderRadius: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <CircularProgress size={40} />
        </Box>
      </Card>
    );
  }

  if (!isAuthenticated || !user) {
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
            variant="body2"
            sx={{
              color: "text.secondary",
              mb: 1,
            }}
          >
            برای استفاده از امکانات کامل وارد شوید
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: "text.disabled",
              px: 1,
            }}
          >
            با ورود به حساب کاربری از امکانات شخصی‌سازی شده استفاده کنید
          </Typography>
        </Box>

        <Box sx={{ mt: "auto" }}>
          <Button
            size="small"
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => {
              const settingsBtn = document.querySelector("[data-settings-trigger]") as HTMLElement;
              settingsBtn?.click();
            }}
            sx={{
              textTransform: "none",
              fontFamily: "Vazirmatn",
            }}
          >
            ورود / ثبت‌نام
          </Button>
        </Box>
      </Card>
    );
  }

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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1.5,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h5">👋</Typography>
          <Typography variant="body1" sx={{ fontWeight: 600 }}>
            سلام {user.username}
          </Typography>
        </Box>
        <CustomAvatar
          src={user.avatar || "/images/avatar/mohammad-fallah.jpg"}
          alt={user.username}
          name={user.username}
          size="md"
          showFallback={true}
          className="border-2 border-white shadow-md"
          fallbackClassName="from-blue-400 to-purple-500"
        />
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
          variant="body2"
          sx={{
            color: "text.secondary",
            mb: 1,
          }}
        >
          {user.isVerified ? "حساب شما تأیید شده است ✅" : "حساب شما در انتظار تأیید است ⏳"}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: "text.disabled",
            px: 1,
            mb: 0.5,
          }}
        >
          نقش: {getRoleDisplay(user.role)}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: "text.disabled",
            px: 1,
          }}
        >
          عضو از {new Date(user.createdAt).toLocaleDateString("fa-IR")}
        </Typography>
      </Box>

      <Box
        sx={{
          mt: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="h6">{getRoleEmoji(user.role)}</Typography>
          <Box>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 500,
                display: "block",
              }}
            >
              پروفایل کامل
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Typography
                variant="caption"
                sx={{
                  color: "success.main",
                }}
              >
                ★★★★★
              </Typography>
            </Box>
          </Box>
        </Box>
        <Button
          size="small"
          variant="text"
          onClick={() => {
            const settingsBtn = document.querySelector("[data-settings-trigger]") as HTMLElement;
            settingsBtn?.click();
          }}
          sx={{
            textTransform: "none",
            fontFamily: "Vazirmatn",
          }}
        >
          مدیریت حساب
        </Button>
      </Box>
    </Card>
  );
}
