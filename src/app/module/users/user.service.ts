import { ApiError } from '../../utils/ApiError';
import { User } from './user.model';

const generateAccessToken = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  return user.generateAccessToken();
};

const createUserService = async (body: any) => {
  const { name, email, password } = body;
  if (!name || !email || !password) {
    throw new ApiError(400, 'Name, email and password are required');
  }

  const existUser = await User.findOne({ $or: [{ email }] });
  if (existUser) {
    throw new ApiError(409, 'User With email Already Exist');
  }

  const user = await User.create(body);
  const createdUser = await User.findById(user._id).select('-password');
  if (!createdUser) throw new ApiError(500, 'Something is wrong while create user');

  const accessToken = await generateAccessToken(user._id as string);

  return { createdUser, accessToken };
};

const loginUserService = async (email: string, password: string) => {
  if (!email || !password) throw new ApiError(400, 'Email and Password required');

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(400, 'User Dose not exist');

  const passwordCheck = await user.isPasswordCorrect(password);
  if (!passwordCheck) throw new ApiError(401, 'Invalid user credentials');

  const accessToken = await generateAccessToken(user._id as string);
  const loginUser = await User.findById(user._id).select('-password');
  if (!loginUser) throw new ApiError(500, 'Something is wrong while login user');

  return { loginUser, accessToken };
};

const getUserByEmailService = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, 'User not found');
  return user;
};

const getAllUsersService = async () => {
  return await User.find();
};

export {
  createUserService,
  loginUserService,
  getUserByEmailService,
  getAllUsersService,
};
