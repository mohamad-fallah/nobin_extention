import { Request, Response, NextFunction } from "express";
import rateLimit from "express-rate-limit";
import { verifyAccessToken, extractTokenFromHeader, TokenPayload } from "../utils/auth";
import { User } from "../models/User";

// Extend Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload & { _id: string };
    }
  }
}

/**
 * Authentication middleware
 */
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const token = extractTokenFromHeader(req.headers.authorization);

    if (!token) {
      res.status(401).json({
        success: false,
        message: "توکن دسترسی مورد نیاز است",
      });
      return;
    }

    const decoded = verifyAccessToken(token);

    // Check if user still exists and is active
    const user = await User.findById(decoded.userId);
    if (!user || !user.isActive) {
      res.status(401).json({
        success: false,
        message: "کاربر یافت نشد یا غیرفعال است",
      });
      return;
    }

    // Add user info to request
    req.user = {
      ...decoded,
      _id: decoded.userId,
    };

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "توکن نامعتبر است",
      error: error instanceof Error ? error.message : "Token verification failed",
    });
  }
};

/**
 * Optional authentication middleware (doesn't fail if no token)
 */
export const optionalAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const token = extractTokenFromHeader(req.headers.authorization);

    if (token) {
      const decoded = verifyAccessToken(token);
      const user = await User.findById(decoded.userId);

      if (user && user.isActive) {
        req.user = {
          ...decoded,
          _id: decoded.userId,
        };
      }
    }

    next();
  } catch (error) {
    // Continue without authentication
    next();
  }
};

/**
 * Rate limiting for authentication endpoints
 */
export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: "تعداد تلاش‌های ورود بیش از حد مجاز. لطفاً 15 دقیقه صبر کنید",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Rate limiting for registration
 */
export const registerRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // Limit each IP to 3 registration attempts per hour
  message: {
    success: false,
    message: "تعداد تلاش‌های ثبت‌نام بیش از حد مجاز. لطفاً 1 ساعت صبر کنید",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Rate limiting for password reset
 */
export const passwordResetRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // Limit each IP to 3 password reset requests per hour
  message: {
    success: false,
    message: "تعداد درخواست‌های بازیابی رمز عبور بیش از حد مجاز",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Check if user is verified
 */
export const requireVerification = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user) {
    res.status(401).json({
      success: false,
      message: "احراز هویت مورد نیاز است",
    });
    return;
  }

  // In a real app, you'd check if user is verified
  // For now, we'll skip this check
  next();
};

/**
 * Admin only middleware
 */
export const requireAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "احراز هویت مورد نیاز است",
      });
      return;
    }

    const user = await User.findById(req.user._id);

    // In a real app, you'd have a role field
    // For now, we'll check if username is 'admin'
    if (!user || user.username !== "admin") {
      res.status(403).json({
        success: false,
        message: "دسترسی مدیر مورد نیاز است",
      });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "خطا در بررسی دسترسی",
    });
  }
};
