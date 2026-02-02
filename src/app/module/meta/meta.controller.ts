import { Request, Response } from 'express';
import { MetaService } from './meta.service';

const getAdminDashboardStats = async (req: Request, res: Response) => {
    try {
        const stats = await MetaService.getAdminDashboardStats();
        res.status(200).json({
            success: true,
            message: 'Admin dashboard stats fetched successfully',
            data: stats
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Error fetching dashboard stats',
            error: error
        });
    }
};

export const MetaController = {
    getAdminDashboardStats
};
