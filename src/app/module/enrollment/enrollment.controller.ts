import { Request, Response } from 'express'

import { Course } from '../course/course.model'
import { IEnrollment } from './enrollment.interface'
import { Enrollment } from './enrollment.model'

const getAllEnrollment = async(req: Request, res: Response) => {
    const data = await Enrollment.find()
    res.status(200).json({
        success: true,
        massage: "Get Enrolment Successfully",
        data
    })
}
const createEnrollment = async(req: Request, res: Response) => {
    const enData = req.body;
    const data = await Enrollment.create(enData)
    res.status(200).json({
        success: true,
        massage: "Get Enrolment Successfully",
        data
    })
}

const getStudentEnrollmentAndCourse = async(req: Request, res: Response) => {

    const {studentId }= req.params; 
    // Get the student's enrollment data
    const enrollment = await Enrollment.find({ student: studentId }) as IEnrollment[];

    if (!enrollment) {
       res.status(404).json({
        success: false,
        message: 'Enrollment not found for this student',
      });
      return
    }

    //  Extract all courseIds the student is enrolled in
    const courseIds = enrollment.flatMap(e => e.progress.map(p => p.course));
    console.log( courseIds, "------------------------")

    //  Get courses with modules populated
    const courses = await Course.find({ _id: { $in: courseIds } })
      .populate({
        path: 'modules',
        populate: {
          path: 'lectures',
        },
      });

    //  Return enriched course data
     res.status(200).json({
      success: true,
      message: 'Enrolled courses fetched successfully',
      data: courses,
    });

}


export {getAllEnrollment, getStudentEnrollmentAndCourse, createEnrollment}