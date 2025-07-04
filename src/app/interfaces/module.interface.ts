import mongoose from 'mongoose';

export interface IModule {
  course: mongoose.Types.ObjectId;
  title: string;
  description: string;
  isActive: true;
  lectures: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  moduleNumber: number,
}