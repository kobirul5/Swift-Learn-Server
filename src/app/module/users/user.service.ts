import { ApiError } from "../../utils/ApiError";
import { User } from "./user.model";

const getUserByIdService = async (userId: string) => {
  const user = await User.findOne({ userId });
  if (!user) throw new ApiError(404, "User not found");
  return user;
};

const getAllUsersService = async () => {
  const users = await User.find().select('-password -otp -otpExpiresAt -isVerifyEmail '); // exclude password
  return users;
};

const getMeService = async (userId: string) => {
  const user = await User.findById(userId).select('-password -otp -otpExpiresAt -isVerifyEmail ');
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return user;
};

export const userService = { getMeService, getUserByIdService, getAllUsersService };
