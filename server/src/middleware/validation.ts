import { Request, Response, NextFunction } from "express";

// Validation middleware for user creation
export const validateCreateUser = (req: Request, res: Response, next: NextFunction): void => {
  const { username, email, password } = req.body;
  const errors: string[] = [];

  // Username validation
  if (!username || username.trim().length < 3) {
    errors.push("نام کاربری باید حداقل 3 کاراکتر باشد");
  }

  if (username && username.trim().length > 30) {
    errors.push("نام کاربری نمی‌تواند بیشتر از 30 کاراکتر باشد");
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push("ایمیل معتبر نیست");
  }

  // Password validation
  if (!password || password.length < 6) {
    errors.push("رمز عبور باید حداقل 6 کاراکتر باشد");
  }

  if (errors.length > 0) {
    res.status(400).json({
      success: false,
      message: "داده‌های ورودی نامعتبر",
      errors,
    });
    return;
  }

  next();
};

// Validation middleware for user update
export const validateUpdateUser = (req: Request, res: Response, next: NextFunction): void => {
  const { username, email } = req.body;
  const errors: string[] = [];

  // Username validation (if provided)
  if (username !== undefined) {
    if (username.trim().length < 3) {
      errors.push("نام کاربری باید حداقل 3 کاراکتر باشد");
    }

    if (username.trim().length > 30) {
      errors.push("نام کاربری نمی‌تواند بیشتر از 30 کاراکتر باشد");
    }
  }

  // Email validation (if provided)
  if (email !== undefined) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push("ایمیل معتبر نیست");
    }
  }

  if (errors.length > 0) {
    res.status(400).json({
      success: false,
      message: "داده‌های ورودی نامعتبر",
      errors,
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
    });
    return;
  }

  next();
};

// Validation middleware for login
export const validateLogin = (req: Request, res: Response, next: NextFunction): void => {
  const { email, password } = req.body;
  const errors: string[] = [];

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.push("ایمیل معتبر نیست");
  }

  // Password validation
  if (!password) {
    errors.push("رمز عبور مورد نیاز است");
  }

  if (errors.length > 0) {
    res.status(400).json({
      success: false,
      message: "داده‌های ورودی نامعتبر",
      errors,
    });
    return;
  }

  next();
};

// Validation middleware for refresh token
export const validateRefreshToken = (req: Request, res: Response, next: NextFunction): void => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(400).json({
      success: false,
      message: "توکن تازه‌سازی مورد نیاز است",
    });
    return;
  }

  next();
};
