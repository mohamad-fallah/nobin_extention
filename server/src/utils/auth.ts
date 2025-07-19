import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

// JWT Secret keys (در production باید از environment variables استفاده شود)
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "your-super-secret-access-key";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "your-super-secret-refresh-key";

// Token expiration times
const ACCESS_TOKEN_EXPIRES_IN = "15m";
const REFRESH_TOKEN_EXPIRES_IN = "7d";

export interface TokenPayload {
  userId: string;
  username: string;
  email: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

/**
 * Hash password using bcrypt
 */
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

/**
 * Compare password with hash
 */
export const comparePassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

/**
 * Generate JWT access token
 */
export const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_ACCESS_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    issuer: "nobin-ex",
    audience: "nobin-ex-client",
  });
};

/**
 * Generate JWT refresh token
 */
export const generateRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    issuer: "nobin-ex",
    audience: "nobin-ex-client",
  });
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
  };
};

/**
 * Verify JWT access token
 */
export const verifyAccessToken = (token: string): TokenPayload => {
  try {
    const decoded = jwt.verify(token, JWT_ACCESS_SECRET) as TokenPayload;
    return decoded;
  } catch (error) {
    throw new Error("Invalid access token");
  }
};

/**
 * Verify JWT refresh token
 */
export const verifyRefreshToken = (token: string): TokenPayload => {
  try {
    const decoded = jwt.verify(token, JWT_REFRESH_SECRET) as TokenPayload;
    return decoded;
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
};

/**
 * Extract token from Authorization header
 */
export const extractTokenFromHeader = (authHeader: string | undefined): string | null => {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  return authHeader.substring(7); // Remove 'Bearer ' prefix
};

/**
 * Generate secure random string for session IDs
 */
export const generateSecureId = (): string => {
  return new Types.ObjectId().toString();
};
