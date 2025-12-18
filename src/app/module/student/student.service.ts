import { User } from "../users/user.model";

const getAllStudentsService = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const students = await User.find()
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });
  const total = await User.countDocuments();

  return {
    students,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export { getAllStudentsService };
