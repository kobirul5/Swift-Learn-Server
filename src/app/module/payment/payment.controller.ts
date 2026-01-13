import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import sendResponse from "../../../shared/sendResponse";
import { paymentService } from "./payment.service";

const createPayment = asyncHandler(async (req: Request, res: Response) => {
    const result = await paymentService.createPaymentService(req.body);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Payment created successfully",
        data: result,
    });
});

export const paymentController = {
    createPayment,
};
