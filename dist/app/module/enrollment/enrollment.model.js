"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enrollment = void 0;
const mongoose_1 = require("mongoose");
const progressScema = new mongoose_1.Schema({
    course: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Course',
        required: true, // TODO: need out side course and remove progress and add enrolledAt
    },
    completedLectures: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Lecture',
        },
    ],
}, {
    versionKey: false,
    _id: false,
});
const enrollmentSchema = new mongoose_1.Schema({
    student: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    progress: [progressScema]
}, {
    timestamps: true,
    versionKey: false,
});
exports.Enrollment = (0, mongoose_1.model)('Enrollment', enrollmentSchema);
// enrollmentDate
// new schema  lectureProgress
//*
// student, lecture, completedAT,
// /
