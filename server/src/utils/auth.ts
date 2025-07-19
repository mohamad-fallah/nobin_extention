import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { Types } from "mongoose";
import dotenv from "dotenv";

// Load environment variables first
dotenv.config();

// JWT Secret keys از environment variables
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

// بررسی وجود کلیدهای JWT
if (!JWT_ACCESS_SECRET || !JWT_REFRESH_SECRET) {
  throw new Error("JWT secrets must be provided in environment variables");
}

// بررسی طول کلیدها برای امنیت
if (JWT_ACCESS_SECRET.length < 32 || JWT_REFRESH_SECRET.length < 32) {
  console.warn("⚠️  JWT secrets should be at least 32 characters long for security");
}

// Token expiration times
const ACCESS_TOKEN_EXPIRES_IN = "15m";
const REFRESH_TOKEN_EXPIRES_IN = "7d";

// Security constants
const BCRYPT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS || "12");
const MAX_LOGIN_ATTEMPTS = parseInt(process.env.MAX_LOGIN_ATTEMPTS || "5");
const ACCOUNT_LOCK_TIME = parseInt(process.env.ACCOUNT_LOCK_TIME || "7200000"); // 2 hours

export interface TokenPayload {
  userId: string;
  username: string;
  email: string;
  iat?: number;
  exp?: number;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

/**
 * Hash password using bcrypt with configurable rounds
 */
export const hashPassword = async (password: string): Promise<string> => {
  if (!password || password.length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }

  return await bcrypt.hash(password, BCRYPT_ROUNDS);
};

/**
 * Compare password with hash
 */
export const comparePassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  if (!password || !hashedPassword) {
    return false;
  }

  return await bcrypt.compare(password, hashedPassword);
};

/**
 * Generate JWT access token with enhanced security
 */
export const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(
    {
      userId: payload.userId,
      username: payload.username,
      email: payload.email,
    },
    JWT_ACCESS_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
      issuer: "nobin-ex-server",
      audience: "nobin-ex-client",
      subject: payload.userId,
      algorithm: "HS256",
    },
  );
};

/**
 * Generate JWT refresh token with enhanced security
 */
export const generateRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign(
    {
      userId: payload.userId,
      username: payload.username,
      email: payload.email,
      tokenType: "refresh",
    },
    JWT_REFRESH_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRES_IN,
      issuer: "nobin-ex-server",
      audience: "nobin-ex-client",
      subject: payload.userId,
      algorithm: "HS256",
    },
  );
};

/**
 * Generate both access and refresh tokens
 */
export const generateTokens = (payload: TokenPayload): TokenResponse => {
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  // Calculate expiration time in seconds
  const expiresIn = 15 * 60; // 15 minutes in seconds

  return {
    accessToken,
    refreshToken,
    expiresIn,
    tokenType: "Bearer",
  };
};

/**
 * Verify JWT access token with enhanced error handling
 */
export const verifyAccessToken = (token: string): TokenPayload => {
  try {
    const decoded = jwt.verify(token, JWT_ACCESS_SECRET, {
      issuer: "nobin-ex-server",
      audience: "nobin-ex-client",
      algorithms: ["HS256"],
    }) as TokenPayload;

    return decoded;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error("Access token has expired");
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw new Error("Invalid access token");
    } else {
      throw new Error("Token verification failed");
    }
  }
};

/**
 * Verify JWT refresh token with enhanced error handling
 */
export const verifyRefreshToken = (token: string): TokenPayload => {
  try {
    const decoded = jwt.verify(token, JWT_REFRESH_SECRET, {
      issuer: "nobin-ex-server",
      audience: "nobin-ex-client",
      algorithms: ["HS256"],
    }) as TokenPayload;

    // Check if it's actually a refresh token
    if ((decoded as any).tokenType !== "refresh") {
      throw new Error("Invalid token type");
    }

    return decoded;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error("Refresh token has expired");
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw new Error("Invalid refresh token");
    } else {
      throw new Error("Token verification failed");
    }
  }
};

/**
 * Extract token from Authorization header with better validation
 */
export const extractTokenFromHeader = (authHeader: string | undefined): string | null => {
  if (!authHeader) {
    return null;
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return null;
  }

  const token = parts[1];

  // Basic validation - JWT should have 3 parts separated by dots
  if (!token || token.split(".").length !== 3) {
    return null;
  }

  return token;
};

/**
 * Generate secure random string for various purposes
 */
export const generateSecureId = (): string => {
  return new Types.ObjectId().toString();
};

/**
 * Generate secure random token for password reset, etc.
 */
export const generateSecureToken = (): string => {
  return crypto.randomBytes(32).toString("hex");
};

/**
 * Check if password meets security requirements
 */
export const validatePassword = (password: string): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!password || password.length < 6) {
    errors.push("رمز عبور باید حداقل ۶ کاراکتر باشد");
  }

  if (password && password.length > 128) {
    errors.push("رمز عبور نمی‌تواند بیشتر از ۱۲۸ کاراکتر باشد");
  }

  // Check for at least one number and one letter (optional but recommended)
  if (password && !/(?=.*[A-Za-z])(?=.*\d)/.test(password)) {
    // This is a warning, not an error for now
    console.warn("Password should contain at least one letter and one number for better security");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

/**
 * Get security constants
 */
export const getSecurityConstants = () => ({
  MAX_LOGIN_ATTEMPTS,
  ACCOUNT_LOCK_TIME,
  BCRYPT_ROUNDS,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
});
