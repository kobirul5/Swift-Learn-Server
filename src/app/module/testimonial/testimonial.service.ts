import { ITestimonial } from "./testimonial.interface";
import { Testimonial } from "./testimonial.model";

const createTestimonial = async (payload: ITestimonial) => {
    const result = await Testimonial.create(payload);
    return result;
};

const getAllTestimonials = async () => {
    const result = await Testimonial.find().populate("user").sort({ createdAt: -1 });
    return result;
};

const getApprovedTestimonials = async () => {
    const result = await Testimonial.find({ isApproved: true })
        .populate("user")
        .sort({ createdAt: -1 });
    return result;
};

const approveTestimonial = async (id: string) => {
    const result = await Testimonial.findByIdAndUpdate(
        id,
        { isApproved: true },
        { new: true }
    ).populate("user");
    return result;
};

const deleteTestimonial = async (id: string) => {
    const result = await Testimonial.findByIdAndDelete(id);
    return result;
};

export const TestimonialService = {
    createTestimonial,
    getAllTestimonials,
    getApprovedTestimonials,
    approveTestimonial,
    deleteTestimonial,
};
