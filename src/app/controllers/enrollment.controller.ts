import { Request, Response } from 'express'
import { Enrollment } from '../models/enrollment.model'
import { Course } from '../models/course.model'


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
    // Step 1: Get the student's enrollment data
    const enrollment = await Enrollment.findOne({ student: studentId });

    if (!enrollment) {
       res.status(404).json({
        success: false,
        message: 'Enrollment not found for this student',
      });
      return
    }

    // Step 2: Extract all courseIds the student is enrolled in
    const courseIds = enrollment.progress.map(p => p.course);

    // Step 3: Get courses with modules populated
    const courses = await Course.find({ _id: { $in: courseIds } })
      .populate({
        path: 'modules',
        populate: {
          path: 'lectures',
        },
      });

    // Step 4: Return enriched course data
     res.status(200).json({
      success: true,
      message: 'Enrolled courses fetched successfully',
      data: courses,
    });

    // student id diye course gula ber korbo, 
    // req.body theke course diye kon course mil ase sete ber korbo
    // course er modde ta get korbo corser modde moude id gula thakbe segula ber korbo, 
    // module er modde lecture thakbe segula ber kore fron end a res ponse pathabo

    
}


export {getAllEnrollment, getStudentEnrollmentAndCourse, createEnrollment}