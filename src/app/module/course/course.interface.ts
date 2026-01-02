import mongoose from 'mongoose';

export interface ICourse {
  title: string;
  description?: string;
  price?: number;
  thumbnail?: string;
  isFeatured?: boolean;
  modules: mongoose.Types.ObjectId[];
}


