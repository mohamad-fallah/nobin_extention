import { Request, Response, NextFunction } from "express";

/**
 * Utility function to sanitize string inputs
 */
const sanitizeString = (input: string): string => {
  if (typeof input !== "string") return input;

  return input
    .trim()
    .replace(/[<>]/g, "") // Remove basic HTML tags
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .replace(/on\w+=/gi, "") // Remove event handlers
    .slice(0, 1000); // Limit length to prevent abuse
};

/**
 * Utility function to validate email format
 */
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && email.length <= 254;
};

/**
 * Utility function to validate username format
 */
const isValidUsername = (username: string): boolean => {
  // Allow letters, numbers, underscore, dash
  const usernameRegex = /^[a-zA-Z0-9_-]+$/;
  return usernameRegex.test(username);
};

// Validation middleware for user creation
export const validateCreateUser = (req: Request, res: Response, next: NextFunction): void => {
  const { username, email, password, avatar } = req.body;
  const errors: string[] = [];

  // Sanitize inputs
  if (username) req.body.username = sanitizeString(username);
  if (email) req.body.email = sanitizeString(email).toLowerCase();
  if (avatar) req.body.avatar = sanitizeString(avatar);

  // Username validation
  if (!req.body.username || req.body.username.length < 3) {
    errors.push("نام کاربری باید حداقل 3 کاراکتر باشد");
  }

  if (req.body.username && req.body.username.length > 30) {
    errors.push("نام کاربری نمی‌تواند بیشتر از 30 کاراکتر باشد");
  }

  if (req.body.username && !isValidUsername(req.body.username)) {
    errors.push("نام کاربری فقط می‌تواند شامل حروف، اعداد، _ و - باشد");
  }

  // Email validation
  if (!req.body.email || !isValidEmail(req.body.email)) {
    errors.push("ایمیل معتبر نیست");
  }

  // Password validation
  if (!password || password.length < 6) {
    errors.push("رمز عبور باید حداقل 6 کاراکتر باشد");
  }

  if (password && password.length > 128) {
    errors.push("رمز عبور نمی‌تواند بیشتر از 128 کاراکتر باشد");
  }

  // Avatar URL validation (optional)
  if (req.body.avatar && req.body.avatar.length > 500) {
    errors.push("آدرس تصویر نمی‌تواند بیشتر از 500 کاراکتر باشد");
  }

  if (errors.length > 0) {
    res.status(400).json({
      success: false,
      message: "داده‌های ورودی نامعتبر",
      errors,
      code: "VALIDATION_ERROR",
    });
    return;
  }

  next();
};

// Validation middleware for user update
export const validateUpdateUser = (req: Request, res: Response, next: NextFunction): void => {
  const { username, email, avatar } = req.body;
  const errors: string[] = [];

  // Sanitize inputs
  if (username !== undefined) req.body.username = sanitizeString(username);
  if (email !== undefined) req.body.email = sanitizeString(email).toLowerCase();
  if (avatar !== undefined) req.body.avatar = sanitizeString(avatar);

  // Username validation (if provided)
  if (username !== undefined) {
    if (req.body.username.length < 3) {
      errors.push("نام کاربری باید حداقل 3 کاراکتر باشد");
    }

    if (req.body.username.length > 30) {
      errors.push("نام کاربری نمی‌تواند بیشتر از 30 کاراکتر باشد");
    }

    if (!isValidUsername(req.body.username)) {
      errors.push("نام کاربری فقط می‌تواند شامل حروف، اعداد، _ و - باشد");
    }
  }

  // Email validation (if provided)
  if (email !== undefined && !isValidEmail(req.body.email)) {
    errors.push("ایمیل معتبر نیست");
  }

  // Avatar URL validation (if provided)
  if (avatar !== undefined && req.body.avatar.length > 500) {
    errors.push("آدرس تصویر نمی‌تواند بیشتر از 500 کاراکتر باشد");
  }

  if (errors.length > 0) {
    res.status(400).json({
      success: false,
      message: "داده‌های ورودی نامعتبر",
      errors,
      code: "VALIDATION_ERROR",
    });
    return;
  }

  next();
};

