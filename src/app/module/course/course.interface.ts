import mongoose from 'mongoose';

export type ICategory = 'Web Development' | 'Data Science' | 'Mobile Apps' | 'Programming' | 'Business';

export interface ICourse {
  title: string;
  description?: string;
  price?: number;
  thumbnail?: string;
  isFeatured?: boolean;
  category: ICategory;
  modules: mongoose.Types.ObjectId[];
}


