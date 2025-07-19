import express, { Router } from "express";
import userRoutes from "./userRoutes";
import authRoutes from "./authRoutes";

const router: Router = express.Router();

// API Routes
router.get("/", (req, res) => {
  res.json({
    message: "API is working! 🎉",
    version: "1.0.0",
    endpoints: [
      "GET /api - This endpoint",
      "GET /api/health - Health check",
      "GET /api/status - Server status",
      "GET /api/users - Get all users",
      "GET /api/users/:id - Get single user",
      "POST /api/users - Create new user",
      "PUT /api/users/:id - Update user",
      "DELETE /api/users/:id - Delete user",
      "",
      "Authentication:",
      "POST /api/auth/register - Register new user",
      "POST /api/auth/login - Login user",
      "POST /api/auth/refresh - Refresh access token",
      "POST /api/auth/logout - Logout user",
      "POST /api/auth/logout-all - Logout from all devices",
      "GET /api/auth/profile - Get user profile",
      "PUT /api/auth/profile - Update user profile",
    ],
  });
});

router.get("/health", (req, res) => {
  res.json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    memory: process.memoryUsage(),
  });
});

router.get("/status", (req, res) => {
  res.json({
    server: "Nobin Express TypeScript Server",
    status: "Running",
    environment: process.env.NODE_ENV || "development",
    nodeVersion: process.version,
    timestamp: new Date().toISOString(),
  });
});

// User routes
router.use("/users", userRoutes);

// Auth routes
router.use("/auth", authRoutes);

export default router;
