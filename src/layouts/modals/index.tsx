import { useState } from "react";
import GeneralTab from "./GeneralTab";
import AccountTab from "./AccountTab";
import AppearanceTab from "./AppearanceTab";
import BackgroundTab from "./BackgroundTab";
import WeatherTab from "./WeatherTab";
import PetTab from "./PetTab";
import MinersTab from "./MinersTab";
import AboutTab from "./AboutTab";
import { Modal, ModalContent, ModalBody } from "@heroui/react";

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
  const [selectedTab, setSelectedTab] = useState("weather");

  const currentTab = tabs.find((tab) => tab.key === selectedTab);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="4xl"
      placement="center"
      hideCloseButton={true}
      classNames={{
        base: "bg-transparent",
        backdrop: "bg-black/30 backdrop-blur-sm",
        wrapper: "flex items-center justify-center p-4",
        body: "p-0",
      }}
    >
      <ModalContent className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <ModalBody className="p-0">
          <div className="flex h-[600px]" dir="rtl">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 z-10">
              <h2 className="text-xl font-semibold text-gray-800">تنظیمات</h2>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Sidebar - تب‌ها */}
            <div className="w-64 bg-white border-l border-gray-100 flex flex-col pt-16">
              <div className="p-4 space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setSelectedTab(tab.key)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 flex items-center justify-start gap-3 ${
                      selectedTab === tab.key
                        ? "bg-blue-500 text-white shadow-lg"
                        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    <span>{tab.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 pt-16 bg-gray-50">
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
