import { ITestimonial } from "./testimonial.interface";
import { Testimonial } from "./testimonial.model";

const createTestimonial = async (payload: ITestimonial) => {
    const result = await Testimonial.create(payload);
    return result;
};

const getAllTestimonials = async (page: number = 1, limit: number = 10, searchTerm?: string) => {
    const skip = (page - 1) * limit;

    const query: any = {};

    if (searchTerm) {
        query.$or = [
            { name: { $regex: searchTerm, $options: "i" } },
            { designation: { $regex: searchTerm, $options: "i" } },
            { content: { $regex: searchTerm, $options: "i" } },
        ];
    }

    const [data, total] = await Promise.all([
        Testimonial.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),
        Testimonial.countDocuments(query),
    ]);

    return {
        data,
        meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    };
};

const getApprovedTestimonials = async () => {
    const result = await Testimonial.find({ isApproved: true })
        .sort({ createdAt: -1 });
    return result;
};

const getSingleTestimonial = async (id: string) => {
    const result = await Testimonial.findById(id);
    return result;
};

const updateTestimonialStatus = async (id: string, isApproved: boolean) => {
    const result = await Testimonial.findByIdAndUpdate(
        id,
        { isApproved },
        { new: true }
    );
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
    updateTestimonialStatus,
    getSingleTestimonial,
    deleteTestimonial,
};
