import { IFaq } from "./faq.interface";
import { Faq } from "./faq.model";

const createFaq = async (payload: IFaq) => {
    const result = await Faq.create(payload);
    return result;
};

const getAllFaqs = async (page: number = 1, limit: number = 10, searchTerm?: string) => {
    const skip = (page - 1) * limit;

    const query: any = {};

    if (searchTerm) {
        query.$or = [
            { question: { $regex: searchTerm, $options: "i" } },
            { answer: { $regex: searchTerm, $options: "i" } },
        ];
    }

    const [data, total] = await Promise.all([
        Faq.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
        Faq.countDocuments(query),
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

const getFaqById = async (id: string) => {
    const result = await Faq.findById(id);
    return result;
};

const updateFaq = async (id: string, payload: Partial<IFaq>) => {
    const result = await Faq.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return result;
};

const deleteFaq = async (id: string) => {
    const result = await Faq.findByIdAndDelete(id);
    return result;
};

export const FaqServices = {
    createFaq,
    getAllFaqs,
    getFaqById,
    updateFaq,
    deleteFaq,
};
