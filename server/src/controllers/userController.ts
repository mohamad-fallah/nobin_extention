import { Request, Response } from "express";
import { User, IUser } from "../models/User";

// Get all users (Admin only)
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find({ isActive: true })
      .select("-password -refreshTokens")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalUsers = await User.countDocuments({ isActive: true });

    res.status(200).json({
      success: true,
      data: users,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalUsers / limit),
        totalUsers,
        hasNextPage: page * limit < totalUsers,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "خطا در دریافت کاربران",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Get single user by ID (Users can only access their own data unless admin)
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const currentUserId = req.user?._id;

    if (!currentUserId) {
      res.status(401).json({
        success: false,
        message: "احراز هویت مورد نیاز است",
        code: "AUTHENTICATION_REQUIRED",
      });
      return;
    }

    // Check if user is trying to access their own data or is admin
    const currentUser = await User.findById(currentUserId);
    const isAdmin =
      currentUser && (currentUser.username === "admin" || (currentUser as any).isAdmin);

    if (id !== currentUserId && !isAdmin) {
      res.status(403).json({
        success: false,
        message: "شما فقط می‌توانید اطلاعات خود را مشاهده کنید",
        code: "ACCESS_DENIED",
      });
      return;
    }

    const user = await User.findById(id).select("-password -refreshTokens");

    if (!user || !user.isActive) {
      res.status(404).json({
        success: false,
        message: "کاربر یافت نشد",
        code: "USER_NOT_FOUND",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "خطا در دریافت کاربر",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Create new user (Admin only)
export const createUser = async (req: Request, res: Response): Promise<void> => {
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
            ? "کاربری با این ایمیل قبلاً وجود دارد"
            : "نام کاربری قبلاً استفاده شده است",
        code: "USER_EXISTS",
      });
      return;
    }

    const newUser = new User({
      username,
      email,
      password, // Will be hashed by pre-save hook
      avatar,
      isVerified: false, // Admin created users should verify themselves
    });

    const savedUser = await newUser.save();
    const { password: _, refreshTokens: __, ...userResponse } = savedUser.toObject();

    res.status(201).json({
      success: true,
      message: "کاربر با موفقیت ایجاد شد",
      data: userResponse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "خطا در ایجاد کاربر",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Update user (Users can only update their own data unless admin)
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const currentUserId = req.user?._id;
    const updateData = req.body;

    if (!currentUserId) {
      res.status(401).json({
        success: false,
        message: "احراز هویت مورد نیاز است",
        code: "AUTHENTICATION_REQUIRED",
      });
      return;
    }

    // Check if user is trying to update their own data or is admin
    const currentUser = await User.findById(currentUserId);
    const isAdmin =
      currentUser && (currentUser.username === "admin" || (currentUser as any).isAdmin);

    if (id !== currentUserId && !isAdmin) {
      res.status(403).json({
        success: false,
        message: "شما فقط می‌توانید اطلاعات خود را ویرایش کنید",
        code: "ACCESS_DENIED",
      });
      return;
    }

    // Remove sensitive fields that shouldn't be updated through this endpoint
    delete updateData.password;
    delete updateData.refreshTokens;
    delete updateData.isVerified; // Only admin should be able to change this
    delete updateData.isActive; // Only admin should be able to change this

    // Non-admin users can't change certain fields
    if (!isAdmin) {
      delete updateData.loginAttempts;
      delete updateData.lockUntil;
      delete updateData.passwordResetToken;
      delete updateData.passwordResetExpires;
    }

    // Check if username is already taken
    if (updateData.username) {
      const existingUser = await User.findOne({
        username: updateData.username,
        _id: { $ne: id },
      });

      if (existingUser) {
        res.status(400).json({
          success: false,
          message: "نام کاربری قبلاً استفاده شده است",
          code: "USERNAME_EXISTS",
        });
        return;
      }
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password -refreshTokens");

    if (!updatedUser) {
      res.status(404).json({
        success: false,
        message: "کاربر یافت نشد",
        code: "USER_NOT_FOUND",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "کاربر با موفقیت به‌روزرسانی شد",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "خطا در به‌روزرسانی کاربر",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Delete user (Admin only - soft delete)
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const currentUserId = req.user?._id;

    // Prevent admin from deleting themselves
    if (id === currentUserId) {
      res.status(400).json({
        success: false,
        message: "نمی‌توانید حساب کاربری خود را حذف کنید",
        code: "CANNOT_DELETE_SELF",
      });
      return;
    }

    const deletedUser = await User.findByIdAndUpdate(
      id,
      {
        isActive: false,
        refreshTokens: [], // Clear all sessions
      },
      { new: true },
    ).select("-password -refreshTokens");

    if (!deletedUser) {
      res.status(404).json({
        success: false,
        message: "کاربر یافت نشد",
        code: "USER_NOT_FOUND",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "کاربر با موفقیت حذف شد",
      data: deletedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "خطا در حذف کاربر",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
