"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enrollmentRoute = void 0;
const express_1 = __importDefault(require("express"));
const enrollment_controller_1 = require("../controllers/enrollment.controller");
exports.enrollmentRoute = express_1.default.Router();
exports.enrollmentRoute.get('/', enrollment_controller_1.getAllEnrollment);
