import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import dotenv from "dotenv";
import apiRoutes from "./routes/api";
import { connectDB } from "./config/database";
import { globalErrorHandler, notFoundHandler } from "./controllers/errorController";

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(compression()); // Compress responses
app.use(morgan("combined")); // Request logging
app.use(express.json({ limit: "10mb" })); // Parse JSON bodies
app.use(express.urlencoded({ extended: true, limit: "10mb" })); // Parse URL-encoded bodies

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Nobin Express TypeScript Server! 🚀",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use("/api", apiRoutes);

// 404 handler
app.use("*", notFoundHandler);

// Error handling middleware
app.use(globalErrorHandler);

// Start server
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
      console.log(`📝 Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(`⏰ Started at: ${new Date().toISOString()}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

export default app; 