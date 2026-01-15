import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import sendResponse from "../../../shared/sendResponse";
import { FaqServices } from "./faq.service";

const createFaq = asyncHandler(async (req: Request, res: Response) => {
    const result = await FaqServices.createFaq(req.body);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "FAQ created successfully",
        data: result,
    });
});

const getAllFaqs = asyncHandler(async (req: Request, res: Response) => {
    const result = await FaqServices.getAllFaqs();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "FAQs retrieved successfully",
        data: result,
    });
});

const getFaqById = asyncHandler(async (req: Request, res: Response) => {
    const result = await FaqServices.getFaqById(req.params.id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "FAQ retrieved successfully",
        data: result,
    });
});

const updateFaq = asyncHandler(async (req: Request, res: Response) => {
    const result = await FaqServices.updateFaq(req.params.id, req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "FAQ updated successfully",
        data: result,
    });
});

const deleteFaq = asyncHandler(async (req: Request, res: Response) => {
    const result = await FaqServices.deleteFaq(req.params.id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "FAQ deleted successfully",
        data: result,
    });
});

export const FaqControllers = {
    createFaq,
    getAllFaqs,
    getFaqById,
    updateFaq,
    deleteFaq,
};
