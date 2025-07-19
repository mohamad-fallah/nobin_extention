import { Request, Response } from "express";
import { User, IUser } from "../models/User";

// Get all users
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find({ isActive: true }).select("-password");
    res.status(200).json({
      success: true,
      data: users,
      count: users.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "خطا در دریافت کاربران",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

// Get single user by ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");

    if (!user) {
      res.status(404).json({
        success: false,
        message: "کاربر یافت نشد",
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

// Create new user
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
        message: "کاربر با این ایمیل یا نام کاربری قبلاً وجود دارد",
      });
      return;
    }

    const newUser = new User({
      username,
      email,
      password, // در حالت واقعی باید hash شود
      avatar,
    });

    const savedUser = await newUser.save();
    const { password: _, ...userResponse } = savedUser.toObject();

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

// Update user
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Remove password from update data for security
    delete updateData.password;

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedUser) {
      res.status(404).json({
        success: false,
        message: "کاربر یافت نشد",
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

// Delete user (soft delete)
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndUpdate(id, { isActive: false }, { new: true }).select(
      "-password",
    );

    if (!deletedUser) {
      res.status(404).json({
        success: false,
        message: "کاربر یافت نشد",
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
