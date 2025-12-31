import { Schema, model, Types } from 'mongoose';
import { IEnrollment } from './enrollment.interface';

const enrollmentSchema = new Schema<IEnrollment>(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Enrollment = model<IEnrollment>('Enrollment', enrollmentSchema);
