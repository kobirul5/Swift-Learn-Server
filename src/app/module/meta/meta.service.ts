import { Course } from '../course/course.model';
import { User } from '../users/user.model';
import { Enrollment } from '../enrollment/enrollment.model';
import { Payment } from '../payment/payment.model';

const getAdminDashboardStats = async () => {
    const totalCourses = await Course.countDocuments();
    const activeStudents = await User.countDocuments({ role: 'student', status: 'active' });
    
    // New Enrollments (this week)
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    const newEnrollments = await Enrollment.countDocuments({
        createdAt: { $gte: lastWeek }
    });

    // Total Revenue (completed payments)
    const revenueData = await Payment.aggregate([
        { $match: { status: 'completed' } },
        { $group: { _id: null, totalRevenue: { $sum: '$amount' } } }
    ]);
    const totalRevenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

    // Recent Course Activity (enrollments)
    const recentActivity = await Enrollment.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate('course')
        .populate('student');

    // Progress Overview (Courses by category or something similar for the bar chart)
    const categoryStats = await Course.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    return {
        totalCourses,
        activeStudents,
        newEnrollments,
        totalRevenue,
        recentActivity,
        categoryStats
    };
};

export const MetaService = {
    getAdminDashboardStats
};
