import { Types } from "mongoose";

export interface IPayment {
    user: Types.ObjectId;
    course: Types.ObjectId;
    transactionId: string;
    amount: number;
    status: 'pending' | 'completed' | 'failed';
    stripeSessionId?: string;
}
