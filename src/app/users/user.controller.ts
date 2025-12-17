import { Request, Response } from 'express'
import { User } from './user.model';
import { ApiError } from '../utils/ApiError';


const generateAccessToken = async (userId: string) => {
    try {
        const user = await User.findById(userId)
        if (!user) {
            throw new ApiError(501, "User not found");
        }
        const accessToken = user.generateAccessToken()
        
        return accessToken;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        throw new ApiError(500, "Something is wrong while generating token")
    }
}



// Create User 
const createUser = async (req: Request, res: Response) => {
    const body = req.body;
    const { name, email, password, } = body;

    if (name === "" || email === "" || password === "") {
        throw new ApiError(500)
    }

    const existUser = await User.findOne({
        $or: [{ email }]
    })

    if (existUser) {
        throw new ApiError(409, "User With email Already Exist")
    }

    const user = await User.create(body)

    const createdUser = await User.findById(user._id).select(
        "-password"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something is wrong while create user")
    }


    const accessToken = await generateAccessToken(user._id as string)


    // cookie
    const options = {
        httpOnly: true,
        secure: false
    }



    res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json({
        success: true,
        massage: "Create User Successfully",
        data: createdUser,
        token: accessToken
    })
}

// Login User

const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and Password required")
    }
    // get user
    const user = await User.findOne({ email })
    if (!user) {
        throw new ApiError(400, "User Dose not exist")
    }
    // passwordCheck
    const passwordCheck = await user.isPasswordCorrect(password)

    if (!passwordCheck) {
        throw new ApiError(401, "Invalid user credentials")
    }
    // token
    const accessToken = await generateAccessToken(user._id as string)

    const loginUser = await User.findById(user._id).select(
        "-password"
    )

    if (!loginUser) {
        throw new ApiError(500, "Something is wrong while login user")
    }

    // cookie
    const options = {
        httpOnly: true,
        secure: true
    }

    res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .json({
            success: true,
            massage: "User Login Successfully",
            data: loginUser,
            token: accessToken
        })
}


const logout = async (req: Request, res: Response) => {
    const options = {
        httpOnly: true,
        secure: true
    }

    res
        .status(200)
        .clearCookie("accessToken", options)
        .json({
            success: true,
            massage: "User LogOut Successfully",
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


const getUserForLogin = async (req: Request, res: Response) => {
    const user = req.user;
    res
        .status(200)
        .json({
            success: true,
            massage: "User data get Successfully",
            data: user
        })
}




export { getAllUsers, createUser, loginUser, getUserByEmail, logout, getUserForLogin }