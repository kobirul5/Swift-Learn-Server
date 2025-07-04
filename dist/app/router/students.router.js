"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentsRouter = void 0;
const express_1 = __importDefault(require("express"));
const student_controller_1 = require("../controllers/student.controller");
exports.studentsRouter = express_1.default.Router();
exports.studentsRouter.get('/', student_controller_1.getAllStudents);
