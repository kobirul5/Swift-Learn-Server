import { IFaq } from "./faq.interface";
import { Faq } from "./faq.model";

const createFaq = async (payload: IFaq) => {
    const result = await Faq.create(payload);
    return result;
};

const getAllFaqs = async () => {
    const result = await Faq.find().sort({ createdAt: -1 });
    return result;
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
