import { Request, Response } from "express";
import { TestimonialService } from "./testimonial.service";
import { asyncHandler } from "../../utils/asyncHandler";
import sendResponse from "../../../shared/sendResponse";

const createTestimonial = asyncHandler(async (req: Request, res: Response) => {
    const testimonialData = {
        ...req.body,
        user: req.body.user || (req as any).user?._id,
    };
    const result = await TestimonialService.createTestimonial(testimonialData);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Testimonial created successfully",
        data: result,
    });
});

const getAllTestimonials = asyncHandler(async (req: Request, res: Response) => {
    const result = await TestimonialService.getAllTestimonials();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Testimonials retrieved successfully",
        data: result,
    });
});

const getApprovedTestimonials = asyncHandler(async (req: Request, res: Response) => {
    const result = await TestimonialService.getApprovedTestimonials();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Approved testimonials retrieved successfully",
        data: result,
    });
});

const approveTestimonial = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await TestimonialService.approveTestimonial(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Testimonial approved successfully",
        data: result,
    });
});

const deleteTestimonial = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await TestimonialService.deleteTestimonial(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Testimonial deleted successfully",
        data: result,
    });
});

export const TestimonialController = {
    createTestimonial,
    getAllTestimonials,
    getApprovedTestimonials,
    approveTestimonial,
    deleteTestimonial,
};
