import { Payment } from "./payment.model";

const createPaymentService = async (payload: any) => {
    const result = await Payment.create(payload);
    return result;
};

export const paymentService = {
    createPaymentService,
};
