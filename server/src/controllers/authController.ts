import { Request, Response } from "express";
import { Types } from "mongoose";
import { User } from "../models/User";
import { generateTokens, verifyRefreshToken, TokenPayload, validatePassword } from "../utils/auth";
import crypto from "crypto";

/**
 * Register new user
 */
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password, avatar } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      res.status(400).json({
        success: false,
        message:
          existingUser.email === email
            ? "کاربری با این ایمیل قبلاً ثبت‌نام کرده است"
            : "نام کاربری قبلاً استفاده شده است",
      });
      return;
    }

    // Create new user
    const newUser = new User({
      username,
      email,
      password, // Will be hashed by the pre-save hook
      avatar,
      isVerified: true, // In production, set to false and send verification email
    });

    await newUser.save();

    // Generate tokens
    const tokenPayload: TokenPayload = {
      userId: String(newUser._id),
      username: newUser.username,
      email: newUser.email,
    };

    const tokens = generateTokens(tokenPayload);

    // Save refresh token
    newUser.refreshTokens.push(tokens.refreshToken);
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "ثبت‌نام با موفقیت انجام شد",
      data: {
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          avatar: newUser.avatar,
          isVerified: newUser.isVerified,
          createdAt: newUser.createdAt,
        },
        tokens,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "خطا در ثبت‌نام کاربر",
      error: error instanceof Error ? error.message : "Registration failed",
    });
  }
};

/**
 * Login user
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find user and include password field
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      res.status(401).json({
        success: false,
        message: "ایمیل یا رمز عبور اشتباه است",
      });
      return;
    }

    // Check if account is locked
    if (user.isLocked()) {
      res.status(423).json({
        success: false,
        message: "حساب کاربری به دلیل تلاش‌های ناموفق زیاد قفل شده است",
      });
      return;
    }

    // Check if user is active
    if (!user.isActive) {
      res.status(401).json({
        success: false,
        message: "حساب کاربری غیرفعال است",
      });
      return;
    }

    // Compare password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      // Increment login attempts
      await user.incrementLoginAttempts();

      res.status(401).json({
        success: false,
        message: "ایمیل یا رمز عبور اشتباه است",
      });
      return;
    }

    // Reset login attempts on successful login
    if (user.loginAttempts > 0) {
      await user.resetLoginAttempts();
    }

    // Update last login
    user.lastLoginAt = new Date();

    // Generate tokens
    const tokenPayload: TokenPayload = {
      userId: String(user._id),
      username: user.username,
      email: user.email,
    };

    const tokens = generateTokens(tokenPayload);

    // Save refresh token
    user.refreshTokens.push(tokens.refreshToken);

    // Limit refresh tokens (keep only last 5)
    if (user.refreshTokens.length > 5) {
      user.refreshTokens = user.refreshTokens.slice(-5);
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "ورود موفقیت‌آمیز",
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
          isVerified: user.isVerified,
          lastLoginAt: user.lastLoginAt,
        },
        tokens,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "خطا در ورود کاربر",
      error: error instanceof Error ? error.message : "Login failed",
    });
  }
};

/**
 * Refresh access token
 */
export const refreshToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(401).json({
        success: false,
        message: "توکن تازه‌سازی مورد نیاز است",
      });
      return;
    }

    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken);

    // Find user and check if refresh token exists
    const user = await User.findById(decoded.userId);

    if (!user || !user.refreshTokens.includes(refreshToken)) {
      res.status(401).json({
        success: false,
        message: "توکن تازه‌سازی نامعتبر است",
      });
      return;
    }

    // Check if user is still active
    if (!user.isActive) {
      res.status(401).json({
        success: false,
        message: "حساب کاربری غیرفعال است",
      });
      return;
    }

    // Generate new tokens
    const tokenPayload: TokenPayload = {
      userId: String(user._id),
      username: user.username,
      email: user.email,
    };

    const tokens = generateTokens(tokenPayload);

    // Replace old refresh token with new one
    const tokenIndex = user.refreshTokens.indexOf(refreshToken);
    user.refreshTokens[tokenIndex] = tokens.refreshToken;

    await user.save();

    res.status(200).json({
      success: true,
      message: "توکن با موفقیت تازه‌سازی شد",
      data: {
        tokens,
      },
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "توکن تازه‌سازی نامعتبر است",
      error: error instanceof Error ? error.message : "Token refresh failed",
    });
  }
};

