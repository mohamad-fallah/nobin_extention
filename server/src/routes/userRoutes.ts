import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  changeUserRole,
  getRoleStats,
} from "../controllers/userController";
import { authenticate, requireAdmin } from "../middleware/auth";
import {
  validateCreateUser,
  validateUpdateUser,
  validateId,
  validateRoleChange,
} from "../middleware/validation";

const router: Router = Router();

// Admin routes - require admin privileges
router.get("/", authenticate, requireAdmin, getAllUsers);
router.get("/stats/roles", authenticate, requireAdmin, getRoleStats);
router.post("/", authenticate, requireAdmin, validateCreateUser, createUser);
router.put("/:id/role", authenticate, requireAdmin, validateId, validateRoleChange, changeUserRole);
router.delete("/:id", authenticate, requireAdmin, validateId, deleteUser);

// User routes - require authentication, users can access their own data
router.get("/:id", authenticate, validateId, getUserById);
router.put("/:id", authenticate, validateId, validateUpdateUser, updateUser);

export default router;
