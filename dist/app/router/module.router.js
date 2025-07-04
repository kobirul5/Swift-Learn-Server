"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.moduleRoute = void 0;
const express_1 = __importDefault(require("express"));
const module_controller_1 = require("../controllers/module.controller");
exports.moduleRoute = express_1.default.Router();
exports.moduleRoute.get('/', module_controller_1.getAllModule);
exports.moduleRoute.post('/create', module_controller_1.createModule);
