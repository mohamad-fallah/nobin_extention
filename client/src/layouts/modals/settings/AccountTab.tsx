import { useState } from "react";
import {
  Button,
  Input,
  Link,
  Divider,
  Avatar,
  Spinner,
  Card,
  CardHeader,
  CardBody,
} from "@heroui/react";
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
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setUsername(user?.username || "");
    setAvatar(user?.avatar || "");
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
          result = await register({ username, email, password, avatar });
          if (result.success) {
            setMode("profile");
            resetForm();
          }
          break;

        case "editProfile":
          result = await updateProfile({ username, avatar });
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
    } catch (err: any) {
      setError(err.message || "خطای غیرمنتظره‌ای رخ داد");
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
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  // Profile View
  if (mode === "profile" && isAuthenticated && user) {
    return (
      <div className="max-w-md mx-auto space-y-6">
        <Card className="p-6">
          <CardHeader className="flex flex-col items-center space-y-4">
            <Avatar
              src={user.avatar}
              icon={<div className="text-2xl">👤</div>}
              size="lg"
              className="w-20 h-20"
              showFallback
            />
            <div className="text-center">
              <h3 className="text-xl font-bold">{user.username}</h3>
              <p className="text-gray-600 text-sm">{user.email}</p>
              <p className="text-xs text-gray-400 mt-1">
                عضو از {new Date(user.createdAt).toLocaleDateString("fa-IR")}
              </p>
            </div>
          </CardHeader>
          <CardBody className="space-y-3">
            <Button
              color="primary"
              variant="light"
              fullWidth
              startContent={<span>✏️</span>}
              onClick={() => setMode("editProfile")}
            >
              ویرایش پروفایل
            </Button>
            <Button
              color="default"
              variant="light"
              fullWidth
              startContent={<span>🔒</span>}
              onClick={() => setMode("changePassword")}
            >
              تغییر رمز عبور
            </Button>
            <Divider />
            <Button
              color="danger"
              variant="light"
              fullWidth
              startContent={<span>🚪</span>}
              onClick={handleLogout}
            >
              خروج از حساب کاربری
            </Button>
          </CardBody>
        </Card>
      </div>
    );
  }

  // Auth Forms
  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6 text-right">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {mode === "login" && "ورود به حساب کاربری"}
            {mode === "register" && "ثبت‌نام"}
            {mode === "editProfile" && "ویرایش پروفایل"}
            {mode === "changePassword" && "تغییر رمز عبور"}
          </h2>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm text-right">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm text-right">
            {success}
          </div>
        )}

        {/* Login Form */}
        {mode === "login" && (
          <>
            <Input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              startContent={<span className="text-gray-400">📧</span>}
              required
              classNames={{
                input: "text-right",
                inputWrapper: "text-right",
              }}
            />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              startContent={<span className="text-gray-400">🔒</span>}
              endContent={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? <span>🙈</span> : <span>👁️</span>}
                </button>
              }
              required
              classNames={{
                input: "text-right",
                inputWrapper: "text-right",
              }}
            />
          </>
        )}

        {/* Register Form */}
        {mode === "register" && (
          <>
            <Input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              startContent={<span className="text-gray-400">👤</span>}
              required
              classNames={{
                input: "text-right",
                inputWrapper: "text-right",
              }}
            />
            <Input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              startContent={<span className="text-gray-400">📧</span>}
              required
              classNames={{
                input: "text-right",
                inputWrapper: "text-right",
              }}
            />
            <Input
              type="url"
              placeholder="https://example.com/avatar.jpg"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              classNames={{
                input: "text-right",
                inputWrapper: "text-right",
              }}
            />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              startContent={<span className="text-gray-400">🔒</span>}
              endContent={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? <span>🙈</span> : <span>👁️</span>}
                </button>
              }
              required
              classNames={{
                input: "text-right",
                inputWrapper: "text-right",
              }}
            />
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              startContent={<span className="text-gray-400">🔒</span>}
              endContent={
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showConfirmPassword ? <span>🙈</span> : <span>👁️</span>}
                </button>
              }
              required
              classNames={{
                input: "text-right",
                inputWrapper: "text-right",
              }}
            />
          </>
        )}

        {/* Edit Profile Form */}
        {mode === "editProfile" && (
          <>
            <Input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              startContent={<span className="text-gray-400">👤</span>}
              required
              classNames={{
                input: "text-right",
                inputWrapper: "text-right",
              }}
            />
            <Input
              type="url"
              placeholder="https://example.com/avatar.jpg"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              classNames={{
                input: "text-right",
                inputWrapper: "text-right",
              }}
            />
          </>
        )}

        {/* Change Password Form */}
        {mode === "changePassword" && (
          <>
            <Input
              type="password"
              placeholder="••••••••"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              startContent={<span className="text-gray-400">🔒</span>}
              required
              classNames={{
                input: "text-right",
                inputWrapper: "text-right",
              }}
            />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              startContent={<span className="text-gray-400">🔒</span>}
              endContent={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? <span>🙈</span> : <span>👁️</span>}
                </button>
              }
              required
              classNames={{
                input: "text-right",
                inputWrapper: "text-right",
              }}
            />
          </>
        )}

        <Button
          type="submit"
          color="primary"
          className="w-full font-bold"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          {mode === "login" && "ورود به حساب"}
          {mode === "register" && "ثبت‌نام"}
          {mode === "editProfile" && "ذخیره تغییرات"}
          {mode === "changePassword" && "تغییر رمز عبور"}
        </Button>

        {(mode === "editProfile" || mode === "changePassword") && (
          <Button
            type="button"
            color="default"
            variant="light"
            className="w-full"
            onClick={() => {
              setMode("profile");
              resetForm();
            }}
          >
            انصراف
          </Button>
        )}

        <Divider className="my-4" />

        {mode === "login" ? (
          <div className="text-center">
            <Link
              as="button"
              type="button"
              color="primary"
              onClick={() => {
                setMode("register");
                resetForm();
              }}
              className="text-sm"
            >
              حساب کاربری ندارید؟ ثبت‌نام کنید
            </Link>
          </div>
        ) : mode === "register" ? (
          <div className="text-center">
            <Link
              as="button"
              type="button"
              color="primary"
              onClick={() => {
                setMode("login");
                resetForm();
              }}
              className="text-sm"
            >
              حساب کاربری دارید؟ وارد شوید
            </Link>
          </div>
        ) : null}
      </form>
    </div>
  );
}
