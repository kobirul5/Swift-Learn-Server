import { model, Schema } from 'mongoose';
import { IModule } from '../interfaces/module.interface';

const moduleSchema = new Schema<IModule>(
    {
        course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
        title: { type: String, required: true },
        description:{type: String, required: false, default: ""},
        isActive: { type: Boolean, required: true, default: true },// course
        lectures: [{ type: Schema.Types.ObjectId, ref: 'Lecture', default: []}]
    }, {
    timestamps: true,
    versionKey:false
});

export const Module = model('Module', moduleSchema);
