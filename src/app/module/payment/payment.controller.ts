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

const confirmationPayment = asyncHandler(async (req: Request, res: Response) => {

    console.log("---------------------------from webhokk controller");
    
    const signature = req.headers['stripe-signature'];

    const result = await paymentService.confirmationPaymentService(req.body, signature as string);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Payment verified successfully",
        data: result,
    });
});

export const paymentController = {
    createPayment,
    confirmationPayment
};
