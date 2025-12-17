import { Request, Response } from 'express'
import { asyncHandler } from '../utils/asyncHandler';
import { User } from '../users/user.model';

const getAllStudents = asyncHandler(async(req:Request, res:Response)=>{
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const students = await User.find().skip(skip).limit(limit).sort({ createdAt: -1 });
    const total = await User.countDocuments();

    res.status(200).json({
      success: true,
      message: students.length === 0 ? "No students found" : "Students retrieved",
      data: students,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
})

export {getAllStudents}