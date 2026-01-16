import { Document, Types } from "mongoose";

export interface ITestimonial extends Document {
    name: string;
    image: string;
    designation: string;
    rating: number;
    content: string;
    accentColor: string;
    isApproved: boolean;
}
