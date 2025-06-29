import mongoose from 'mongoose';

export interface IModule {
  course: mongoose.Types.ObjectId;
  title: string;
  moduleNumber: number;
  lectures: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}