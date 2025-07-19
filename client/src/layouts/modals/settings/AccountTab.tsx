import { useState } from "react";
import {
  Button,
  TextField,
  Divider,
  Avatar,
  CircularProgress,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import clsx from "clsx";
import { useAuth } from "../../../context/AuthContext";

type FormMode = "login" | "register" | "profile" | "editProfile" | "changePassword";

export default function AccountTab() {
  const { user, login, register, logout, updateProfile, changePassword, loading, isAuthenticated } =
    useAuth();
  const [mode, setMode] = useState<FormMode>(isAuthenticated ? "profile" : "login");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState(user?.username || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setUsername(user?.username || "");
    setAvatar(user?.avatar || "");
    setAvatarFile(null);
    setCurrentPassword("");
    setNewPassword("");
    setError("");
    setSuccess("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      let result;
      let finalAvatar = avatar;

      // Convert file to base64 if a file is selected
      if (avatarFile) {
        const reader = new FileReader();
        finalAvatar = await new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(avatarFile);
        });
      }

      switch (mode) {
        case "login":
          result = await login({ email, password });
          if (result.success) {
            setMode("profile");
            resetForm();
          }
          break;

        case "register":
          if (password !== confirmPassword) {
            setError("رمز عبور و تکرار آن یکسان نیستند");
            return;
          }
          result = await register({ username, email, password, avatar: finalAvatar });
          if (result.success) {
            setMode("profile");
            resetForm();
          }
          break;

        case "editProfile":
          result = await updateProfile({ username, avatar: finalAvatar });
          if (result.success) {
            setSuccess("پروفایل با موفقیت به‌روزرسانی شد");
            setMode("profile");
          }
          break;

        case "changePassword":
          if (newPassword.length < 6) {
            setError("رمز عبور جدید باید حداقل 6 کاراکتر باشد");
            return;
          }
          result = await changePassword({ currentPassword, newPassword });
          if (result.success) {
            setSuccess("رمز عبور با موفقیت تغییر یافت");
            setMode("profile");
            resetForm();
          }
          break;
      }

      if (result && !result.success) {
        setError(result.message);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "خطای غیرمنتظره‌ای رخ داد");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setMode("login");
    resetForm();
  };

  if (loading) {
    return (
      <div
        className={clsx(
          // Layout
          "flex justify-center items-center",
          // Spacing
          "h-64",
        )}
      >
        <CircularProgress size="lg" color="primary" />
      </div>
    );
  }

  // Profile View
  if (mode === "profile" && isAuthenticated && user) {
    return (
      <div
        className={clsx(
          // Layout
          "max-w-md mx-auto",
          // Spacing
          "space-y-6",
        )}
      >
        <Card className="p-6">
          <CardHeader
            className={clsx(
              // Layout
              "flex flex-col items-center",
              // Spacing
              "space-y-4",
            )}
          >
            <Avatar
              src={user.avatar}
              icon={<div className="text-2xl">👤</div>}
              size="lg"
              className="w-20 h-20"
              showFallback
            />
            <div className="text-center">
              <h3
                className={clsx(
                  // Typography
                  "text-xl font-bold",
                )}
              >
                {user.username}
              </h3>
              <p
                className={clsx(
                  // Typography
                  "text-gray-600 text-sm",
                )}
              >
                {user.email}
              </p>
              <p
                className={clsx(
                  // Typography
                  "text-xs text-gray-400",
                  // Spacing
                  "mt-1",
                )}
              >
                عضو از {new Date(user.createdAt).toLocaleDateString("fa-IR")}
              </p>
            </div>
          </CardHeader>
          <CardContent
            className={clsx(
              // Spacing
              "space-y-3",
            )}
          >
            <Button
              color="primary"
              variant="solid"
              fullWidth
              className={clsx(
                // Typography
                "font-semibold",
                // Colors & Effects
                "bg-gradient-to-r from-blue-500 to-indigo-500",
                "hover:from-blue-600 hover:to-indigo-600",
                "shadow-md hover:shadow-lg",
                "transition-all duration-300",
                // Layout
                "rounded-lg",
                // Interactions
                "transform hover:scale-[1.02]",
              )}
              startContent={<span className="text-lg">✏️</span>}
              onPress={() => setMode("editProfile")}
            >
              ویرایش پروفایل
            </Button>
            <Button
              color="default"
              variant="solid"
              fullWidth
              className={clsx(
                // Typography
                "font-semibold",
                // Colors & Effects
                "bg-gradient-to-r from-gray-500 to-gray-600",
                "hover:from-gray-600 hover:to-gray-700",
                "text-white",
                "shadow-md hover:shadow-lg",
                "transition-all duration-300",
                // Layout
                "rounded-lg",
                // Interactions
                "transform hover:scale-[1.02]",
              )}
              startContent={<span className="text-lg">🔒</span>}
              onPress={() => setMode("changePassword")}
            >
              تغییر رمز عبور
            </Button>
            <Divider />
            <Button
              color="danger"
              variant="bordered"
              fullWidth
              className={clsx(
                // Typography
                "font-semibold",
                // Colors & Effects
                "border-2 border-red-300",
                "hover:border-red-400",
                "hover:bg-red-50",
                "text-red-600 hover:text-red-700",
                "transition-all duration-300",
                // Layout
                "rounded-lg",
                // Interactions
                "transform hover:scale-[1.02]",
              )}
              startContent={<span className="text-lg">🚪</span>}
              onPress={handleLogout}
            >
              خروج از حساب کاربری
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Auth Forms
  return (
    <div className="max-w-md mx-auto">
      <form
        onSubmit={handleSubmit}
        className={clsx(
          // Spacing
          "space-y-6",
          // Typography
          "text-right",
        )}
      >
        <div
          className={clsx(
            // Typography
            "text-center",
            // Spacing
            "mb-6",
          )}
        >
          <h2
            className={clsx(
              // Typography
              "text-2xl font-bold text-gray-900",
            )}
          >
            {mode === "login" && "ورود به حساب کاربری"}
            {mode === "register" && "ثبت‌نام"}
            {mode === "editProfile" && "ویرایش پروفایل"}
            {mode === "changePassword" && "تغییر رمز عبور"}
          </h2>
        </div>

        {error && (
          <div
            className={clsx(
              // Colors
              "bg-red-50 border border-red-200 text-red-700",
              // Spacing
              "px-4 py-3",
              // Typography
              "text-sm text-right",
              // Layout
              "rounded-md",
            )}
          >
            {error}
          </div>
        )}

        {success && (
          <div
            className={clsx(
              // Colors
              "bg-green-50 border border-green-200 text-green-700",
              // Spacing
              "px-4 py-3",
              // Typography
              "text-sm text-right",
              // Layout
              "rounded-md",
            )}
          >
            {success}
          </div>
        )}

        {/* Login Form */}
        {mode === "login" && (
          <div
            className={clsx(
              // Spacing
              "space-y-4",
            )}
          >
            <div
              className={clsx(
                // Spacing
                "space-y-2",
              )}
            >
              <label
                className={clsx(
                  // Typography
                  "block text-sm font-medium text-gray-700",
                  // Layout
                  "text-right",
                )}
              >
                ایمیل
              </label>
              <TextField
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>

            <div
              className={clsx(
                // Spacing
                "space-y-2",
              )}
            >
              <label
                className={clsx(
                  // Typography
                  "block text-sm font-medium text-gray-700",
                  // Layout
                  "text-right",
                )}
              >
                رمز عبور
              </label>
              <TextField
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endContent={
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    onPress={() => setShowPassword(!showPassword)}
                    className={clsx(
                      "text-gray-400 hover:text-gray-600",
                      "focus:outline-none outline-none",
                    )}
                  >
                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </Button>
                }
                required
                className="w-full"
              />
            </div>
          </div>
        )}

        {/* Register Form */}
        {mode === "register" && (
          <div
            className={clsx(
              // Spacing
              "space-y-4",
            )}
          >
            <div
              className={clsx(
                // Spacing
                "space-y-2",
              )}
            >
              <label
                className={clsx(
                  // Typography
                  "block text-sm font-medium text-gray-700",
                  // Layout
                  "text-right",
                )}
              >
                نام کاربری
              </label>
              <TextField
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full"
              />
            </div>

            <div
              className={clsx(
                // Spacing
                "space-y-2",
              )}
            >
              <label
                className={clsx(
                  // Typography
                  "block text-sm font-medium text-gray-700",
                  // Layout
                  "text-right",
                )}
              >
                ایمیل
              </label>
              <TextField
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>

            <div
              className={clsx(
                // Spacing
                "space-y-2",
              )}
            >
              <label
                className={clsx(
                  // Typography
                  "block text-sm font-medium text-gray-700",
                  // Layout
                  "text-right",
                )}
              >
                تصویر پروفایل (اختیاری)
              </label>
              <div
                className={clsx(
                  // Layout
                  "flex items-center gap-3",
                )}
              >
                <div
                  className={clsx(
                    // Layout
                    "relative",
                  )}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setAvatarFile(file);
                        // Create preview URL
                        const url = URL.createObjectURL(file);
                        setAvatar(url);
                      }
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    id="avatar-upload"
                  />
                  <label
                    htmlFor="avatar-upload"
                    className={clsx(
                      // Layout
                      "inline-flex items-center gap-2",
                      // Typography
                      "text-sm font-medium",
                      // Colors & Effects
                      "bg-blue-500",
                      "text-white",
                      "shadow-md hover:shadow-lg",
                      "transition-all duration-200",
                      // Spacing
                      "px-4 py-2",
                      // Layout
                      "rounded-lg",
                      // Interactions
                      "cursor-pointer",
                      "transform hover:scale-[1.02]",
                    )}
                  >
                    <span>{avatarFile ? "تغییر عکس" : "انتخاب عکس"}</span>
                  </label>
                </div>

                {(avatar || avatarFile) && (
                  <div
                    className={clsx(
                      // Layout
                      "flex items-center gap-2",
                    )}
                  >
                    <Avatar src={avatar} size="sm" className="w-10 h-10" showFallback />
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      color="danger"
                      onPress={() => {
                        setAvatar(user?.avatar || "");
                        setAvatarFile(null);
                      }}
                      className={clsx(
                        // Layout
                        "inline-flex items-center",
                        // Typography
                        "text-xs",
                        // Colors & Effects
                        "text-red-500 hover:text-red-700",
                        "hover:bg-red-50",
                        // Spacing
                        "p-1",
                        // Layout
                        "rounded",
                        // Interactions
                        "transition-colors duration-200",
                        "cursor-pointer",
                      )}
                      title="حذف عکس"
                    >
                      <span className="text-sm">🗑️</span>
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div
              className={clsx(
                // Layout
                "flex gap-4",
                // Spacing
                "space-y-0",
              )}
            >
              <div
                className={clsx(
                  // Layout
                  "flex-1",
                  // Spacing
                  "space-y-2",
                )}
              >
                <label
                  className={clsx(
                    // Typography
                    "block text-sm font-medium text-gray-700",
                    // Layout
                    "text-right",
                  )}
                >
                  رمز عبور
                </label>
                <TextField
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  endContent={
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      onPress={() => setShowPassword(!showPassword)}
                      className={clsx(
                        "text-gray-400 hover:text-gray-600",
                        "focus:outline-none outline-none",
                      )}
                    >
                      {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </Button>
                  }
                  required
                  className="w-full"
                />
              </div>

              <div
                className={clsx(
                  // Layout
                  "flex-1",
                  // Spacing
                  "space-y-2",
                )}
              >
                <label
                  className={clsx("block text-sm font-medium text-gray-700", "text-right mb-2")}
                >
                  تکرار رمز عبور
                </label>

                <TextField
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  endContent={
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                      className={clsx(
                        "text-gray-400 hover:text-gray-600",
                        "focus:outline-none outline-none",
                      )}
                    >
                      {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                    </Button>
                  }
                  required
                  className="w-full"
                />
              </div>
            </div>
          </div>
        )}

        {/* Edit Profile Form */}
        {mode === "editProfile" && (
          <div
            className={clsx(
              // Spacing
              "space-y-4",
            )}
          >
            <div
              className={clsx(
                // Spacing
                "space-y-2",
              )}
            >
              <label
                className={clsx(
                  // Typography
                  "block text-sm font-medium text-gray-700",
                  // Layout
                  "text-right",
                )}
              >
                نام کاربری
              </label>
              <TextField
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full"
              />
            </div>

            <div
              className={clsx(
                // Spacing
                "space-y-2",
              )}
            >
              <label
                className={clsx(
                  // Typography
                  "block text-sm font-medium text-gray-700",
                  // Layout
                  "text-right",
                )}
              >
                تصویر پروفایل
              </label>
              <div
                className={clsx(
                  // Layout
                  "flex items-center gap-3",
                )}
              >
                <div
                  className={clsx(
                    // Layout
                    "relative",
                  )}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setAvatarFile(file);
                        // Create preview URL
                        const url = URL.createObjectURL(file);
                        setAvatar(url);
                      }
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    id="avatar-upload-edit"
                  />
                  <label
                    htmlFor="avatar-upload-edit"
                    className={clsx(
                      // Layout
                      "inline-flex items-center gap-2",
                      // Typography
                      "text-sm font-medium",
                      // Colors & Effects
                      "bg-gradient-to-r from-purple-500 to-pink-500",
                      "hover:from-purple-600 hover:to-pink-600",
                      "text-white",
                      "shadow-md hover:shadow-lg",
                      "transition-all duration-200",
                      // Spacing
                      "px-4 py-2",
                      // Layout
                      "rounded-lg",
                      // Interactions
                      "cursor-pointer",
                      "transform hover:scale-[1.02]",
                    )}
                  >
                    <span className="text-base">📸</span>
                    <span>{avatarFile ? "تغییر عکس" : "انتخاب عکس"}</span>
                  </label>
                </div>

                {(avatar || avatarFile) && (
                  <div
                    className={clsx(
                      // Layout
                      "flex items-center gap-2",
                    )}
                  >
                    <Avatar src={avatar} size="sm" className="w-10 h-10" showFallback />
                    <Button
                      isIconOnly
                      size="sm"
                      variant="light"
                      color="danger"
                      onPress={() => {
                        setAvatar(user?.avatar || "");
                        setAvatarFile(null);
                      }}
                      className={clsx(
                        // Layout
                        "inline-flex items-center",
                        // Typography
                        "text-xs",
                        // Colors & Effects
                        "text-red-500 hover:text-red-700",
                        "hover:bg-red-50",
                        // Spacing
                        "p-1",
                        // Layout
                        "rounded",
                        // Interactions
                        "transition-colors duration-200",
                        "cursor-pointer",
                      )}
                      title="حذف عکس"
                    >
                      <span className="text-sm">🗑️</span>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Change Password Form */}
        {mode === "changePassword" && (
          <div
            className={clsx(
              // Spacing
              "space-y-4",
            )}
          >
            <div
              className={clsx(
                // Spacing
                "space-y-2",
              )}
            >
              <label
                className={clsx(
                  // Typography
                  "block text-sm font-medium text-gray-700",
                  // Layout
                  "text-right",
                )}
              >
                رمز عبور فعلی
              </label>
              <TextField
                type="password"
                placeholder="••••••••"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="w-full"
              />
            </div>

            <div
              className={clsx(
                // Spacing
                "space-y-2",
              )}
            >
              <label
                className={clsx(
                  // Typography
                  "block text-sm font-medium text-gray-700",
                  // Layout
                  "text-right",
                )}
              >
                رمز عبور جدید
              </label>
              <TextField
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                endContent={
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    onPress={() => setShowPassword(!showPassword)}
                    className={clsx(
                      "text-gray-400 hover:text-gray-600",
                      "focus:outline-none outline-none",
                    )}
                  >
                    {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                  </Button>
                }
                required
                className="w-full"
              />
            </div>
          </div>
        )}

        <Button
          type="submit"
          color="primary"
          className={clsx(
            // Layout
            "w-full",
            // Typography
            " text-lg",
            // Spacing
            "py-3 px-6",
            // Colors & Effects
            "text-white",
            "bg-blue-500",
            "shadow-lg hover:shadow-xl",
            "transition-all duration-300",
            // Interactions
            "transform hover:scale-[1.02]",
            "active:scale-[0.98]",
            // Layout
            "rounded-lg",
          )}
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          {mode === "login" && "ورود به حساب"}
          {mode === "register" && "ایجاد حساب جدید"}
          {mode === "editProfile" && "ذخیره تغییرات"}
          {mode === "changePassword" && "تغییر رمز عبور"}
        </Button>

        {(mode === "editProfile" || mode === "changePassword") && (
          <Button
            type="button"
            color="default"
            variant="bordered"
            className={clsx(
              // Layout
              "w-full",
              // Typography
              "font-medium",
              // Spacing
              "py-2",
              // Colors & Effects
              "border-2 border-gray-300",
              "hover:border-gray-400",
              "hover:bg-gray-50",
              "transition-all duration-200",
              // Layout
              "rounded-lg",
            )}
            startContent={<span className="text-lg">↩️</span>}
            onPress={() => {
              setMode("profile");
              resetForm();
            }}
          >
            انصراف
          </Button>
        )}

        {mode === "login" ? (
          <div className="text-center">
            <Button
              type="button"
              color="secondary"
              variant="light"
              fullWidth
              className={clsx(
                // Typography
                "text-sm font-medium",
                // Colors & Effects
                "hover:bg-purple-50",
                "transition-all duration-200",
                // Spacing
                "py-2",
                // Layout
                "rounded-lg",
              )}
              onPress={() => {
                setMode("register");
                resetForm();
              }}
            >
              حساب کاربری ندارید؟ ثبت‌نام کنید
            </Button>
          </div>
        ) : mode === "register" ? (
          <div className="text-center">
            <Button
              type="button"
              color="primary"
              variant="light"
              fullWidth
              className={clsx(
                // Typography
                "text-sm font-medium",
                // Colors & Effects
                "hover:bg-blue-50",
                "transition-all duration-200",
                // Spacing
                "py-2",
                // Layout
                "rounded-lg",
              )}
              startContent={<span className="text-base">🔑</span>}
              onPress={() => {
                setMode("login");
                resetForm();
              }}
            >
              حساب کاربری دارید؟ وارد شوید
            </Button>
          </div>
        ) : null}
      </form>
    </div>
  );
}
