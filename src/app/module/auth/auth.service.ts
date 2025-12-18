import config from '../../../config';
import { ApiError } from '../../utils/ApiError';
import { User } from '../users/user.model';

import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { generateOtp } from '../../../helpers/generateOtp';
import emailSender from '../../../helpers/emailSender';
import { Secret } from 'jsonwebtoken';
import { registrationOtpTemplate } from '../../../helpers/template/registrationOtpTemplate';
import { forgotPasswordTemplate } from '../../../helpers/template/forgotPasswordTemplate';

const createUserIntoDb = async (payload: any) => {
    const { email, password, fcmToken, ...userData } = payload;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(400, 'User already exists');
    }

    // User model handles password hashing in pre-save hook
    const newUser = await User.create({ email, password, ...userData });

    if (!newUser) {
        throw new ApiError(400, 'Failed to create user');
    }

    const otp = generateOtp(4);
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

    // Create or Update Auth record
    // Update User with OTP
    await User.findByIdAndUpdate(newUser._id, {
        otp,
        otpExpiresAt: otpExpires,
        fcmToken,
    });

    try {
        await emailSender(
            newUser.email,
            registrationOtpTemplate(otp),
            'User Email Verification OTP'
        );
    } catch (error) {
        console.error('Failed to send registration email', error);
    }

    const token = jwtHelpers.generateToken(
        { id: newUser._id, email: newUser.email, role: newUser.role },
        config.jwt.jwt_secret as Secret,
        config.jwt.expires_in!
    );

    return {
        user: newUser,
        token,
    };
};

const loginUser = async (payload: { email: string; password: string; fcmToken?: string }) => {
    const user = await User.findOne({ email: payload.email });

    if (!user) {
        throw new ApiError(404, 'User not found!');
    }

    const isCorrectPassword = await user.isPasswordCorrect(payload.password);
    if (!isCorrectPassword) {
        throw new ApiError(401, 'Password incorrect!');
    }

    if (payload.fcmToken) {
        await User.findByIdAndUpdate(user._id, { fcmToken: payload.fcmToken });
    }

    const accessToken = jwtHelpers.generateToken(
        { id: user._id, email: user.email, role: user.role },
        config.jwt.jwt_secret as Secret,
        config.jwt.expires_in as string
    );

    const refreshToken = jwtHelpers.generateToken(
        { id: user._id, email: user.email, role: user.role },
        config.jwt.refresh_token_secret as Secret,
        config.jwt.refresh_token_expires_in as string
    );

    return {
        token: accessToken,
        refreshToken,
        role: user.role,
    };
};

const forgotPassword = async (payload: { email: string }) => {
    const user = await User.findOne({ email: payload.email });
    if (!user) {
        throw new ApiError(404, 'User not found!');
    }

    const otp = generateOtp(4);
    const otpExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 mins

    try {
        const html = forgotPasswordTemplate(otp);
        await emailSender(user.email, html, 'Forgot Password OTP');
    } catch (error) {
        console.error('Failed to send OTP email', error);
    }

    await User.findByIdAndUpdate(user._id, { otp, otpExpiresAt: otpExpiresAt });

    return { otp };
};

const verifyForgotPasswordOtp = async (payload: { email: string; otp: number }) => {
    const user = await User.findOne({ email: payload.email });
    if (!user) {
        throw new ApiError(404, 'User not found!');
    }

    if (user.otp !== payload.otp || !user.otpExpiresAt || user.otpExpiresAt < new Date()) {
        throw new ApiError(400, 'Invalid or expired OTP');
    }

    return { message: 'OTP verification successful' };
};

const verifyEmailOtp = async (payload: { email: string; otp: number }) => {
    const user = await User.findOne({ email: payload.email });
    if (!user) {
        throw new ApiError(404, 'User not found!');
    }

    // Assuming verify email just checks OTP for now as User model doesn't have isVerifyEmail
    // We will just verify OTP against Auth model
    if (user.otp !== payload.otp || !user.otpExpiresAt || user.otpExpiresAt < new Date()) {
        throw new ApiError(400, 'Invalid or expired OTP');
    }

    // Clear OTP and set Verified
    await User.findByIdAndUpdate(user._id, { otp: 0, otpExpiresAt: null, isVerifyEmail: true });

    return { message: 'Email verified successfully' };
};

const resetPassword = async (payload: { password: string; email: string }) => {
    const user = await User.findOne({ email: payload.email });
    if (!user) {
        throw new ApiError(404, 'User not found!');
    }

    user.password = payload.password; // Pre-save hook will hash it
    await user.save();

    await user.save();

    await User.findByIdAndUpdate(user._id, { otp: 0, otpExpiresAt: null });

    return { message: 'Password reset successfully' };
};

const changePassword = async (userId: string, payload: any) => {
    const { oldPassword, newPassword } = payload;
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    const isPasswordValid = await user.isPasswordCorrect(oldPassword);
    if (!isPasswordValid) {
        throw new ApiError(401, 'Incorrect old password');
    }

    user.password = newPassword;
    await user.save();

    return { message: 'Password changed successfully' };
}

export const AuthServices = {
    createUserIntoDb,
    loginUser,
    forgotPassword,
    verifyForgotPasswordOtp,
    verifyEmailOtp,
    resetPassword,
    changePassword,
};
