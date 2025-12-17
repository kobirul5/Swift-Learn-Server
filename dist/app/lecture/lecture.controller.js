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
exports.deleteLecture = exports.getAllLecture = exports.createLecture = void 0;
const asyncHandler_1 = require("../utils/asyncHandler");
const lecture_model_1 = require("./lecture.model");
const module_model_1 = require("../courseModule/module.model");
const createLecture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { module, title, videoUrl, notes } = req.body;
    if (!module || !title || !videoUrl) {
        res.status(400).json({
            success: false,
            message: "Module, title, and videoUrl are required.",
        });
        return;
    }
    // 1️⃣ Create Lecture
    const newLecture = yield lecture_model_1.Lecture.create({
        module,
        title,
        videoUrl,
        notes,
    });
    // 2️⃣ Push lecture._id to the module’s lectures array
    yield module_model_1.Module.findByIdAndUpdate(module, { $push: { lectures: newLecture._id } }, { new: true });
    res.status(200).json({
        success: true,
        massage: "crate lecture Successfully",
        data: newLecture
    });
});
exports.createLecture = createLecture;
const getAllLecture = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const param = req.params;
    const data = yield lecture_model_1.Lecture.find({ module: param.id });
    res.status(201).json({
        success: true,
        message: "get all Lecture successfully",
        data: data,
    });
});
exports.getAllLecture = getAllLecture;
const deleteLecture = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const param = req.params;
    const data = yield lecture_model_1.Lecture.findByIdAndDelete(param.id);
    yield module_model_1.Module.findByIdAndUpdate(data === null || data === void 0 ? void 0 : data.module, { $pull: { lectures: data === null || data === void 0 ? void 0 : data._id } }, { new: true });
    res.status(201).json({
        success: true,
        message: "delete successfully",
        data: data,
    });
}));
exports.deleteLecture = deleteLecture;
