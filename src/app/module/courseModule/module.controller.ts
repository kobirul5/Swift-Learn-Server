import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import sendResponse from "../../../shared/sendResponse";
import { moduleService} from "./module.service";

const getAllModule = asyncHandler(async (req: Request, res: Response) => {
  const modules = await moduleService.getAllModuleService(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Modules retrieved successfully",
    data: modules,
  });
});

const createModule = asyncHandler(async (req: Request, res: Response) => {
  const data = await moduleService.createModuleService(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Module created successfully",
    data,
  });
});

const updateModule = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await moduleService.updateModuleService(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Module updated successfully",
    data: result,
  });
});

const deleteModule = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await moduleService.deleteModuleService(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Module deleted successfully",
    data: result,
  });
});

const getAllModuleBYCourseId = asyncHandler(async (req: Request, res: Response) => {
  const modules = await moduleService.getAllModuleService(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Modules retrieved successfully",
    data: modules,
  });
});

export const moduleController = { getAllModule, createModule, updateModule, deleteModule , getAllModuleBYCourseId};
