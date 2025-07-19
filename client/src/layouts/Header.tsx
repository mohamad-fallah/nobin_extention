import { Avatar } from "@heroui/react";
import { Button } from "@heroui/react";
import { FiSettings, FiSearch, FiUsers } from "react-icons/fi";
import { useState } from "react";
import SettingsModals from "./modals/settings";

export default function Header() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  return (
    <header className="relative z-10 w-full flex items-center justify-between py-4 px-8 ">
      <div className="flex items-center gap-2">
        <Button
          className="w-12 h-12 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center transition shadow-sm"
          variant="light"
          onPress={() => setSettingsOpen(true)}
          data-settings-trigger
        >
          <FiSettings size={28} />
        </Button>
        <Button
          className="w-12 h-12 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center transition shadow-sm"
          variant="light"
        >
          <FiSearch size={28} />
        </Button>
        <Button
          className="w-12 h-12 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center transition shadow-sm"
          variant="light"
        >
          <FiUsers size={28} />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-white text-lg font-semibold">نوبین</span>
        <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm">
          <Avatar
            src="/images/brand/ChatGPT Image Jul 18, 2025, 12_02_21 PM.png"
            alt="logo"
            size="sm"
          />
        </div>
      </div>
      <SettingsModals isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </header>
  );
}
