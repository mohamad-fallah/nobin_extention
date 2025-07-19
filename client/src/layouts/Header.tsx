import { IconButton, Box, Typography, AppBar, Toolbar, Avatar } from "@mui/material";
import { FiSettings, FiSearch, FiUsers } from "react-icons/fi";
import { useState } from "react";
import SettingsModals from "./modals/settings";

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
            color="inherit"
            data-settings-trigger
            sx={{
              width: 48,
              height: 48,
              borderRadius: "50%",

              transition: "all 0.2s",
            }}
          >
            <FiSettings size={28} />
          </IconButton>
          <IconButton
            color="inherit"
            sx={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              transition: "all 0.2s",
            }}
          >
            <FiSearch size={28} />
          </IconButton>
          <IconButton
            color="inherit"
            sx={{
              width: 48,
              height: 48,
              borderRadius: "50%",
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
          <Avatar alt="نوبین" sx={{ width: 40, height: 40 }}>
            ن
          </Avatar>
        </Box>
      </Toolbar>
      <SettingsModals isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </AppBar>
  );
}
