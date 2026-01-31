import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  image?: string;
  education?: string;
  bio?: string;
  address?: string;
  phone?: string;
  additionalInfo?: string;
  role: 'admin' | 'student' | 'user';
  otp?: number;
  status?: 'active' | 'inactive' | 'banned' | 'deleted';
  otpExpiresAt?: Date;
  refreshToken?: string | null;
  isVerifyEmail?: boolean;
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

// 