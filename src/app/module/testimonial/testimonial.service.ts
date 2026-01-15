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
        // Since user is populated, we might need a more complex search if searching by user name,
        // but for now let's search in content.
        query.$or = [
            { content: { $regex: searchTerm, $options: "i" } },
        ];
    }

    const [data, total] = await Promise.all([
        Testimonial.find(query)
            .populate("user")
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
