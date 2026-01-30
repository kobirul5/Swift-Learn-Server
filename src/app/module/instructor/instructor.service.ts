import { Instructor } from './instructor.model';
import { IInstructor } from './instructor.interface';
import { ApiError } from '../../utils/ApiError';

const createInstructor = async (payload: IInstructor) => {
  const result = await Instructor.create(payload);
  return result;
};

interface QueryParams {
  page?: number;
  limit?: number;
  search?: string;
  expertise?: string;
}

const getAllInstructors = async (query: QueryParams) => {
  const { page = 1, limit = 10, search, expertise } = query;
  
  // Build filter object
  const filter: any = {};
  
  // Search by name or designation
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { designation: { $regex: search, $options: 'i' } },
    ];
  }
  
  // Filter by expertise
  if (expertise) {
    filter.expertise = { $in: [expertise] };
  }
  
  // Calculate pagination
  const skip = (page - 1) * limit;
  
  // Get total count for pagination
  const total = await Instructor.countDocuments(filter);
  
  // Fetch instructors with pagination
  const result = await Instructor.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
  
  return {
    data: result,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getSingleInstructor = async (id: string) => {
  const result = await Instructor.findById(id);
  if (!result) {
    throw new ApiError(404, 'Instructor not found');
  }
  return result;
};

const updateInstructor = async (id: string, payload: Partial<IInstructor>) => {
  const result = await Instructor.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw new ApiError(404, 'Instructor not found');
  }
  return result;
};

const deleteInstructor = async (id: string) => {
  const result = await Instructor.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(404, 'Instructor not found');
  }
  return result;
};

export const InstructorServices = {
  createInstructor,
  getAllInstructors,
  getSingleInstructor,
  updateInstructor,
  deleteInstructor,
};
