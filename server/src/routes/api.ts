import express, { Router } from "express";

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

export default router;
