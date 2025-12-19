import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ZodError } from "zod";
import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError";
import handleZodError from "../../error/handleZodError";


const config = {
  NODE_ENV: process.env.NODE_ENV || "development",
};

const GlobalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode: number = httpStatus.INTERNAL_SERVER_ERROR;
  let message = err.message || "Something went wrong!";
  let errorSources: any[] = [];

  /**
   * Zod validation error
   */
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }

  /**
   * Custom ApiError
   */
  else if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errorSources = [{ type: "ApiError", message: err.message }];
  }

  /**
   * Mongoose Validation Error
   */
  else if (err instanceof mongoose.Error.ValidationError) {
    statusCode = httpStatus.BAD_REQUEST;
    message = "Validation failed";
    errorSources = Object.values(err.errors).map((error) => ({
      field: error.path,
      message: error.message,
    }));
  }

  /**
   * Mongoose Cast Error (invalid ObjectId)
   */
  else if (err instanceof mongoose.Error.CastError) {
    statusCode = httpStatus.BAD_REQUEST;
    message = "Invalid ID format";
    errorSources = [
      {
        field: err.path,
        message: `Invalid value for ${err.path}`,
      },
    ];
  }

  /**
   * MongoDB Duplicate Key Error
   */
  else if (err.code === 11000) {
    statusCode = httpStatus.CONFLICT;
    const field = Object.keys(err.keyValue)[0];
    message = `${field} already exists`;
    errorSources = [
      {
        field,
        message: `${field} must be unique`,
      },
    ];
  }

  /**
   * JSON / Syntax Error
   */
  else if (err instanceof SyntaxError) {
    statusCode = httpStatus.BAD_REQUEST;
    message = "Invalid JSON syntax";
    errorSources = [{ type: "SyntaxError" }];
  }

  /**
   * Fallback error
   */
  else {
    message = "An unexpected error occurred";
    errorSources = [{ type: "UnknownError" }];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === "development" ? err?.stack : undefined,
  });
};

export default GlobalErrorHandler;
