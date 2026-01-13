import express from 'express';
import { paymentController } from './payment.controller';
import { checkAuth } from '../../middlewares/auth.middleware';

const router = express.Router();

router.post('/', checkAuth(), paymentController.createPayment);

export const paymentRoutes = router;
