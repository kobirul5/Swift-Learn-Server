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
exports.deleteLecture = exports.getAllLecture = exports.createLecture = void 0;
const asyncHandler_1 = require("../../utils/asyncHandler");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const lecture_service_1 = require("./lecture.service");
const createLecture = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newLecture = yield (0, lecture_service_1.createLectureService)(req.body);
    (0, sendResponse_1.default)(res, { statusCode: 200, success: true, message: 'Create lecture Successfully', data: newLecture });
}));
exports.createLecture = createLecture;
const getAllLecture = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, lecture_service_1.getAllLectureService)(req.params.id);
    (0, sendResponse_1.default)(res, { statusCode: 200, success: true, message: 'get all Lecture successfully', data });
}));
exports.getAllLecture = getAllLecture;
const deleteLecture = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, lecture_service_1.deleteLectureService)(req.params.id);
    (0, sendResponse_1.default)(res, { statusCode: 200, success: true, message: 'delete successfully', data });
}));
exports.deleteLecture = deleteLecture;
