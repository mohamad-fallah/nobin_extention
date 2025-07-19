import { Router } from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import { validateCreateUser, validateUpdateUser, validateId } from "../middleware/validation";

const router: Router = Router();

// GET /api/users - Get all users
router.get("/", getAllUsers);

// GET /api/users/:id - Get single user
router.get("/:id", validateId, getUserById);

// POST /api/users - Create new user
router.post("/", validateCreateUser, createUser);

// PUT /api/users/:id - Update user
router.put("/:id", validateId, validateUpdateUser, updateUser);

// DELETE /api/users/:id - Delete user
router.delete("/:id", validateId, deleteUser);

export default router;
