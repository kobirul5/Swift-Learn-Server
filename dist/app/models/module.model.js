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
exports.Module = void 0;
const mongoose_1 = require("mongoose");
const moduleSchema = new mongoose_1.Schema({
    course: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Course', required: true },
    title: { type: String, required: true },
    description: { type: String, required: false, default: "" },
    isActive: { type: Boolean, required: true, default: true }, // course
    lectures: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Lecture', default: [] }],
    moduleNumber: { type: Number, required: true },
}, {
    timestamps: true,
    versionKey: false
});
moduleSchema.pre('validate', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isNew) {
            const Module = this.constructor;
            const count = yield Module.countDocuments({ course: this.course });
            this.moduleNumber = count + 1;
        }
        next();
    });
});
exports.Module = (0, mongoose_1.model)('Module', moduleSchema);
// akhne theke cousr id remove korte hobe,, ata course er modde j module er data rakhci sekhane theke sob module access paoa jabe
