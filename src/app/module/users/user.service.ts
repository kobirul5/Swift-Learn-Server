import { fileUploader } from "../../../helpers/fileUploader";
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateMeService = async (userId: string, payload: Partial<any>, file?: any) => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  if (file) {
    const uploadResult = await fileUploader.uploadToCloudinary(file);
    payload.image = uploadResult.Location;
  }

  const result = await User.findByIdAndUpdate(userId, payload, { new: true }).select('-password -otp -otpExpiresAt -isVerifyEmail ');
  return result;
}

export const userService = { getMeService, getUserByIdService, getAllUsersService, updateMeService };
