import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import sendResponse from "../../../shared/sendResponse";
import { ContactServices } from "./contact.service";

const createContact = asyncHandler(async (req: Request, res: Response) => {
    const result = await ContactServices.createContact(req.body);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Message sent successfully",
        data: result,
    });
});

const getAllContacts = asyncHandler(async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const searchTerm = req.query.searchTerm as string;

    const result = await ContactServices.getAllContacts(page, limit, searchTerm);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Messages retrieved successfully",
        meta: result.meta,
        data: result.data,
    });
});

const deleteContact = asyncHandler(async (req: Request, res: Response) => {
    const result = await ContactServices.deleteContact(req.params.id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Message deleted successfully",
        data: result,
    });
});

export const ContactControllers = {
    createContact,
    getAllContacts,
    deleteContact,
};
