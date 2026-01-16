import { model, Schema } from "mongoose";
import { ITestimonial } from "./testimonial.interface";

const testimonialSchema = new Schema<ITestimonial>(
    {
        name: { type: String, required: true },
        image: { type: String, required: true },
        designation: { type: String, required: true },
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
