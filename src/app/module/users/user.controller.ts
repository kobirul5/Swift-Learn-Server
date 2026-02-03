import { Request, Response } from "express";
import sendResponse from "../../../shared/sendResponse";
import { userService } from "./user.service";

import { asyncHandler } from "../../utils/asyncHandler";

const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const user = await userService.getUserByIdService(userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User retrieved successfully",
    data: user,
  });
});

const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const data = await userService.getAllUsersService();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Users retrieved successfully",
    data,
  });
});

const getMe = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user.id || (req as any).user._id;
  const result = await userService.getMeService(userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User data retrieved successfully",
    data: result,
  });
});

const updateMe = asyncHandler(async (req: Request, res: Response) => {
  const userId = (req as any).user._id;
  let userData = req.body;

  if (req.body.data) {
    try {
      userData = JSON.parse(req.body.data);
    } catch (error) {
      // fallback for malformed JSON
    }
  }

  const result = await userService.updateMeService(userId, userData, req.file);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Profile updated successfully",
    data: result,
  });
});

const getAdmins = asyncHandler(async (req: Request, res: Response) => {
  const result = await userService.getAdminsService();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admins retrieved successfully",
    data: result,
  });
});

export const userController = { getAllUsers, getUserById, getMe, updateMe, getAdmins };
