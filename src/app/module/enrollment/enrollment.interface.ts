import mongoose from 'mongoose';

export interface IEnrollment {
  student: mongoose.Types.ObjectId;
  progress: {
    course: mongoose.Types.ObjectId;
    completedLectures: mongoose.Types.ObjectId[];
  }[];
}
