"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lectureRoute = void 0;
const express_1 = __importDefault(require("express"));
const lecture_controller_1 = require("./lecture.controller");
exports.lectureRoute = express_1.default.Router();
exports.lectureRoute.post('/', lecture_controller_1.createLecture);
exports.lectureRoute.get('/:id', lecture_controller_1.getAllLecture);
exports.lectureRoute.delete('/:id', lecture_controller_1.deleteLecture);
