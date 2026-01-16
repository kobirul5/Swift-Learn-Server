import { IContact } from "./contact.interface";
import { Contact } from "./contact.model";

const createContact = async (payload: IContact) => {
    const result = await Contact.create(payload);
    return result;
};

const getAllContacts = async (page: number = 1, limit: number = 10, searchTerm?: string) => {
    const skip = (page - 1) * limit;

    const query: any = {};

    if (searchTerm) {
        query.$or = [
            { name: { $regex: searchTerm, $options: "i" } },
            { email: { $regex: searchTerm, $options: "i" } },
            { subject: { $regex: searchTerm, $options: "i" } },
            { message: { $regex: searchTerm, $options: "i" } },
        ];
    }

    const [data, total] = await Promise.all([
        Contact.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
        Contact.countDocuments(query),
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

const deleteContact = async (id: string) => {
    const result = await Contact.findByIdAndDelete(id);
    return result;
};

export const ContactServices = {
    createContact,
    getAllContacts,
    deleteContact,
};
