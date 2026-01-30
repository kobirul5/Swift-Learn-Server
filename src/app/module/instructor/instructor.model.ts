import mongoose, { Schema, model } from 'mongoose';
import { IInstructor } from './instructor.interface';

const instructorSchema = new Schema<IInstructor>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    designation: {
      type: String,
      required: [true, 'Designation is required'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
    },
    bio: {
      type: String,
      required: [true, 'Bio is required'],
    },
    yearsExperience: {
      type: Number,
      required: [true, 'Years of experience is required'],
      min: 0,
    },
    studentsTaught: {
      type: Number,
      required: [true, 'Students taught is required'],
      min: 0,
    },
    averageRating: {
      type: Number,
      required: [true, 'Average rating is required'],
      min: 0,
      max: 5,
    },
    coursesCreated: {
      type: Number,
      required: [true, 'Courses created is required'],
      min: 0,
    },
    teachingPhilosophy: {
      type: String,
      required: [true, 'Teaching philosophy is required'],
    },
    expertise: {
      type: [String],
      required: [true, 'Expertise is required'],
      validate: {
        validator: function (v: string[]) {
          return v && v.length > 0;
        },
        message: 'At least one expertise is required',
      },
    },
    certifications: [
      {
        title: {
          type: String,
          required: true,
        },
        period: {
          type: String,
          required: true,
        },
      },
    ],
    socialLinks: {
      twitter: String,
      linkedin: String,
      github: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Instructor = model<IInstructor>('Instructor', instructorSchema);
