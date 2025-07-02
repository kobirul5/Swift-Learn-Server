import { model, Schema } from 'mongoose';
import { ICourse } from '../interfaces/course.interface';

const courseSchema = new Schema<ICourse>(
    {
        title: { type: String, required: true },
        description: String,
        price: {type: Number, required: true},
        thumbnail: String,
        modules: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Module',
                required: false,
                default: []
            }
        ]
    }, {
    timestamps: true,
    versionKey: false
});

export const Course = model('Course', courseSchema);
