import { Schema, model } from 'mongoose';
import { IEnrollment } from './enrollment.interface';


const progressScema = new Schema(
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
    },{
        versionKey:false,
        _id:false,

    }
)



const enrollmentSchema = new Schema<IEnrollment>(
    {
        student: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        progress: [progressScema]
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
