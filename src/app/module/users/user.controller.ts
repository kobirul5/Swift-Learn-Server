import { Request, Response } from "express";
import sendResponse from "../../../shared/sendResponse";
import { userService } from "./user.service";

const getUserById = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const user = await userService.getUserByIdService(userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User retrieved successfully",
    data: user,
  });
};

const getAllUsers = async (req: Request, res: Response) => {
  const data = await userService.getAllUsersService();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Users retrieved successfully",
    data,
  });
};

const getMe = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const result = await userService.getMeService(userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User data retrieved successfully",
    data: result,
  });
};

export const userController = { getAllUsers, getUserById, getMe };
