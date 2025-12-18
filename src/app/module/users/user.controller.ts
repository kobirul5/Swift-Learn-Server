import { Request, Response } from 'express'
import { User } from './user.model';

import {
    getUserByEmailService,
    getAllUsersService,
    getMeService,
} from './user.service';
import sendResponse from '../../../shared/sendResponse';



const getUserByEmail = async (req: Request, res: Response) => {
    const email = req.params.email;
    const user = await getUserByEmailService(email);
    sendResponse(res, { statusCode: 200, success: true, message: 'Get User by Email Successfully', data: user });
};

const getAllUsers = async (req: Request, res: Response) => {
    const data = await getAllUsersService();
    sendResponse(res, { statusCode: 200, success: true, message: 'Get All User Successfully', data });
};



const getMe = async (req: Request, res: Response) => {
    const userId = (req as any).user.id;
    const result = await getMeService(userId);
    sendResponse(res, { statusCode: 200, success: true, message: 'User data retrieved successfully', data: result });
};

export { getAllUsers, getUserByEmail, getMe };