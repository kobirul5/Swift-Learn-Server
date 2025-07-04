"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module = void 0;
const mongoose_1 = require("mongoose");
const moduleSchema = new mongoose_1.Schema({
    course: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Course', required: true },
    title: { type: String, required: true },
    description: { type: String, required: false, default: "" },
    isActive: { type: Boolean, required: true, default: true }, // course
    lectures: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Lecture', default: [] }]
}, {
    timestamps: true,
    versionKey: false
});
exports.Module = (0, mongoose_1.model)('Module', moduleSchema);
