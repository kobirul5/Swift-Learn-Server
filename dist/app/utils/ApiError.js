"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError extends Error {
    constructor(statusCode, message = "Something Went Wrong", 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors = [], stack = "") {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.errors = errors;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.ApiError = ApiError;
