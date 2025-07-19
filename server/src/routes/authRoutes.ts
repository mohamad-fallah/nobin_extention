import { Router } from "express";
import {
  register,
  login,
  refreshToken,
  logout,
  logoutAll,
  getProfile,
  updateProfile,
} from "../controllers/authController";
import { authenticate, authRateLimit, registerRateLimit } from "../middleware/auth";
import {
  validateCreateUser,
  validateUpdateUser,
  validateLogin,
  validateRefreshToken,
} from "../middleware/validation";

const router: Router = Router();

// Public routes (no authentication required)
router.post("/register", registerRateLimit, validateCreateUser, register);
router.post("/login", authRateLimit, validateLogin, login);
router.post("/refresh", validateRefreshToken, refreshToken);

// Protected routes (authentication required)
router.post("/logout", authenticate, logout);
router.post("/logout-all", authenticate, logoutAll);
router.get("/profile", authenticate, getProfile);
router.put("/profile", authenticate, validateUpdateUser, updateProfile);

export default router;
