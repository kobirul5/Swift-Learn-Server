import { ApiError } from "../../utils/ApiError";
import { User } from "../users/user.model";
import { generateOtp } from "../../../helpers/generateOtp";
import emailSender from "../../../helpers/emailSender";
import { registrationOtpTemplate } from "../../../helpers/template/registrationOtpTemplate";
import { forgotPasswordTemplate } from "../../../helpers/template/forgotPasswordTemplate";

const generateAccessToken = async (userId: string) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(501, "User not found");
    }
    const accessToken = user.generateAccessToken();

    return accessToken;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new ApiError(500, "Something is wrong while generating token");
  }
};

const generateRefreshToken = async (userId: string) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new ApiError(501, "User not found");
    }
    const refreshToken = user.generateRefreshToken();

    return refreshToken;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new ApiError(500, "Something is wrong while generating token");
  }
};

const createUserIntoDb = async (payload: any) => {
  const { email, password, ...userData } = payload;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  // User model handles password hashing in pre-save hook
  const newUser = await User.create({ email, password, ...userData });

  if (!newUser) {
    throw new ApiError(400, "Failed to create user");
  }

  const otp = generateOtp(4);
  const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

  // Create or Update Auth record
  // Update User with OTP
  await User.findByIdAndUpdate(newUser._id, {
    otp,
    otpExpiresAt: otpExpires,
  });

  try {
    await emailSender(
      newUser.email,
      registrationOtpTemplate(otp),
      "User Email Verification OTP"
    );
  } catch (error) {
    console.error("Failed to send registration email", error);
  }

  const token = await generateAccessToken(newUser._id as string);

  return {
    user: newUser,
    token,
  };
};

const loginUser = async (payload: { email: string; password: string }) => {
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw new ApiError(404, "User not found!");
  }

  const isCorrectPassword = await user.isPasswordCorrect(payload.password);
  if (!isCorrectPassword) {
    throw new ApiError(401, "Password incorrect!");
  }

  const accessToken = await generateAccessToken(user._id as string);
  const refreshToken = await generateRefreshToken(user._id as string);



  return {
    token: accessToken,
    refreshToken,
    role: user.role,
  };
};

const forgotPassword = async (payload: { email: string }) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    throw new ApiError(404, "User not found!");
  }

  const otp = generateOtp(4);
  const otpExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 mins

  try {
    const html = forgotPasswordTemplate(otp);
    await emailSender(user.email, html, "Forgot Password OTP");
  } catch (error) {
    console.error("Failed to send OTP email", error);
  }

  await User.findByIdAndUpdate(user._id, { otp, otpExpiresAt: otpExpiresAt });

  return { otp };
};

const verifyForgotPasswordOtp = async (payload: {
  email: string;
  otp: number;
}) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    throw new ApiError(404, "User not found!");
  }

  if (
    user.otp !== payload.otp ||
    !user.otpExpiresAt ||
    user.otpExpiresAt < new Date()
  ) {
    throw new ApiError(400, "Invalid or expired OTP");
  }

  await User.findByIdAndUpdate(user._id, { otp: 0, otpExpiresAt: null });

  const accessToken = await generateAccessToken(user._id as string);
  const refreshToken = await generateRefreshToken(user._id as string);

  return { accessToken, refreshToken };
};

const verifyEmailOtp = async (payload: { email: string; otp: number }) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    throw new ApiError(404, "User not found!");
  }

  // Assuming verify email just checks OTP for now as User model doesn't have isVerifyEmail
  // We will just verify OTP against Auth model
  if (
    user.otp !== payload.otp ||
    !user.otpExpiresAt ||
    user.otpExpiresAt < new Date()
  ) {
    throw new ApiError(400, "Invalid or expired OTP");
  }

  // Clear OTP and set Verified
  await User.findByIdAndUpdate(user._id, {
    otp: 0,
    otpExpiresAt: null,
    isVerifyEmail: true,
  });

  const accessToken = await generateAccessToken(user._id as string);
  const refreshToken = await generateRefreshToken(user._id as string);

  return { accessToken, refreshToken };
};

const resetPassword = async (payload: { password: string; email: string }) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    throw new ApiError(404, "User not found!");
  }

  user.password = payload.password; // Pre-save hook will hash it
  await user.save();

  await user.save();

  await User.findByIdAndUpdate(user._id, { otp: 0, otpExpiresAt: null });

  return { message: "Password reset successfully" };
};

const changePassword = async (userId: string, payload: any) => {
  const { oldPassword, newPassword } = payload;
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordValid = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordValid) {
    throw new ApiError(401, "Incorrect old password");
  }

  user.password = newPassword;
  await user.save();

  return { message: "Password changed successfully" };
};

const logoutUser = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.refreshToken = null;
  await user.save();

  return { message: "User logged out successfully" };
};

export const AuthServices = {
  createUserIntoDb,
  loginUser,
  forgotPassword,
  verifyForgotPasswordOtp,
  verifyEmailOtp,
  resetPassword,
  changePassword,
  logoutUser
};
