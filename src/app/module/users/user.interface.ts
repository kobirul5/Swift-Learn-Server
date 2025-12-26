import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  image?: string
  role: 'admin' | 'student';
  otp?: number;
  otpExpiresAt?: Date;
  refreshToken?: string | null;
  isVerifyEmail?: boolean;
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

// 