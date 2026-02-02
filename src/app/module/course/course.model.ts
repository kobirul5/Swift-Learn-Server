import { model, Schema } from "mongoose";
import { ICourse } from "./course.interface";

const courseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    isFeatured: { type: Boolean, required: true, default: false },
    category: { 
      type: String, 
      enum: ['Web Development', 'Data Science', 'Mobile Apps', 'Programming', 'Business'],
      required: true 
    },
    modules: [
      {
        type: Schema.Types.ObjectId,
        ref: "Module",
        required: false,
        default: [],
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Course = model("Course", courseSchema);
