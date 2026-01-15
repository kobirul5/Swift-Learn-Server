import { model, Schema } from "mongoose";
import { ITestimonial } from "./testimonial.interface";

const testimonialSchema = new Schema<ITestimonial>(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        content: { type: String, required: true },
        accentColor: { type: String, required: true, default: "bg-purple-500" },
        isApproved: { type: Boolean, default: false },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const Testimonial = model<ITestimonial>("Testimonial", testimonialSchema);
