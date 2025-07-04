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
exports.getUserForLogin = exports.logout = exports.getUserByEmail = exports.loginUser = exports.createUser = exports.getAllUsers = void 0;
const user_model_1 = require("../models/user.model");
const ApiError_1 = require("../utils/ApiError");
const generateAccessToken = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.User.findById(userId);
        if (!user) {
            throw new ApiError_1.ApiError(501, "User not found");
        }
        const accessToken = user.generateAccessToken();
        return accessToken;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }
    catch (error) {
        throw new ApiError_1.ApiError(500, "Something is wrong while generating token");
    }
});
// Create User 
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const { name, email, password, } = body;
    if (name === "" || email === "" || password === "") {
        throw new ApiError_1.ApiError(500);
    }
    const existUser = yield user_model_1.User.findOne({
        $or: [{ email }]
    });
    if (existUser) {
        throw new ApiError_1.ApiError(409, "User With email Already Exist");
    }
    const user = yield user_model_1.User.create(body);
    const createdUser = yield user_model_1.User.findById(user._id).select("-password");
    if (!createdUser) {
        throw new ApiError_1.ApiError(500, "Something is wrong while create user");
    }
    const accessToken = yield generateAccessToken(user._id);
    // cookie
    const options = {
        httpOnly: true,
        secure: false
    };
    res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .json({
        success: true,
        massage: "Create User Successfully",
        data: createdUser,
        token: accessToken
    });
});
exports.createUser = createUser;
// Login User
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError_1.ApiError(400, "Email and Password required");
    }
    // get user
    const user = yield user_model_1.User.findOne({ email });
    if (!user) {
        throw new ApiError_1.ApiError(400, "User Dose not exist");
    }
    // passwordCheck
    const passwordCheck = yield user.isPasswordCorrect(password);
    if (!passwordCheck) {
        throw new ApiError_1.ApiError(401, "Invalid user credentials");
    }
    // token
    const accessToken = yield generateAccessToken(user._id);
    const loginUser = yield user_model_1.User.findById(user._id).select("-password");
    if (!loginUser) {
        throw new ApiError_1.ApiError(500, "Something is wrong while login user");
    }
    // cookie
    const options = {
        httpOnly: true,
        secure: true
    };
    res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .json({
        success: true,
        massage: "User Login Successfully",
        data: loginUser,
        token: accessToken
    });
});
exports.loginUser = loginUser;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        httpOnly: true,
        secure: true
    };
    res
        .status(200)
        .clearCookie("accessToken", options)
        .json({
        success: true,
        massage: "User LogOut Successfully",
    });
});
exports.logout = logout;
// get user by email
const getUserByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.params.email;
    const user = yield user_model_1.User.findOne({ email });
    if (!user) {
        res.status(404).json({ success: false, message: 'User not found' });
        return;
    }
    res.status(200).json({
        success: true,
        massage: "Get User by Email Successfully",
        data: user
    });
});
exports.getUserByEmail = getUserByEmail;
// get All users
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield user_model_1.User.find();
    res.status(200).json({
        success: true,
        massage: "Get All User Successfully",
        data
    });
});
exports.getAllUsers = getAllUsers;
const getUserForLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    res
        .status(200)
        .json({
        success: true,
        massage: "User data get Successfully",
        data: user
    });
});
exports.getUserForLogin = getUserForLogin;