// Validation middleware for ID parameter
export const validateId = (req: Request, res: Response, next: NextFunction): void => {
  const { id } = req.params;

  // Check if ID is a valid MongoDB ObjectId
  const objectIdRegex = /^[0-9a-fA-F]{24}$/;

  if (!objectIdRegex.test(id)) {
    res.status(400).json({
      success: false,
      message: "شناسه نامعتبر است",
      code: "INVALID_ID",
    });
    return;
  }

  next();
};

// Validation middleware for login
export const validateLogin = (req: Request, res: Response, next: NextFunction): void => {
  const { email, password } = req.body;
  const errors: string[] = [];

  // Sanitize inputs
  if (email) req.body.email = sanitizeString(email).toLowerCase();

  // Email validation
  if (!req.body.email || !isValidEmail(req.body.email)) {
    errors.push("ایمیل معتبر نیست");
  }

  // Password validation
  if (!password) {
    errors.push("رمز عبور مورد نیاز است");
  }

  if (password && password.length > 128) {
    errors.push("رمز عبور نمی‌تواند بیشتر از 128 کاراکتر باشد");
  }

  if (errors.length > 0) {
    res.status(400).json({
      success: false,
      message: "داده‌های ورودی نامعتبر",
      errors,
      code: "VALIDATION_ERROR",
    });
    return;
  }

  next();
};

// Validation middleware for refresh token
export const validateRefreshToken = (req: Request, res: Response, next: NextFunction): void => {
  const { refreshToken } = req.body;

  if (!refreshToken || typeof refreshToken !== "string") {
    res.status(400).json({
      success: false,
      message: "توکن تازه‌سازی مورد نیاز است",
      code: "MISSING_REFRESH_TOKEN",
    });
    return;
  }

  // Basic JWT format validation
  if (refreshToken.split(".").length !== 3) {
    res.status(400).json({
      success: false,
      message: "فرمت توکن تازه‌سازی نامعتبر است",
      code: "INVALID_TOKEN_FORMAT",
    });
    return;
  }

  next();
};

// Validation middleware for password change
export const validatePasswordChange = (req: Request, res: Response, next: NextFunction): void => {
  const { currentPassword, newPassword } = req.body;
  const errors: string[] = [];

  // Current password validation
  if (!currentPassword || typeof currentPassword !== "string") {
    errors.push("رمز عبور فعلی مورد نیاز است");
  }

  if (currentPassword && currentPassword.length > 128) {
    errors.push("رمز عبور فعلی نمی‌تواند بیشتر از 128 کاراکتر باشد");
  }

  // New password validation
  if (!newPassword || typeof newPassword !== "string") {
    errors.push("رمز عبور جدید مورد نیاز است");
  } else if (newPassword.length < 6) {
    errors.push("رمز عبور جدید باید حداقل ۶ کاراکتر باشد");
  } else if (newPassword.length > 128) {
    errors.push("رمز عبور جدید نمی‌تواند بیشتر از ۱۲۸ کاراکتر باشد");
  }

  // Check if passwords are the same
  if (currentPassword && newPassword && currentPassword === newPassword) {
    errors.push("رمز عبور جدید نمی‌تواند مشابه رمز عبور فعلی باشد");
  }

  // Check for common weak passwords
  const weakPasswords = ["123456", "password", "123123", "admin", "qwerty"];
  if (newPassword && weakPasswords.includes(newPassword.toLowerCase())) {
    errors.push("رمز عبور جدید خیلی ضعیف است. لطفاً رمز عبور قوی‌تری انتخاب کنید");
  }

  if (errors.length > 0) {
    res.status(400).json({
      success: false,
      message: "داده‌های ورودی نامعتبر",
      errors,
      code: "VALIDATION_ERROR",
    });
    return;
  }

  next();
};

/**
 * General sanitization middleware for request body
 */
export const sanitizeRequestBody = (req: Request, res: Response, next: NextFunction): void => {
  if (req.body && typeof req.body === "object") {
    const sanitizedBody: any = {};

    for (const [key, value] of Object.entries(req.body)) {
      if (typeof value === "string") {
        sanitizedBody[key] = sanitizeString(value);
      } else {
        sanitizedBody[key] = value;
      }
    }

    req.body = sanitizedBody;
  }

  next();
};
