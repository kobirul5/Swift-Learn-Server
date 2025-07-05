import { model, Schema } from 'mongoose';
import { ICourse } from '../interfaces/course.interface';

const courseSchema = new Schema<ICourse>(
    {
        title: { type: String, required: true },
        description:{type:String, required:true},
        price: {type: Number, required: true},
        thumbnail: {type: String, required: true},
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
