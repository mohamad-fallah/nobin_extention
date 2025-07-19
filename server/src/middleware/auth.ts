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
 * Authentication middleware with enhanced security
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
        code: "NO_TOKEN",
      });
      return;
    }

    const decoded = verifyAccessToken(token);

    // Check if user still exists and is active
    const user = await User.findById(decoded.userId);
    if (!user) {
      res.status(401).json({
        success: false,
        message: "کاربر یافت نشد",
        code: "USER_NOT_FOUND",
      });
      return;
    }

    if (!user.isActive) {
      res.status(401).json({
        success: false,
        message: "حساب کاربری غیرفعال است",
        code: "ACCOUNT_INACTIVE",
      });
      return;
    }

    // Check if account is locked
    if (user.isLocked()) {
      res.status(423).json({
        success: false,
        message: "حساب کاربری قفل شده است",
        code: "ACCOUNT_LOCKED",
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
    let errorMessage = "توکن نامعتبر است";
    let errorCode = "INVALID_TOKEN";

    if (error instanceof Error) {
      if (error.message.includes("expired")) {
        errorMessage = "توکن منقضی شده است";
        errorCode = "TOKEN_EXPIRED";
      }
    }

    res.status(401).json({
      success: false,
      message: errorMessage,
      code: errorCode,
      error:
        process.env.NODE_ENV === "development"
          ? error instanceof Error
            ? error.message
            : "Token verification failed"
          : undefined,
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

      if (user && user.isActive && !user.isLocked()) {
        req.user = {
          ...decoded,
          _id: decoded.userId,
        };
      }
    }

    next();
  } catch (error) {
    // Continue without authentication for optional auth
    next();
  }
};

/**
 * Enhanced rate limiting for authentication endpoints
 */
export const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.AUTH_RATE_LIMIT_MAX || "5"), // Limit each IP to 5 requests per windowMs
  skipSuccessfulRequests: false,
  skipFailedRequests: false,
  message: {
    success: false,
    message: "تعداد تلاش‌های ورود بیش از حد مجاز. لطفاً 15 دقیقه صبر کنید",
    code: "LOGIN_RATE_LIMIT",
  },
  standardHeaders: true,
  legacyHeaders: false,
  // Remove custom keyGenerator to use default IPv6-safe implementation
});

/**
 * Enhanced rate limiting for registration
 */
export const registerRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: parseInt(process.env.REGISTER_RATE_LIMIT_MAX || "3"), // Limit each IP to 3 registration attempts per hour
  skipSuccessfulRequests: true, // Don't count successful requests
  skipFailedRequests: false,
  message: {
    success: false,
    message: "تعداد تلاش‌های ثبت‌نام بیش از حد مجاز. لطفاً 1 ساعت صبر کنید",
    code: "REGISTER_RATE_LIMIT",
  },
  standardHeaders: true,
  legacyHeaders: false,
  // Remove custom keyGenerator to use default IPv6-safe implementation
});

/**
 * Rate limiting for password reset and sensitive operations
 */
export const passwordResetRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // Limit each IP to 3 password reset requests per hour
  skipSuccessfulRequests: true,
  skipFailedRequests: false,
  message: {
    success: false,
    message: "تعداد درخواست‌های بازیابی رمز عبور بیش از حد مجاز",
    code: "PASSWORD_RESET_RATE_LIMIT",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Rate limiting for password change operations
 */
export const passwordChangeRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each IP to 5 password change requests per hour
  skipSuccessfulRequests: true,
  message: {
    success: false,
    message: "تعداد تلاش‌های تغییر رمز عبور بیش از حد مجاز",
    code: "PASSWORD_CHANGE_RATE_LIMIT",
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
      code: "AUTHENTICATION_REQUIRED",
    });
    return;
  }

  // In a real app, you'd check if user is verified
  // For now, we'll skip this check
  next();
};

/**
 * Admin only middleware with role-based access
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
        code: "AUTHENTICATION_REQUIRED",
      });
      return;
    }

    const user = await User.findById(req.user._id);

    if (!user || !user.isAdmin()) {
      res.status(403).json({
        success: false,
        message: "دسترسی مدیر مورد نیاز است",
        code: "ADMIN_ACCESS_REQUIRED",
      });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "خطا در بررسی دسترسی",
      code: "ACCESS_CHECK_ERROR",
    });
  }
};

/**
 * VIP only middleware
 */
export const requireVip = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "احراز هویت مورد نیاز است",
        code: "AUTHENTICATION_REQUIRED",
      });
      return;
    }

    const user = await User.findById(req.user._id);

    if (!user || !user.isVip()) {
      res.status(403).json({
        success: false,
        message: "دسترسی VIP مورد نیاز است",
        code: "VIP_ACCESS_REQUIRED",
      });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "خطا در بررسی دسترسی",
      code: "ACCESS_CHECK_ERROR",
    });
  }
};

/**
 * Admin or VIP middleware
 */
export const requireAdminOrVip = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "احراز هویت مورد نیاز است",
        code: "AUTHENTICATION_REQUIRED",
      });
      return;
    }

    const user = await User.findById(req.user._id);

    if (!user || (!user.isAdmin() && !user.isVip())) {
      res.status(403).json({
        success: false,
        message: "دسترسی مدیر یا VIP مورد نیاز است",
        code: "ELEVATED_ACCESS_REQUIRED",
      });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "خطا در بررسی دسترسی",
      code: "ACCESS_CHECK_ERROR",
    });
  }
};
