import { Card, Button, Spinner } from "@heroui/react";
import { useAuth } from "../../context/AuthContext";
import { CustomAvatar } from "../../components";

export default function ProfileWidget() {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <Card className="bg-white rounded-xl p-4" style={{ height: "200px" }}>
        <div className="flex items-center justify-center h-full">
          <Spinner size="md" color="primary" />
        </div>
      </Card>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <Card className="bg-white rounded-xl p-4" style={{ height: "200px" }}>
        <div className="flex-1 flex flex-col items-center justify-center text-center px-2">
          <div className="text-sm text-gray-600 mb-2">برای استفاده از امکانات کامل وارد شوید</div>
          <div className="text-xs text-gray-400 px-2">
            با ورود به حساب کاربری از امکانات شخصی‌سازی شده استفاده کنید
          </div>
        </div>

        <div className="mt-auto">
          <Button
            size="sm"
            color="primary"
            className="w-full"
            onPress={() => {
              // This will be handled by opening settings modal with account tab
              const settingsBtn = document.querySelector("[data-settings-trigger]") as HTMLElement;
              settingsBtn?.click();
            }}
          >
            ورود / ثبت‌نام
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-white rounded-xl p-4" style={{ height: "200px" }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">👋</span>
          <span className="text-base font-semibold">سلام {user.username}</span>
        </div>
        <CustomAvatar
          src={user.avatar || "/images/avatar/mohammad-fallah.jpg"}
          alt={user.username}
          name={user.username}
          size="md"
          showFallback={true}
          className="border-2 border-white shadow-md"
          fallbackClassName="from-blue-400 to-purple-500"
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center px-2">
        <div className="text-sm text-gray-600 mb-2">
          {user.isVerified ? "حساب شما تأیید شده است ✅" : "حساب شما در انتظار تأیید است ⏳"}
        </div>
        <div className="text-xs text-gray-400 px-2 mb-1">نقش: {getRoleDisplay(user.role)}</div>
        <div className="text-xs text-gray-400 px-2">
          عضو از {new Date(user.createdAt).toLocaleDateString("fa-IR")}
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">{getRoleEmoji(user.role)}</span>
          <div>
            <span className="text-xs font-medium block">پروفایل کامل</span>
            <div className="flex text-xs text-green-400">
              <span>★★★★★</span>
            </div>
          </div>
        </div>
        <Button
          size="sm"
          variant="light"
          className="text-xs"
          onClick={() => {
            const settingsBtn = document.querySelector("[data-settings-trigger]") as HTMLElement;
            settingsBtn?.click();
          }}
        >
          مدیریت حساب
        </Button>
      </div>
    </Card>
  );
}

// Helper functions
const getRoleDisplay = (role: string): string => {
  const roleNames: { [key: string]: string } = {
    admin: "👑 مدیر",
    user: "👤 کاربر",
    vip: "⭐ ویژه",
  };
  return roleNames[role] || role;
};

const getRoleEmoji = (role: string): string => {
  const roleEmojis: { [key: string]: string } = {
    admin: "👑",
    user: "🎯",
    vip: "⭐",
  };
  return roleEmojis[role] || "🎯";
};
