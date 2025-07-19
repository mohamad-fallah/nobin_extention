import { Button } from "@heroui/react";
import { FiSettings, FiSearch, FiUsers } from "react-icons/fi";
import { useState } from "react";
import SettingsModals from "./modals/settings";
import { CustomAvatar } from "../components";
import clsx from "clsx";

export default function Header() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <header
      className={clsx(
        // Position & Layout
        "relative z-10 w-full",
        "flex items-center justify-between",
        // Spacing
        "py-4 px-8",
      )}
    >
      <div
        className={clsx(
          // Layout
          "flex items-center",
          // Spacing
          "gap-2",
        )}
      >
        <Button
          className={clsx(
            // Size & Shape
            "w-12 h-12 rounded-full",
            // Layout
            "flex items-center justify-center",
            // Background & Colors
            "bg-white",
            // Effects
            "shadow-sm",
            // Interactions
            "hover:bg-gray-100",
            // Transitions
            "transition",
          )}
          variant="light"
          onPress={() => setSettingsOpen(true)}
          data-settings-trigger
        >
          <FiSettings size={28} />
        </Button>
        <Button
          className={clsx(
            // Size & Shape
            "w-12 h-12 rounded-full",
            // Layout
            "flex items-center justify-center",
            // Background & Colors
            "bg-white",
            // Effects
            "shadow-sm",
            // Interactions
            "hover:bg-gray-100",
            // Transitions
            "transition",
          )}
          variant="light"
        >
          <FiSearch size={28} />
        </Button>
        <Button
          className={clsx(
            // Size & Shape
            "w-12 h-12 rounded-full",
            // Layout
            "flex items-center justify-center",
            // Background & Colors
            "bg-white",
            // Effects
            "shadow-sm",
            // Interactions
            "hover:bg-gray-100",
            // Transitions
            "transition",
          )}
          variant="light"
        >
          <FiUsers size={28} />
        </Button>
      </div>
      <div
        className={clsx(
          // Layout
          "flex items-center",
          // Spacing
          "gap-2",
        )}
      >
        <span
          className={clsx(
            // Typography
            "text-white text-lg font-semibold",
          )}
        >
          نوبین
        </span>
        <CustomAvatar
          src="/images/brand/ChatGPT Image Jul 18, 2025, 12_02_21 PM.png"
          alt="نوبین"
          name="نوبین"
          size="md"
          showFallback={true}
          className={clsx(
            // Background & Border
            "bg-white border-2 border-white",
            // Effects
            "shadow-sm",
          )}
          fallbackClassName="from-blue-500 to-purple-600"
        />
      </div>
      <SettingsModals isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </header>
  );
}
