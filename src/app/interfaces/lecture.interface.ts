import mongoose from "mongoose";

export interface ILecture extends Document {
  module: mongoose.Types.ObjectId;
  course: mongoose.Types.ObjectId;
  title: string;
  videoUrl?: string;
  pdfNotes: string[];
}
