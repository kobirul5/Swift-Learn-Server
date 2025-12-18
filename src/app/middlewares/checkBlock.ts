import { NextFunction, Request, Response } from "express";

export const checkBlockedStatus = (req: Request, res: Response, next: NextFunction) => {
    // Placeholder: Implement actual check if User model gets 'isBlocked' field
    next();
};
