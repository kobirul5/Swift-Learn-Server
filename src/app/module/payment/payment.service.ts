import { Payment } from "./payment.model";
import { Enrollment } from "../enrollment/enrollment.model";
import stripe from "../../../shared/stripe";

const createPaymentService = async (payload: any) => {
    const result = await Payment.create(payload);
    return result;
};

const confirmationPaymentService = async (payload: any, signature: string) => {
    let event;
    try {
        event = stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_SECRET_WEBHOOK as string);
    } catch (err: any) {
        throw new Error(`Webhook Error: ${err.message}`);
    }

    let result;

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const transactionId = session.id;

        result = await Payment.findOneAndUpdate({ transactionId }, { status: 'completed' });
        console.log(result)
        if (result) {
           const enrollment = await Enrollment.findOneAndUpdate(
                { course: result.course, student: result.user },
                { paymentStatus: 'completed' }
            )
            console.log(enrollment)
        }
    }

    return result;
}

export const paymentService = {
    createPaymentService,
    confirmationPaymentService
};
