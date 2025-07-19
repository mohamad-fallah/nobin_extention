import { useState } from "react";
import clsx from "clsx";
import { Dialog, DialogTitle, DialogContent, Button, IconButton } from "@mui/material";
import GeneralTab from "./GeneralTab";
import AccountTab from "./AccountTab";
import AppearanceTab from "./AppearanceTab";
import BackgroundTab from "./BackgroundTab";
import PetTab from "./PetTab";
import MinersTab from "./MinersTab";
import AboutTab from "./AboutTab";
import WeatherTab from "./WeatherTab";

const tabs = [
  { name: "عمومی", key: "general", component: <GeneralTab />, icon: "⚙️" },
  { name: "حساب کاربری", key: "account", component: <AccountTab />, icon: "👤" },
  { name: "ظاهری", key: "appearance", component: <AppearanceTab />, icon: "🌙" },
  { name: "تصویر زمینه", key: "background", component: <BackgroundTab />, icon: "🖼️" },
  { name: "آب هوا", key: "weather", component: <WeatherTab />, icon: "☁️" },
  { name: "حیوان خانگی", key: "pet", component: <PetTab />, icon: "🐾" },
  { name: "ماینرها", key: "miners", component: <MinersTab />, icon: "📊" },
  { name: "درباره ما", key: "about", component: <AboutTab />, icon: "ℹ️" },
];

export default function SettingsModals({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [selectedTab, setSelectedTab] = useState("background");

  const currentTab = tabs.find((tab) => tab.key === selectedTab);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="xl"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          height: "80vh",
          maxWidth: "50vw",
        },
      }}
    >
      <DialogTitle
        sx={{
          p: 0,
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <div className="w-full h-16 bg-white flex items-center justify-between px-6" dir="rtl">
          <h2 className="text-xl font-semibold text-gray-800">تنظیمات</h2>
          <IconButton
            onClick={onClose}
            sx={{
              width: 32,
              height: 32,
              bgcolor: "grey.100",
              "&:hover": { bgcolor: "grey.200" },
              color: "grey.600",
            }}
          >
            ✕
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent sx={{ p: 0, height: "600px" }}>
        <div className="flex h-full" dir="rtl">
          {/* Sidebar - تب‌ها */}
          <div className="w-64 bg-white border-l border-gray-100 flex flex-col">
            <div className="p-4 space-y-1">
              {tabs.map((tab) => (
                <Button
                  key={tab.key}
                  onClick={() => setSelectedTab(tab.key)}
                  variant={selectedTab === tab.key ? "contained" : "text"}
                  color={selectedTab === tab.key ? "primary" : "inherit"}
                  className={clsx(
                    // Layout
                    "w-full justify-start",
                    // Spacing
                    "px-4 py-3",
                    // Typography
                    "text-base font-medium",
                    // Layout
                    "rounded-xl",
                    // Interactions
                    "transition-all duration-200",
                  )}
                  startIcon={<span className="text-lg">{tab.icon}</span>}
                  sx={{
                    justifyContent: "flex-start",
                    textTransform: "none",
                    fontFamily: "Vazirmatn",
                  }}
                >
                  {tab.name}
                </Button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-gray-50">
            <div className="p-8 overflow-y-auto h-full">
              <div className="max-w-2xl">{currentTab?.component}</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
