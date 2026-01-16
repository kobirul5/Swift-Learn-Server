import { Request, Response } from "express";
import { TestimonialService } from "./testimonial.service";
import { asyncHandler } from "../../utils/asyncHandler";
import sendResponse from "../../../shared/sendResponse";

const createTestimonial = asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user;
    const testimonialData = {
        name: req.body.name || user?.name,
        image: req.body.image || user?.image,
        designation: req.body.designation || user?.education || "Student",
        ...req.body,
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
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const searchTerm = req.query.searchTerm as string;

    const result = await TestimonialService.getAllTestimonials(page, limit, searchTerm);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Testimonials retrieved successfully",
        meta: result.meta,
        data: result.data,
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

const getSingleTestimonial = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await TestimonialService.getSingleTestimonial(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Testimonial retrieved successfully",
        data: result,
    });
});

const updateTestimonialStatus = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { isApproved } = req.body;
    const result = await TestimonialService.updateTestimonialStatus(id, isApproved);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: `Testimonial ${result?.isApproved ? "approved" : "unapproved"} successfully`,
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
    updateTestimonialStatus,
    getSingleTestimonial,
    deleteTestimonial,
};
