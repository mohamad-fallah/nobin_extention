import { Request, Response, NextFunction } from "express";

// Global error handler
export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  console.error("Error:", err);

  // MongoDB duplicate key error
  if (err.name === "MongoError" && (err as Error & { code?: number }).code === 11000) {
    res.status(400).json({
      success: false,
      message: "داده تکراری است",
      error: "Duplicate field value",
    });
    return;
  }

  // MongoDB validation error
  if (err.name === "ValidationError") {
    const validationErrors = Object.values(
      (err as Error & { errors?: Record<string, { message: string }> }).errors || {},
    ).map((error) => error.message);

    res.status(400).json({
      success: false,
      message: "خطا در اعتبارسنجی داده‌ها",
      errors: validationErrors,
    });
    return;
  }

  // MongoDB cast error (invalid ObjectId)
  if (err.name === "CastError") {
    res.status(400).json({
      success: false,
      message: "شناسه نامعتبر است",
      error: "Invalid ID format",
    });
    return;
  }

  // Default error
  res.status(500).json({
    success: false,
    message: "خطای داخلی سرور",
    error: process.env.NODE_ENV === "development" ? err.message : "Something went wrong",
  });
};

// 404 handler
export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    message: "مسیر یافت نشد",
    path: req.originalUrl,
  });
};
