import express, { Request, Response } from 'express'
import { User } from '../models/user.model';

export const userRouter = express.Router()


// get All users
userRouter.post('/', async(req: Request, res: Response) => {
    const body = req.body;
    console.log(body)

    const data = await User.create(body)


    res.status(200).json({
        success: true,
        massage: "Create User Successfully",
        data
    })
})


// get All users
userRouter.get('/', async(req: Request, res: Response) => {

    const data = await User.find()

    res.status(200).json({
        success: true,
        massage: "Get All User Successfully",
        data
    })
})

