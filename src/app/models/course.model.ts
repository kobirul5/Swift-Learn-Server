import { model, Schema } from 'mongoose';
import { ICourse } from '../interfaces/course.interface';

const courseSchema = new Schema<ICourse>(
    {
    title: { type: String, required: true },
    description: String,
    price: Number,
    thumbnail: String, 
    modules: [{ type: Schema.Types.ObjectId, ref: 'Module' }]
},{ 
    timestamps: true, 
    versionKey: false
});

export const Course = model('Course', courseSchema);
