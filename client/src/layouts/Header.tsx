import { Button } from "@heroui/react";
import { FiSettings, FiSearch, FiUsers } from "react-icons/fi";
import { useState } from "react";
import SettingsModals from "./modals/settings";
import { CustomAvatar } from "../components";

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
        <CustomAvatar
          src="/images/brand/ChatGPT Image Jul 18, 2025, 12_02_21 PM.png"
          alt="نوبین"
          name="نوبین"
          size="md"
          showFallback={true}
          className="bg-white border-2 border-white shadow-sm"
          fallbackClassName="from-blue-500 to-purple-600"
        />
      </div>
      <SettingsModals isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </header>
  );
}
