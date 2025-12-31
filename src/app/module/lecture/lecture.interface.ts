import mongoose from "mongoose";

export interface ILecture extends Document {
  module: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;
  isLocked: boolean;
  title: string;
  videoUrl?: string;
  notes: string[];
}
