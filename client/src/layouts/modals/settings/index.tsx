import { useState } from "react";
import clsx from "clsx";
import GeneralTab from "./GeneralTab";
import AccountTab from "./AccountTab";
import AppearanceTab from "./AppearanceTab";
import BackgroundTab from "./BackgroundTab";

import PetTab from "./PetTab";
import MinersTab from "./MinersTab";
import AboutTab from "./AboutTab";
import { Modal, ModalContent, ModalHeader, ModalBody, Button } from "@heroui/react";
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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="5xl"
      placement="center"
      scrollBehavior="inside"
      hideCloseButton={true}
      style={{ zIndex: 9999 }}
      portalContainer={document.getElementById("modal-root") || document.body}
      classNames={{
        wrapper: "fixed inset-0 z-[9999] flex items-center justify-center p-4",
        backdrop: "fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm",
        base: "z-[9999] max-w-[50vw] max-h-[73vh] w-full",
        body: "p-0",
      }}
    >
      <ModalContent className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <ModalHeader className="p-0">
          <div
            className="w-full h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6"
            dir="rtl"
          >
            <h2 className="text-xl font-semibold text-gray-800">تنظیمات</h2>
            <Button
              isIconOnly
              variant="light"
              onPress={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800"
            >
              ✕
            </Button>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="flex h-[600px]" dir="rtl">
            {/* Sidebar - تب‌ها */}
            <div className="w-64 bg-white border-l border-gray-100 flex flex-col">
              <div className="p-4 space-y-1">
                {tabs.map((tab) => (
                  <Button
                    key={tab.key}
                    onPress={() => setSelectedTab(tab.key)}
                    variant={selectedTab === tab.key ? "solid" : "light"}
                    color={selectedTab === tab.key ? "primary" : "default"}
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
                    startContent={<span className="text-lg">{tab.icon}</span>}
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
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
