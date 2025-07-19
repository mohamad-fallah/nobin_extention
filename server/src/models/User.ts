import mongoose, { Document, Schema } from "mongoose";
import * as crypto from "crypto";
import { hashPassword, comparePassword, getSecurityConstants } from "../utils/auth";

// Get security constants
const { MAX_LOGIN_ATTEMPTS, ACCOUNT_LOCK_TIME } = getSecurityConstants();

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  avatar?: string;
  role: "admin" | "user" | "vip";
  isActive: boolean;
  isVerified: boolean;
  refreshTokens: string[];
  lastLoginAt?: Date;
  loginAttempts: number;
  lockUntil?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  emailVerificationToken?: string;
  emailVerificationExpires?: Date;
  createdAt: Date;
  updatedAt: Date;

  // Methods
  comparePassword(candidatePassword: string): Promise<boolean>;
  isLocked(): boolean;
  incrementLoginAttempts(): Promise<void>;
  resetLoginAttempts(): Promise<void>;
  generatePasswordResetToken(): string;
  generateEmailVerificationToken(): string;
  isAdmin(): boolean;
  isVip(): boolean;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, "نام کاربری مورد نیاز است"],
      unique: true,
      trim: true,
      minlength: [3, "نام کاربری باید حداقل 3 کاراکتر باشد"],
      maxlength: [30, "نام کاربری نمی‌تواند بیشتر از 30 کاراکتر باشد"],
      match: [/^[a-zA-Z0-9_-]+$/, "نام کاربری فقط می‌تواند شامل حروف، اعداد، _ و - باشد"],
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "ایمیل مورد نیاز است"],
      unique: true,
      trim: true,
      lowercase: true,
      maxlength: [254, "ایمیل نمی‌تواند بیشتر از 254 کاراکتر باشد"],
      match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "فرمت ایمیل معتبر نیست"],
    },
    password: {
      type: String,
      required: [true, "رمز عبور مورد نیاز است"],
      minlength: [6, "رمز عبور باید حداقل 6 کاراکتر باشد"],
      maxlength: [128, "رمز عبور نمی‌تواند بیشتر از 128 کاراکتر باشد"],
      select: false, // Don't include password in queries by default
    },
    avatar: {
      type: String,
      default: "",
      maxlength: [500, "آدرس تصویر نمی‌تواند بیشتر از 500 کاراکتر باشد"],
    },
    role: {
      type: String,
      enum: ["admin", "user", "vip"],
      default: "user",
      required: [true, "نقش کاربر مورد نیاز است"],
    },
    isActive: {
      type: Boolean,
      default: true,
      // Remove index: true since we'll define compound indexes
    },
    isVerified: {
      type: Boolean,
      default: false,
      // Remove index: true since we'll define compound indexes
    },
    refreshTokens: {
      type: [String],
      default: [],
      select: false, // Don't include refresh tokens in queries by default
    },
    lastLoginAt: {
      type: Date,
      // Remove index: true since we'll define it separately
    },
    loginAttempts: {
      type: Number,
      default: 0,
      min: [0, "تعداد تلاش‌های ورود نمی‌تواند منفی باشد"],
    },
    lockUntil: {
      type: Date,
      // Remove index: true since we'll define it separately
    },
    passwordResetToken: {
      type: String,
      // Remove index: true since we'll define it separately
    },
    passwordResetExpires: {
      type: Date,
      // Remove index: true since we'll define it separately
    },
    emailVerificationToken: {
      type: String,
      // Remove index: true since we'll define it separately
    },
    emailVerificationExpires: {
      type: Date,
      // Remove index: true since we'll define it separately
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret: Record<string, unknown>) {
        // Remove sensitive fields when converting to JSON
        delete ret.password;
        delete ret.refreshTokens;
        delete ret.passwordResetToken;
        delete ret.passwordResetExpires;
        delete ret.emailVerificationToken;
        delete ret.emailVerificationExpires;
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      transform: function (doc, ret: Record<string, unknown>) {
        // Remove sensitive fields when converting to Object
        delete ret.password;
        delete ret.refreshTokens;
        delete ret.passwordResetToken;
        delete ret.passwordResetExpires;
        delete ret.emailVerificationToken;
        delete ret.emailVerificationExpires;
        delete ret.__v;
        return ret;
      },
    },
  },
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return next();

  try {
    // Hash password
    this.password = await hashPassword(this.password);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Clean up expired tokens before saving
userSchema.pre("save", function (next) {
  // Remove expired password reset tokens
  if (this.passwordResetExpires && this.passwordResetExpires < new Date()) {
    this.passwordResetToken = undefined;
    this.passwordResetExpires = undefined;
  }

  // Remove expired email verification tokens
  if (this.emailVerificationExpires && this.emailVerificationExpires < new Date()) {
    this.emailVerificationToken = undefined;
    this.emailVerificationExpires = undefined;
  }

  next();
});

// Instance method to compare password
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return await comparePassword(candidatePassword, this.password);
};

// Instance method to check if account is locked
userSchema.methods.isLocked = function (): boolean {
  return !!(this.lockUntil && this.lockUntil > new Date());
};

// Instance method to increment login attempts
userSchema.methods.incrementLoginAttempts = async function (): Promise<void> {
  // If we have a previous lock that has expired, restart at 1
  if (this.lockUntil && this.lockUntil < new Date()) {
    return this.updateOne({
      $unset: { lockUntil: 1 },
      $set: { loginAttempts: 1 },
    });
  }

  const updates = { $inc: { loginAttempts: 1 } };

  // If we've reached max attempts and it's not locked, lock the account
  if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked()) {
    (updates as Record<string, unknown>).$set = {
      lockUntil: new Date(Date.now() + ACCOUNT_LOCK_TIME),
    };
  }

  return this.updateOne(updates);
};

// Instance method to reset login attempts
userSchema.methods.resetLoginAttempts = async function (): Promise<void> {
  return this.updateOne({
    $unset: { loginAttempts: 1, lockUntil: 1 },
  });
};

// Instance method to generate password reset token
userSchema.methods.generatePasswordResetToken = function (): string {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  return resetToken;
};

// Instance method to generate email verification token
userSchema.methods.generateEmailVerificationToken = function (): string {
  const verificationToken = crypto.randomBytes(32).toString("hex");

  this.emailVerificationToken = crypto.createHash("sha256").update(verificationToken).digest("hex");
  this.emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  return verificationToken;
};

// Instance method to check if user is admin
userSchema.methods.isAdmin = function (): boolean {
  return this.role === "admin";
};

// Instance method to check if user is VIP
userSchema.methods.isVip = function (): boolean {
  return this.role === "vip";
};

// Indexes for better query performance
// Note: email and username already have unique indexes from field definition
userSchema.index({ passwordResetToken: 1 });
userSchema.index({ emailVerificationToken: 1 });
userSchema.index({ lockUntil: 1 });
userSchema.index({ role: 1 });
userSchema.index({ isActive: 1, isVerified: 1 });
userSchema.index({ createdAt: -1 });
userSchema.index({ lastLoginAt: -1 });

// Compound indexes for better performance
userSchema.index({ email: 1, isActive: 1 });
userSchema.index({ username: 1, isActive: 1 });
userSchema.index({ role: 1, isActive: 1 });

export const User = mongoose.model<IUser>("User", userSchema);
