import Stripe from "stripe";
import { ApiError } from "../app/utils/ApiError";


if (!process.env.STRIPE_SECRET_KEY) {
    throw new ApiError(401,"STRIPE_SECRET_KEY is not defined");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2025-12-15.clover",
    typescript: true,
});

export default stripe;
