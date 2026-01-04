/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import sendResponse from '../../../shared/sendResponse';

import { AuthServices } from './auth.service';
// import envConfig from '../../../envs';

const isProduction = process.env.NODE_ENV === 'production';

const createUser = asyncHandler(async (req: Request, res: Response) => {

    const result = await AuthServices.createUserIntoDb(req.body);
    const { token } = result;

    const cookieOptions = {
        secure: isProduction,
        httpOnly: true,
        sameSite: isProduction ? 'none' as const : 'lax' as const,
        path: '/',
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    };

    res.cookie('accessToken', token, cookieOptions);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'User registered successfully',
        data: { ...result, },
    });
});

const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const result = await AuthServices.loginUser(req.body);
    const { refreshToken, token, ...rest } = result;

    const cookieOptions = {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' as const : 'lax' as const,
        path: '/',
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    };

    res.cookie('refreshToken', refreshToken, cookieOptions);
    res.cookie('accessToken', token, cookieOptions);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User logged in successfully',
        data: { ...rest, accessToken: token, refreshToken: refreshToken },
    });
});

const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
    const result = await AuthServices.forgotPassword(req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'OTP sent to your email',
        data: result,
    });
});

const verifyOtp = asyncHandler(async (req: Request, res: Response) => {
    const result = await AuthServices.verifyOtp(req.body);
    const { refreshToken, accessToken } = result;

    const cookieOptions = {
        secure: isProduction,
        httpOnly: true,
        sameSite: isProduction ? 'none' as const : 'lax' as const,
    };

    res.cookie('refreshToken', refreshToken, cookieOptions);
    res.cookie('accessToken', accessToken, cookieOptions);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'OTP verified successfully',
        data: { ...result, accessToken, refreshToken }
    })
})

const verifyEmailOtp = asyncHandler(async (req: Request, res: Response) => {
    const result = await AuthServices.verifyEmailOtp(req.body);
    const { refreshToken, accessToken } = result;
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Email verified successfully',
        data: { ...result, accessToken, refreshToken }
    })
})

const resetPassword = asyncHandler(async (req: Request, res: Response) => {

    const userId = (req as any).user._id; // Assuming auth middleware attaches user

    const result = await AuthServices.resetPassword({userId, ...req.body});
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Password reset successfully',
        data: result
    })
})

const changePassword = asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user; // Assuming auth middleware attaches user
    const result = await AuthServices.changePassword(user._id, req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Password changed successfully',
        data: result
    })
})

const logoutUser = asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as any).user._id;
    const result = await AuthServices.logoutUser(userId);

   const cookieOptions = {
        secure: isProduction,
        httpOnly: true,
        sameSite: isProduction ? 'none' as const : 'strict' as const,
        path: '/',
        expires: new Date(0),
    };

    res.cookie('refreshToken', '', cookieOptions);
    res.cookie('accessToken', '', cookieOptions);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User logged out successfully',
        data: result
    })
})

export const AuthController = {
    createUser,
    loginUser,
    forgotPassword,
    verifyOtp,
    verifyEmailOtp,
    resetPassword,
    changePassword,
    logoutUser
};
