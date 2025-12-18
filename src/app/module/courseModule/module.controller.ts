import { Request, Response } from 'express'
import { asyncHandler } from '../../utils/asyncHandler'
import sendResponse from '../../../shared/sendResponse'
import {
  getAllModuleService,
  createModuleService,
} from './module.service'

const getAllModule = asyncHandler(async (req: Request, res: Response) => {
  const modules = await getAllModuleService(req.params.id);
  sendResponse(res, { statusCode: 200, success: true, data: modules });
})

const createModule = asyncHandler(async (req: Request, res: Response) => {
  const data = await createModuleService(req.body);
  sendResponse(res, { statusCode: 200, success: true, message: 'Module created', data });
})

export { getAllModule, createModule}