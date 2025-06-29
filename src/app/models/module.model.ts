import { model, Schema } from 'mongoose';
import { IModule } from '../interfaces/module.interface';

const moduleSchema = new Schema<IModule>({
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    title: { type: String, required: true },
    moduleNumber: { type: Number, required: true },
    lectures: [{ type: Schema.Types.ObjectId, ref: 'Lecture' }]
}, { timestamps: true });

export const Module = model('Module', moduleSchema);