/**
 * Logout user
 */
export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const { refreshToken } = req.body;
    const userId = req.user?._id;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "احراز هویت مورد نیاز است",
      });
      return;
    }

    // Remove refresh token from user
    if (refreshToken) {
      await User.findByIdAndUpdate(userId, {
        $pull: { refreshTokens: refreshToken },
      });
    }

    res.status(200).json({
      success: true,
      message: "خروج موفقیت‌آمیز",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "خطا در خروج کاربر",
      error: error instanceof Error ? error.message : "Logout failed",
    });
  }
};

/**
 * Logout from all devices
 */
export const logoutAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "احراز هویت مورد نیاز است",
      });
      return;
    }

    // Clear all refresh tokens
    await User.findByIdAndUpdate(userId, {
      $set: { refreshTokens: [] },
    });

    res.status(200).json({
      success: true,
      message: "خروج از همه دستگاه‌ها موفقیت‌آمیز",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "خطا در خروج از همه دستگاه‌ها",
      error: error instanceof Error ? error.message : "Logout all failed",
    });
  }
};

/**
 * Get current user profile
 */
export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "احراز هویت مورد نیاز است",
      });
      return;
    }

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "کاربر یافت نشد",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
          isVerified: user.isVerified,
          lastLoginAt: user.lastLoginAt,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "خطا در دریافت پروفایل",
      error: error instanceof Error ? error.message : "Get profile failed",
    });
  }
};

/**
 * Update user profile
 */
export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;
    const { username, avatar } = req.body;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "احراز هویت مورد نیاز است",
      });
      return;
    }

    // Check if username is already taken
    if (username) {
      const existingUser = await User.findOne({
        username,
        _id: { $ne: userId },
      });

      if (existingUser) {
        res.status(400).json({
          success: false,
          message: "نام کاربری قبلاً استفاده شده است",
        });
        return;
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, avatar },
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      res.status(404).json({
        success: false,
        message: "کاربر یافت نشد",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "پروفایل با موفقیت به‌روزرسانی شد",
      data: {
        user: {
          id: updatedUser._id,
          username: updatedUser.username,
          email: updatedUser.email,
          avatar: updatedUser.avatar,
          isVerified: updatedUser.isVerified,
          lastLoginAt: updatedUser.lastLoginAt,
          createdAt: updatedUser.createdAt,
          updatedAt: updatedUser.updatedAt,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "خطا در به‌روزرسانی پروفایل",
      error: error instanceof Error ? error.message : "Update profile failed",
    });
  }
};

/**
 * Change password
 */
export const changePassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;
    const { currentPassword, newPassword } = req.body;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "احراز هویت مورد نیاز است",
      });
      return;
    }

    if (!currentPassword || !newPassword) {
      res.status(400).json({
        success: false,
        message: "رمز عبور فعلی و جدید مورد نیاز است",
      });
      return;
    }

    // Validate new password
    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.valid) {
      res.status(400).json({
        success: false,
        message: "رمز عبور جدید معتبر نیست",
        errors: passwordValidation.errors,
      });
      return;
    }

    // Find user and include password
    const user = await User.findById(userId).select("+password");

    if (!user) {
      res.status(404).json({
        success: false,
        message: "کاربر یافت نشد",
      });
      return;
    }

    // Verify current password
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);

    if (!isCurrentPasswordValid) {
      res.status(400).json({
        success: false,
        message: "رمز عبور فعلی اشتباه است",
      });
      return;
    }

    // Check if new password is different from current
    const isSamePassword = await user.comparePassword(newPassword);
    if (isSamePassword) {
      res.status(400).json({
        success: false,
        message: "رمز عبور جدید نمی‌تواند مشابه رمز عبور فعلی باشد",
      });
      return;
    }

    // Update password (will be hashed by pre-save hook)
    user.password = newPassword;

    // Clear all refresh tokens to force re-login on all devices
    user.refreshTokens = [];

    await user.save();

    res.status(200).json({
      success: true,
      message: "رمز عبور با موفقیت تغییر یافت. لطفاً دوباره وارد شوید",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "خطا در تغییر رمز عبور",
      error: error instanceof Error ? error.message : "Password change failed",
    });
  }
};
