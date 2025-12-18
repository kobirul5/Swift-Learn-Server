import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  image?: string
  role: 'admin' | 'student';
  otp?: number;
  otpExpiresAt?: Date;
  isVerifyEmail?: boolean;
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
}

// 