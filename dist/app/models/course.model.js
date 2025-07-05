"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
const mongoose_1 = require("mongoose");
const courseSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    modules: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Module',
            required: false,
            default: []
        }
    ]
}, {
    timestamps: true,
    versionKey: false
});
exports.Course = (0, mongoose_1.model)('Course', courseSchema);
