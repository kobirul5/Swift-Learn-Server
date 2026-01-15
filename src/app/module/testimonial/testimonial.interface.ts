import { Document, Types } from "mongoose";

export interface ITestimonial extends Document {
    user: Types.ObjectId;
    rating: number;
    content: string;
    accentColor: string;
    isApproved: boolean;
}
