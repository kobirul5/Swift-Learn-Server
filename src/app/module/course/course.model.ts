import { model, Schema } from "mongoose";
import { ICourse } from "./course.interface";

const courseSchema = new Schema<ICourse>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    isFeatured: { type: Boolean, required: true, default: false },
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
