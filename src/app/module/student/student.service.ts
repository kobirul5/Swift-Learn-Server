import { User } from "../users/user.model";

interface GetAllStudentsParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  status?: 'active' | 'inactive' | 'banned';
}

const getAllStudentsService = async ({
  page = 1,
  limit = 10,
  searchTerm,
  status,
}: GetAllStudentsParams) => {
  const skip = (page - 1) * limit;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filter: any = {
    role: { $ne: 'admin' }, 
    status: { $ne: 'deleted' },
  };

  // status filter (
  if (status) {
    filter.status = status;
  }

  // search
  if (searchTerm) {
    filter.$or = [
      { name: { $regex: searchTerm, $options: 'i' } },
      { email: { $regex: searchTerm, $options: 'i' } },
      { education: { $regex: searchTerm, $options: 'i' } },
    ];
  }

  const students = await User.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await User.countDocuments(filter);

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


const getSingleStudent = async (studentId: string) => {

  const student = await User.findById({ _id: studentId }).select('-password');
  if (!student) throw new Error('Student not found');
  return student;
};


export const studentService ={
   getAllStudentsService,
  getSingleStudent,
  };
