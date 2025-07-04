"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = void 0;
const ApiError_1 = require("../utils/ApiError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
const verifyJWT = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const token = ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.accessToken) || ((_b = req.header("Authorization")) === null || _b === void 0 ? void 0 : _b.replace("Bearer ", ""));
        if (!token) {
            return next(new ApiError_1.ApiError(401, "Unauthorized request: No token found"));
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = yield user_model_1.User.findById(decoded._id).select("-password");
        if (!user) {
            return next(new ApiError_1.ApiError(401, "Invalid access token"));
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.error("JWT verify error:", error);
        return next(new ApiError_1.ApiError(401, "Invalid or expired token"));
    }
});
exports.verifyJWT = verifyJWT;
