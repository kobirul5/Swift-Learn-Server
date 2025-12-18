import { Request, Response } from 'express'
import { User } from './user.model';

import {
    createUserService,
    loginUserService,
    getUserByEmailService,
    getAllUsersService,
} from './user.service';
import sendResponse from '../../../shared/sendResponse';

const createUser = async (req: Request, res: Response) => {
    const { createdUser, accessToken } = await createUserService(req.body);

    const options = { httpOnly: true, secure: false };
    res.cookie('accessToken', accessToken, options);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Create User Successfully',
        data: createdUser,
    });
};

const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { loginUser, accessToken } = await loginUserService(email, password);

    const options = { httpOnly: true, secure: true };
    res.cookie('accessToken', accessToken, options);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User Login Successfully',
        data: loginUser,
    });
};

const logout = async (req: Request, res: Response) => {
    const options = { httpOnly: true, secure: true };
    res.clearCookie('accessToken', options);
    sendResponse(res, { statusCode: 200, success: true, message: 'User LogOut Successfully' });
};

const getUserByEmail = async (req: Request, res: Response) => {
    const email = req.params.email;
    const user = await getUserByEmailService(email);
    sendResponse(res, { statusCode: 200, success: true, message: 'Get User by Email Successfully', data: user });
};

const getAllUsers = async (req: Request, res: Response) => {
    const data = await getAllUsersService();
    sendResponse(res, { statusCode: 200, success: true, message: 'Get All User Successfully', data });
};

const getUserForLogin = async (req: Request, res: Response) => {
    const user = req.user;
    sendResponse(res, { statusCode: 200, success: true, message: 'User data get Successfully', data: user as any });
};

export { getAllUsers, createUser, loginUser, getUserByEmail, logout, getUserForLogin };