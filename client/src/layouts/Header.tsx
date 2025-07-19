import { IconButton, Box, Typography, AppBar, Toolbar } from "@mui/material";
import { FiSettings, FiSearch, FiUsers } from "react-icons/fi";
import { useState } from "react";
import SettingsModals from "./modals/settings";
import { CustomAvatar } from "../components";

export default function Header() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <AppBar
      position="relative"
      elevation={0}
      sx={{
        backgroundColor: "transparent",
        zIndex: 10,
        width: "100%",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", py: 2, px: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            onClick={() => setSettingsOpen(true)}
            data-settings-trigger
            sx={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              backgroundColor: "white",
              boxShadow: 1,
              "&:hover": { backgroundColor: "grey.100" },
              transition: "all 0.2s",
            }}
          >
            <FiSettings size={28} />
          </IconButton>
          <IconButton
            sx={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              backgroundColor: "white",
              boxShadow: 1,
              "&:hover": { backgroundColor: "grey.100" },
              transition: "all 0.2s",
            }}
          >
            <FiSearch size={28} />
          </IconButton>
          <IconButton
            sx={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              backgroundColor: "white",
              boxShadow: 1,
              "&:hover": { backgroundColor: "grey.100" },
              transition: "all 0.2s",
            }}
          >
            <FiUsers size={28} />
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography
            variant="h6"
            sx={{
              color: "white",
              fontWeight: 600,
            }}
          >
            نوبین
          </Typography>
          <CustomAvatar
            src="/images/brand/ChatGPT Image Jul 18, 2025, 12_02_21 PM.png"
            alt="نوبین"
            name="نوبین"
            size="md"
            showFallback={true}
            className="bg-white border-2 border-white shadow-sm"
            fallbackClassName="from-blue-500 to-purple-600"
          />
        </Box>
      </Toolbar>
      <SettingsModals isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </AppBar>
  );
}
