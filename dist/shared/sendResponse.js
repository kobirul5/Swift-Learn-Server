"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    const response = {
        statusCode: data.statusCode,
        success: data.success,
        message: data.message || "",
        meta: data.meta,
        data: data.data || {},
        stats: data.stats || {},
    };
    res.status(data.statusCode).json(response);
};
exports.default = sendResponse;
