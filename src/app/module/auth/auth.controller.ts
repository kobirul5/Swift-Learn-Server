import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import sendResponse from '../../../shared/sendResponse';

import { AuthServices } from './auth.service';
import envConfig from '../../../envs';

const createUser = asyncHandler(async (req: Request, res: Response) => {
    console.log("HIT CREATE USER CONTROLLER");
    const result = await AuthServices.createUserIntoDb(req.body);
    const { token } = result;

    const cookieOptions = {
        secure: envConfig.env === 'production',
        httpOnly: true,
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
        secure: envConfig.env === 'production',
        httpOnly: true,
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

const verifyForgotPasswordOtp = asyncHandler(async (req: Request, res: Response) => {
    const result = await AuthServices.verifyForgotPasswordOtp(req.body);
    const { refreshToken, accessToken } = result;

    const cookieOptions = {
        secure: envConfig.env === 'production',
        httpOnly: true,
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
    const result = await AuthServices.resetPassword(req.body);
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

export const AuthController = {
    createUser,
    loginUser,
    forgotPassword,
    verifyForgotPasswordOtp,
    verifyEmailOtp,
    resetPassword,
    changePassword,
};
