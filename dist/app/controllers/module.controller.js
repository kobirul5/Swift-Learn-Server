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
exports.createModule = exports.getAllModule = void 0;
const module_model_1 = require("../models/module.model");
const asyncHandler_1 = require("../utils/asyncHandler");
const course_model_1 = require("../models/course.model");
const getAllModule = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    console.log(params.id);
    const modules = yield module_model_1.Module.find({ course: params.id })
        .populate('lectures') // Populate lecture details
        .sort({ moduleNumber: 1 }); // Optional: Sort by moduleNumber
    res.status(200).json({
        success: true,
        data: modules,
    });
}));
exports.getAllModule = getAllModule;
const createModule = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const module = req.body;
    const data = yield module_model_1.Module.create(module);
    if (!data) {
        res.status(404).json({
            success: false,
            massage: "data not create"
        });
        return;
    }
    yield course_model_1.Course.findByIdAndUpdate(data.course, // course ID
    {
        $addToSet: {
            modules: data._id, //  module ID added
        },
    }, { new: true });
    res.status(200).json({
        success: true,
        massage: "Get Enrolment Successfully",
        data
    });
}));
exports.createModule = createModule;
