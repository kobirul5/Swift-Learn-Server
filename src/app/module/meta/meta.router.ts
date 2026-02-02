import express from 'express';
import { MetaController } from './meta.controller';

const router = express.Router();

// Note: In a real app, you should add admin authorization middleware here
router.get('/admin-stats', MetaController.getAdminDashboardStats);

export const MetaRoutes = router;
