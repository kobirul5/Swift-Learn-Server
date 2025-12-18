import { ApiError } from "../../utils/ApiError";
import { User } from "./user.model";

const getUserByEmailService = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "User not found");
  return user;
};

const getAllUsersService = async () => {
  return await User.find();
};

const getMeService = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return user;
};

export { getMeService, getUserByEmailService, getAllUsersService };
