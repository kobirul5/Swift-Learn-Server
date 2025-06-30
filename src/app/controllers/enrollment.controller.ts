import { Request, Response } from 'express'
import { Enrollment } from '../models/enrollment.model'


const getAllEnrollment = async(req: Request, res: Response) => {
    const data = await Enrollment.find()
    res.status(200).json({
        success: true,
        massage: "Get Enrolment Successfully",
        data
    })
}


export {getAllEnrollment}