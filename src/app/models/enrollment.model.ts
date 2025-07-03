import { Schema, model } from 'mongoose';
import { IEnrollment } from '../interfaces/enrollment.interface';



const enrollmentSchema: Schema<IEnrollment> = new Schema(
    {
        student: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        progress: [
            {
                course: {
                    type: Schema.Types.ObjectId,
                    ref: 'Course',
                    required: true, // TODO: need out side course and remove progress and add enrolledAt
                },
                completedLectures: [
                    {
                        type: Schema.Types.ObjectId,
                        ref: 'Lecture',
                    },
                ],
            },
        ],
    },
    {
        timestamps: true,
        versionKey: false,
    }
);


export const Enrollment = model('Enrollment', enrollmentSchema);


// enrollmentDate


// new schema  lectureProgress 
//*
// student, lecture, completedAT,
// /
