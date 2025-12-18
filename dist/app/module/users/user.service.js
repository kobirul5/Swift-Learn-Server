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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsersService = exports.getUserByEmailService = exports.loginUserService = exports.createUserService = void 0;
const ApiError_1 = require("../../utils/ApiError");
const user_model_1 = require("./user.model");
const generateAccessToken = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(userId);
    if (!user) {
        throw new ApiError_1.ApiError(404, 'User not found');
    }
    return user.generateAccessToken();
});
const createUserService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = body;
    if (!name || !email || !password) {
        throw new ApiError_1.ApiError(400, 'Name, email and password are required');
    }
    const existUser = yield user_model_1.User.findOne({ $or: [{ email }] });
    if (existUser) {
        throw new ApiError_1.ApiError(409, 'User With email Already Exist');
    }
    const user = yield user_model_1.User.create(body);
    const createdUser = yield user_model_1.User.findById(user._id).select('-password');
    if (!createdUser)
        throw new ApiError_1.ApiError(500, 'Something is wrong while create user');
    const accessToken = yield generateAccessToken(user._id);
    return { createdUser, accessToken };
});
exports.createUserService = createUserService;
const loginUserService = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    if (!email || !password)
        throw new ApiError_1.ApiError(400, 'Email and Password required');
    const user = yield user_model_1.User.findOne({ email });
    if (!user)
        throw new ApiError_1.ApiError(400, 'User Dose not exist');
    const passwordCheck = yield user.isPasswordCorrect(password);
    if (!passwordCheck)
        throw new ApiError_1.ApiError(401, 'Invalid user credentials');
    const accessToken = yield generateAccessToken(user._id);
    const loginUser = yield user_model_1.User.findById(user._id).select('-password');
    if (!loginUser)
        throw new ApiError_1.ApiError(500, 'Something is wrong while login user');
    return { loginUser, accessToken };
});
exports.loginUserService = loginUserService;
const getUserByEmailService = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email });
    if (!user)
        throw new ApiError_1.ApiError(404, 'User not found');
    return user;
});
exports.getUserByEmailService = getUserByEmailService;
const getAllUsersService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_model_1.User.find();
});
exports.getAllUsersService = getAllUsersService;
