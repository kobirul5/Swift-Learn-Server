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
exports.getUserForLogin = exports.logout = exports.getUserByEmail = exports.loginUser = exports.createUser = exports.getAllUsers = void 0;
const user_service_1 = require("./user.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { createdUser, accessToken } = yield (0, user_service_1.createUserService)(req.body);
    const options = { httpOnly: true, secure: false };
    res.cookie('accessToken', accessToken, options);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Create User Successfully',
        data: createdUser,
    });
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const { loginUser, accessToken } = yield (0, user_service_1.loginUserService)(email, password);
    const options = { httpOnly: true, secure: true };
    res.cookie('accessToken', accessToken, options);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'User Login Successfully',
        data: loginUser,
    });
});
exports.loginUser = loginUser;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const options = { httpOnly: true, secure: true };
    res.clearCookie('accessToken', options);
    (0, sendResponse_1.default)(res, { statusCode: 200, success: true, message: 'User LogOut Successfully' });
});
exports.logout = logout;
const getUserByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.params.email;
    const user = yield (0, user_service_1.getUserByEmailService)(email);
    (0, sendResponse_1.default)(res, { statusCode: 200, success: true, message: 'Get User by Email Successfully', data: user });
});
exports.getUserByEmail = getUserByEmail;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, user_service_1.getAllUsersService)();
    (0, sendResponse_1.default)(res, { statusCode: 200, success: true, message: 'Get All User Successfully', data });
});
exports.getAllUsers = getAllUsers;
const getUserForLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    (0, sendResponse_1.default)(res, { statusCode: 200, success: true, message: 'User data get Successfully', data: user });
});
exports.getUserForLogin = getUserForLogin;
