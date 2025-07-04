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
exports.getCourseById = exports.createCourse = exports.getAllCourse = void 0;
const course_model_1 = require("../models/course.model");
const asyncHandler_1 = require("../utils/asyncHandler");
const createCourse = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = req.body;
    const data = yield course_model_1.Course.create(course);
    res.status(200).json({
        success: true,
        massage: "Get All Course Successfully",
        data
    });
}));
exports.createCourse = createCourse;
const getAllCourse = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield course_model_1.Course.find();
    res.status(200).json({
        success: true,
        massage: "Get All Course Successfully",
        data
    });
}));
exports.getAllCourse = getAllCourse;
const getCourseById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = yield course_model_1.Course.findById(id);
    res.status(200).json({
        success: true,
        massage: "Get Course Successfully",
        data
    });
}));
exports.getCourseById = getCourseById;
