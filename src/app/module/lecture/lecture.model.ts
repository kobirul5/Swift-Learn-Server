import { model, Schema } from "mongoose";
import { ILecture } from "./lecture.interface";

const lectureSchema = new Schema<ILecture>({
    module: { type: Schema.Types.ObjectId, ref: 'Module', required: true },
    title: { type: String, required: true },
    isLocked: { type: Boolean, default: true },
    videoUrl: { type: String, required: true },
    notes: [String]
}, { timestamps: true, versionKey: false });

export const Lecture = model('Lecture', lectureSchema);
