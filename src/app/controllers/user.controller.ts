import { Request, Response } from 'express'
import { User } from '../models/user.model';
import { ApiError } from '../utils/ApiError';





// Create User 
const createUser = async (req: Request, res: Response) => {
    const body = req.body;
    const {name, email, password,} = body;

    if(name === "" || email === "" || password === ""){
        throw new ApiError(500)
    }

   const existUser = await User.findOne({
        $or:[{email}]
    })

    if(existUser){
        throw new ApiError(409, "User With email Already Exist")
    }

    const user = await User.create(body)

    const createdUser = await User.findById(user._id).select(
        "-password"
    )

    if(!createdUser){
        throw new ApiError(500, "Something is wrong while create user")
    }

    res.status(200).json({
        success: true,
        massage: "Create User Successfully",
        data : createdUser
    })
}


// get user by email
const getUserByEmail = async (req: Request, res: Response) => {
    const email = req.params.email;

    const user = await User.findOne({ email })
    if (!user) {
        res.status(404).json({ success: false, message: 'User not found' })
        return
    }
    res.status(200).json({
        success: true,
        massage: "Get User by Email Successfully",
        data: user
    })
}


// get All users
const getAllUsers = async (req: Request, res: Response) => {

    const data = await User.find()

    res.status(200).json({
        success: true,
        massage: "Get All User Successfully",
        data
    })
}





export { getAllUsers, createUser, getUserByEmail }